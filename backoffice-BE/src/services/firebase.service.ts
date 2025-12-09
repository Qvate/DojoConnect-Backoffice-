import * as firebaseAdmin from "firebase-admin";
import * as firebaseMessaging from "firebase-admin/messaging";
import AppConfig from "../config/AppConfig";

/// set up firebase
let firebaseApp: firebaseAdmin.app.App | null = null;

let firebaseMessagingInstance: firebaseMessaging.Messaging | null = null;

export const getFirebaseMessaging = () => {
  if (firebaseMessagingInstance) {
    return firebaseMessagingInstance;
  }

  if (!firebaseApp) {
    firebaseApp = firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert(
        AppConfig.FIREBASE_CRED_FILE_PATH
      ),
    });
  }

  firebaseMessagingInstance = firebaseMessaging.getMessaging(firebaseApp);

  return firebaseMessagingInstance;
};
