import React from 'react';
import { auth } from '../../firebase/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate } from 'react-router-dom';

export default function Login() {
  const [user, loading] = useAuthState(auth);

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      alert('Erreur lors de la connexion : ' + err.message);
    }
  };

  if (loading) return <div className="text-center mt-10">Chargement...</div>;
  if (user) return <Navigate to="/" />;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-200">
      <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4">Connexion à CrossBeats</h2>
        <button
          onClick={handleGoogleLogin}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          <svg width="24" height="24" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.7 33.1 29.8 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c2.7 0 5.2.9 7.2 2.4l6.4-6.4C34.3 5.1 29.4 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 20-7.5 20-21 0-1.3-.1-2.7-.5-4z"/><path fill="#34A853" d="M6.3 14.7l7 5.1C15.5 16.2 19.4 13 24 13c2.7 0 5.2.9 7.2 2.4l6.4-6.4C34.3 5.1 29.4 3 24 3c-7.2 0-13.4 3.1-17.7 8.1z"/><path fill="#FBBC05" d="M24 45c5.4 0 10.3-1.8 14.1-4.9l-6.5-5.3C29.8 41.1 24.9 43 24 43c-6.6 0-12-5.4-12-12 0-1.3.2-2.6.5-3.8l-7-5.1C3.2 25.1 3 26.5 3 28c0 11.6 9.4 21 21 21z"/><path fill="#EA4335" d="M44.5 20H24v8.5h11.7c-1.2 3.2-4.2 5.5-7.7 5.5-4.2 0-7.7-3.4-7.7-7.7 0-1.3.2-2.6.5-3.8l-7-5.1C3.2 25.1 3 26.5 3 28c0 11.6 9.4 21 21 21 5.4 0 10.3-1.8 14.1-4.9l-6.5-5.3C29.8 41.1 24.9 43 24 43c-6.6 0-12-5.4-12-12 0-1.3.2-2.6.5-3.8l-7-5.1C3.2 25.1 3 26.5 3 28c0 11.6 9.4 21 21 21z"/></g></svg>
          Se connecter avec Google
        </button>
      </div>
    </div>
  );
} 