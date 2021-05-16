import React, { Component } from 'react';
import { Spinner } from 'react-bootstrap';

interface Props {}

interface State {}

export default class LoadSpinner extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className='d-flex justify-content-center'>
        <Spinner animation='border' />
        <span className='sr-only'>Loading...</span>
      </div>
    );
  }
}
