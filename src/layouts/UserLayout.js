import React from 'react';
import { Link } from 'react-router-dom';

class UserLayout extends React.Component {
  render() {
    return (
      <div>
        这是用户界面
        <br />
        <Link to="/">回到首页</Link>
        {/* <br />
        <Link to="/hello/1/2">hello</Link> */}
        <br />
        登录成功
        <br />
        {this.props.children}
      </div>
    );
  }
}

export default UserLayout;
