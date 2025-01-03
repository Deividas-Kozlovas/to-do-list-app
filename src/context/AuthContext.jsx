// AuthContext.jsx (updated)
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { auth } from '../firebase';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import authReducer from '../reducers/AuthReducer';

const db = getFirestore();

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    userProfile: null,
    loading: true
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      dispatch({ type: user ? 'Prisijungimas' : 'Atsijungimas', payload: user });
      
      if (user) {
        const userDoc = await getDoc(doc(db, "Vartotojai", user.uid));
        if (userDoc.exists()) {
          dispatch({ type: 'Nustatyti_Profilį', payload: userDoc.data() });
        } else {
          dispatch({ type: 'Nustatyti_Profilį', payload: {} });
        }
      } else {
        dispatch({ type: 'Nustatyti_Profilį', payload: null });
      }
      dispatch({ type: 'Nustatyti_Pakrovimą', payload: false });
    });

    return () => unsubscribe();
  }, []);

  const value = {
    currentUser: state.user,
    userProfile: state.userProfile,
    loading: state.loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!state.loading && children}
    </AuthContext.Provider>
  );
};