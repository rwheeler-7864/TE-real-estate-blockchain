pragma solidity >0.5.0;

contract Marketplace {
    string public name;

    uint public permitCount = 0;
    mapping(uint => PermitApplication) public permits;

    uint public loanCount = 0;
    mapping(uint => LoanApplication) public loans;

    // mapping(address => Account) public accounts;

    // enum to control the states of applications rather than multiple booleans
    enum applicationStatus {
        applied,
        approved,
        denied,
        purchased
    }
    applicationStatus constant default_value = applicationStatus.applied;

    enum accountType {
        deployer,
        seller,
        authority,
        buyer,
        bank
    }

    struct Account {
        address accountAddress;
        accountType account;
    }

    // TODO find a way for this to take a document - buffer maybe?
    struct PermitApplication {
        uint id;
        address owner;
        string propertyAddress;
        string document;
        string licenceNumber;
        applicationStatus status; 
    }

    struct LoanApplication {
        uint id;
    }

    event PermitCreated(
        uint id,
        address owner,
        string propertyAddress,
        string document,
        string licenceNumber,
        applicationStatus status
        );

    event PermitStatus(
        uint id,
        address authBy,
        applicationStatus status
    );
        
    

    constructor() public {
        name = "SICI Real Estate Marketplace";
    }


    function createPermit(string memory _propertyAddress, string memory _document, string memory _licenceNumber, applicationStatus _status) public {
        // requires strings to not be empty
        require(bytes(_propertyAddress).length > 0);
        require(bytes(_document).length > 0);
        require(bytes(_licenceNumber).length > 0);
        // status of a new application must be applied ONLY
        require(_status == applicationStatus.applied);
        // only be created by a seller TODO find better implementation of this
        require(msg.sender == 0x7e14E1b59aF858C2E366B1d902aBBB743275F694);

        permitCount++;
        permits[permitCount] = PermitApplication(permitCount, msg.sender, _propertyAddress, _document, _licenceNumber, _status);

        emit PermitCreated(permitCount, msg.sender, _propertyAddress, _document, _licenceNumber, _status);
    }

    function updatePermit(uint _id, applicationStatus _status) public {
        // fetch permit
        PermitApplication memory _permit = permits[_id];
        // validate permit exists
        require(_permit.id > 0 && _permit.id <= permitCount);
        // validate that the status is not the same
        require(_permit.status != _status);

        // TODO find better implementation of auth checking
        // seller can not update their own permit
        require(_permit.owner != msg.sender);
        // only be updated by an authority 
        require(msg.sender == 0x2b0d61c05D8caFF492E1d6a6D3451437801D4b6B);


        // update permit
        _permit.status = _status;
        // trigger event
        emit PermitStatus(_id, msg.sender, _permit.status);
    }
}

