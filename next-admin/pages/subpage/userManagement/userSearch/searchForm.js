import React from 'react';
import { Form, Row, Col, Input, Button, Checkbox, DatePicker, Icon, Select, Modal } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const InputGroup  = Input.Group;
const CheckboxGroup = Checkbox.Group;
const { RangePicker } = DatePicker;

class SearchForm extends React.Component {

	
  	constructor() {
  		super();
  		this.state = {
		    startValue: null,
		    endValue: null,
		};
  	}

	disabledStartDate = (startValue) => {
		const endValue = this.state.endValue;
		if (!startValue || !endValue) {
			return false;
		}
		return startValue.valueOf() > endValue.valueOf();
	}

	disabledEndDate = (endValue) => {
    	const startValue = this.state.startValue;
    	if (!endValue || !startValue) {
      		return false;
    	}
    	return endValue.valueOf() <= startValue.valueOf();
	}

  	onChange = (field, value) => {
    	this.setState({
      		[field]: value,
    	});
	}

  	onStartChange = (value) => {
    	this.onChange('startValue', value);
  	}

  	onEndChange = (value) => {
    	this.onChange('endValue', value);
  	}

	handleSubmit(e) {
		e.preventDefault();
		this.props.form.validateFields((err, fieldsValue) => {
			if (err) {
				return;
			}

			let { startValue, endValue } = this.state;
			let userType = +fieldsValue['userType'];
      		let minUserLevel = fieldsValue['minLevel'];
      		let maxUserLevel = fieldsValue['maxLevel'];

      		let nickIds = fieldsValue['nickIds']
      		let nickName = fieldsValue['nickName']

      		//时间验证
      		if (startValue != null || endValue != null) {
				if (!nickIds && !nickName){
      				this.showErrorMsg('用户ID或昵称不能为空');
      				return ;
      			}
			}

			//用户类型验证
      		if (userType === 0 || userType === 2) {
      			if (!nickIds && !nickName){
      				this.showErrorMsg('用户ID或昵称不能为空');
      				return ;
      			}
      		}

      		//等级范围验证
      		let numberReg = /^\d+$/;
      		let isMinOk = numberReg.test(minUserLevel);
      		let isMaxOk = numberReg.test(maxUserLevel);
      		if (isMaxOk && isMinOk) {
      			if (+minUserLevel > +maxUserLevel){
      				this.showErrorMsg('用户等级输入错误');
      				return;
      			}else {
      				if (!nickIds && !nickName){
	      				this.showErrorMsg('用户ID或昵称不能为空');
	      				return ;
	      			}
      			}
      		}

      		//用户名验证
      		if (nickIds) {
      			let reg = /^\d+(,\d+)*$/;
      			if (!reg.test(nickIds)) {
      				this.showErrorMsg('用户ID仅可输入数字，并以英文逗号间隔');
      				return ;
      			}
      		}

      		this.props.handleSubmit({
		        nickIds: fieldsValue['nickIds'] || '',
		        phoneNum: fieldsValue['phoneNumber'] || '',
		        nickName: fieldsValue['nickName'] || '',
		        nickNameType: +fieldsValue['nickNameType'],
		        minUserLevel: minUserLevel || '',
		        maxUserLevel: maxUserLevel || '',
		        status: userType,
		        createFrom: startValue ? startValue.valueOf().toString() : '',
		        createTo: endValue ? endValue.valueOf().toString() : ''
      		})
		});	
	}

	showErrorMsg(msg) {
  		Modal.error({
		    content: msg,
		    okText: '确定'
		});
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		const { startValue, endValue, endOpen } = this.state;
		const selectAfter = getFieldDecorator('nickNameType', {
		      initialValue: '0',
		    })(
			<Select style={{ width: 80 }}>
				<Option value="0">模糊</Option>
				<Option value="1">精确</Option>
			</Select>
		);
		return (
			<div className="formWrap">
				<Form className="searchForm" onSubmit={this.handleSubmit.bind(this)}>
					<Row gutter={24}>
						<Col span={12} style={{ display:'block' }}>
							<FormItem label="用户ID">
					        	{getFieldDecorator('nickIds')(
					        		<Input placeholder="多个用,分开" />
					        	)}
					        </FormItem>
					    </Col>
					    <Col span={12} style={{ display:'block' }}>
					        <FormItem label="手机号">
					        	{getFieldDecorator('phoneNumber')(
					        		<Input />
					        	)}
					        </FormItem>
					    </Col>
					    <Col span={12} style={{ display:'block' }}>
					        <FormItem label="昵称">
					        	{getFieldDecorator('nickName')(
					        		<Input addonAfter={selectAfter} />
					        	)}
					        </FormItem>
					    </Col>
					    <Col span={12} style={{ display:'block' }}>
					        <FormItem label="用户状态">
					        	{getFieldDecorator('userType', {
					        		initialValue: '-1'
					        	})(
				        			<Select style={{ width: 120 }}>
										<Option value="-1">全部</Option>
										<Option value="0">正常</Option>
										<Option value="2">封号</Option>
									</Select>
					        	)}
					        </FormItem>
					    </Col>
					    <Col span={12} style={{ display:'block' }}>
					        <FormItem label="等级范围">
						    	<Col span={6}>
						    		<FormItem>
						    			{getFieldDecorator('minLevel')(
						        			<Input />
							        	)}
						        	</FormItem>
						    	</Col>
						    	<Col span={2}>
						    		<span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
						    			-
						    		</span>
						    	</Col>
						    	<Col span={6}>
						        	<FormItem>
						        		{getFieldDecorator('maxLevel')(
						        			<Input />
							        	)}
						       		</FormItem>
						    	</Col>
						    </FormItem>
					    </Col>
					    <Col span={12} style={{ display:'block' }}>
					        <FormItem label="注册时间">
					        	<Col span={10}>
						    		<FormItem>
						    			<DatePicker
											disabledDate={this.disabledStartDate}
											format="YYYY-MM-DD"
											value={startValue}
											placeholder="开始时间"
											onChange={this.onStartChange}
								        />
						        	</FormItem>
						    	</Col>
						    	<Col span={2}>
						    		<span style={{ display: 'inline-block', width: '100%', textAlign: 'center' }}>
						    			-
						    		</span>
						    	</Col>
						    	<Col span={10}>
						        	<FormItem>
						        		<DatePicker
											disabledDate={this.disabledEndDate}
											format="YYYY-MM-DD"
											value={endValue}
											placeholder="结束时间"
											onChange={this.onEndChange}
										/>
						       		</FormItem>
						    	</Col>
					        </FormItem>
					    </Col>
					</Row>
					<p className="footer">
						<Button type="primary" htmlType="submit">
		            		<Icon type="search" />搜索
		          		</Button>
					</p>
				</Form>
			</div>
		);
	}
}

const WrappedSearchForm = Form.create()(SearchForm);
export default WrappedSearchForm;