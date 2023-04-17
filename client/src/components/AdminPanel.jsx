import React, { useState } from "react";
import { ethers } from "ethers";

const AdminPanel = ({ contract, account }) => {
  const [newLender, setNewLender] = useState("");
  const [newAdmin, setNewAdmin] = useState("");
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  provider.send("eth_requestAccounts", []);

  const handleAddLender = async () => {
    const tx = await contract.populateTransaction.addApprovedLender(newLender);
    const signer = await provider.getSigner();
    const signedTx = await signer.sendTransaction(tx);
    console.log(signedTx);
    await contract.addApprovedLender(newLender);

    setNewLender("");
  };

  const handleRemoveLender = async (lender) => {
    await contract.removeApprovedLender(lender);
  };

  const handleAddAdmin = async () => {
    await contract.addAdmin(newAdmin);
    setNewAdmin("");
  };

  const handleRemoveAdmin = async (admin) => {
    await contract.removeAdmin(admin);
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <div>
        <h3>Add Approved Lender</h3>
        <label htmlFor="new-lender">Lender Address: </label>
        <input
          type="text"
          id="new-lender"
          value={newLender}
          onChange={(e) => setNewLender(e.target.value)}
        />
        <button onClick={handleAddLender}>Add Lender</button>
      </div>
      <div>
        <h3>Remove Approved Lender</h3>
        <ul>
          {Object.keys(contract.approvedLenders).map((lender) => (
            <li key={lender}>
              {lender}{" "}
              {lender !== account && (
                <button onClick={() => handleRemoveLender(lender)}>
                  Remove
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Add Admin</h3>
        <label htmlFor="new-admin">Admin Address: </label>
        <input
          type="text"
          id="new-admin"
          value={newAdmin}
          onChange={(e) => setNewAdmin(e.target.value)}
        />
        <button onClick={handleAddAdmin}>Add Admin</button>
      </div>
      <div>
        <h3>Remove Admin</h3>
        <ul>
          {Object.keys(contract.admins).map((admin) => (
            <li key={admin}>
              {admin}{" "}
              {admin !== account && (
                <button onClick={() => handleRemoveAdmin(admin)}>
                  Remove
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminPanel;
