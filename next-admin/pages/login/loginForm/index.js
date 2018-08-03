import React from 'react'
import { connect } from 'react-redux'
import { login } from '../../../store/actions/login'
import { sideBarActionAsync } from '../../../store/actions/common'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import Router from 'next/router'

import './index.css'
const FormItem = Form.Item;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

@connect(
    null,
    {login,sideBarActionAsync}
)

class NormalLoginForm extends React.Component {
    componentDidMount() {
        this.props.form.validateFields();
      }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                await this.props.login(values)
                let sideBar = await this.props.sideBarActionAsync()
                let url = sideBar[0].path ||  sideBar[0]['subMenu'][0]['path'];
                Router.push('/layout')
            }
        });
    }
  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    const userNameError = isFieldTouched('username') && getFieldError('username');
    const passwordError = isFieldTouched('password') && getFieldError('password');
    return (
        <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem
            validateStatus={userNameError ? 'error' : ''}
            help={userNameError || ''}
            >
            {getFieldDecorator('username', {
                rules: [{ required: true, message: '请输入用户名' }],
            })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
            )}
            </FormItem>
            <FormItem
            validateStatus={passwordError ? 'error' : ''}
            help={passwordError || ''}
            >
            {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码' }],
            })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
            </FormItem>
            <FormItem>
                {getFieldDecorator('remember', {
                    valuePropName: 'checked',
                    initialValue: false,
                })(
                    <Checkbox style={{color:'#fff'}}>记住我</Checkbox>
                )}
                <Button
                    type="primary"
                    htmlType="submit"
                    disabled={hasErrors(getFieldsError())}
                    className="login-form-button"
                >
                登录
                </Button>
            </FormItem>
      </Form>
    );
  }
}
const WrappedHorizontalLoginForm = Form.create({
      mapPropsToFields(props) {
        return {
          username: Form.createFormField({
            ...props.username,
            value: props.username.value,
          }),
          password: Form.createFormField({
            ...props.password,
            value: props.password.value,
          }),
          remember: Form.createFormField({
            ...props.remember,
            value: props.remember.value,
          }),
        };
      }
})(NormalLoginForm);
export default WrappedHorizontalLoginForm