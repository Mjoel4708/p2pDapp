import React from 'react';

const LoanDetail = ({ loan }) => {
  return (
    <div>
      <h2>Loan Details</h2>
      <p>ID: {loan.id}</p>
      <p>Borrower: {loan.borrower}</p>
      <p>Amount: {loan.amount}</p>
      <p>Interest Rate: {loan.interestRate}</p>
      <p>Duration: {loan.duration}</p>
      <p>Collateral Provided: {loan.collateralProvided ? 'Yes' : 'No'}</p>
      <p>Approved: {loan.approved ? 'Yes' : 'No'}</p>
    </div>
  );
};

export default LoanDetail;
