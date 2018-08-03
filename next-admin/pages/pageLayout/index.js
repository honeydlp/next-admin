import React from 'react'
import { connect } from 'react-redux'
import Router from 'next/router'
import {sideBarActionAsync} from '../../store/actions/common'
import './index.css'

//component
import Header from '../../components/header'
//sidebar
import  SideBar from '../../components/sideBar'

@connect(
  state=>({sideBarReducer:state.sideBarReducer}),
  {sideBarActionAsync}
)
class Layout extends React.Component{
  static async getInitialProps({ req }) {
    if(!!req){
      
    }
    return {  }
  }
  componentDidMount(){
    localStorage.getItem('token')?'':Router.push('/login')
  }
  componentWillReceiveProps(){
    localStorage.getItem('token')?'':Router.push('/login')
  }
  render(){
    return (
        <div>    
          <Header />
          <div className="layout-wraper">
            <SideBar navList={this.props.sideBarReducer}/>
            <div className="layout-main">
               {this.props.children}
            </div>
          </div>
        </div>
    )
  }
}
export default Layout