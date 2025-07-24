import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDocument } from 'react-firebase-hooks/firestore';
import { db, auth } from '../../firebase/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import SpotifySearch from '../components/SpotifySearch';
import YouTubeSearch from '../components/YouTubeSearch';
import SoundCloudSearch from '../components/SoundCloudSearch';
import Loader from '../components/Loader';

export default function PlaylistEdit() {
  const { id } = useParams();
  const [playlistDoc, loading, error] = useDocument(doc(db, 'playlists', id));
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const playlist = playlistDoc?.data();
  const isOwner = user && playlist && user.uid === playlist.owner?.uid;

  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [tracks, setTracks] = useState([]);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    if (playlist) {
      setName(playlist.name || '');
      setDesc(playlist.desc || '');
      setTracks(playlist.tracks || []);
    }
  }, [playlist]);

  const handleAddTrack = (track) => {
    if (!tracks.find(t => t.id === track.id)) {
      setTracks([...tracks, track]);
    }
  };

  const handleRemoveTrack = (trackId) => {
    setTracks(tracks.filter(t => t.id !== trackId));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !isOwner) return;
    setSaving(true);
    setErrMsg('');
    setSuccess(false);
    try {
      await updateDoc(doc(db, 'playlists', id), {
        name,
        desc,
        tracks,
      });
      setSuccess(true);
      setTimeout(() => navigate(`/playlist/${id}`), 1000);
    } catch (err) {
      setErrMsg('Erreur lors de la sauvegarde : ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="responsive-container mt-6"><Loader text="Chargement de la playlist..." /></div>;
  if (error) return <div className="responsive-container mt-6 text-red-600">Erreur : {error.message}</div>;
  if (!isOwner) return <div className="responsive-container mt-6 text-red-600 text-center">⛔ Accès refusé : vous n'êtes pas l'auteur de cette playlist.</div>;

  return (
    <div className="responsive-container mt-6">
      {saving && <Loader text="Sauvegarde..." />}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow transition-all duration-300">
        <h2 className="text-xl font-bold mb-4">Éditer la playlist</h2>
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
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition" disabled={saving}>{saving ? 'Sauvegarde...' : 'Sauvegarder'}</button>
        {success && <div className="mt-2 text-green-600 animate-pulse">Modifications enregistrées ! 🎉</div>}
        {errMsg && <div className="mt-2 text-red-600">{errMsg}</div>}
      </form>
      <div className="mt-8">
        <SpotifySearch onSelect={handleAddTrack} />
        <YouTubeSearch onSelect={handleAddTrack} />
        <SoundCloudSearch onSelect={handleAddTrack} />
        {tracks.length > 0 && (
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Morceaux de la playlist :</h3>
            <ul className="space-y-2">
              {tracks.map(track => (
                <li key={track.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-gray-100 p-2 rounded">
                  <img src={track.cover} alt="cover" className="w-10 h-10 rounded" />
                  <div className="flex-1">
                    <div className="font-semibold">{track.title}</div>
                    <div className="text-sm text-gray-600">{track.artist}</div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${track.platform === 'Spotify' ? 'bg-green-200 text-green-800' : track.platform === 'YouTube' ? 'bg-red-200 text-red-800' : 'bg-orange-200 text-orange-800'}`}>{track.platform}</span>
                  <button onClick={() => handleRemoveTrack(track.id)} className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs">Retirer</button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
} 