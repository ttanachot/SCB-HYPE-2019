import axios from 'axios';
import { isNil } from 'lodash';

const apiKey = 'l710281fc525264da39562f271d3a0699a';
const apiSecret = '1316b88e6ad548abaaba74cf6d8ae800';


const URL = {
  OAUTH_AUTH: '',
  OAUTH_TOKEN: 'https://api.partners.scb/partners/sandbox/v1/oauth/token',
  OAUTH_REFRESH_TOKEN: '',
  CS_PROFILE: 'https://api.partners.scb/partners/sandbox/v1/customers/profile',
  LOAN_CAL: 'https://api.partners.scb/partners/sandbox/v1/loanorigination/simulator/calculate',
  CREATE_LOAN: 'https://api.partners.scb/partners/sandbox/v1/loanorigination/applications',
  VIEW_LOAN: 'https://api.partners.scb/partners/sandbox/v1/loanorigination/applications/', // GET need ${ApplicationId}
  EDIT_LOAN: 'https://api.partners.scb/partners/sandbox/v1/loanorigination/applications/', // PUT need ${loanApplicationId}
  UPLOAD_DOCUMENT: 'https://api.partners.scb/partners/sandbox/v1/loanorigination/applications/{{appId}}/documents', // POST 
  REVIEW_DOCUMENT: 'https://api.partners.scb/partners/sandbox/v1/loanorigination/applications/{{appId}}/documents', // GET applicationId
  DELETE_DOCUMENT: 'https://api.partners.scb/partners/sandbox/v1/loanorigination/applications/{{appId}}/documents/{{docId}}', // DEL 
  SUBMIT_LOAN: 'https://api.partners.scb/partners/sandbox/v1/loanorigination/applications/submit', // POST with BODY applicationId
  CANCEL_LOAN: 'https://api.partners.scb/partners/sandbox/v1/loanorigination/applications/cancel', // POST with BODY applicationId
};

const getHeaders = (header = {}) => (
  {
    'content-type': 'application/json',
    'accept-language': 'EN',
    resourceOwnerId: '29b8d0c0-4b8b-4641-8b65-dd6b354daa26',
    requestUId: '99100361-23d2-433d-8c21-4b6469918713',
    ...(isNil(header.authorization) ? {} : { authorization: header.authorization }),
  }
);

const fetchToken = async () => {
  try {
    const response = await axios(
      URL.OAUTH_TOKEN,
      {
        method: 'POST',
        headers: getHeaders(),
        data: {
          applicationKey: apiKey,
          applicationSecret: apiSecret,
          authCode: '',
        },
      }
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const fetchProfile = async (header) => {
  try {
    const response = await axios(
      URL.CS_PROFILE,
      {
        method: 'GET',
        headers: getHeaders(header),
      }
    );
    return response.data;
  } catch (err) {
    return null;
  }
};

const fetchCalculateLoan = async (header, data) => {
  try {
    const { totalRequestAmount } = data;
    const response = await axios(
      URL.LOAN_CAL,
      {
        method: 'POST',
        headers: getHeaders(header),
        data: {
          loan: {
            productIntent: 'GENERAL',
            totalRequestAmount,
            paymentFrequency: 'Monthly',
            gracePeriod: 0,
            dueDay: 25,
          },
        },
      }
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const createLoan = async (header, data) => {
  try {
    const { productIntent } = data;
    const response = await axios(
      URL.CREATE_LOAN,
      {
        method: 'POST',
        headers: getHeaders(header),
        body: {
          loan: {
            productIntent,
          }
        }
      }
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const fetchLoan = async (header, applicationId) => {
  try {
    console.log(`fetchLoan ${applicationId}`);
    const response = await axios(
      `https://api.partners.scb/partners/sandbox/v1/loanorigination/applications/${applicationId}`,
      {
        method: 'GET',
        headers: {
          ...getHeaders(header),
          Authorization: header.authorization,
        },
      }
    );
    
    return response.data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export default {
  fetchCalculateLoan,
  fetchToken,
  fetchProfile,
  createLoan,
  fetchLoan,
};
