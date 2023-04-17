import React, { useState } from 'react';
import { ethers } from 'ethers';


function ConnectButton() {
  const [provider, setProvider] = useState(null);
  const [error, setError] = useState(null);

  const handleConnect = async () => {
    try {
      // Check if MetaMask is installed
      if (typeof window.ethereum !== 'undefined') {
        // Request user permission to connect to MetaMask
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        // Connect to the Ethereum network
        const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(web3Provider);
      } else {
        setError('Please install MetaMask to connect.');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      {provider ? (
        <p>Connected to MetaMask</p>
      ) : (
        <button onClick={handleConnect}>Connect to MetaMask</button>
      )}
      {error && <p>{error}</p>}
    </div>
  );
}

export default ConnectButton;
