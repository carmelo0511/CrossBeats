import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../../firebase/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/firebase';

export default function Home() {
  const [playlists, loading, error] = useCollection(
    query(collection(db, 'playlists'), orderBy('createdAt', 'desc'))
  );
  const [user] = useAuthState(auth);

  return (
    <div className="responsive-container mt-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-2 sm:gap-0">
        <Link to="/playlist/new" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 whitespace-nowrap">+ Nouvelle playlist</Link>
      </div>
      {user && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-2">Mes playlists</h3>
          <ul className="space-y-2">
            {playlists && playlists.docs.filter(doc => doc.data().owner?.uid === user.uid).length === 0 && (
              <li className="text-gray-500">Aucune playlist créée par vous.</li>
            )}
            {playlists && playlists.docs.filter(doc => doc.data().owner?.uid === user.uid).map(doc => {
              const pl = doc.data();
              return (
                <li key={doc.id} className="bg-blue-50 p-3 rounded flex items-center gap-3">
                  <div className="flex-1">
                    <div className="font-semibold">{pl.name}</div>
                    <div className="text-xs text-gray-500">{pl.desc}</div>
                  </div>
                  <Link to={`/playlist/${doc.id}`} className="text-blue-700 font-medium hover:underline">Voir</Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      <h3 className="text-lg font-semibold mb-2">Playlists récentes</h3>
      {loading && <Loader text="Chargement des playlists..." />}
      {error && <div className="text-red-600">Erreur : {error.message}</div>}
      {!loading && playlists && playlists.docs.length === 0 && (
        <div className="text-gray-500 text-center my-8">Aucune playlist pour le moment. Créez-en une !</div>
      )}
      <ul className="space-y-4 transition-all duration-300">
        {playlists && playlists.docs.map(doc => {
          const pl = doc.data();
          return (
            <li key={doc.id} className="bg-white p-4 rounded shadow flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-1">
                <div className="font-semibold text-lg">{pl.name}</div>
                <div className="text-gray-600 text-sm line-clamp-2">{pl.desc}</div>
                <div className="text-xs text-gray-400 mt-1">par {pl.owner?.displayName || 'Anonyme'}</div>
              </div>
              <Link to={`/playlist/${doc.id}`} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full sm:w-auto text-center">Voir</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
} 