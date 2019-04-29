import React from 'react';
import { Link } from 'react-router-dom';

class BasicLayout extends React.PureComponent {
  render() {
    return (
      <div>
        hello first see you
        <br />
        <Link to="/">home</Link>
        <br />
        <Link to="/user">user</Link>
        <br />
        <Link to="/hello">hello</Link>
        <br />
        <Link to="/hello/1">1</Link>
        {this.props.children}
      </div>
    );
  }
}

export default BasicLayout;
