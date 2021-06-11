import { FormikValues } from 'formik';
import React, { Component } from 'react';
import { Alert, Card, Jumbotron, Table } from 'react-bootstrap';
import { Authority, Buyer, Seller } from 'utils/addresses';
import { Loan, Permit } from 'utils/types';
import FormCard from '../components/FormCard';
import LoanForm from '../components/forms/LoanForm';
import { applicationStatus, requestType } from '../utils/enums';

interface Props {
  loans: Loan[];
  permits: Permit[];
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

  /**
   * gives the string value of applicationStatus enum. Required to parse the number value from sol contract.
   * @param index number value from solidity
   * @returns string of matching applicationStatus enum
   */
  getStatus(index: number): string {
    return applicationStatus[index];
  }

  /**
   * submits form to callback
   * @param data data from form
   */
  formSubmit(data: FormikValues) {
    this.props.cb(requestType.loanCreate, data);
  }

  render() {
    const { user } = this.props;

    /**
     * renders the application form
     */
    // console.log(this.props.permits);

    const loanApplicationForm = (
      <FormCard
        title={'Loan Application'}
        form={
          <LoanForm
            permits={this.props.permits}
            cb={(data: FormikValues) => this.formSubmit(data)}
          />
        }
      />
    );

    /**
     * renders the table containing the loans
     */
    const loanTable = (
      <Card className='table-card'>
        <Table striped hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Annual Income</th>
              <th>Property Address</th>
              <th>Loan Amount</th>
              <th>Status</th>
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
          <h1>Looking to buy?</h1>
          <p>
            You've come to the right place. Apply for a loan with J&amp;S Bank.
          </p>
          <p>Sign in as a buyer and apply below!</p>
        </Jumbotron>
        {
          // conditionally render the form and table so only visible to logged in buyers
          user === Buyer ? (
            <div>
              {loanApplicationForm}
              {loanTable}
            </div>
          ) : (
            <Alert variant='primary'>
              To apply for a loan, please sign in as a buyer
            </Alert>
          )
        }
      </div>
    );
  }
}
