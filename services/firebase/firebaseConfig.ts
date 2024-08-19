import { constants } from "buffer";
import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth, User as FirebaseAuthUser, AuthProvider, GoogleAuthProvider } from "firebase/auth";
import { Database, getDatabase } from "firebase/database";
import { getFirestore, Firestore } from "firebase/firestore";
// import { config } from "dote.

// export const firebaseConfig: {
  //   apiKey: string;
  //   authDomain: string;
  //   projectId: string;
  //   storageBucket: string;
  //   messagingSenderId: string;
  //   appId: string;
  //   measurementId: string;
  // } = {
    //   apiKey: env['API_KEY'] || '',
    //   authDomain: env['AUTH_DOMAIN'] || '',
    //   projectId: env['PROJECT_ID'] || '',
    //   storageBucket: env['STORAGE_BUCKET'] || '',
    //   messagingSenderId: env['MESSAGE_SENDER_ID'] || '',
    //   appId: env['APP_ID'] || '',
    //   measurementId: env['MEASUREMENT_ID'] || ''
    // };
    
export const firebaseConfig = {
  apiKey: "AIzaSyBQIbwdNN6lTVZoyjPN1Mi7q_bfBgnLR4c",
  authDomain: "report-analysis-f166b.firebaseapp.com",
  projectId: "report-analysis-f166b",
  storageBucket: "report-analysis-f166b.appspot.com",
  messagingSenderId: "914260330657",
  appId: "1:914260330657:web:bc5833111907369e01c8e0",
  measurementId: "G-DCCW358SXM",
  databaseURL : "https://report-analysis-f166b-default-rtdb.firebaseio.com/"
};

const firebaseApp: FirebaseApp = initializeApp(firebaseConfig);

export const provider:AuthProvider = new GoogleAuthProvider();
export const auth: Auth = getAuth(firebaseApp);
export type User = FirebaseAuthUser;
// export const db:Database = getDatabase(firebaseApp);
export const db: Firestore = getFirestore(firebaseApp);
