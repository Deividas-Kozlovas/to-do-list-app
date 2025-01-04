// AuthContext.jsx
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDocument } from 'react-firebase-hooks/firestore';
import { doc } from 'firebase/firestore';
import authReducer from '../reducers/authReducer';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    userProfile: null,
    loading: true,
    error: null,
  });

  const [firebaseUser, firebaseLoading, firebaseError] = useAuthState(auth);
  const userDoc = firebaseUser ? doc(db, "Vartotojai", firebaseUser.uid) : null;
  const [firestoreProfile, profileLoading, profileError] = useDocument(userDoc);

  useEffect(() => {
    if (firebaseLoading || profileLoading) {
      dispatch({ type: 'Nustatyti_Pakrovimą', payload: true });
    } else {
      dispatch({ type: 'Nustatyti_Pakrovimą', payload: false });
      
      if (firebaseUser) {
        dispatch({ type: 'Prisijungimas', payload: firebaseUser });
        if (firestoreProfile && firestoreProfile.exists()) {
          dispatch({ type: 'Nustatyti_Profilį', payload: firestoreProfile.data() });
        } else {
          dispatch({ type: 'Nustatyti_Profilį', payload: {} });
        }
      } else {
        dispatch({ type: 'Atsijungimas' });
        dispatch({ type: 'Nustatyti_Profilį', payload: null });
      }
      
      if (firebaseError || profileError) {
        dispatch({ type: 'Nustatyti_Klaidą', payload: (firebaseError || profileError).message });
      } else {
        dispatch({ type: 'Nustatyti_Klaidą', payload: null });
      }
    }
  }, [firebaseUser, firebaseLoading, firebaseError, firestoreProfile, profileLoading, profileError]);

  useEffect(() => {
    if (firebaseUser && !firebaseLoading && !profileLoading) {
    }
  }, [firebaseUser, firebaseLoading, profileLoading]);

  const value = {
    currentUser: state.user,
    userProfile: state.userProfile,
    loading: state.loading,
    error: state.error,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};