import axios from 'axios';

const getBearerToken = () => {
  const token = localStorage.getItem('bearerToken');
  return (token) ? `Bearer ${token}` : null;
}

const fetchAccessToken = async () => {
  const response = await axios(
    'http://localhost:6009/api/user/token',
    {
      method: 'GET'
    }
  );
  console.log('bearerToken', response.data);
  localStorage.setItem('bearerToken', response.data.data.accessToken);
  return response;
}

const fetchProfile = async (header) => {
  const response = await axios(
    'http://localhost:6009/api/user/user-profile',
    {
      method: 'GET',
      headers: {
        authorization: getBearerToken(),
      }
    }
  );
  try {
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err);
    return '';
  }
}

const fetchLoan = async (header) => {
  try {
    const response = await axios(
      'http://localhost:6009/api/user/fetch-loan/ENET19062201002',
      {
        method: 'GET',
        headers: {
          authorization: getBearerToken(),
        }
      }
    );
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log(err);
    return '';
  }
}

const fetchCalculateLoan = async (data) => {
  const { totalRequestAmount } = data;
  try {
    const response = await axios(
      'http://localhost:6009/api/user/calculate-loan',
      {
        method: 'POST',
        headers: {
          authorization: getBearerToken(),
        },
        data: {
          totalRequestAmount,
        }
      }
    );
    console.log(response.data);
    return response.data;
  } catch (err) {
    return '';
  }
}

export default {
  fetchProfile,
  fetchAccessToken,
  fetchLoan,
  fetchCalculateLoan,
  getBearerToken,
};
