import api from './api';

const userProfile = (header) => api.fetchProfile(header);

const token = () => api.fetchToken();

const calculateLoan = (header, data) => api.fetchCalculateLoan(header, data);

export default {
  calculateLoan,
  token,
  userProfile,
};
