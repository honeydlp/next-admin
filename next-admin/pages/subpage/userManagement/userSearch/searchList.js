import React from 'react'
import { connect } from 'react-redux'
import { Icon, Table, Modal, Button } from 'antd';

import userConfig from '../../../../utils/userConfig';

import StatusModal from '../../../../components/userModules/modal/statusModal'
import SendHistory from '../../../../components/userModules/modal/sendHistory'
import SystemMsg from '../../../../components/userModules/modal/sendSysMsg'

import { asyncUserListLoad, changePageSize, delNickNameAction, delUserAvatarAction, delUserTagAction, showStatusHistoryAction, showMessageHistoryAction,
	 hideChangeHistoryAction, changeUserStatus, changePopularRank, changeLevelRank } from '../../../../store/actions/userSearch'

const textAlign = 'center';

@connect(
	state =>({user: state.userSearchReducer}),
	{changePageSize, asyncUserListLoad, delNickNameAction, delUserAvatarAction, delUserTagAction, showStatusHistoryAction, showMessageHistoryAction,
		 hideChangeHistoryAction, changeUserStatus, changePopularRank, changeLevelRank}
)

class SearchList extends React.Component{
	constructor() {
		super();
		this.state = {
			//查看图片
			imgVisible: false,
			modalImgUrl: '',

			//修改记录
			historyVisible: false,
			historyContent: '',

			//status modal
			type: '',
			statusSelected: 0,
			statusVisible: false,
			onOk: '',
			onCancel: this.hideStatusModal,

			//发送系统消息
			systemMsgVisible: false,
			sendToNickId: '',

			//选中行
			selectedRowKeys: '',
		}
		this.selectedRows = [];
	}

	getReloadData() {
  		return {
  			formData: this.props.user.formData,
  			pageNo: this.props.user.pageNo,
  			pageSize: this.props.user.pageSize
  		}
	}
	
	showImgModal(path) {
		this.setState({
			imgVisible: true,
			modalImgUrl: path
		})
	}

	hideImgModal = () => {
		this.setState({
			imgVisible: false
		})
	}

  	showStatusChangeHistory(userId) {
  		this.props.showStatusHistoryAction({
  			title: '用户状态变更记录',
  			noDataTip: '暂未变更记录',
  			userId: userId,
  		});
  	}

  	showSystemChangeHistory(userId) {
  		this.props.showMessageHistoryAction({
  			title: '系统消息发送记录',
  			noDataTip: '暂无系统消息发送记录',
  			userId: userId,
  		});
  	}

  	hideChangeHistory = () => {
  		this.props.hideChangeHistoryAction();
  	}

  	handleDelNickName(userId) {
  		let _this = this;
	 	Modal.confirm({
    		content: '是否删除该用户昵称',
    		onOk: function () {
    			_this.props.delNickNameAction({
    				userId
    			}, _this.getReloadData() )
    		}
  		});
  	}

  	handleDelUserAvatar(userId) {
  		let _this = this;
  		Modal.confirm({
    		content: '是否删除该用户头像',
    		onOk: function () { 
    			_this.props.delUserAvatarAction({
    				userId: userId
    			}, _this.getReloadData());
    		}
  		});
  	}

  	handleDelUserTag(userId) {
  		let _this = this;
  		Modal.confirm({
    		content: '是否删除该用户签名',
    		onOk: function () {
    			_this.props.delUserTagAction({
    				userId: userId
    			}, _this.getReloadData())
    		}
  		});
  	}

  	handleChangeUserStatus(record) {
  		let _this = this;
  		this.setState({
  			type: 'status',
			statusSelected: record.status,
			statusVisible: true,
			onOk: function (data) {
				_this.hideStatusModal();
				_this.props.changeUserStatus({
					userIds: [record.userId],
					status: data.selected,
					reason: data.subSelected,
					comment: data.remark
				}, _this.getReloadData());
			}
  		})
  	}
  	handleChangeUserStatusAll = () => {
  		let _this = this;
  		let selectedIds = this.selectedRows.map((item)=>(item.userId))
  		Modal.confirm({
    		content: '是否封禁所有选中的用户',
    		onOk: function () {
    			if (selectedIds.length < 1) return false;
    			_this.props.changeUserStatus({
					userIds: selectedIds,
					status: 2,
					reason: '',
					comment: ''
				}, _this.getReloadData());
    		}
  		});
  	}
  	hideStatusModal = () => {
  		this.setState({
  			statusVisible: false
  		})
  	}

  	handleSendSysMsg(nickId) {
  		this.setState({
  			systemMsgVisible: true,
			sendToNickId: nickId
  		})
  	}
  	hideSendSysMsg = () => {
  		this.setState({
  			systemMsgVisible: false,
			sendToNickId: ''
  		})
  	}

  	handleChangePopularRank() {
  		// this.props.changePopularRank();
  	}

  	handleChangeLevelRank(record) {
  		let _this = this;
  		let selected = record.expRankBan ? 1 : 0;
  		this.setState({
  			type: 'rank',
			statusSelected: selected,
			statusVisible: true,
			onOk: function (data) {
				_this.hideStatusModal();
				_this.props.changeLevelRank({
					userId: record.userId,
					rankType: 1,
					rankBanType: data.selected
				}, _this.getReloadData());
			}
  		})
  	}

  	handlePageChange = (pageNo, pageSize) => {
  		if (this.props.user.list.length < 1) {
  			this.props.changePageSize({
  				pageNo: pageNo - 1,
  				pageSize
  			})
  		}else {
  			this.clearSelectedRowKeys();
  			this.props.asyncUserListLoad({
	  			formData: this.props.user.formData,
	  			pageNo: pageNo - 1,
	  			pageSize
	  		})
  		}
  	}

  	handleChangeSelectedRowKeys = (selectedRowKeys, selectedRows) => {
	    this.selectedRows = selectedRows;
	    this.setState({
	    	selectedRowKeys
	    })
  	}
  	clearSelectedRowKeys() {
  		this.setState({
	    	selectedRowKeys: []
	    })
  	}

  	checkUserPermiss(id) {
  		let permissionId = localStorage.getItem('permissionId');
  		return permissionId.indexOf(id) !== -1;
  	}

	render () {

		let _this = this;
		const user = this.props.user;

		const columns = [{
			title: '用户ID',
			dataIndex: 'nickId',
			align: textAlign
		},{
			title: '昵称',
			dataIndex: 'nickName',
			align: textAlign,
			render: function (name, record) {
				return (
					<div className="close-box">
						<span style={{marginRight: '3px'}}>{name}</span>
						{ userConfig.gender(record.gender) }
						{_this.checkUserPermiss('10003') && <Icon onClick={function (){_this.handleDelNickName(record.userId)}} className='close-btn' type="close" />}
					</div>
				);
			}
		},{
			title: '头像',
			dataIndex: 'headerThumb',
			className: 'user-avatar',
			align: textAlign,
			render: function  (path, record) {
				return (
					<div className="close-box">
						<img src={path} onClick={function (){_this.showImgModal(path)}} />
						{_this.checkUserPermiss('10004') && <Icon className='close-btn' type="close" onClick={function (){_this.handleDelUserAvatar(record.userId)}}/> }
					</div>
				)
			}
		},{
			title: '签名',
			dataIndex: 'signature',
			align: textAlign,
			render: function (tag, record) {
				return (
					<div className="close-box">
						<span>{tag}</span>
						{_this.checkUserPermiss('10005') && <Icon className='close-btn' type="close" onClick={function (){_this.handleDelUserTag(record.userId)}} />}
					</div>
				);
			}
		},{
			title: '等级经验',
			dataIndex: 'level',
			align: textAlign,
			render: function (level) {
				return ('Lv' + level);
			}
		},{
			title: '手机号',
			dataIndex: 'registerType',
			align: textAlign
		},{
			title: '注册时间',
			dataIndex: 'registerTime',
			align: textAlign
		},{
			title: '状态',
			dataIndex: 'status',
			align: textAlign,
			render: function (status, record) {
				let className = userConfig.statusList[status] === '正常' ? 'status-normal' : 'status-disabled';
				let text = userConfig.statusList[status];
				return (
					<div className='status-box'>
						<p>
							{ _this.checkUserPermiss('10001') && <span className={className} onClick={function (){_this.handleChangeUserStatus(record)}}><Icon type="form" /> 状态： {text}</span> }
							{ _this.checkUserPermiss('10006') && <span className="info-more" onClick={function (){_this.showStatusChangeHistory(record.userId)}}><Icon type="plus-square-o" /></span> }
						</p>
						<p>
							{ _this.checkUserPermiss('14001') && <span className="msg-list" onClick={function (){_this.handleSendSysMsg(record.nickId)}}>系统消息</span> }
							{ _this.checkUserPermiss('14003') && <span className="info-more" onClick={function (){_this.showSystemChangeHistory(record.userId)}}><Icon type="plus-square-o" /></span> }
						</p>
					</div>
				);
			}
		},{
			title: '榜单屏蔽',
			dataIndex: 'expRankBan',
			align: textAlign,
			render: function (shield, record) {
				let popularClassName = record.popRankBan ? 'status-disabled' : 'status-normal';
				let levelClassName = record.expRankBan ? 'status-disabled' : 'status-normal';
				return (
					<div className='status-box'>
						{/*<p style={{marginBottom: 7}}>
							<span className={popularClassName} onClick={function (){_this.handleChangePopularRank(record)}}>人气榜： {record.popRankBan ? userConfig.rankBanList[1] : userConfig.rankBanList[0]}</span>
						</p>*/}
						<p>
							{_this.checkUserPermiss('10002') && <span className={levelClassName} onClick={function (){_this.handleChangeLevelRank(record)}}>等级榜： {record.expRankBan ? userConfig.rankBanList[1] : userConfig.rankBanList[0]}</span>}
						</p>
					</div>
				);
			}
		}];

	    let paginationConfig = {
	    	showQuickJumper: true,
	    	showSizeChanger: true,
	    	defaultPageSize: user.pageSize,
	    	defaultCurrent: 1,
	    	current: user.pageNo + 1,
	    	total: user.totalRecords,
	    	pageSizeOptions: ['10','25','50','100'],
	    	onChange: this.handlePageChange,
	    	onShowSizeChange: this.handlePageChange
	    }


	    const tableConfig = {
	    	bordered: true,
	    	dataSource: user.list,
	    	columns: columns,
	    	pagination: paginationConfig,
	    	rowSelection: {
	    		onChange: this.handleChangeSelectedRowKeys,
	    		selectedRowKeys: this.state.selectedRowKeys
	    	},
	    	rowKey: function (record) { return record.userId }
	    }

	    let statusConfig = {
	    	type: this.state.type,
			selected: this.state.statusSelected,
			visible: this.state.statusVisible,
			onOk: this.state.onOk,
			onCancel: this.state.onCancel
	    }

	    let { changeHistory } = user;
	    changeHistory.onCancel = this.hideChangeHistory;

		return (
			<div className="table-main">
				<Button type="primary" onClick={this.handleChangeUserStatusAll} style={{marginBottom: 7}}>全部封号</Button>
				<Table {...tableConfig} />
				<Modal visible={this.state.imgVisible} footer={null} onCancel={this.hideImgModal}>
	          		<img style={{ width: '100%' }} src={this.state.modalImgUrl} />
		        </Modal>
		        <SendHistory { ...changeHistory } />
		        <StatusModal {...statusConfig} />
		        <SystemMsg visible={this.state.systemMsgVisible} nickId={this.state.sendToNickId} onCancel={this.hideSendSysMsg} onOk={this.hideSendSysMsg} />
	        </div>
		)
	}
}

export default SearchList;