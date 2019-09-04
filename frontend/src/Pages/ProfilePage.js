import React, { Component } from 'react';
import { get, map, pick } from 'lodash';
import { Button, Input, Form } from 'antd';
import api from '../Services/api';
import './Profile.css';

function onChange(a, b, c) {
  console.log(a, b, c);
}

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = { data: {} };
  }

  async componentDidMount() {
    const result = await api.fetchProfile();
    this.setState({ data: get(result, ['data', 'profile'], {}) });
  }

  renderFormItem = (label, value) => (
    <Form.Item key={label} label={label}>
      <Input value={value}/>
    </Form.Item>
  );

  render () {
    const rows = pick(this.state.data, [
      'citizenID',
      'thaiFirstName',
      'thaiLastName',
      'engFirstName',
      'engLastName',
      'birthDate',
      'genderCode',
      'mobile',
      'email',
    ]);
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      labelAlign: 'left',
    };
    return (
      <div className="Profile">
        <h1>Profile</h1>
        <Form {...formItemLayout} onClick={() => {}}>
          {map(rows, (value, key) => this.renderFormItem(key, value))}
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form>
      </div>
    );
  }
}

export default ProfilePage;