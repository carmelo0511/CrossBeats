import React, { useState } from 'react';

export default function YouTubeSearch({ onSelect }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Simulation d'appel API YouTube
  const mockResults = [
    { id: 'yt1', title: 'Shape of You', artist: 'Ed Sheeran', cover: 'https://i.ytimg.com/vi/JGwWNGJdvx8/hqdefault.jpg', platform: 'YouTube' },
    { id: 'yt2', title: 'Dance Monkey', artist: 'Tones and I', cover: 'https://i.ytimg.com/vi/q0hyYWKXF0Q/hqdefault.jpg', platform: 'YouTube' },
  ];

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
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
          placeholder="Rechercher sur YouTube..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Rechercher</button>
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
            <span className="text-xs bg-red-200 text-red-800 px-2 py-1 rounded">YouTube</span>
            <button onClick={() => onSelect?.(track)} className="ml-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">Ajouter</button>
          </li>
        ))}
      </ul>
    </div>
  );
} 