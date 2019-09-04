import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox, Modal } from 'antd';
import api from '../Services/api';

class NormalLoginForm extends React.Component {


  handleSubmit = async (e) => {
    e.preventDefault();
    this.props.closeModal();
    const response = await api.fetchAccessToken();
    console.log('here', response);
    this.props.setBearerToken(response.data.data);
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        
      }
    });

  };

  render() {
    const { getFieldDecorator, visible, title } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
          <Link className="login-form-forgot" href="/">
            Forgot password
          </Link>
          <div>
            <Button type="primary" style={{ width: '100%' }} htmlType="submit" className="login-form-button">
              Log in
            </Button>
          </div>
          <div>
            <Button type="primary" style={{ width: '100%' }} htmlType="submit" className="login-form-button">
              OAuths
            </Button>
          </div>
          Or <Link to="/">register now!</Link>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default WrappedNormalLoginForm;