import React, { useState, useEffect } from "react";
import PeerToPeerLending from "../contracts/PeerToPeerLending.json";
import ContractAddress from "../contract-address.json";
import { ethers } from "ethers";
import LoanForm from "./LoanForm";
import LoanList from "./LoanList";

const BorrowerDashboard = ({ account, loans }) => {
  const [borrowerLoans, setBorrowerLoans] = useState([]);
  const [contract, setContract] = useState(null);

  async function initializeProvider() {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const lendingContract = new ethers.Contract(
            ContractAddress.PeerToPeerLending,
            PeerToPeerLending.abi,
            provider
        ).connect(signer);
      return { provider, lendingContract };
    } catch (error) {
      console.error(error);
    }
  }
  const { lendingContract } = initializeProvider();
   
  console.log("Contract: ", lendingContract);
  // Load the borrower's loans from the contract when the component mounts
  useEffect(() => {
    async function loadLoans() {
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
    
    await contract
        .requestLoan(amount, interestRate, duration, collateralProvided, {
        from: account,
        })
        .then(function (result) {
        console.log(result);
        console.log(result.logs[0].args);
        var event = result.logs[0].args;
        var borrower = event.borrower;
        var amount = event.amount.toNumber();
        var interestRate = event.interestRate.toNumber();
        var duration = event.duration.toNumber();
        var collateralProvided = event.collateralProvided;
        console.log(
            borrower,
            amount,
            interestRate,
            duration,
            collateralProvided
        );
        var loan = {
            borrower: borrower,
            amount: amount,
            interestRate: interestRate,
            duration: duration,
            collateralProvided: collateralProvided,
        };
        loans.push(loan);
        console.log(loans);
        setBorrowerLoans(loans);
        })
        .catch(function (err) {
        console.log(err.message);
        }
    );
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
