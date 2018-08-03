// 面包屑导航 形如 举报管理/举报查询
//从父组件接受path参数，格式如下：
// [
// 	{
// 		path: '/user',
// 		pathname: '用户查询'
// 	}
// ]
import React from 'react';
import Link from 'next/link'
import { Breadcrumb } from 'antd';

import './index.css';

class Crumbs extends React.Component {
	render () {

		const pathConfig = this.props.pathConfig || [];
		const extraBreadcrumbItems = pathConfig.map((item) => {
			return (
				<Breadcrumb.Item key={item.path}>
					{item.path?<Link href={item.path}><a>{ item.pathname }</a></Link>:item.pathname }
				</Breadcrumb.Item>
			);
		});

		return (
			<div>
				<Breadcrumb style={{ margin: '16px 0', backgroundColor: '#eee', padding: '8px'}}>
			    	{extraBreadcrumbItems}
			    </Breadcrumb>
			</div>
		);
	}
}

export default Crumbs