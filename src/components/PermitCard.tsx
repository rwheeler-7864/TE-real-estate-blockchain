import { Permit } from 'pages/permit';
import React, { Component } from 'react';
import { Button, Card, ListGroup } from 'react-bootstrap';
import { applicationStatus } from 'utils/enums';

interface Props {
  permit: Permit;
}

interface State {}

export default class PermitCard extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  getStatus(index: number): string {
    return applicationStatus[index];
  }

  render() {
    const { permit } = this.props;
    return (
      <Card className='permit-card'>
        <Card.Body>
          <Card.Title>{permit.propertyAddress}</Card.Title>
          <Card.Text>
            <ListGroup variant='flush'>
              <ListGroup.Item>ID: {permit.id}</ListGroup.Item>
              <ListGroup.Item>
                Licence Number: {permit.licenceNumber}
              </ListGroup.Item>
              <ListGroup.Item>Document: {permit.document}</ListGroup.Item>
              <ListGroup.Item>
                Status: {this.getStatus(permit.status)}
              </ListGroup.Item>
            </ListGroup>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}
