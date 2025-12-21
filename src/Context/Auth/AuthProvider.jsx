import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../../Firebase/firebase.init';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // SignUp 
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // SignIn

    const logInUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    // Log Out

    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }

    // Update Profile

    const updateUserProfile = (name, photoURL) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photoURL,
        });
    };

    const { data: userData, refetch: profileRefetch, isLoading: profileLoading } = useQuery({
        queryKey: ['user-profile', user?.email],
        enabled: !!user?.email && !loading,
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/user-profile/${user?.email}`, {
                headers: { authorization: `Bearer ${localStorage.getItem('access-token')}` }
            });
            return res.data;
        }
    });

    // State ovserver

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);

            if (currentUser?.email) {
                try {
                    const { data } = await axios.post('http://localhost:5000/jwt', { email: currentUser.email });
                    if (data.token) {
                        localStorage.setItem('access-token', data.token);
                    }
                } catch (err) {
                    console.error("JWT Error:", err);
                }
            } else {
                localStorage.removeItem('access-token');
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);


    const authInfo = {
        user: userData? { ...user, ...userData } : user,
        loading: loading || profileLoading,
        createUser,
        logInUser,
        logOut,
        updateUserProfile,
        profileRefetch,
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;