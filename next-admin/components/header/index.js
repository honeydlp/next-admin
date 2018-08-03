// 头部
import React from 'react'
import { connect } from 'react-redux'
import { Menu, Dropdown } from 'antd'
import Router from 'next/router'

import './index.css'

 

@connect(
  state => ({user:state.userReducer}),
  null
)
class Header extends React.Component{
  goLogin(){
    localStorage.removeItem('permissionId');
    localStorage.removeItem('token');
    Router.push('/login');
  }

  render(){ 
     const menu = (
        <Menu>
          <Menu.Item>
            <div onClick={()=>{this.goLogin()}}>退出</div>
          </Menu.Item>
        </Menu>
      );
    let lcName = 1;
    let userName = lcName?lcName:this.props.user.username.value;
    return (
      <div id="header-wraper">
        <div className="header-user-box">
        <Dropdown overlay={menu}>
          <div>
            <img className="header-user-logo" src='/static/images/icon.png'  alt="pic"/>
            <span className="header-user-name">{userName}</span>
          </div>    
        </Dropdown>
        </div>
      </div>
    )
  }
}

export default Header