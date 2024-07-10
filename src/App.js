import { useEffect, useState } from 'react';
import { sepoliaChainId, sepoliaChainParams } from './utils/sepoliaChain';
import Web3 from 'web3';
import { FaUser } from 'react-icons/fa';


function App() {
  const [currentAccount, setCurrentAccount] = useState(null);

  useEffect(() => {
    // Retrieve the connected account from local storage
    const savedAccount = localStorage.getItem('connectedAccount');
    if (savedAccount) {
      setCurrentAccount(savedAccount);
    }
  }, []);

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);

        // Request MetaMask to switch to Sepolia
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: sepoliaChainId }],
          });
        } catch (switchError) {
          // If the network is not added to MetaMask, add it
          if (switchError.code === 4902) {
            try {
              await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [sepoliaChainParams],
              });
            } catch (addError) {
              console.error('Failed to add network:', addError);
              return;
            }
          } else {
            console.error('Failed to switch network:', switchError);
            return;
          }
        }

        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3.eth.getAccounts();
        console.log(accounts)
        setCurrentAccount(accounts[0]);

        localStorage.setItem('connectedAccount', accounts[0]);
      } else {
        alert('MetaMask is not installed. Please install it to use this app.');
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  const abbreviateAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };


  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
    <header className="absolute top-0 right-0 m-4">
      {currentAccount ? (
        <button className="flex items-center space-x-2 bg-blue-700 hover:bg-blue-900 py-2 px-4 rounded-full">
          <FaUser className="text-white" />
          <span className="text-white">{abbreviateAddress(currentAccount)}</span>
        </button>
      ) : (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white text-l font-bold py-3 px-4 rounded-xl"
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
