import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/firebase';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const [user, loading] = useAuthState(auth);
  if (loading) return <div className="text-center mt-10">Chargement...</div>;
  if (!user) return <Navigate to="/login" />;
  return children;
} 