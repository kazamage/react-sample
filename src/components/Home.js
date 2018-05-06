import React, { Component } from 'react';
import { Button } from 'antd';
import '@/style/Home.css';

export default class Home extends Component {

  componentDidMount() {
    this.props.onDidMount();
  }

  componentWillUnmount() {
    this.props.onWillUnmount();
  }

  render() {
    return (
      <div className="container">
        <div className="content-body home">
          <div>Notification</div>
          <div className="button-group">
            <Button onClick={() => this.props.success('notification')}>Success</Button>
            <Button onClick={() => this.props.info('notification')}>Info</Button>
            <Button onClick={() => this.props.warning('notification')}>Warn</Button>
            <Button onClick={() => this.props.error('notification')}>Error</Button>
          </div>
          <div>Message</div>
          <div className="button-group">
            <Button onClick={() => this.props.message().success('message')}>Success</Button>
            <Button onClick={() => this.props.message().info('message')}>Info</Button>
            <Button onClick={() => this.props.message().warning('message')}>Warn</Button>
            <Button onClick={() => this.props.message().error('message')}>Error</Button>
          </div>
          <div>Modal</div>
          <div>
            <Button onClick={() => this.props.showModal({ title: 'Title', body: <p>Message</p> })}>Show Modal</Button>
          </div>
        </div>
      </div>
    );
  }

}
