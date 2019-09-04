import React, { Fragment } from 'react';
import { withRouter } from 'react-router';
import { get, map } from 'lodash';
import { Spin, Icon, Form, Divider } from 'antd';
import CompareLoan from '../Components/CompareLoan';
import api from '../Services/api';
import './LoanSummaryPage.css';

const indicatorIcon = <Icon type="loading" style={{ fontSize: 50 }} spin />;

const formItemLayout = {
  labelCol: { span: 18 },
  wrapperCol: { span: 6 },
  labelAlign: 'left',
};

class LoanSummaryPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      processing: true,
    };
  }

  async componentDidMount () {
    const data = await Promise.all([
      api.fetchCalculateLoan({ totalRequestAmount: 1000000, installmentAmount: 25000 }),
      api.fetchCalculateLoan({ totalRequestAmount: 1300000, installmentAmount: 50000 }),
      api.fetchCalculateLoan({ totalRequestAmount: 1250000, installmentAmount: 40000 }),
    ]);
    const result = map(data, (value, key) => get(value, 'data.loan', {}));
    this.setState({ data: result }, this.handleProcessing);
  }

  handleProcessing = () => {
    setTimeout(() => this.setState({ processing: false }), 2000);
  }

  handleOnClickLoan = () => this.props.history.push('/loan-submit');

  renderFormItem = (label, value) => (
    <Form.Item key={label} label={label}>
      {value}
    </Form.Item>
  );

  render() {
    if (this.state.processing) {
      return (
        <div className="loanSummaryProcessing">
          <Spin className="spinning" size="large" tip="Processing..." indicator={indicatorIcon} />
        </div>
      );
    }
    return(
      <Fragment>
        <div className="loanSummaryPage">
          <h2>สรุปเครดิตสินเชื่อของคุณ</h2>
          <Form {...formItemLayout} className="loan-summary-box">
            {this.renderFormItem('Score rating', '9.7/10')}
            {this.renderFormItem('Assets rating', '8.7/10')}
            {this.renderFormItem('Score rating', '8.2/10')}
          </Form>
        </div>
        <Divider />
        <CompareLoan title="สินเชื่อแนะนำ" data={this.state.data} />
        <div className="loan-summary-body">
          <button
            className="back-button"
            onClick={() => this.props.history.push('/')}
          >
            กลับสู่หน้าหลัก
          </button>
        </div>
      </Fragment>
    )
  }
};

export default withRouter(LoanSummaryPage);