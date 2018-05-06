import React, { Component } from 'react';

export default class Spreadsheet extends Component {

  componentDidMount() {
    this.props.onDidMount();
  }

  componentWillUnmount() {
    this.props.onWillUnmount();
  }

  render() {
    return (
      <div className="container">
        Spreadsheet
      </div>
    );
  }

}
