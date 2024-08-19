export const firebaseConfiguration = {
  // apiKey: "AIzaSyBQIbwdNN6lTVZoyjPN1Mi7q_bfBgnLR4c",
  // authDomain: "report-analysis-f166b.firebaseapp.com",
  // projectId: "report-analysis-f166b",
  // storageBucket: "report-analysis-f166b.appspot.com",
  // messagingSenderId: "914260330657",
  // appId: "1:914260330657:web:bc5833111907369e01c8e0",
  // measurementId: "G-DCCW358SXM",
  // databaseURL : "https://report-analysis-f166b-default-rtdb.firebaseio.com/"

  apiKey: env["API_KEY"] || "",
  authDomain: env["AUTH_DOMAIN"] || "",
  projectId: env["PROJECT_ID"] || "",
  storageBucket: env["STORAGE_BUCKET"] || "",
  messagingSenderId: env["MESSAGE_SENDER_ID"] || "",
  appId: env["APP_ID"] || "",
  measurementId: env["MEASUREMENT_ID"] || ""
};
