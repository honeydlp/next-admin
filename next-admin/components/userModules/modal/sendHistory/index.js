import React from 'react'
import { Modal } from 'antd';

import userConfig from '../../../..//utils/userConfig';
/*
@params
type
title,
visible,
content,
onCancel,
noDataTip
*/

class SendHistory extends React.Component {

	handleCancel = () => {
		this.props.onCancel && this.props.onCancel();
	}

	render() {

		const {type, content, noDataTip} = this.props;

		const modalConfig = {
			title: this.props.title,
			visible: this.props.visible,
			onCancel: this.handleCancel,
			footer: null,
		}

		return (
			<Modal { ...modalConfig }>
	      		{  (type === 'status') && content.map((item, i)=>(
	      			<div key={i} style={{marginBottom: 20}}>
	      				<p>
	      					<span className="record-time">{item.createTime}</span>
	      					<span style={{marginLeft: 5}}>
	      						<span style={{ color: 'red', marginRight: 5}}>{item.operator}</span>
	      						将其状态设置为：
	      						<span style={{ color: 'red'}}>{userConfig.statusList[item.status]}</span>
	      					</span>
	      				</p>
	      				<p>
	      					<span style={{ color: 'red'}}>原因：{item.reason}</span>
	      				</p>
	      				<p>
	      					<span style={{ color: 'red'}}>备注：{item.comment}</span>
	      				</p>
	      			</div>
	      			))
	      		}
	      		{ (type === 'system') && content.map((item, i)=>(
	      			<div key={i} style={{marginBottom: 20}}>
	      				<p>
	      					<span className="record-time">{item.messageOn}</span>
	      					<span style={{marginLeft: 5}}>
	      						<span style={{ color: 'red', marginRight: 5}}>{item.adminUserName}</span>
	      						发送系统消息
	      					</span>
	      				</p>
	      				<p>
	      					<span style={{ color: 'red'}}>内容：</span>
	      				</p>
	      				<p>
	      					<span style={{ color: 'red'}}>{item.content}</span>
	      				</p>
	      			</div>
	      			))
	      		}
	      		{
	      			(content.length < 1) && noDataTip 
	      		}
	        </Modal>
        );
	}
}

export default SendHistory;
