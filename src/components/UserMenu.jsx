import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/firebase';

export default function UserMenu() {
  const [user] = useAuthState(auth);

  const handleLogout = async () => {
    await auth.signOut();
  };

  if (!user) return null;

  return (
    <div className="flex items-center gap-3 p-2">
      {user.photoURL && <img src={user.photoURL} alt="avatar" className="w-8 h-8 rounded-full" />}
      <span className="font-medium text-gray-700">{user.displayName}</span>
      <button onClick={handleLogout} className="ml-2 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm">Déconnexion</button>
    </div>
  );
} 