import React, { useState } from 'react';
import SpotifySearch from '../components/SpotifySearch';
import YouTubeSearch from '../components/YouTubeSearch';
import SoundCloudSearch from '../components/SoundCloudSearch';
import Loader from '../components/Loader';
import { db } from '../../firebase/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/firebase';

export default function PlaylistCreate({ onCreate }) {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [tracks, setTracks] = useState([]);
  const [user] = useAuthState(auth);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !user) return;
    setSaving(true);
    setError('');
    setSuccess(false);
    try {
      await addDoc(collection(db, 'playlists'), {
        name,
        desc,
        tracks,
        createdAt: serverTimestamp(),
        owner: {
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
        },
      });
      setSuccess(true);
      setName('');
      setDesc('');
      setTracks([]);
    } catch (err) {
      setError('Erreur lors de la sauvegarde : ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleAddTrack = (track) => {
    if (!tracks.find(t => t.id === track.id)) {
      setTracks([...tracks, track]);
    }
  };

  return (
    <div className="responsive-container mt-6">
      {saving && <Loader text="Création de la playlist..." />}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow transition-all duration-300">
        <h2 className="text-xl font-bold mb-4">Créer une nouvelle playlist</h2>
        <input
          className="w-full mb-3 px-3 py-2 border rounded"
          placeholder="Nom de la playlist"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <textarea
          className="w-full mb-3 px-3 py-2 border rounded"
          placeholder="Description (optionnel)"
          value={desc}
          onChange={e => setDesc(e.target.value)}
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition" disabled={saving}>{saving ? 'Création...' : 'Créer'}</button>
        {success && <div className="mt-2 text-green-600 animate-pulse">Playlist créée ! 🎉</div>}
        {error && <div className="mt-2 text-red-600">{error}</div>}
      </form>
      <div className="mt-8">
        <SpotifySearch onSelect={handleAddTrack} />
        <YouTubeSearch onSelect={handleAddTrack} />
        <SoundCloudSearch onSelect={handleAddTrack} />
        {tracks.length > 0 && (
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Morceaux ajoutés :</h3>
            <ul className="space-y-2">
              {tracks.map(track => (
                <li key={track.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-gray-100 p-2 rounded">
                  <img src={track.cover} alt="cover" className="w-10 h-10 rounded" />
                  <div className="flex-1">
                    <div className="font-semibold">{track.title}</div>
                    <div className="text-sm text-gray-600">{track.artist}</div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${track.platform === 'Spotify' ? 'bg-green-200 text-green-800' : track.platform === 'YouTube' ? 'bg-red-200 text-red-800' : 'bg-orange-200 text-orange-800'}`}>{track.platform}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
} 