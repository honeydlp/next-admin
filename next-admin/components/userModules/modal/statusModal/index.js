import React from 'react';
import { Select, Input, Modal } from 'antd';

import userConfig from '../../../..//utils/userConfig';

import './index.css';

const Option = Select.Option;

/*
type: status | rank
title
onOk
onCancel,
visible,
selected,
hasSubSelect,
list:[]
*/

class StatusModal extends React.Component {
    constructor () {
        super();
        this.state = {
            subSelectVisible: false,
            selected: '',
            subSelected: '',
            remark: '',
            canUseProps: true,
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.visible) {
            let visible = false;
            if (nextProps.type === 'status') {
                if (prevState.canUseProps && +nextProps.selected === 2) {
                    visible = true;
                }
                if (!prevState.canUseProps && +prevState.selected === 2) {
                    visible = true;
                }
            }
            return {
                subSelectVisible: visible ? 'inline-block' : 'none',
                selected: prevState.canUseProps ? nextProps.selected + '' : prevState.selected,
                subSelected: prevState.canUseProps ? userConfig.reasonList[0] + '' : prevState.subSelected,
                canUseProps: false,
            }
        }else {
            return {
                subSelectVisible: false,
                selected: '',
                subSelected: '',
                remark: '',
                canUseProps: true,
            }
        }
    }

    handleOk = () => {
        this.props.onOk && this.props.onOk({
            selected: this.state.selected,
            subSelected: (this.props.type === 'status' && this.state.selected === '2') ? this.state.subSelected : '',
            remark: this.state.remark,
        });
    }
    handleCancel = () => {
        this.props.onCancel && this.props.onCancel();
    }  

    handleSelectChange = (index) => {
        this.setState({
            selected: index
        })

    }
    handleSubSelectChange = (item) => {
        this.setState({
            subSelected: item
        })
    }
    handleInputChange = (e) => {
        this.setState({
            remark: e.target.value
        })
    }

    render() {

        let title = '',hasRemark = '',list = [],subList = [];
        if (this.props.type === 'status') {
            title = '用户状态更改';
            hasRemark = true;
            list = userConfig.statusList;
            subList = userConfig.reasonList;
        }
        if (this.props.type === 'rank') {
            title = '等级榜屏蔽';
            hasRemark = false;
            list = userConfig.rankBanList;
            subList = [];
        }

        const modalConfig = {
            visible: this.props.visible || false,
            title: title,
            onOk: this.handleOk,
            onCancel: this.handleCancel,
            maskClosable: false,
        }
        //备注
        let remarkHtml = hasRemark ?  (<p style={{marginTop: 25}}>
                        备注： <Input value={this.state.remark} onChange={this.handleInputChange} style={{width: 300}} />
                    </p>) : '';

        //封号、正常
        let options = [];
        for (let key in list) {
            options.push(<Option key={key} value={key}>{ list[key] }</Option>)
        }
        
        return (
            <div className="statusModal">
                <Modal {...modalConfig}>
                    <Select value={list[this.state.selected]} style={{ width: 120}} onChange={this.handleSelectChange}>
                        { options }
                    </Select>
                    <Select value={this.state.subSelected} style={{ width: 240, marginLeft: 10, display: this.state.subSelectVisible}} onChange={this.handleSubSelectChange}>
                        { subList.map((item, i) => (<Option key={i} value={item}>{ item }</Option>)) }
                    </Select>
                   { remarkHtml }
                </Modal>
            </div>
        )
    }
}

export default StatusModal;