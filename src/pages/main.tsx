import { FormikValues } from 'formik';
import React, { Component } from 'react';
import { Button, ListGroup, ListGroupItem, Table } from 'react-bootstrap';
import { Authority, Seller } from 'utils/addresses';
import FormCard from '../components/FormCard';
import PermitForm from '../components/forms/PermitForm';
import { applicationStatus, requestType } from '../utils/enums';
// import applicationStatus from '../App';

interface Props {
  marketplaceAddress: string;
  userAddress: string;
  permits: any[];
  cb: (requestType: requestType, data: any) => void;
}

interface State {
  formValues: FormikValues;
}

export default class Main extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      formValues: {},
    };
  }

  formSubmit(data: FormikValues) {
    console.log('formValues in Main', data);
    this.props.cb(requestType.permitCreate, data);
  }

  updatePermit(id: number, status: applicationStatus) {
    const data: any = {
      id: id,
      status: status,
    };
    this.props.cb(requestType.permitUpdate, data);
  }

  render() {
    let userAddress = this.props.userAddress;

    const actionButtons = (permit: any) => {
      // TODO fix conditional rendering here - not rerendering when changing accounts
      if (userAddress === Authority) {
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
    return (
      <div>
        <ListGroup>
          <ListGroupItem>
            Marketplace address: {this.props.marketplaceAddress}
          </ListGroupItem>
          <ListGroupItem>User Address: {this.props.userAddress}</ListGroupItem>
          <ListGroupItem>
            Permit Count: {this.props.permits.length}
          </ListGroupItem>
        </ListGroup>
      </div>
    );
  }
}
