// 侧边栏导航
import React from 'react'
import { Menu, Icon } from 'antd'
import Link from 'next/link'
import { connect } from 'react-redux'
import './index.css'
const SubMenu = Menu.SubMenu;

@connect(
  state=>({navList:state.sideBarReducer})
)

class SideBar extends React.Component{
  componentDidMount(){
    let permissionId=localStorage.getItem('permissionId') || ''
  }
  render(){
    const navList = this.props.navList;
    return (
      <div style={{position:'relative' }} id="sideBar-warp">
         <h3 style={{fontSize:'18px',color:'#fff',paddingLeft:'24px',margin:0,marginTop:'6px'}}>后台管理</h3>
        <Menu
          mode="inline"
          theme="dark"
        >
          {
            navList.map(val => {
             return (
              val.path?(
              <Menu.Item key={val.id}>
                <Link href={val.path}>
                  <a>
                    <Icon type={val.icon} />{val.name}
                  </a>
                </Link>
              </Menu.Item>):(
                <SubMenu key={Math.random()} title={<span><Icon type={val.icon} /><span>{val.name}</span></span>}>
                  { 
                    val.subMenu.map( item => {
                      return (
                      <Menu.Item key={item.id}>
                        <Link href={item.path}>
                          <a>
                            <Icon type={item.icon} />{item.name}
                          </a>
                        </Link>
                      </Menu.Item>)
                    })
                  }
                </SubMenu>
              )
            )
          })
          }
        </Menu>
        <p style={{color:'#fff',position:'absolute',left:'24px',bottom:'-16px'}}>&copy;假面科技</p>
      </div>
    )
  }
}
export default SideBar