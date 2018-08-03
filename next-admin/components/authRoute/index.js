// 权限认证组件
import React from 'react'
import { connect } from 'react-redux'

import { sideBarActionAsync } from '../../store/actions/common'

@connect(
	null,
	{sideBarActionAsync}
)
class AuthRoute extends React.Component{
	componentDidMount() {
		const publicList = ['/login']
		const pathname = this.props.location.pathname
		const sideBarActionAsync = this.props.sideBarActionAsync
		if (publicList.indexOf(pathname)>-1) {
			return null
		}
		let permissionId = localStorage.getItem('permissionId')
		if(permissionId){
			this.props.sideBarActionAsync(permissionId)
		}else{
			// this.history.push('/login')
			// sideBarActionAsync()
		}
	}
	render(){
		return null
	}

}
export default AuthRoute