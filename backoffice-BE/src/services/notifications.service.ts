import { InferInsertModel } from "drizzle-orm";
import { NotificationType } from "../constants/enums";
import { InternalServerErrorException } from "../core/errors/InternalServerErrorException";
import * as firebaseService from "./firebase.service";
import * as dbService from "../db";

import { notifications } from "../db/schema";

type INewNotification = InferInsertModel<typeof notifications>;


export type BaseNotificationData = {
};

export type SignUpSuccessfulNotificationData = {
  push_data: string
}

export type NotificationData = BaseNotificationData | SignUpSuccessfulNotificationData;

export const saveNotification = async (notification: INewNotification) => {
  await dbService.getDB().insert(notifications).values(notification);
}

export const sendNotification = async ({
  type,
  fcmToken,
  userId,
  title,
  body = "",
  data,
}: {
  userId: string;
  fcmToken: string;
  title: string;
  body?: string;
  data: NotificationData;
  type: NotificationType;
}) => {
  try {
    const message = {
      token: fcmToken,
      data: data,
      notification: { title, body },
    };

    await saveNotification({
      type,
      userId: userId,
      title,
    });

    const response = await firebaseService.getFirebaseMessaging().send(message);
    console.log(`Successfully sent ${type} notification:`, response);
  } catch (error) {
    console.log(`Error sending ${type} notification:`, error);
    throw new InternalServerErrorException("Error Sending Notification");
  }
};
