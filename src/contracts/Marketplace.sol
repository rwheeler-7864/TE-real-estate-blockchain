pragma solidity >0.5.0;

contract Marketplace {
  // Setup variables for the contract
  string public name;
  address public marketplace;
  address public seller;
  address public authority;
  address public buyer;
  address public bank;

  uint256 public permitCount = 0;
  mapping(uint256 => PermitApplication) public permits;

  uint256 public loanCount = 0;
  mapping(uint256 => LoanApplication) public loans;

  // TODO - create the banking side of contracts - loanApplications etc

  // mapping(address => Account) public accounts;

  // enum to control the states of applications rather than multiple booleans
  enum applicationStatus { applied, approved, denied, purchased }
  applicationStatus constant default_value = applicationStatus.applied;

  enum accountType { deployer, seller, authority, buyer, bank }

  // Holds the account type and the address of the account
  struct Account {
    address accountAddress;
    accountType account;
  }

  // Stores information about the Permit application
  struct PermitApplication {
    uint256 id;
    address owner;
    string propertyAddress;
    string document;
    string licenceNumber;
    applicationStatus status;
  }

  // Stores information about the Loan application
  struct LoanApplication {
    uint256 id;
    address owner;
    string fullName;
    uint256 annualIncome;
    string propertyAddress;
    uint256 loanAmount;
    applicationStatus status;
  }

  // Event on permit creation
  event PermitCreated(
    uint256 id,
    address owner,
    string propertyAddress,
    string document,
    string licenceNumber,
    applicationStatus status
  );

  // Event on loan creation
  event LoanCreated(
    uint256 id,
    address owner,
    string fullName,
    uint256 annualIncome,
    string propertyAddress,
    uint256 loanAmount,
    applicationStatus status
  );

  // Event on updating the status of the permit
  event PermitStatus(uint256 id, applicationStatus status, address authBy);

  // Event on updating the status of the loan
  event LoanStatus(uint256 id, applicationStatus status, address authBy);

  constructor() public {
    name = 'SICI Real Estate Marketplace';
    // Justins addresses
    marketplace = 0x9197D2fB0F4Aa66173604bdEA2e2655b988bcAff;
    seller = 0x7e14E1b59aF858C2E366B1d902aBBB743275F694;
    authority = 0x2b0d61c05D8caFF492E1d6a6D3451437801D4b6B;
    buyer = 0x457e9ddFf1409434D618461a2f5F15586FB0eb6C;
    bank = 0xFD55579F56578959D269f87D9eAB9A97A09877f8;

    // Sids addresses
    // seller = 0x386c0b9C66a334cEedf0059b1B4E44E43C2821a6;
    // authority = 0x2E11fF485F0B543222e5cb392395f3ec748E37B8;
    // buyer = 0x728Ad52C853e97Bb907F83F842043567266e3483;
    // bank = 0x5c5857f8cEB15DA1DF8d0217EcA61c8B19db501E;
  }

  /**
   * Creates a permit
   * @param _propertyAddress Address of the property
   * @param _document The blueprint document
   * @param _licenceNumber The license number of permits applicant's 
   * @param _status status that is being applied to the permit
   */
  function createPermit(
    string memory _propertyAddress,
    string memory _document,
    string memory _licenceNumber,
    applicationStatus _status
  ) public {
    // requires strings to not be empty
    require(bytes(_propertyAddress).length > 0);
    require(bytes(_document).length > 0);
    require(bytes(_licenceNumber).length > 0);
    // status of a new application must be applied ONLY
    require(_status == applicationStatus.applied);
    // only be created by a seller TODO find better implementation of this
    require(msg.sender == seller);

    permitCount++;
    // Create a new permit object
    permits[permitCount] = PermitApplication(
      permitCount,
      msg.sender,
      _propertyAddress,
      _document,
      _licenceNumber,
      _status
    );
    // Trigger the permit created event
    emit PermitCreated(
      permitCount,
      msg.sender,
      _propertyAddress,
      _document,
      _licenceNumber,
      _status
    );
  }

  /**
   * Changes the permits status
   * @param _id permit ID
   * @param _status status that is being applied to the permit
   */
  function updatePermit(uint256 _id, applicationStatus _status) public {
    // fetch permit
    PermitApplication memory _permit = permits[_id];
    // validate permit exists
    require(_permit.id > 0 && _permit.id <= permitCount);
    // validate that the status is not the same
    require(_status != _permit.status);
    // validate that it is not being updated back to applied
    require(_status != applicationStatus.applied);

    // seller can not update their own permit
    require(_permit.owner != msg.sender);
    // only be updated by an authority
    require(msg.sender == authority);

    // update permit
    _permit.status = _status;
    permits[_id] = _permit;
    // trigger event
    emit PermitStatus(_id, _permit.status, msg.sender);
  }

  /**
   * Creates a permit
   * @param _fullName Full name of the loan applicant
   * @param _annualIncome Annual Income of the loan applicant
   * @param _propertyAddress Address of the property
   * @param _loanAmount Loan amount requested by the applicant
   * @param _status status that is being applied to the Loan
   */
  function createLoan(
    string memory _fullName,
    uint256 _annualIncome,
    string memory _propertyAddress,
    uint256 _loanAmount,
    applicationStatus _status
  ) public {
    // requires strings to not be empty
    require(bytes(_fullName).length > 0);
    require(bytes(_propertyAddress).length > 0);
    // requires income and loan to be greater than 0
    require(_annualIncome > 0);
    require(_loanAmount > 0);
    // status of a new application must be applied ONLY
    require(_status == applicationStatus.applied);
    // only be created by a buyer
    require(msg.sender == buyer);

    loanCount++;
    // Create a new loan application object
    loans[loanCount] = LoanApplication(
      loanCount,
      msg.sender,
      _fullName,
      _annualIncome,
      _propertyAddress,
      _loanAmount,
      _status
    );
    // Call the loan created event
    emit LoanCreated(
      permitCount,
      msg.sender,
      _fullName,
      _annualIncome,
      _propertyAddress,
      _loanAmount,
      _status
    );
  }

  /**
   * Changes the loan's status
   * @param _id loan ID
   * @param _status status that is being applied to the loan
   */
  function updateLoan(uint256 _id, applicationStatus _status) public {
    LoanApplication memory _loan = loans[_id];
    // validate loan exists
    require(_loan.id > 0 && _loan.id <= loanCount);
    // validate that the status is not the same
    require(_status != _loan.status);
    require(_status != applicationStatus.applied);
    require(_loan.owner != msg.sender);
    // only be updated by an authority
    require(msg.sender == bank);

    _loan.status = _status;
    loans[_id] = _loan;

    emit LoanStatus(_id, _loan.status, msg.sender);
  }
}
