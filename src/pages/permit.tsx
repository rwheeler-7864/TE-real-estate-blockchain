import React, { Component } from 'react';
import { applicationStatus, requestType } from 'utils/enums';
import { Alert, Card, Jumbotron, Table } from 'react-bootstrap';
import { Seller } from 'utils/addresses';
import FormCard from 'components/FormCard';
import PermitForm from 'components/forms/PermitForm';
import { FormikValues } from 'formik';
// import { Permit } from 'utils/types';

/* // TODO this is a weird bug - I delete and import from types.ts, 
      yet errors out saying that I am not exporting Permit from here, 
      even if code is deleted
*/
export type Permit = {
  id: number;
  owner: string;
  propertyAddress: string;
  document: string;
  licenceNumber: string;
  status: applicationStatus;
};

interface Props {
  permits: Permit[];
  user: String;
  cb: (requestType: requestType, data: any) => void;
}

interface State {}

export default class PermitPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  getStatus(index: number): string {
    return applicationStatus[index];
  }

  formSubmit(data: FormikValues) {
    this.props.cb(requestType.permitCreate, data);
  }

  render() {
    const { user } = this.props;

    const permitApplicationForm = (
      <FormCard
        title={'Permit Application'}
        form={<PermitForm cb={(data: FormikValues) => this.formSubmit(data)} />}
      />
    );

    const permitTable = (
      <Card className='table-card'>
        <Table striped hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Property Address</th>
              <th>Document</th>
              <th>Licence Number</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {this.props.permits.length > 0
              ? this.props.permits.map((permit, key) => {
                  return (
                    <tr key={key}>
                      <td>{permit.id.toString()}</td>
                      <td>{permit.propertyAddress}</td>
                      <td>{permit.document}</td>
                      <td>{permit.licenceNumber}</td>
                      <td>{this.getStatus(permit.status)}</td>
                      {/* <td>{actionButtons(permit)}</td> */}
                    </tr>
                  );
                })
              : 'No current permits'}
          </tbody>
        </Table>
      </Card>
    );

    return (
      <div>
        <Jumbotron>
          <h1>Selling your property?</h1>
          <p>Sell with us on the blockchain. Smarter, faster, safer.</p>
          <p>Sign in as a seller and apply below!</p>
        </Jumbotron>
        {user === Seller ? (
          <div>
            {permitApplicationForm}
            {permitTable}
          </div>
        ) : (
          <Alert variant='primary'>
            To create a permit, please sign in as a seller
          </Alert>
        )}
      </div>
    );
  }
}
