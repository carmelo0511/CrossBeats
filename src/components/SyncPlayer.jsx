import React, { useEffect, useState } from 'react';
import { rtdb } from '../../firebase/firebase';
import { ref, onValue, set, get } from 'firebase/database';

export default function SyncPlayer({ playlistId, tracks }) {
  const [state, setState] = useState({
    current: 0,
    playing: false,
    updatedBy: null,
  });
  const [loading, setLoading] = useState(true);

  // Sync state from RTDB
  useEffect(() => {
    if (!playlistId) return;
    const syncRef = ref(rtdb, `sync/${playlistId}`);
    const unsub = onValue(syncRef, snap => {
      if (snap.exists()) {
        setState(snap.val());
      }
      setLoading(false);
    });
    return () => unsub();
  }, [playlistId]);

  // Update RTDB
  const updateSync = async (newState) => {
    if (!playlistId) return;
    const syncRef = ref(rtdb, `sync/${playlistId}`);
    await set(syncRef, { ...state, ...newState, updatedAt: Date.now() });
  };

  if (loading) return <div>Chargement du lecteur...</div>;
  if (!tracks || tracks.length === 0) return <div>Aucun morceau à lire.</div>;

  const currentTrack = tracks[state.current] || tracks[0];

  return (
    <div className="bg-gray-100 p-4 rounded mb-6">
      <div className="flex items-center gap-4">
        <img src={currentTrack.cover} alt="cover" className="w-16 h-16 rounded" />
        <div className="flex-1">
          <div className="font-semibold text-lg">{currentTrack.title}</div>
          <div className="text-gray-600 text-sm">{currentTrack.artist}</div>
          <div className="text-xs text-gray-400">{currentTrack.platform}</div>
        </div>
        <button
          className={`px-4 py-2 rounded ${state.playing ? 'bg-red-500' : 'bg-green-500'} text-white`}
          onClick={() => updateSync({ playing: !state.playing })}
        >
          {state.playing ? 'Pause' : 'Play'}
        </button>
      </div>
      <div className="flex gap-2 mt-4 justify-center">
        <button
          className="px-3 py-1 bg-gray-300 rounded"
          onClick={() => updateSync({ current: Math.max(0, state.current - 1), playing: false })}
          disabled={state.current === 0}
        >
          ◀ Précédent
        </button>
        <button
          className="px-3 py-1 bg-gray-300 rounded"
          onClick={() => updateSync({ current: Math.min(tracks.length - 1, state.current + 1), playing: false })}
          disabled={state.current >= tracks.length - 1}
        >
          Suivant ▶
        </button>
      </div>
      <div className="text-xs text-gray-500 mt-2 text-center">Synchronisé en temps réel</div>
    </div>
  );
} 