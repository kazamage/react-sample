import React, { Component } from 'react';
import { BarChart as RBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import ResponsiveContainer from '@/components/common/ResponsiveContainer';

export default class BarChart extends Component {

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
          <RBarChart data={this.props.data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" stackId="a" fill="#8884d8" />
            <Bar dataKey="uv" stackId="a" fill="#82ca9d" />
          </RBarChart>
        </ResponsiveContainer>
      </div>
    );
  }

}
