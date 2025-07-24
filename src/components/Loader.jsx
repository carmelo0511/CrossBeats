import React from 'react';

export default function Loader({ text = 'Chargement...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-blue-500 mb-3"></div>
      <div className="text-blue-600 font-medium">{text}</div>
    </div>
  );
} 