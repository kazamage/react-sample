import React, { Component } from 'react';
import { LineChart as RLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import ResponsiveContainer from '@/components/common/ResponsiveContainer';

export default class LineChart extends Component {

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
          <RLineChart data={this.props.data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </RLineChart>
        </ResponsiveContainer>
      </div>
    );
  }

}
