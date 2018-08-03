// 头部公用 整合
import React from 'react';
import { connect } from 'react-redux'
import { withRouter } from 'next/router'

import Crumbs from '../../../components/crumbs';

import './index.css';

let filterCrumbs = (sideBar,pathname) =>{
	let pathConfig = []
	sideBar.map( val =>{
		if(val.path){
			if(val.path === pathname){
				pathConfig.push({
					path: val.path,
					pathname: val.name
				})
			}
		}else{
			val.subMenu.map( item => {
				if(item.path === pathname){
					pathConfig = [{
						path: '',
						pathname: val.name
					},
					{
						path: item.path,
						pathname: item.name
					}]
				}
			} )
		}
	} )
	return pathConfig
}

@withRouter
@connect(
    state=>({sideBarReducer:state.sideBarReducer}),
    null
)

class ManageContainer extends React.Component {
	render () {
		let  path = this.props.router.asPath;
		let sideBar = this.props.sideBarReducer;
		let pathConfig = filterCrumbs(sideBar,path)
		let title = pathConfig[0]?pathConfig[(pathConfig.length-1)]['name']:''
		return (
			<div>
				<div className='manage-container-topic'>
					<h3>{ title }</h3>
				</div>
				<Crumbs pathConfig={ pathConfig } />
				<div>
					{ this.props.children }
				</div>
			</div>
		);
	}
}

export default ManageContainer;