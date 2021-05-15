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
  render() {
    return (
      <Navbar bg='light' expand='lg'>
        <Navbar.Brand href='#home'>Real Estate Marketplace</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='mr-auto'>
            <Nav.Link href='#link'>Link</Nav.Link>
            <NavDropdown title='Dropdown' id='basic-nav-dropdown'>
              <NavDropdown.Item href='#action/3.1'>Action</NavDropdown.Item>
              <NavDropdown.Item href='#action/3.2'>
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href='#action/3.3'>Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href='#action/3.4'>
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href='#user'>{this.props.account}</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
