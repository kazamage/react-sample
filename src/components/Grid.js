import React, { Component } from 'react';

export default class Grid extends Component {

  componentDidMount() {
    this.props.onDidMount();
  }

  componentWillUnmount() {
    this.props.onWillUnmount();
  }

  render() {
    return (
      <div className="container">
        Grid
      </div>
    );
  }

}
