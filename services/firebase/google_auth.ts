import {
    getAuth,
    onAuthStateChanged,
    signInWithPopup,
    deleteUser,
    signOut
  } from "firebase/auth";
  import { auth, provider } from "./firebaseConfig";
  
  export const getSignupGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
  
      console.log("Sign-in successful");
    } catch (error) {
      console.error("Sign-in failed:", error);
      throw error;
    }
  };
  
  // export const getVerifiedGoogle = () => {
  //   return new Promise((resolve) => {
  //     const auth = getAuth();
  //     onAuthStateChanged(auth, (user) => {
  //       if (user && user.metadata.creationTime !== user.metadata.lastSignInTime) {
  //         resolve(true);
  //       } else {
  //         resolve(false);
  //       }
  //     });
  //   });
  // };
  
  // export async function SignOutGoogle(): Promise<{ user: null; emailVerified: false }> {
  //   try {
  //     await signOut(auth);
  //     console.log("Sign-out successful.");
  //     return { user: null, emailVerified: false };
  //   } catch (error: any) {
  //     console.error("Error signing out:", error.message);
  //     return { user: null, emailVerified: false };
  //   }
  // }