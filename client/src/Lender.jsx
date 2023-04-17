import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import PeerToPeerLending from './contracts/PeerToPeerLending.json';
import ContractAddress from './contract-address.json';

import InvestorDashboard from './components/InvestorDashboard';

function LenderPage() {
  const [loans, setLoans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLoans = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contractAddress = ContractAddress.peerToPeerLending;
      const contract = new ethers.Contract(contractAddress, PeerToPeerLending.abi, provider);

      const lenderAddress = await provider.getSigner().getAddress();
      const lenderLoanIds = await contract.getLenderLoans(lenderAddress);

      const loanPromises = lenderLoanIds.map((loanId) => {
        return contract.loans(loanId);
      });
      const lenderLoans = await Promise.all(loanPromises);
      setLoans(lenderLoans);
      setIsLoading(false);
    };

    fetchLoans();
  }, []);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <InvestorDashboard loans={loans} />
      )}
  
    </>
  );
}

export default LenderPage;
