import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import auth from "../../firebase_config";

// Registrar novo usuário
export const registerUser = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error: any) {
    console.error(error.message);
    throw error;
  }
};

// Fazer login
export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error: any) {
    console.error(error.message);
    throw error;
  }
};

// Fazer logout
export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error: any) {
    console.error(error.message);
    throw error;
  }
};
