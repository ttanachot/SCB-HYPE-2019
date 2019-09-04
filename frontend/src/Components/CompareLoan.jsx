import React from 'react';
import { map, get } from 'lodash';
import LoanCard from './LoanCard';
import plan1 from '../images/speedy-loan-banner-web.jpg';
import plan2 from '../images/mcmc-web-banner.jpg';
import plan3 from '../images/your-loan.jpg';
import './CompareLoan.css';

const CompareLoan = (props) => {
  const { onClick, data, title } = props;
  const cards = [
    {
      onClick,
      title: 'Speedy Loan',
      ...(data && data[0]) ? data[0] : null,
      loanTenor: 70,
      installmentAmount: get(data, [0, 'installment', 'minAmount'], null),
      imageUrl: plan1,
    },
    {
      onClick,
      title: 'Super Loan',
      ...(data && data[1]) ? data[1] : null,
      loanTenor: 7,
      installmentAmount: get(data, [1, 'installment', 'maxAmount'], null),
      imageUrl: plan2,
    },
    {
      onClick,
      title: 'Special Loan',
      ...(data && data[2]) ? data[2] : null,
      loanTenor: 11,
      installmentAmount: (get(data, [2, 'installment', 'maxAmount'], 0) + get(data, [2, 'installment', 'minAmount'], 0)) / 2,
      imageUrl: plan3, 
    }
  ];
  return (
    <div className="CompareLoan">
    <h2>{ title || 'สินเชื่อสำหรับคุณ' }</h2>
      {console.log('data1', data[1])}
      <div className="CompareLoanContainer">
        {map(cards, (value, key) => <LoanCard key={key} {...value} />)}
      </div>
    </div>
  );
};

export default CompareLoan;