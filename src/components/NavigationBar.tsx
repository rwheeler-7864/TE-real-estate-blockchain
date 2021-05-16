import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

interface Props {
  account: string;
}

interface State {}

export default class NavigationBar extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      
    }
  }

  // TODO add react router to this
  render() {
    return (
      <Navbar bg='light' expand='lg'>
        <Navbar.Brand href='/'>Real Estate Marketplace</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='mr-auto'>
            <Nav.Link href='#link'>Permit Approvals</Nav.Link>
            <Nav.Link href='#link'>Loan Approvals</Nav.Link>
            
          </Nav>
          <Nav>
            <Nav.Link href='#user'>{this.props.account}</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
