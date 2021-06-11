import { Button } from 'react-bootstrap';
import React, { Component } from 'react';

interface Props {
  text: string;
  handleClick: void;
}

interface State {}

export default class ActionButton extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    const { handleClick, text } = this.props;
    return (
      <Button variant='outline-primary' onClick={() => handleClick}>
        {text}
      </Button>
    );
  }
}
