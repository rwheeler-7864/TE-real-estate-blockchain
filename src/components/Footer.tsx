import React, { Component } from 'react';
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from 'react-bootstrap';

interface Props {}

interface State {}

export default class Footer extends Component<Props, State> {
  render() {
    return <Navbar bg='light' expand='lg'>Footer</Navbar>;
  }
}
