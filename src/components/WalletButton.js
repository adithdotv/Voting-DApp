// src/WalletButton.js
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { FaUser } from 'react-icons/fa';

const sepoliaChainId = '0xaa36a7'; // Chain ID for Sepolia
const sepoliaChainParams = {
  chainId: sepoliaChainId,
  chainName: 'Sepolia Test Network',
  nativeCurrency: {
    name: 'Sepolia Ether',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: ['https://rpc.sepolia.org'],
  blockExplorerUrls: ['https://sepolia.etherscan.io'],
};

const WalletButton = () => {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const savedAccount = localStorage.getItem('connectedAccount');
    if (savedAccount) {
      setCurrentAccount(savedAccount);
    }
  }, []);

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: sepoliaChainId }],
          });
        } catch (switchError) {
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
        setCurrentAccount(accounts[0]);
        localStorage.setItem('connectedAccount', accounts[0]);
      } else {
        alert('MetaMask is not installed. Please install it to use this app.');
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  const disconnectWallet = () => {
    setCurrentAccount(null);
    localStorage.removeItem('connectedAccount');
    setDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const abbreviateAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <header className="absolute top-0 right-4 m-4">
      {currentAccount ? (
        <div className="relative inline-block text-left">
          <button className="flex items-center space-x-2 bg-white hover:bg-gray-100 py-2 px-4 rounded-lg" onClick={toggleDropdown}>
            <FaUser className="text-black" />
            <span className="text-black">{abbreviateAddress(currentAccount)}</span>
          </button>
          {dropdownOpen && (
            <div className="origin-top-right absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <button
                  className="block px-2 py-1 text-sm text-gray-700 hover:bg-gray-100 w-full text-center"
                  onClick={disconnectWallet}
                >
                  Disconnect Wallet
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={connectWallet}
        >
          Connect Wallet
        </button>
      )}
    </header>
  );
};

export default WalletButton;
