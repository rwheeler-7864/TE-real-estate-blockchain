import { FormikValues } from 'formik';
import React, { Component } from 'react';
import { Button, ListGroup, ListGroupItem, Table } from 'react-bootstrap';
import Web3 from 'web3';
import FormCard from '../components/FormCard';
import PermitForm from '../components/forms/PermitForm';
// import applicationStatus from '../App';

interface Props {
  marketplaceAddress: string;
  userAddress: string;
  permits: any[];
  cb: (data: any, requestType: string) => void;
}

interface State {
  formValues: FormikValues;
}

enum applicationStatus {
  applied = 0,
  approved = 1,
  denied = 2,
  purchased = 3,
}

export default class Main extends Component<Props, State> {
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
    this.props.cb(data, 'create');
  }

  approvePermit(id: number) {
    const data: any = {
      id: id,
      status: applicationStatus.approved,
    };
    console.log('approve in Main', data);
    // this.props.cb(data, 'update');
  }

  render() {
    return (
      <div>
        <ListGroup>
          <ListGroupItem>
            Marketplace address: {this.props.marketplaceAddress}
          </ListGroupItem>
          <ListGroupItem>User Address: {this.props.userAddress}</ListGroupItem>
          <ListGroupItem>Permit Count: {this.props.permits.length}</ListGroupItem>
        </ListGroup>
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
                  let status = typeof applicationStatus;
                  status = permit.status;
                  return (
                    <tr key={key}>
                      <td>{permit.id.toString()}</td>
                      <td>{permit.owner}</td>
                      <td>{permit.propertyAddress}</td>
                      <td>{permit.document}</td>
                      <td>{permit.licenceNumber}</td>
                      <td>{this.getStatus(permit.status)}</td>
                      <td>
                        {/* <Button onClick={() => this.approvePermit(parseInt(permit.id))}>
                          Approve
                        </Button> */}
                        TODO FIX BUTTON
                      </td>
                    </tr>
                  );
                })
              : ''}
          </thead>
        </Table>
        <FormCard
          title={'Permit Application'}
          form={
            <PermitForm cb={(data: FormikValues) => this.formSubmit(data)} />
          }
        />
      </div>
    );
  }
}
