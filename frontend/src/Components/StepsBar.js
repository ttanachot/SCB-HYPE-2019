import React from 'react';
import { Steps } from 'antd';

const { Step } = Steps;

class StepsBar extends React.Component {
  render(){
    console.log('this.props. step', this.props.current);
    return (
      <div style={{ textAlign: 'start'}}>
        <Steps progressDot current={this.props.current}>
          <Step title="1. กรอกข้อมูล">1</Step>
          <Step title="2. เปรียบเทียบสินเชื่อที่คุณต้องการ">2</Step>
          <Step title="3. ส่งคำขอสินเชื่อ">3</Step>
        </Steps>
      </div>
    )
  }
};

export default StepsBar;