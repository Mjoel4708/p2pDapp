import React, { useState } from 'react';
import { ethers } from 'ethers';
import PeerToPeerLending from './contracts/PeerToPeerLending.json';
import ContractAddress from './contract-address.json';

function Signup() {
  const [username, setUsername] = useState('');
  const [isLender, setIsLender] = useState(false);
  const [isBorrower, setIsBorrower] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contractAddress = ContractAddress.peerToPeerLending;
    const contract = new ethers.Contract(contractAddress, PeerToPeerLending.abi, signer);

    try {
      if (isLender) {
        await contract.addApprovedLender(signer.getAddress());
      }

      if (isBorrower) {
        await contract.connect(signer).requestLoan(0, 0, 0, false);
      }

      setUsername('');
      setIsLender(false);
      setIsBorrower(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
      </label>
      <br />
      <label>
        I am a lender:
        <input type="checkbox" checked={isLender} onChange={(event) => setIsLender(event.target.checked)} />
      </label>
      <br />
      <label>
        I am a borrower:
        <input type="checkbox" checked={isBorrower} onChange={(event) => setIsBorrower(event.target.checked)} />
      </label>
      <br />
      <button type="submit">Sign up</button>
    </form>
  );
}

export default Signup;
