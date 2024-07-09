import { useState } from 'react';
import './App.css';
import Web3 from 'web3';

function App() {
  const [currentAccount, setCurrentAccount] = useState(null);

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3.eth.getAccounts();
        setCurrentAccount(accounts[0]);
      } else {
        alert('MetaMask is not installed. Please install it to use this app.');
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
    <header className="text-center">
      <h1 className="text-4xl font-bold text-white mb-4">Welcome to the dApp</h1>
      {currentAccount ? (
        <p className="text-white">Connected Account: {currentAccount}</p>
      ) : (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={connectWallet}
        >
          Connect Wallet
        </button>
      )}
    </header>
  </div>
  );
}

export default App;
