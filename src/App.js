// src/App.js
import React from 'react';
import WalletButton from './components/WalletButton';
import './App.css';

function App() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <WalletButton />
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Welcome to the dApp</h1>
      </div>
    </div>
  );
}

export default App;
