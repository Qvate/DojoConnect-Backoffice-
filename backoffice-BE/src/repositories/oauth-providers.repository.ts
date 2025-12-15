import { eq, and, InferSelectModel, InferInsertModel } from "drizzle-orm";
import * as dbService from "../db";
import type { Transaction } from "../db";
import { userOAuthAccounts } from "../db/schema";
import { returnFirst } from "../utils/db.utils";
import { SupportedOAuthProviders } from "../constants/enums";

export type IOAuthAcct = InferSelectModel<typeof userOAuthAccounts>;
export type INewOAuthAcct = InferInsertModel<typeof userOAuthAccounts>;

export type IUpdateOAuthProvider = Partial<
  Omit<INewOAuthAcct, "id" | "createdAt">
>;

export class UserOAuthAccountsRepository {
  static findByProviderAndProviderUserId({
    provider,
    providerUserId,
    txInstance,
  }: {
    provider: SupportedOAuthProviders;
    providerUserId: string;
    txInstance?: Transaction;
  }): Promise<IOAuthAcct | null> {
    const execute = async (tx: Transaction) => {
      return returnFirst(
        await tx
          .select()
          .from(userOAuthAccounts)
          .where(
            and(
              eq(userOAuthAccounts.providerUserId, providerUserId),
              eq(userOAuthAccounts.provider, provider)
            )
          )
          .limit(1)
          .execute()
      );
    };

    return txInstance
      ? execute(txInstance)
      : dbService.runInTransaction(execute);
  }

  static createOAuthAcct({
    dto,
    txInstance,
  }: {
    dto: INewOAuthAcct;
    txInstance?: Transaction;
  }) {
    const execute = async (tx: Transaction) => {
      // Create OAuth link
      await tx.insert(userOAuthAccounts).values(dto);
    };

    return txInstance
      ? execute(txInstance)
      : dbService.runInTransaction(execute);
  }

  static updateOAuthAcct({
    oAuthAcctId,
    update,
    txInstance,
  }: {
    oAuthAcctId: string;
    update: IUpdateOAuthProvider;
    txInstance?: Transaction;
  }) {
    const execute = async (tx: Transaction) => {
      await tx
        .update(userOAuthAccounts)
        .set(update)
        .where(eq(userOAuthAccounts.id, oAuthAcctId));
    };

    return txInstance
      ? execute(txInstance)
      : dbService.runInTransaction(execute);
  }
}
