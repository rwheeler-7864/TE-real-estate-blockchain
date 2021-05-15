const { assert } = require('chai');

require('chai')
  .use(require('chai-as-promised'))
  .should();

const Marketplace = artifacts.require('./Marketplace.sol');

const applicationStatus = {
  applied: 'applied',
  approved: 'approved',
  denied: 'denied',
  purchased: 'purchased'
};

contract('Marketplace', ([deployer, seller, authority, buyer, bank]) => {
  let marketplace;

  before(async () => {
    marketplace = await Marketplace.deployed();
  });

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      // checks that the marketplace has an address therefore has deployed
      const address = await marketplace.address;
      assert.notEqual(address, 0x0);
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
      assert.notEqual(address, '');
    });

    it('has a name', async () => {
      // check that marketplace has a name
      const name = await marketplace.name();
      assert.equal(name, 'SICI Real Estate Marketplace');
    });
  });

  describe('permitApplications', async () => {
    let result, permitCount;

    before(async () => {
      // create a test permit
      result = await marketplace.createPermit(
        '123 Street, Melbourne, Victoria',
        'design.PDF',
        'L1001',
        0,
        { from: seller }
      );
      permitCount = await marketplace.permitCount();
    });

    // prettier-ignore
    it('creates a permit application from a seller', async () => {
      // Success
      // check permit count has increased
      assert.equal(permitCount, 1);
      // log event
      const event = result.logs[0].args;

      // check data matches
      assert.equal(event.id.toNumber(), permitCount.toNumber(), 'id is correct');
      assert.equal(event.owner, seller, 'owner is correct');
      assert.equal(event.propertyAddress, '123 Street, Melbourne, Victoria', 'property address is correct');
      assert.equal(event.document, 'design.PDF', 'document is correct');
      assert.equal(event.licenceNumber, 'L1001', 'licenceNumber is correct');
      assert.equal(event.status, 0, 'status is correct');

      // Failure - must have an address
      await marketplace.createPermit('', 'design.PDF', 'L1001', 0, { from: seller }).should.be.rejected;

      // Failure - must have a document
      await marketplace.createPermit('123 Street, Melbourne, Victoria', '', 'L1001', 0, { from: seller }).should.be.rejected;

      // Failure - must have a licence
      await marketplace.createPermit('123 Street, Melbourne, Victoria', 'design.PDF', '', 0, { from: seller }).should.be.rejected;

      // Failure - must be created with a status of Applied only
      await marketplace.createPermit('123 Street, Melbourne, Victoria', 'design.PDF', 'L1001', 2, { from: seller }).should.be.rejected;
      
      // Failure - must be created by a SELLER only
      await marketplace.createPermit('123 Street, Melbourne, Victoria', 'design.PDF', 'L1001', 0, { from: buyer }).should.be.rejected;
    });

    // prettier-ignore
    it('lists permits and confirms correct values', async () => {
      const permit = await marketplace.permits(permitCount);

      // confirm that data in permit is same as data in event
      assert.equal(permit.id.toNumber(), permitCount.toNumber(), 'id is correct');
      assert.equal(permit.owner, seller, 'owner is correct');
      assert.equal(permit.propertyAddress, '123 Street, Melbourne, Victoria', 'property address is correct');
      assert.equal(permit.document, 'design.PDF', 'document is correct');
      assert.equal(permit.licenceNumber, 'L1001', 'licenceNumber is correct');
      assert.equal(permit.status, 0, 'status is correct');
    });

    // prettier-ignore
    it('approves permit from authority', async () => {
      result = await marketplace.updatePermit(permitCount, 1, { from: authority });
      // log event
      const event = result.logs[0].args;

      assert.equal(event.id.toNumber(), permitCount.toNumber(), 'id is correct');
      assert.equal(event.authBy, authority, 'approved by authority');
      assert.equal(event.status, 1, 'Status has been changed to approved');
    });

    // prettier-ignore
    it('denies permit from authority', async () => {
      result = await marketplace.updatePermit(permitCount, 2, { from: authority });
      // log event
      const event = result.logs[0].args;

      assert.equal(event.id.toNumber(), permitCount.toNumber(), 'id is correct');
      assert.equal(event.authBy, authority, 'denied by authority');
      assert.equal(event.status, 2, 'Status has been changed to denied');
    });

    // prettier-ignore 
    it('fails permit update', async () => {
      // Failure - must have an ID
      await marketplace.updatePermit('', 1, { from: authority }).should.be.rejected;

      // Failure - must be an ID that exists
      await marketplace.updatePermit(10101, 1, { from: authority }).should.be.rejected;

      // Failure - must change the status
      await marketplace.updatePermit(permitCount, 0, { from: authority }).should.be.rejected;

      // Failure - must be from an auth
      await marketplace.updatePermit(permitCount, 0, { from: seller }).should.be.rejected;

    })
  });
});
