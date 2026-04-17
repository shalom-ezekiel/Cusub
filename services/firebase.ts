import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  type User as FirebaseUser,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDIcB6dmgyAwTag1G6SJ6SER3saalGJBMY",
  authDomain: "cusub-62f02.firebaseapp.com",
  projectId: "cusub-62f02",
  storageBucket: "cusub-62f02.firebasestorage.app",
  messagingSenderId: "83971934523",
  appId: "1:83971934523:web:905e79fa21590ce507cf1e",
  measurementId: "G-DF068S2JJP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// --- Auth Helper Functions (crash-proof) ---

export async function firebaseSignInWithGoogle(): Promise<FirebaseUser> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error: any) {
    // Don't crash — translate Firebase errors to user-friendly messages
    const code = error?.code || "";
    if (code === "auth/popup-closed-by-user") {
      throw new Error("Sign-in popup was closed. Please try again.");
    }
    if (code === "auth/popup-blocked") {
      throw new Error("Popup was blocked by your browser. Please allow popups and try again.");
    }
    if (code === "auth/cancelled-popup-request") {
      throw new Error("Sign-in was cancelled. Please try again.");
    }
    if (code === "auth/network-request-failed") {
      throw new Error("Network error. Please check your internet connection.");
    }
    if (code === "auth/unauthorized-domain") {
      throw new Error("This domain is not authorized for sign-in. Please contact support.");
    }
    if (code === "auth/internal-error") {
      throw new Error("An internal error occurred. Please try again later.");
    }
    throw new Error("Google sign-in failed. Please try again.");
  }
}

export async function firebaseSignInWithEmail(
  email: string,
  password: string
): Promise<FirebaseUser> {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error: any) {
    const code = error?.code || "";
    if (code === "auth/user-not-found" || code === "auth/invalid-credential") {
      throw new Error("Invalid email or password. Please try again.");
    }
    if (code === "auth/wrong-password") {
      throw new Error("Incorrect password. Please try again.");
    }
    if (code === "auth/invalid-email") {
      throw new Error("Invalid email address format.");
    }
    if (code === "auth/user-disabled") {
      throw new Error("This account has been disabled. Please contact support.");
    }
    if (code === "auth/too-many-requests") {
      throw new Error("Too many failed attempts. Please try again later.");
    }
    if (code === "auth/network-request-failed") {
      throw new Error("Network error. Please check your internet connection.");
    }
    throw new Error("Sign-in failed. Please try again.");
  }
}

export async function firebaseSignUpWithEmail(
  email: string,
  password: string,
  displayName: string
): Promise<FirebaseUser> {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    // Set the display name on the Firebase user profile
    if (displayName) {
      await updateProfile(result.user, { displayName });
    }
    return result.user;
  } catch (error: any) {
    const code = error?.code || "";
    if (code === "auth/email-already-in-use") {
      throw new Error("An account with this email already exists. Try signing in.");
    }
    if (code === "auth/invalid-email") {
      throw new Error("Invalid email address format.");
    }
    if (code === "auth/weak-password") {
      throw new Error("Password is too weak. Use at least 6 characters.");
    }
    if (code === "auth/operation-not-allowed") {
      throw new Error("Email/password sign-up is not enabled. Please contact support.");
    }
    if (code === "auth/network-request-failed") {
      throw new Error("Network error. Please check your internet connection.");
    }
    throw new Error("Account creation failed. Please try again.");
  }
}

export async function firebaseSignOut(): Promise<void> {
  try {
    await signOut(auth);
  } catch (error) {
    // Silently handle sign-out errors — never crash on logout
    console.error("Sign-out error:", error);
  }
}

export { auth, onAuthStateChanged, type FirebaseUser };
