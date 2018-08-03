import React from 'react'
import { connect } from 'react-redux'
import WrappedHorizontalLoginForm from './loginForm/index'
import './index.css'

@connect(
  state =>({user:state.userReducer}),
  null
)

class Login extends React.Component{
  static async getInitialProps ({pathname,query,req,res,jsonPageRes,err}) {
    // eslint-disable-next-line no-undef
    //console.log(pathname,query,req,res,jsonPageRes,err)
    return {  }
  }
  render(){
    return (
      <div id="login-warp">
        <div className="login-main">
          <div className="login-title">后台管理系统</div>
          <WrappedHorizontalLoginForm {...this.props.user} />
        </div>
       </div>
    )
  }
}

export default Login