import React, { Component } from 'react';
import _ from 'lodash';
import ResponsiveContainer from '@/components/common/ResponsiveContainer';
import CSChart from './CSChart';

export default class CandleStickChart extends Component {

  componentDidMount() {
    this.props.onDidMount();
  }

  componentWillUnmount() {
    this.props.onWillUnmount();
  }

  render() {
    const { data } = this.props;
    if (_.isEmpty(data)) {
      return <div className="container">Loading...</div>;
    }
    return (
      <div className="container">
        <ResponsiveContainer debounce={1}>
          <CSChart data={data} />
        </ResponsiveContainer>
      </div>
    );
  }

}
