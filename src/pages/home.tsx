import PermitCard from 'components/PermitCard';
import React, { Component } from 'react';
import { Alert, Jumbotron } from 'react-bootstrap';
import { applicationStatus } from 'utils/enums';
import { Permit } from 'utils/types';

interface Props {
  permits: Permit[];
}

interface State {}

export default class HomePage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    const approvedPermitCount = this.props.permits.filter(
      (permit) => Number(permit.status) === Number(applicationStatus.approved)
    ).length;

    /**
     * renders the permits that have been approved
     */
    const renderApprovedPermits = Object.values(this.props.permits)
      .filter(
        (permit) => Number(permit.status) === Number(applicationStatus.approved)
      )
      .map((permit) => {
        return <PermitCard permit={permit} />;
      });

    return (
      <div>
        {/* show properties for sale and that have been approved */}
        <Jumbotron>
          <h1>Real Estate Marketplace</h1>
          <p>Check out the available properties below!</p>
        </Jumbotron>
        {approvedPermitCount > 0 ? (
          <div>{renderApprovedPermits}</div>
        ) : (
          <Alert variant='primary'>
            Looks like theres no approved properties for sale! Maybe login as a
            seller and <Alert.Link href='/permit'>apply</Alert.Link>.
          </Alert>
        )}
      </div>
    );
  }
}
