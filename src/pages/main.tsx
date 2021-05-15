import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import Web3 from 'web3';

interface Props {
  marketplaceAddress: string;
  userAddress: string;
}

interface State {
}


export default class Main extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      
    }
  }

  

  render() {
    return <div>
      <ListGroup>
        <ListGroupItem>Marketplace address: {this.props.marketplaceAddress}</ListGroupItem>
        <ListGroupItem>User Address: {this.props.userAddress}</ListGroupItem>
        <ListGroupItem>Test</ListGroupItem>
      </ListGroup>
    </div>;
  }
}
