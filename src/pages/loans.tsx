import { FormikValues } from 'formik';
import React, { Component } from 'react';
import { Button, ListGroup, ListGroupItem, Table } from 'react-bootstrap';
import { Authority, Seller } from 'utils/addresses';
import FormCard from '../components/FormCard';
import LoanForm from '../components/forms/LoanForm';
import { applicationStatus, requestType } from '../utils/enums';
// import applicationStatus from '../App';

interface Props {
  marketplaceAddress: string;
  userAddress: string;
  loans: any[];
  cb: (requestType: requestType, data: any) => void;
}

interface State {
  formValues: FormikValues;
}

export default class Loan extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      formValues: {},
    };
  }

  getStatus(index: number): string {
    return applicationStatus[index];
  }

  formSubmit(data: FormikValues) {
    console.log('formValues in Main', data);
    this.props.cb(requestType.loanCreate, data);
  }

  updateLoan(id: number, status: applicationStatus) {
    const data: any = {
      id: id,
      status: status,
    };
    this.props.cb(requestType.loanUpdate, data);
  }

  render() {
    let userAddress = this.props.userAddress;

    const loanApplication = (
      <FormCard
        title={'Loan Application'}
        form={<LoanForm cb={(data: FormikValues) => this.formSubmit(data)} />}
      />
    );

    const actionButtons = (loan: any) => {
      // TODO fix conditional rendering here - not rerendering when changing accounts
      if (userAddress === Authority) {
        return (
          <div>
            <Button
              onClick={() =>
                this.updateLoan(
                  parseInt(loan.id),
                  applicationStatus.approved
                )
              }
            >
              Approve
            </Button>
            <Button
              onClick={() =>
                this.updateLoan(parseInt(loan.id), applicationStatus.denied)
              }
            >
              Deny
            </Button>
          </div>
        );
      }
    };
    return (
      <div>
        <ListGroup>
          <ListGroupItem>
            Marketplace address: {this.props.marketplaceAddress}
          </ListGroupItem>
          <ListGroupItem>User Address: {this.props.userAddress}</ListGroupItem>
          <ListGroupItem>
            Permit Count: {this.props.loans.length}
          </ListGroupItem>
        </ListGroup>
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Owner</th>
              <th>Full Name</th>
              <th>Annual Income</th>
              <th>Property Address</th>
              <th>Loan Amount</th>
              <th>Status</th>
            </tr>
            {this.props.loans.length > 0
              ? this.props.loans.map((loan, key) => {
                  let status = typeof applicationStatus;
                  status = loan.status;
                  return (
                    <tr key={key}>
                      <td>{loan.id.toString()}</td>
                      <td>{loan.owner}</td>
                      <td>{loan.fullName}</td>
                      <td>{loan.annualIncome}</td>
                      <td>{loan.propertyAddress}</td>
                      <td>{loan.loanAmount}</td>
                      <td>{this.getStatus(loan.status)}</td>
                      <td>{actionButtons(loan)}</td>
                    </tr>
                  );
                })
              : ''}
          </thead>
        </Table>
        {loanApplication}
      </div>
    );
  }
}
