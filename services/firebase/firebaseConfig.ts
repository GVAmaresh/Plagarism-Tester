import { constants } from "buffer";
import { initializeApp, FirebaseApp } from "firebase/app";
import {
  getAuth,
  Auth,
  User as FirebaseAuthUser,
  AuthProvider,
  GoogleAuthProvider
} from "firebase/auth";
import { Database, getDatabase } from "firebase/database";
import { getFirestore, Firestore } from "firebase/firestore";
import { firebaseConfiguration } from "./config";
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

console.log(firebaseConfiguration);
const firebaseApp: FirebaseApp = initializeApp(firebaseConfiguration);
export const provider: AuthProvider = new GoogleAuthProvider();
export const auth: Auth = getAuth(firebaseApp);
export type User = FirebaseAuthUser;
// export const db:Database = getDatabase(firebaseApp);
export const db: Firestore = getFirestore(firebaseApp);
