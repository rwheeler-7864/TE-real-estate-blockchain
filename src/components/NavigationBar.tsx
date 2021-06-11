import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Authority, Bank } from 'utils/addresses';

interface Props {
  account: string;
}

interface State {}

export default class NavigationBar extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Navbar bg='light' expand='lg'>
        <Navbar.Brand href='/'>J&amp;S Real Estate</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='mr-auto'>
            <Nav.Link href='/permit'>Permit Applications</Nav.Link>
            <Nav.Link href='/loan'>Loan Applications</Nav.Link>
            <Nav.Link href='/authority'>Authority Portal</Nav.Link>
            <Nav.Link href='/bank'>Bank Portal</Nav.Link>
            {/* // TODO fix these conditional renders */}
            {/* {this.props.account === Authority ? (
              <Nav.Link href='/authority'>Authority Portal</Nav.Link>
            ) : (
              ''
            )}
            {this.props.account === Bank ? (
              <Nav.Link href='/bank'>Bank Portal</Nav.Link>
            ) : (
              ''
            )} */}
          </Nav>
          <Nav>
            <Nav.Link href='#user'>{this.props.account}</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
