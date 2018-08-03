import React from 'react';
import { tagArr } from 'src/utils/index2Text'
import {
    Modal, Select
} from 'antd';

const Option = Select.Option;

/*
received props
所有参数都为可选
title: ''
visible
onOk : (value)=>{
    value = {
        type: selected
    }
}
onCancel
selected: '1',
*/

class TagModal extends React.Component {
    constructor () {
        super();
        this.defaultTitle = '修改标签';
        this.state = {
            selected: 0
        }
    }
    componentWillReceiveProps(props) {
        this.setState({
            selected: props.selected
        })
    }
    handleOk() {
        this.props.onOk && this.props.onOk({
            type: this.state.selected
        });
    }
    handleCancel() {
        this.props.onCancel && this.props.onCancel();
    }
    handleSelectChange(value) {
        this.setState({
            selected: value
        })
    }
    render() {
        const modalConfig = {
            visible: this.props.visible || false,
            title: this.props.title || this.defaultTitle,
            cancelText: '取消',
            okText: '确认',
            onOk: this.handleOk.bind(this),
            onCancel: this.handleCancel.bind(this)
        }

        let selected = (this.state.selected > -1) ? this.state.selected : (this.props.selected || 0);
        let options = tagArr.map((item, i) => (<Option key={i} value={i}>{ item }</Option>));

        return (
            <div className="tagModal">
                <Modal {...modalConfig}>
                    <Select value={selected} style={{ width: 120 }} onChange={this.handleSelectChange.bind(this)}>
                        { options }
                    </Select>
                </Modal>
            </div>
        )
    }
}

export default TagModal;