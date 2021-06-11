import React, { Component } from 'react';
import { applicationStatus, requestType } from 'utils/enums';
import { Button, ButtonGroup, Card, Jumbotron, Table } from 'react-bootstrap';
import { Authority, Bank, Seller } from 'utils/addresses';
import { Loan } from 'utils/types';
import ActionButton from 'components/ActionButton';

interface Props {
  loans: Loan[];
  user: String;
  cb: (requestType: requestType, data: any) => void;
}

interface State {}

export default class BankPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  getStatus(index: number): string {
    return applicationStatus[index];
  }

  updateLoan(id: number, status: applicationStatus) {
    const data: any = {
      id: id,
      status: status,
    };
    this.props.cb(requestType.loanUpdate, data);
  }

  render() {
    const { user } = this.props;

    const actionButtons = (permit: any) => {
      if (user === Bank) {
        return (
          <ButtonGroup size='sm'>
            <Button
              variant='outline-primary'
              onClick={() =>
                this.updateLoan(parseInt(permit.id), applicationStatus.approved)
              }
            >
              Approve
            </Button>
            <Button
              variant='outline-primary'
              onClick={() =>
                this.updateLoan(parseInt(permit.id), applicationStatus.denied)
              }
            >
              Deny
            </Button>
          </ButtonGroup>
        );
      }
    };

    const loanTable = (
      <Card className='table-card'>
        <Table hover striped>
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Annual Income</th>
              <th>Property Address</th>
              <th>Loan Amount</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.loans.length > 0
              ? this.props.loans.map((loan, key) => {
                  return (
                    <tr key={key}>
                      <td>{loan.id.toString()}</td>
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
          </tbody>
        </Table>
      </Card>
    );

    return (
      <div>
        <Jumbotron>
          <h1>Bank Portal</h1>
          <p>Approve or deny buyers loan applications below</p>
        </Jumbotron>
        {user === Bank ? (
          <div>{loanTable}</div>
        ) : (
          'Unauthorised user - please inform admin of this issue.'
        )}
      </div>
    );
  }
}
