import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import PlaylistCreate from './pages/PlaylistCreate';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import PlaylistView from './pages/PlaylistView';
import UserMenu from './components/UserMenu';
import PlaylistEdit from './pages/PlaylistEdit';
import Navbar from './components/Navbar';
import MyPlaylists from './pages/MyPlaylists';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="min-h-screen bg-gray-50 text-gray-900 pt-16">
        <div className="flex justify-end p-4"><UserMenu /></div>
        <h1 className="text-3xl font-bold text-center mt-2">CrossBeats 🎵</h1>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/playlist/new" element={
            <ProtectedRoute>
              <PlaylistCreate />
            </ProtectedRoute>
          } />
          <Route path="/playlist/:id" element={<PlaylistView />} />
          <Route path="/playlist/:id/edit" element={<PlaylistEdit />} />
          <Route path="/my-playlists" element={<MyPlaylists />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 