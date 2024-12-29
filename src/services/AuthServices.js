import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'firebase/auth';

const auth = getAuth();
const db = getFirestore();

const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    return { success: true, user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

const register = async (email, password, name) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    if (!name) {
      name = ''; 
    }
    await setDoc(doc(db, "Vartotojai", user.uid), {
      uid: user.uid,
      name: name
    });
    return { success: true, user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

const logout = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true, };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export { login, register, logout, resetPassword };