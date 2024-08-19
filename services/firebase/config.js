export const firebaseConfiguration = {
  apiKey: env["API_KEY"] || "",
  authDomain: env["AUTH_DOMAIN"] || "",
  projectId: env["PROJECT_ID"] || "",
  storageBucket: env["STORAGE_BUCKET"] || "",
  messagingSenderId: env["MESSAGE_SENDER_ID"] || "",
  appId: env["APP_ID"] || "",
  measurementId: env["MEASUREMENT_ID"] || ""
};
