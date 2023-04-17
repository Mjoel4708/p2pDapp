import React, { useState } from 'react';
import { ethers } from 'ethers';
import PeerToPeerLending from '../contracts/PeerToPeerLending.json';

const LoanForm = ({ onSubmit }) => {
  const [amount, setAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [duration, setDuration] = useState('');
  const [collateralProvided, setCollateralProvided] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleInterestRateChange = (e) => {
    setInterestRate(e.target.value);
  };

  const handleDurationChange = (e) => {
    setDuration(e.target.value);
  };

  const handleCollateralProvidedChange = (e) => {
    setCollateralProvided(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      await onSubmit(amount, interestRate, duration, collateralProvided);
    }
    catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div>
      <h2>Create a New Loan Request</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Amount (in ETH):
          <input type="number" step="0.01" value={amount} onChange={handleAmountChange} />
        </label>
        <br />
        <label>
          Interest Rate:
          <input type="number" step="0.01" value={interestRate} onChange={handleInterestRateChange} />
        </label>
        <br />
        <label>
          Duration (in days):
          <input type="number" value={duration} onChange={handleDurationChange} />
        </label>
        <br />
        <label>
          Collateral Provided:
          <input type="checkbox" checked={collateralProvided} onChange={handleCollateralProvidedChange} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default LoanForm;
