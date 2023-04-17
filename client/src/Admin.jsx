import React from "react";
import AdminPanel from "./components/AdminPanel";
import PeerToPeerLending from "./contracts/PeerToPeerLending.json";
import ContractAddress from "./contract-address.json";
import { ethers } from "ethers";

function Admin() {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(
    ContractAddress.PeerToPeerLending,
    PeerToPeerLending.abi,
    provider
  );
  const account = provider.getSigner().getAddress();

  const isAdmin = async () => {
    const isAuthorized = await contract.admins(account).call();
    return isAuthorized;
  };

  return (
    <div>
      {isAdmin() ? (
        <AdminPanel contract={contract} account={account} />
      ) : (
        <p>You are not authorized to access this page.</p>
      )}
    </div>
  );
}

export default Admin;
