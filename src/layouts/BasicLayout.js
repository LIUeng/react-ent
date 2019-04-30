import React from 'react';
import { Link } from 'react-router-dom';
class BasicLayout extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <div>
        这是首页
        <br />
        <Link to="/user/login">用户登录</Link>
        <Link to="/hello/1">欢迎界面</Link>
        {children}
      </div>
    );
  }
}

export default BasicLayout;
