// src/services/auth.service.ts
import * as dbService from "../db";
import { refreshTokens } from "../db/schema";
import { eq } from "drizzle-orm";
import {
  generateAccessToken,
  generateRefreshToken,
  hashPassword,
  hashToken,
} from "../utils/auth.utils";
import type { IUser } from "./users.service";
import * as dojosService from "./dojos.service";
import * as mailerService from "./mailer.service";
import * as notificationsService from "./notifications.service";
import * as stripeService from "./stripe.service";
import * as userService from "./users.service";
import { addDays, isAfter } from "date-fns";
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from "../core/errors";
import { NotificationType, Role } from "../constants/enums";
import { RegisterUserDTO } from "../validations/auth.schemas";
import type { Transaction } from "../db";

export const loginUser = async ({
  user,
  userIp,
  userAgent,
  txInstance,
}: {
  user: IUser;
  userIp?: string;
  userAgent?: string;
  txInstance?: Transaction;
}) => {
  const execute = async (tx: Transaction) => {
    // 1. Generate tokens
    const accessToken = generateAccessToken({
      userId: user.id,
      email: user.email,
      role: user.role!,
    });
    const refreshToken = generateRefreshToken();

    // 2. Hash refresh token for storage
    const hashedRefreshToken = hashToken(refreshToken);

    // 3. Store refresh token with expiry (e.g., 7 days)
    const expiresAt = addDays(new Date(), 7);

    await tx.insert(refreshTokens).values({
      userId: user.id,
      hashedToken: hashedRefreshToken,
      expiresAt: expiresAt,
      userAgent,
      userIp,
    });

    // 4. Return raw tokens to the mobile app
    return { accessToken, refreshToken };
  };

  return txInstance ? execute(txInstance) : dbService.runInTransaction(execute);
};

export const refreshUserToken = async ({
  token,
  userIp,
  userAgent,
  txInstance,
}: {
  token: string;
  userIp: string;
  userAgent;
  txInstance?: Transaction;
}) => {
  const execute = async (tx: Transaction) => {
    const hashedToken = hashToken(token);

    // 1. Find the token in DB
    const [storedToken] = await tx
      .select()
      .from(refreshTokens)
      .where(eq(refreshTokens.hashedToken, hashedToken));

    if (
      !storedToken ||
      storedToken.revoked ||
      isAfter(new Date(), storedToken.expiresAt)
    ) {
      throw new UnauthorizedException("Invalid or expired refresh token");
    }

    // 2. Token Rotation: Revoke the old token (or delete it)
    // We mark it as revoked or delete it to prevent reuse.
    await tx.delete(refreshTokens).where(eq(refreshTokens.id, storedToken.id));

    // 3. Issue NEW pair
    const user = await userService.getOneUserByID({
      userId: storedToken.userId,
    });
    if (!user) throw new NotFoundException("User not found");

    return loginUser({ user, userIp, userAgent }); // Re-uses login logic to generate new pair & save
  };

  return txInstance ? execute(txInstance) : dbService.runInTransaction(execute);
};

export const registerAdminUser = async ({
  userDTO,
  userIp,
  userAgent,
}: {
  userDTO: RegisterUserDTO;
  userIp: string;
  userAgent: string;
}) => {
  try {
    // --- CHECK EMAIL & USERNAME (Transactional Querying) ---
    const [existingUserWithEmail, existingUserWithUsername] = await Promise.all(
      [
        userService.getOneUserByEmail({
          email: userDTO.email,
        }),
        userService.getOneUserByUserName(userDTO.fullName),
      ]
    );

    if (existingUserWithEmail) {
      throw new ConflictException("Email already registered");
    }

    if (existingUserWithUsername) {
      throw new ConflictException("Username already taken");
    }

    // Generate Referral Code and Hash Password
    const referral_code = userService.generateReferralCode();
    const hashedPassword = await hashPassword(userDTO.password);

    try {
      // Stripe Customer & Subscription
      const stripeCustomer = await stripeService.createCustomers(
        userDTO.name,
        userDTO.email,
        userDTO.paymentMethod
      );

      const stripeSubscription = await stripeService.createSubscription(
        stripeCustomer,
        userDTO.plan
      );

      // Convert Stripe timestamp (seconds) to ISO string
      const trialEndsAt = stripeSubscription.trial_end
        ? new Date(stripeSubscription.trial_end * 1000).toISOString()
        : null;

      const newUser = await userService.saveUser({
        name: userDTO.name,
        username: userDTO.fullName,
        email: userDTO.email,
        passwordHash: hashedPassword,
        role: userDTO.role,
        activeSub: userDTO.plan,
        referralCode: referral_code,
        referredBy: userDTO.referredBy,
        stripeCustomerId: stripeCustomer.id,
        stripeSubscriptionId: stripeSubscription.id,
        subscriptionStatus: stripeSubscription.status,
        trialEndsAt,
        // fcmToken: userDTO.fcmToken,
      });

      await userService.setDefaultPaymentMethod(newUser, userDTO.paymentMethod);

      await dojosService.saveDojo({
        userId: newUser.id,
        name: userDTO.dojoName,
        tag: userDTO.dojoTag,
        tagline: userDTO.dojoTagline,
      });

      const { accessToken, refreshToken } = await loginUser({
        user: newUser,
        userAgent,
        userIp,
      });

      try {
        await mailerService.sendWelcomeEmail(
          userDTO.email,
          userDTO.name,
          userDTO.role
        );

        // // Send Push Notification
        // if (userDTO.fcmToken) {
        //   const pushData =
        //     userDTO.role === Role.Admin
        //       ? { screen: "complete_profile" }
        //       : { screen: "home" };

        //   const body =
        //     userDTO.role === Role.Admin
        //       ? "Your admin account has been created successfully."
        //       : "Your account has been created successfully.";

        //   await notificationsService.sendNotification({
        //     fcmToken: userDTO.fcmToken,
        //     userId: newUser.id,
        //     type: NotificationType.SignUp,
        //     title: "Welcome to Dojo Connect",
        //     body,
        //     data: pushData,
        //   });
        // }
      } catch (err) {
        console.log(
          "An Error occurred while trying to send email and notification. Error: ",
          err
        );
      }

      return {
        accessToken,
        refreshToken,
        message: "User registered successfully",
        user: newUser,
      };
    } catch (error) {}
  } catch (err) {}
};

export const registerUser = async (
  {
    userDTO,
    userIp,
    userAgent,
  }: {
    userDTO: RegisterUserDTO;
    userIp?: string;
    userAgent?: string;
  },
  txInstance?: dbService.Transaction
) => {
  const execute = async (tx: dbService.Transaction) => {
    try {
      // --- CHECK EMAIL & USERNAME (Transactional Querying) ---
      const [existingUserWithEmail, existingUserWithUsername] =
        await Promise.all([
          userService.getOneUserByEmail({
            email: userDTO.email,
            txInstance: tx,
          }),
          userService.getOneUserByUserName(userDTO.fullName, tx),
        ]);

      if (existingUserWithEmail) {
        throw new ConflictException("Email already registered");
      }

      if (existingUserWithUsername) {
        throw new ConflictException("Username already taken");
      }

      // Generate Referral Code and Hash Password
      const referral_code = userService.generateReferralCode();
      const hashedPassword = await hashPassword(userDTO.password);

      let stripeCustomerId: string | null = null;
      let stripeSubscriptionId: string | null = null;
      let subscriptionStatus: string | null = null;
      let trialEndsAt: string | null = null;

      if (userDTO.role === Role.DojoAdmin) {
        try {
          // Stripe Customer & Subscription
          const stripeCustomer = await stripeService.createCustomers(
            userDTO.name,
            userDTO.email,
            userDTO.paymentMethod
          );

          const stripeSubscription = await stripeService.createSubscription(
            stripeCustomer,
            userDTO.plan
          );

          stripeCustomerId = stripeCustomer.id;
          stripeSubscriptionId = stripeSubscription.id;
          subscriptionStatus = stripeSubscription.status;

          // Convert Stripe timestamp (seconds) to ISO string
          trialEndsAt = stripeSubscription.trial_end
            ? new Date(stripeSubscription.trial_end * 1000).toISOString()
            : null;
        } catch (err: any) {
          console.error("Stripe API error:", err.message);
          throw new InternalServerErrorException(
            `Stripe API error: ${err.message || ""}`
          );
        }
      }

      const newUser = await userService.saveUser(
        {
          name: userDTO.name,
          username: userDTO.fullName,
          email: userDTO.email,
          passwordHash: hashedPassword,
          role: userDTO.role,
          activeSub: userDTO.plan,
          referralCode: referral_code,
          referredBy: userDTO.referredBy,
          stripeCustomerId,
          stripeSubscriptionId,
          subscriptionStatus,
          trialEndsAt,
        },
        tx
      );

      if (userDTO.role === Role.DojoAdmin) {
        await userService.setDefaultPaymentMethod(
          newUser,
          userDTO.paymentMethod,
          tx
        );

        await dojosService.saveDojo(
          {
            userId: newUser.id,
            name: userDTO.dojoName,
            tag: userDTO.dojoTag,
            tagline: userDTO.dojoTagline,
          },
          tx
        );
      }

      const { accessToken, refreshToken } = await loginUser({
        user: newUser,
        userAgent,
        userIp,
        txInstance: tx,
      });

      try {
        await mailerService.sendWelcomeEmail(
          userDTO.email,
          userDTO.name,
          userDTO.role
        );
      } catch (err) {
        console.log(
          "[Consumed Error]: An Error occurred while trying to send email and notification. Error: ",
          err
        );
      }

      return {
        accessToken,
        refreshToken,
        message: "User registered successfully",
        user: newUser,
      };
    } catch (err) {
      console.log(`An error occurred while trying to register user: ${err}`);
      throw err;
    }
  };

  return txInstance ? execute(txInstance) : dbService.runInTransaction(execute);
};