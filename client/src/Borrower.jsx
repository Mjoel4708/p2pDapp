import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import PeerToPeerLending from "./contracts/PeerToPeerLending.json";
import ContractAddress from "./contract-address.json";
import { ethers } from "ethers";
import LoanForm from "./components/LoanForm";
import BorrowerDashboard from "./components/BorrowerDashboard";

function BorrowerPage() {
  const [loans, setLoans] = useState([]);
  const [contract, setContract] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [error, setError] = useState(null);
  const [redirectToSignUp, setRedirectToSignUp] = useState(false);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        if (!provider) {
          setRedirectToSignUp(true);
          return;
        }
        setProvider(provider);
        const contractAddress = ContractAddress.PeerToPeerLending;
        const contract = new ethers.Contract(
          contractAddress,
          PeerToPeerLending.abi,
          provider
        );

        setContract(contract);
        const borrowerAddress = await provider.getSigner().getAddress();
        setAccount(borrowerAddress);
        console.log(contract.getBorrowerLoans(borrowerAddress));
        const borrowerLoanIds = await contract
          .getBorrowerLoans(borrowerAddress)
          .then((result) => {
            return result;
          })
          .catch((error) => {
            console.log(error);
          });

        if (!borrowerLoanIds) {
          setLoans([]);
          setIsLoading(false);
          return;
        }

        const borrowerLoans = await Promise.all(
          borrowerLoanIds.map(async (loanId) => {
            const loan = await contract.loans(loanId);

            return {
              id: loanId,
              amount: loan.amount,
              interest: loan.interest,
              duration: loan.duration,
              borrower: loan.borrower,
              lender: loan.lender,
              status: loan.status,
            };
          })
        );
        setLoans(borrowerLoans);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchLoans();
  }, []);

  if (redirectToSignUp) {
    return <Redirect to="/signup" />;
  }

  return (
    <>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <div className="container">
              {loans.length}
              <BorrowerDashboard contract={contract} account={account} loans={loans} />
            </div>
          )}
        </>
      )}
    </>
  );
}

export default BorrowerPage;
