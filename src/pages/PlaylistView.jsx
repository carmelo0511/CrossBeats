import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDocument } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../firebase/firebase';
import { doc as docFS, deleteDoc } from 'firebase/firestore';
import SyncPlayer from '../components/SyncPlayer';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';

export default function PlaylistView() {
  const { id } = useParams();
  const [playlistDoc, loading, error] = useDocument(docFS(db, 'playlists', id));
  const playlist = playlistDoc?.data();
  const shareUrl = `${window.location.origin}/playlist/${id}`;
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm('Supprimer cette playlist ?')) return;
    setDeleting(true);
    await deleteDoc(docFS(db, 'playlists', id));
    navigate('/');
  };

  return (
    <div className="responsive-container mt-6">
      {loading && <Loader text="Chargement de la playlist..." />}
      {error && <div className="text-red-600">Erreur : {error.message}</div>}
      {deleting && <Loader text="Suppression..." />}
      {!loading && !deleting && playlist && (
        <div className="bg-white p-6 rounded shadow transition-all duration-300">
          <SyncPlayer playlistId={id} tracks={playlist.tracks} />
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
            <h2 className="text-2xl font-bold">{playlist.name}</h2>
            {user && user.uid === playlist.owner?.uid && (
              <div className="flex gap-2">
                <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Supprimer</button>
                <button onClick={() => navigate(`/playlist/${id}/edit`)} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">Éditer</button>
              </div>
            )}
          </div>
          <div className="text-gray-600 mb-2">{playlist.desc}</div>
          <div className="text-xs text-gray-400 mb-4">par {playlist.owner?.displayName || 'Anonyme'}</div>
          <div className="mb-4">
            <span className="font-semibold">Lien partageable :</span>
            <input
              className="ml-2 px-2 py-1 border rounded w-full sm:w-64 mt-2 sm:mt-0"
              value={shareUrl}
              readOnly
              onFocus={e => e.target.select()}
            />
          </div>
          <h3 className="font-semibold mb-2">Morceaux</h3>
          <ul className="space-y-2">
            {playlist.tracks && playlist.tracks.length > 0 ? (
              playlist.tracks.map((track, i) => (
                <li key={track.id + i} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-gray-100 p-2 rounded">
                  <img src={track.cover} alt="cover" className="w-10 h-10 rounded" />
                  <div className="flex-1">
                    <div className="font-semibold">{track.title}</div>
                    <div className="text-sm text-gray-600">{track.artist}</div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${track.platform === 'Spotify' ? 'bg-green-200 text-green-800' : track.platform === 'YouTube' ? 'bg-red-200 text-red-800' : 'bg-orange-200 text-orange-800'}`}>{track.platform}</span>
                </li>
              ))
            ) : (
              <li className="text-gray-500">Aucun morceau dans cette playlist.</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
} 