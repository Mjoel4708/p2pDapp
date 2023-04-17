import React, { useState } from "react";
import { Table, Button } from "react-bootstrap";

const InvestorDashboard = ({ loans }) => {
  const [selectedLoan, setSelectedLoan] = useState(null);

  const handleLoanSelect = (loan) => {
    setSelectedLoan(loan);
  };

  return (
    <div>
      <h2>Investor Dashboard</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Loan ID</th>
            <th>Borrower</th>
            <th>Amount</th>
            <th>Interest Rate</th>
            <th>Duration</th>
            <th>Collateral Provided</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {loans.map((loan, index) => (
            <tr key={index}>
              <td>{index}</td>
              <td>{loan.borrower}</td>
              <td>{loan.amount}</td>
              <td>{loan.interestRate}</td>
              <td>{loan.duration}</td>
              <td>{loan.collateralProvided ? "Yes" : "No"}</td>
              <td>{loan.approved ? "Approved" : "Pending"}</td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => handleLoanSelect(loan)}
                  disabled={loan.approved}
                >
                  {loan.approved ? "Approved" : "Approve"}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {selectedLoan && (
        <div>
          <h3>Loan Details</h3>
          <p>Borrower: {selectedLoan.borrower}</p>
          <p>Amount: {selectedLoan.amount}</p>
          <p>Interest Rate: {selectedLoan.interestRate}</p>
          <p>Duration: {selectedLoan.duration}</p>
          <p>Collateral Provided: {selectedLoan.collateralProvided ? "Yes" : "No"}</p>
          <Button variant="success" onClick={() => handleLoanSelect(null)}>
            Back to Loan List
          </Button>
        </div>
      )}
    </div>
  );
};

export default InvestorDashboard;
