import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import LoanForm from "./LoanForm";
import LoanList from "./LoanList";

const BorrowerDashboard = ({ contract, account, loans }) => {
  const [borrowerLoans, setBorrowerLoans] = useState([]);
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  provider.send("eth_requestAccounts", []);
  
  // Load the borrower's loans from the contract when the component mounts
  useEffect(() => {
    async function loadLoans() {
      await window.ethereum.enable();
      setBorrowerLoans(loans);
    }
    loadLoans();
  }, [loans]);
  
  const requestLoan = async (
    amount,
    interestRate,
    duration,
    collateralProvided
  ) => {
    try {
      const tx = await contract.populateTransaction.requestLoan(amount, interestRate, duration, collateralProvided);
      const signer = await provider.getSigner();
      const signedTx = await signer.sendTransaction(tx);
      console.log(signedTx);
      // handle the transaction receipt and events as needed
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Borrower Dashboard</h2>
      <LoanForm onSubmit={requestLoan} />
      <h3>My Loans</h3>
      <LoanList loans={borrowerLoans} />
    </div>
  );
};

export default BorrowerDashboard;
