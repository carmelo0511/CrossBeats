import React, { useState } from 'react';

export default function SpotifySearch({ onSelect }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Simulation d'appel API Spotify
  const mockResults = [
    { id: '1', title: 'Blinding Lights', artist: 'The Weeknd', cover: 'https://i.scdn.co/image/ab67616d0000b273e2e7e5e8e8e8e8e8e8e8e8e8', platform: 'Spotify' },
    { id: '2', title: 'Levitating', artist: 'Dua Lipa', cover: 'https://i.scdn.co/image/ab67616d0000b273e2e7e5e8e8e8e8e8e8e8e8e8', platform: 'Spotify' },
  ];

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simuler délai API
    setTimeout(() => {
      setResults(query ? mockResults : []);
      setLoading(false);
    }, 700);
  };

  return (
    <div className="my-6">
      <form onSubmit={handleSearch} className="flex gap-2">
        <input
          className="flex-1 px-3 py-2 border rounded"
          placeholder="Rechercher sur Spotify..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Rechercher</button>
      </form>
      {loading && <div className="mt-2 text-gray-500">Recherche...</div>}
      <ul className="mt-4 space-y-2">
        {results.map(track => (
          <li key={track.id} className="flex items-center gap-3 bg-gray-100 p-2 rounded">
            <img src={track.cover} alt="cover" className="w-12 h-12 rounded" />
            <div className="flex-1">
              <div className="font-semibold">{track.title}</div>
              <div className="text-sm text-gray-600">{track.artist}</div>
            </div>
            <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded">Spotify</span>
            <button onClick={() => onSelect?.(track)} className="ml-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">Ajouter</button>
          </li>
        ))}
      </ul>
    </div>
  );
} 