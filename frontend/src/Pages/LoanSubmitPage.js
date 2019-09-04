import React from 'react';
import { withRouter } from 'react-router';
import { Form, Input, Icon, Select, Modal } from 'antd';
import { get, pick } from 'lodash';
import api from '../Services/api';
import StepBars from '../Components/StepsBar';
import './LoanSubmitPage.css';

const { Option } = Select;

const { confirm } = Modal;

const formItemLayout = {
  labelCol: { offset: 1, span: 10 },
  wrapperCol: { span: 12 },
  labelAlign: 'left',
};

class LoanSubmitPage extends React.Component {
  constructor(props){
    super(props);
    this.state = { 
      steps: 1,
      loanAmount: 1000000,
      occupation: 'Labour',
      salary: 65000,
      installment: 15000,
      interest: 7,
      data: {},
    };
  }

  async componentDidMount() {
    const result = await api.fetchProfile();
    this.setState({ data: get(result, ['data', 'profile'], {}) });
  }

  renderFormItem = (label, value, disabled = true) => (
    <Form.Item key={label} label={label}>
      <Input value={value} disabled={disabled}/>
    </Form.Item>
  );

  handleNextStep = () => {
    confirm({
      title: 'ท่านได้อ่านเงื่อนไขและยินยอมให้ธนาคารใช้ข้อมูลของท่าน',
      onOk: () => this.props.history.push('/loan-summary'),
    });
  };

  handleBackStep = () => this.props.history.push('/loan-compare');

  renderPersonalInfo () {
    const profile = pick(this.state.data, [
      'citizenID',
      'thaiFirstName',
      'thaiLastName',
      'birthDate',
      'genderCode',
      'mobile',
      'email',
    ]);
    return (
      <div className="loan-submit-subform">
        <h3 className="title">ข้อมูลส่วนตัว</h3>
        {this.renderFormItem('ชื่อ', `${profile.thaiFirstName || 'สมชาย'} ${profile.thaiLastName || 'ใจดี'}`)}
        {this.renderFormItem('วันเดือนปีเกิด', `${profile.birthDate || '01/01/1990'}`)}
        {this.renderFormItem('เบอร์โทรศัพท์', `${profile.mobile || '087777771'}`, false)}
        {this.renderFormItem('อีเมล', `${profile.email || 'email@email.com'}`, false)}
      </div>
    )
  }

  renderIncome = () => {
    return (
    <div className="loan-submit-subform">
      <h3 className="title">อาชีพและรายได้</h3>
      <Form.Item label="อาชีพของท่าน">
        <Select
        placeholder="Select a option and change input text above"
        onChange={(value) => this.setState({ occupation: value})}
        value={this.state.occupation}
        disabled
        >
          <Option value="Labour">พนักงานประจำ</Option>
          <Option value="Owner">ผู้ประกอบการ</Option>
        </Select>
      </Form.Item>
      <Form.Item label="รายได้ต่อเดือน">
        <Input
          prefix={<Icon type="dollar" style={{ color: 'rgba(0,0,0,.25)' }} />}
          onChange={(e) => this.setState({ salary: e.target.value })}
          value={this.state.salary}
          type="number"
          addonAfter=" บาท"
          placeholder="รายได้ต่อเดือนของท่าน"
          disabled
        />
      </Form.Item>
    </div>);
  }

  renderLoan = () => {
    return (
      <div className="loan-submit-subform">
        <h3 className="title">สินเชื่อที่สมัคร</h3>
        {this.renderFormItem('สินเชื่อ', 'Plan 1')}
        <Form.Item label="คิดเป็นจำนวนเงิน" >
          <Input
            disabled
            prefix={<Icon type="dollar" style={{ color: 'rgba(0,0,0,.25)' }} />}
            onChange={(e) => this.setState({ installment: e.target.value })}
            value="1000000"
            type="number"
            addonAfter=" บาท"
          />
        </Form.Item>
        <Form.Item label="อัตราดอกเบี้ย">
          <Input
            prefix={<Icon type="dollar" style={{ color: 'rgba(0,0,0,.25)' }} />}
            onChange={(e) => this.setState({ interest: e.target.value })}
            value={this.state.interest}
            type="number"
            addonAfter=" % ต่อปี"
            disabled
          />
        </Form.Item>
        <Form.Item label="คิดเป็นจำนวนเงิน" >
          <Input
            disabled
            prefix={<Icon type="dollar" style={{ color: 'rgba(0,0,0,.25)' }} />}
            onChange={(e) => this.setState({ installment: e.target.value })}
            value={Math.ceil(1000000 * 0.007 * 12)}
            type="number"
            addonAfter=" บาท / ปี"
          />
        </Form.Item>
        <Form.Item label="จำนวนเดือนสูงสุดที่ท่านผ่อนชำระได้" >
          <Input
            disabled
            onChange={(e) => this.setState({ installment: e.target.value })}
            value={Math.ceil(1000000/15000)}
            type="number"
            addonAfter=" เดือน"
          />
        </Form.Item>
        <Form.Item label="จำนวนเงินที่ท่านต้องชำระคืนต่อเดือน" >
          <Input
            disabled
            onChange={(e) => this.setState({ installment: e.target.value })}
            value="15000"
            type="number"
            addonAfter=" บาท / เดือน"
          />
        </Form.Item>
      </div>
    );
  }

  render(){
    return(
      <div className="loanSubmitPage">
        <div className="steps-bar">
          <StepBars current={3} />
        </div>
        <div className="loan-submit-body">
          <Form {...formItemLayout} onSubmit={this.handleNextStep}>
            {this.renderPersonalInfo()}
            {this.renderIncome()}
            {this.renderLoan()}
          </Form>
          <button className="next-button" onClick={this.handleNextStep}>ส่งคำขอสินเชื่อ</button>
          <button className="back-button" onClick={this.handleBackStep}>ย้อนกลับ</button>
        </div>
      </div>
    );
  }
}

const WrappedLoanSubmitPage = Form.create({ name: 'loan_submit' })(LoanSubmitPage);

export default withRouter(WrappedLoanSubmitPage);