import React, { Fragment } from 'react';
import { withRouter } from 'react-router';
import { get, map } from 'lodash';
import CompareLoan from '../Components/CompareLoan';
import StepBars from '../Components/StepsBar';
import api from '../Services/api';
import './LoanComparePage.css';

class LoanComparePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: {} };
  }

  async componentDidMount () {
    const loanAmount = parseInt(localStorage.getItem('loanAmount'));
    const assetCar = localStorage.getItem('assetCar');
    let carValue = 50000;
    switch(assetCar) {
      case 'Toyota':
        carValue = 70000;
        break;
      case 'Honda':
        carValue = 50000;
        break;
      case 'Benz':
        carValue = 100000;
        break;
      default:
        carValue = 50000;
    }
    const data = await Promise.all([
      api.fetchCalculateLoan({ totalRequestAmount: loanAmount }),
      api.fetchCalculateLoan({ totalRequestAmount: loanAmount }),
      api.fetchCalculateLoan({ totalRequestAmount: (loanAmount + carValue) }),
    ]);
    const result = map(data, (value, key) => get(value, 'data.loan', {}));
    this.setState({ data: result });
  }

  handleOnClickLoan = () => this.props.history.push('/loan-submit');

  render() {
    return(
      <Fragment>
        <div className="loanComparePage">
          <div className="steps-bar">
            <StepBars current={1} />
          </div>
        </div>
        {console.log('pass first', this.state.data)}
        <CompareLoan onClick={this.handleOnClickLoan} data={this.state.data} />
        <div className="loan-compare-body">
          <button
            className="back-button"
            onClick={() => this.props.history.push('./loan-search')}
          >
            ย้อนกลับ
          </button>
        </div>
      </Fragment>
    )
  }
};

export default withRouter(LoanComparePage);