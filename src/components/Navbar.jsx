import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import UserMenu from './UserMenu';

const navLinks = [
  { to: '/', label: 'Accueil', icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7m-9 2v8m4-8v8m5 0a2 2 0 002-2V7a2 2 0 00-.59-1.41l-7-7a2 2 0 00-2.82 0l-7 7A2 2 0 003 7v11a2 2 0 002 2h3" /></svg>
  ) },
  { to: '/playlist/new', label: 'Nouvelle playlist', icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
  ) },
  { to: '/my-playlists', label: 'Mes playlists', icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 014-4h4m0 0V7a4 4 0 00-4-4H7a4 4 0 00-4 4v10a4 4 0 004 4h4a4 4 0 004-4z" /></svg>
  ) },
];

export default function Navbar() {
  const location = useLocation();
  return (
    <nav className="w-full bg-white/80 backdrop-blur border-b border-gray-200 shadow-sm fixed top-0 left-0 z-30">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-2">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-blue-700">
          <span role="img" aria-label="logo">🎵</span> CrossBeats
        </Link>
        <div className="flex gap-2 sm:gap-4 items-center">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center gap-1 px-2 py-1 rounded hover:bg-blue-100 transition text-sm font-medium ${location.pathname === link.to ? 'bg-blue-100 text-blue-700' : 'text-gray-700'}`}
            >
              {link.icon}
              <span className="hidden sm:inline">{link.label}</span>
            </Link>
          ))}
        </div>
        <UserMenu />
      </div>
    </nav>
  );
} 