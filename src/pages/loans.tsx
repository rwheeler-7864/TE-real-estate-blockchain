import { FormikValues } from 'formik';
import React, { Component } from 'react';
import { Jumbotron, Table } from 'react-bootstrap';
import { Authority, Buyer, Seller } from 'utils/addresses';
import { Loan } from 'utils/types';
import FormCard from '../components/FormCard';
import LoanForm from '../components/forms/LoanForm';
import { applicationStatus, requestType } from '../utils/enums';

interface Props {
  loans: Loan[];
  user: String;
  cb: (requestType: requestType, data: any) => void;
}

interface State {
  formValues: FormikValues;
}

export default class LoanPage extends Component<Props, State> {
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
    this.props.cb(requestType.loanCreate, data);
  }

  render() {
    const { user } = this.props;

    const loanApplicationForm = (
      <FormCard
        title={'Loan Application'}
        form={<LoanForm cb={(data: FormikValues) => this.formSubmit(data)} />}
      />
    );

    const loanTable = (
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
                return (
                  <tr key={key}>
                    <td>{loan.id.toString()}</td>
                    <td>{loan.owner}</td>
                    <td>{loan.fullName}</td>
                    <td>{loan.annualIncome}</td>
                    <td>{loan.propertyAddress}</td>
                    <td>{loan.loanAmount}</td>
                    <td>{this.getStatus(loan.status)}</td>
                    {/* <td>{actionButtons(loan)}</td> */}
                  </tr>
                );
              })
            : ''}
        </thead>
      </Table>
    );

    return (
      <div>
        <Jumbotron>
          <h1>Looking to buy?</h1>
          <p>
            You've come to the right place. Apply for a loan with J&amp;S Bank.
          </p>
          <p>Sign in as a buyer and apply below!</p>
        </Jumbotron>
        {user === Buyer ? (
          <div>
            {loanApplicationForm}
            {loanTable}
          </div>
        ) : (
          'To apply for a loan, please sign in as a buyer'
        )}
      </div>
    );
  }
}
