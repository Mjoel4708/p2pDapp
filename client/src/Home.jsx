import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import PeerToPeerLending from "./contracts/PeerToPeerLending.json";
import ContractAddress from "./contract-address.json";
import { ethers } from "ethers";
import LoanList from "./components/LoanList";
import ConnectButton from "./components/ConnectButton";

const HomePage = () => {
  const [provider, setProvider] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [lendingContract, setLendingContract] = useState(null);
  const [loanCount, setLoanCount] = useState(0);

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

  async function requestAccount() {
    try {
      const account = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccounts(account);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        try {
          await window.ethereum.enable();
          const { provider, lendingContract } = await initializeProvider();

          setProvider(provider);
          setIsConnected(true);
          const accounts = await provider.listAccounts();
          const loanCount = await lendingContract.loans.length();

          setAccounts(accounts);
          setLendingContract(lendingContract);
          setLoanCount(loanCount);
        } catch (error) {
          console.error(error);
        }
      } else {
        console.error("Web3 not found in the browser.");
      }
    };
    init();
  }, []);

  const loans = useMemo(() => {
    if (!lendingContract) return [];
    return Promise.all(
      Array.from({ length: loanCount }, (_, i) => lendingContract.loans(i))
    );
  }, [loanCount, lendingContract]);

  return (
    <>
      <div className="container">
        <h1>Welcome to Peer to Peer Lending</h1>
        <div className="loan-list-container">
          <h2>Loans Available:</h2>
          <LoanList loans={loans} />
        </div>
        {accounts[0] && (
          <div className="button-container">
            <Link to="/borrower">
              <button>Borrow</button>
            </Link>
            <Link to="/lender">
              <button>Lend</button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;
