import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged,
  updateProfile,
  signOut,
  User
} from "firebase/auth";
import { initializeApp, FirebaseApp } from "firebase/app";
import { firebaseConfig } from "./firebaseConfig";
import { getAuth, Auth, User as FirebaseAuthUser } from "firebase/auth";

const firebaseApp: FirebaseApp = initializeApp(firebaseConfig);

export const auth: Auth = getAuth(firebaseApp);
export async function signInOrSignUp({
  name,
  email,
  password
}: {
  name: string;
  email: string;
  password: string;
}): Promise<{ user: User | null; emailVerified: boolean }> {
  try {
    console.log("Attempting to sign in with:", email, password);
    console.log("Auth object:", auth);
    let userCredential;
    try{
      userCredential = await signInWithEmailAndPassword(auth, email, password);
    }
    catch(err) {
      userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (name && userCredential.user) {
        await updateProfile(userCredential.user, { displayName: name });
      }
    }
    const user = userCredential.user
    if (userCredential.user && !userCredential.user.emailVerified) {
      await sendEmailVerification(userCredential.user);
      alert("Email verification sent to:"+ userCredential.user.email);
      return { user: null, emailVerified: false };
    }

    console.log("Signed in successfully:", user);
    if (user) {
      return { user, emailVerified: true };
    } else {
      console.error("Error found");
      return { user: null, emailVerified: false };
    }
  } catch (signInError: any) {
    console.error("Sign in error:", signInError.code, signInError.message);
    if (signInError.code === "auth/user-not-found") {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        console.log("User created successfully:", user);

        await sendEmailVerification(user);
        console.log("Email verification sent to:", user.email);
        return { user: null, emailVerified: false };
      } catch (signUpError: any) {
        console.error(
          "Error creating user:",
          signUpError.code,
          signUpError.message
        );
        throw signUpError;
      }
    } else {
      throw signInError;
    }
  }
}


export function monitorAuthState(): Promise<{
  user: User | null;
  emailVerified: boolean;
}> {
  return new Promise((resolve, reject) => {
    try {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          resolve({ user, emailVerified: user.emailVerified });
        } else {
          console.log("User is signed out");
          resolve({ user: null, emailVerified: false });
        }
      });
    } catch (error) {
      console.error("Error monitoring auth state:", error);
      reject(error);
    }
  });
}

export async function SignOut(): Promise<{ user: null; emailVerified: false }> {
  try {
    await signOut(auth);
    console.log("Sign-out successful.");
    return { user: null, emailVerified: false };
  } catch (error: any) {
    console.error("Error signing out:", error.message);
    return { user: null, emailVerified: false };
  }
}
