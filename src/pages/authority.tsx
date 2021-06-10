import React, { Component } from 'react';
import { applicationStatus, requestType } from 'utils/enums';
import { Button, Jumbotron, Table } from 'react-bootstrap';
import { Authority, Seller } from 'utils/addresses';
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

export default class AuthorityPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  getStatus(index: number): string {
    return applicationStatus[index];
  }

  updatePermit(id: number, status: applicationStatus) {
    const data: any = {
      id: id,
      status: status,
    };
    this.props.cb(requestType.permitUpdate, data);
  }

  render() {
    const { user } = this.props;

    const actionButtons = (permit: any) => {
      // TODO fix conditional rendering here - not rerendering when changing accounts
      if (user === Authority) {
        return (
          <div>
            <Button
              onClick={() =>
                this.updatePermit(
                  parseInt(permit.id),
                  applicationStatus.approved
                )
              }
            >
              Approve
            </Button>
            <Button
              onClick={() =>
                this.updatePermit(parseInt(permit.id), applicationStatus.denied)
              }
            >
              Deny
            </Button>
          </div>
        );
      }
    };

    const permitTable = (
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Owner</th>
            <th>Property Address</th>
            <th>Document</th>
            <th>Licence Number</th>
            <th>Status</th>
          </tr>
          {this.props.permits.length > 0
            ? this.props.permits.map((permit, key) => {
                return (
                  <tr key={key}>
                    <td>{permit.id.toString()}</td>
                    <td>{permit.owner}</td>
                    <td>{permit.propertyAddress}</td>
                    <td>{permit.document}</td>
                    <td>{permit.licenceNumber}</td>
                    <td>{this.getStatus(permit.status)}</td>
                    <td>{actionButtons(permit)}</td>
                  </tr>
                );
              })
            : 'No current permits'}
        </thead>
      </Table>
    );

    return (
      <div>
        <Jumbotron>
          <h1>Authority Portal</h1>
          <p>Approve or deny sellers permit applications below</p>
        </Jumbotron>
        {user === Authority ? (
          <div>{permitTable}</div>
        ) : (
          'Unauthorised user - please inform admin of this issue.'
        )}
      </div>
    );
  }
}
