import React, { Component } from 'react';

interface Props {}

interface State {}

export default class PermitApproval extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        This is a page for Authority to approve or deny permit approvals. Maybe
        turn it into generic and do the same for Loan.
      </div>
    );
  }
}
