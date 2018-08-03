import React from 'react';
import { Modal, Input } from 'antd';
import { sendJpush } from '../../../../store/actions/other'

const { TextArea } = Input;

class SystemMsg extends React.Component {
	constructor() {
		super();
		this.msg = '';
	}
	handChangeMsg = (e) => {
		this.msg = e.target.value;
	}
	render() {
		const modalConfig = {
			title: '系统消息发送',
			visible: this.props.visible,
			destroyOnClose: true,
			onOk: ()=>{
				let res = sendJpush({
					nickId: this.props.nickId,
					content: this.msg,
					sendType: 'someone',
					device: 0,
					isMessageOnly: 0,
				});
				if (res) {
					this.props.onOk && this.props.onOk();
				}
			},
			onCancel: ()=>{
				this.props.onCancel && this.props.onCancel();
			}
		};

		return (
			<Modal {...modalConfig}>
				<TextArea onChange={this.handChangeMsg} rows={4} />
			</Modal>
		)
	}
}

export default SystemMsg;