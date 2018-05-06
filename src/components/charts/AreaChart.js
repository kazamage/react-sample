import React, { Component } from 'react';
import { AreaChart as RAreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import ResponsiveContainer from '@/components/common/ResponsiveContainer';

export default class AreaChart extends Component {

  componentDidMount() {
    this.props.onDidMount();
  }

  componentWillUnmount() {
    this.props.onWillUnmount();
  }

  render() {
    return (
      <div className="container">
        <ResponsiveContainer debounce={1}>
          <RAreaChart data={this.props.data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type='monotone' dataKey='uv' stackId="1" stroke='#8884d8' fill='#8884d8' />
            <Area type='monotone' dataKey='pv' stackId="1" stroke='#82ca9d' fill='#82ca9d' />
            <Area type='monotone' dataKey='amt' stackId="1" stroke='#ffc658' fill='#ffc658' />
          </RAreaChart>
        </ResponsiveContainer>
      </div>
    );
  }

}
