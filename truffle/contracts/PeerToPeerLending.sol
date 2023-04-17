// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PeerToPeerLending {
    struct Loan {
        address borrower;
        uint amount;
        uint interestRate;
        uint duration;
        bool collateralProvided;
        bool approved;
    }

    Loan[] public loans;
    mapping(address => uint[]) public borrowerLoans;
    mapping(address => uint[]) public lenderLoans;
    mapping(address => bool) public approvedLenders;
    mapping(address => bool) public admins;

    event NewLoan(
        uint indexed loanId,
        address indexed borrower,
        uint amount,
        uint interestRate,
        uint duration,
        bool collateralProvided
    );
    event LoanApproval(uint indexed loanId, address indexed lender);
    event NewAdmin(address indexed admin);
    event AdminRemoval(address indexed admin);
    event NewLender(address indexed lender);

    modifier onlyAdmin() {
        require(admins[msg.sender], "Only admin can perform this action.");
        _;
    }

    function requestLoan(
        uint _amount,
        uint _interestRate,
        uint _duration,
        bool _collateralProvided
    ) public {
        Loan memory newLoan = Loan({
            borrower: msg.sender,
            amount: _amount,
            interestRate: _interestRate,
            duration: _duration,
            collateralProvided: _collateralProvided,
            approved: false
        });
        uint loanId = loans.length;
        loans.push(newLoan);
        borrowerLoans[msg.sender].push(loanId);
        emit NewLoan(
            loanId,
            msg.sender,
            _amount,
            _interestRate,
            _duration,
            _collateralProvided
        );
    }

    function approveLoan(uint _loanId) public {
        Loan storage loan = loans[_loanId];
        require(approvedLenders[msg.sender], "You are not an approved lender.");
        require(!loan.approved, "Loan has already been approved.");
        loan.approved = true;
        lenderLoans[msg.sender].push(_loanId);
        emit LoanApproval(_loanId, msg.sender);
    }

    function getBorrowerLoans(
        address _borrower
    ) public view returns (uint[] memory) {
        return borrowerLoans[_borrower];
    }

    function getLenderLoans(
        address _lender
    ) public view returns (uint[] memory) {
        return lenderLoans[_lender];
    }

    function addApprovedLender(address _lender) public onlyAdmin {
        approvedLenders[_lender] = true;
    }
    function addLender(address _lender) public onlyAdmin {
        approvedLenders[_lender] = true;
        emit NewLender(_lender);
    }

    function removeApprovedLender(address _lender) public onlyAdmin {
        approvedLenders[_lender] = false;
    }

    function addAdmin(address _admin) public onlyAdmin {
        admins[_admin] = true;
        emit NewAdmin(_admin);
    }
    function getAdmin(address _admin) public view returns (bool) {
        return admins[_admin];
    }

    function removeAdmin(address _admin) public onlyAdmin {
        admins[_admin] = false;
        emit AdminRemoval(_admin);
    }
    function getAllLoans() public view returns (Loan[] memory) {
        return loans;
    }

}
