import React from 'react';
import { format } from 'currency-formatter';
import { Card } from 'antd';
import { get } from 'lodash';
import './LoanCard.css';

const formatter = (text) => (!text) ? '' : format(text, { code: 'TH', precision: 0 })

const LoanCard = (props) => (
  <Card
    style={{ width: 280 }}
    hoverable
    cover={<img className="LoanCardImage" alt="example" src={props.imageUrl} width="250" height="130" />}
    onClick={get(props, 'onClick', () => {})}
  >
    {console.log('card props', props)}
    <Card.Meta
      title={props.title}
      description={
        // (!props.totalRequestAmount) ?
        // <div>...loading</div>
        // :
        <div className="LoanCardDescription">
          <div>ยอดกู้: {formatter(get(props, 'totalRequestAmount', '1,000,000'))}</div>
          <div>ระยะเวลาผ่อน: {get(props, 'loanTenor', '100')} เดือน</div>
          <div>ยอดผ่อน: {formatter(get(props, 'installmentAmount', '2,000'))} บาท</div>
          <div>อัตราดอกเบี้ย: %{get(props, 'interestRate', '5.8')}</div>
          <div>ยอดผ่อนขั้นต่ำ: {formatter(get(props, 'installment.minAmount', '10,000'))}</div>
          <div>ยอดผ่อนสูงสุด: {formatter(get(props, 'installment.maxAmount', '50,000'))}</div>
        </div>
      }
    />
  </Card>
);

export default LoanCard;