import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db, auth } from '../../firebase/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loader from '../components/Loader';

export default function MyPlaylists() {
  const [user, loadingUser] = useAuthState(auth);
  const [playlists, loading, error] = useCollection(
    query(collection(db, 'playlists'), orderBy('createdAt', 'desc'))
  );

  if (loadingUser || loading) return <Loader text="Chargement de vos playlists..." />;
  if (error) return <div className="text-red-600">Erreur : {error.message}</div>;
  if (!user) return <div className="text-red-600">Vous devez être connecté.</div>;

  const myPlaylists = playlists ? playlists.docs.filter(doc => doc.data().owner?.uid === user.uid) : [];

  return (
    <div className="responsive-container mt-6">
      <h2 className="text-2xl font-bold mb-6">Mes playlists</h2>
      {myPlaylists.length === 0 && <div className="text-gray-500">Aucune playlist créée pour l’instant.</div>}
      <ul className="space-y-4">
        {myPlaylists.map(doc => {
          const pl = doc.data();
          return (
            <li key={doc.id} className="bg-white p-4 rounded shadow flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-1">
                <div className="font-semibold text-lg">{pl.name}</div>
                <div className="text-gray-600 text-sm line-clamp-2">{pl.desc}</div>
                <div className="text-xs text-gray-400 mt-1">{pl.tracks?.length || 0} morceau(x)</div>
              </div>
              <div className="flex gap-2">
                <Link to={`/playlist/${doc.id}`} className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">Voir</Link>
                <Link to={`/playlist/${doc.id}/edit`} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">Éditer</Link>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
} 