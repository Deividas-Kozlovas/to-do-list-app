import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const db = getFirestore();

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(async (user) => {
        setCurrentUser(user);
        if (user) {
          const userDoc = await getDoc(doc(db, "Vartotojai", user.uid));
          if (userDoc.exists()) {
            setUserProfile(userDoc.data());
          } else {
            setUserProfile({}); 
          }
        } else {
          setUserProfile(null);
        }
        setLoading(false);
      });
  
      return () => unsubscribe();
    }, []);
  
    const value = {
      currentUser,
      userProfile,
      loading,
    };
  
    return (
      <AuthContext.Provider value={value}>
        {!loading && children}
      </AuthContext.Provider>
    );
  };