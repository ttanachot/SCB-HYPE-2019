import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { get, map, pick } from 'lodash';
import { Button, Input, Form, Icon } from 'antd';
import api from '../Services/api';
import HomeJumbo from '../images/home-jumbo.png';
import HYDElogo from '../images/hyde-logo.png';
import './HomePage.css';



class HomePage extends Component {
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
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'center', height: '370px', maxWidth: '100%', maxHeight: '100%', backgroundImage: `url("${HomeJumbo}")` }}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center' }}>
            <img src={HYDElogo} alt="logo" style={{ height: '150px', width: '150px' }} />
            <div style={{ color: 'white', fontSize: '70px', marginTop: '-20px', marginBottom: '-20px', fontFamily: 'Arial rounded MT bold' }}>SNAP LOAN!</div>
            <div style={{ marginBottom: '40px', fontSize: '14px', color: 'white' }}>ช่วยคุณหาสินเชื่อที่เหมาะกับคุณ</div>
            <div>
              <Link to="/loan-search" className="begin-button"><button className="begin-button">ค้นหาสินเชื่อที่เหมาะกับคุณ</button></Link>
            </div>
          </div>
        </div>
        <div className="home-page-bottom-section">
          <div className="bottom-section-box">
            <div className="section-box-top">
              <Icon className="section-icon" type="edit" />
            </div>
            <div className="section-box-bottom">
              <h3>1. กรอกข้อมูล</h3>
            </div>
          </div>
          <div className="bottom-section-box">
            <Icon className="arrow-right" type="arrow-right" />
          </div>
          <div className="bottom-section-box">
            <div className="section-box-top">
                <Icon className="section-icon" type="bar-chart" />
            </div>
            <div className="section-box-bottom">
              <h3>2. เปรียบเทียบสินเชื่อที่คุณสามารถกู้ได้</h3>
            </div>
          </div>
          <div className="bottom-section-box">
            <Icon className="arrow-right" type="arrow-right" />
          </div>
          <div className="bottom-section-box">
            <div className="section-box-top">
                <Icon className="section-icon" type="file-done" />
            </div>
            <div className="section-box-bottom">
              <h3>3. ส่งคำขอสินเชื่อ</h3>
            </div>
          </div>
        </div>
        {/* <div style={{ display: 'flex', justifyContent: 'space-around'  }}>
          <h1><Link to='/loan-compare'> loan_compare </Link></h1>
          <h1><Link to='/loan-search'> loan_search </Link></h1>
          <h1><Link to='/profile'> profile </Link></h1>
        </div> */}
      </div>
    );
  }
}

export default HomePage;