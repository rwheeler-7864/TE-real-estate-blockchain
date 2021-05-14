pragma solidity >0.5.0;

contract Marketplace {
    string public name;

    uint public permitCount = 0;
    mapping(uint => PermitApplication) public permits;

    uint public loanCount = 0;
    mapping(uint => LoanApplication) public loans;

    // enum to control the states of applications rather than multiple booleans
    enum applicationStatus {
        applied,
        approved,
        denied,
        purchased
    }
    applicationStatus constant default_value = applicationStatus.applied;


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

        permitCount++;
        permits[permitCount] = PermitApplication(permitCount, msg.sender, _propertyAddress, _document, _licenceNumber, _status);

        emit PermitCreated(permitCount, msg.sender, _propertyAddress, _document, _licenceNumber, _status);
    }

    function approvePermit(uint _id) public {
        // fetch permit
        PermitApplication memory _permit = permits[_id];
        // fetch the owner
        // validate
        // approve permit
        // trigger event
    }
}

