import React from 'react';
import { Avatar, Form, Button, Modal } from 'antd';
import { Link } from 'react-router-dom';
import { isNull } from 'lodash';
import api from '../Services/api';
import LoginForm from './LoginForm';

import SCBLogo from '../images/scb-logo.jpg';
import AvatarImage from '../images/avatar.png';
import './Header.css';

class HeaderComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { bearerToken: undefined, visible: false, loading: false }
  }

  componentDidMount() {
    console.log('mount');
    if(!isNull(localStorage.getItem('bearerToken')))
      this.setState({ bearerToken: localStorage.getItem('bearerToken')})
    // To disabled submit button at the beginning.
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  setBearerToken = (value) => {
    this.setState({ bearerToken: value });
  }

  onLogout = () => {
    this.setState({ bearerToken: null });
    localStorage.removeItem('bearerToken');
  }

  render() {
    console.log(this.state);
    const { visible, loading, bearerToken } = this.state;

    return (
      <div className="Header">
        <Link to='/'><img className="scb-logo" src={SCBLogo} /></Link>
        <React.Fragment>
          {this.state.bearerToken ? (
            <div className="login-button-span">
              <img className="avatar" src={AvatarImage} alt="avatar"/>
              <Button className="login-button" onClick={this.onLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <React.Fragment>
              <Button type="primary" className="login-button" onClick={this.showModal}>
                Login
              </Button>
              <Modal
                visible={visible}
                title="Title"
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={null}
              >
                <LoginForm closeModal={this.handleCancel} setBearerToken={this.setBearerToken} />
              </Modal>
            </React.Fragment>
          )}
        </React.Fragment>
      </div>
    );
  }
}

const WrappedHeader = Form.create({ name: 'login' })(HeaderComponent);

export default WrappedHeader;
