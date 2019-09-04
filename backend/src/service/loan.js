import api from './api';

const fetchLoan = (header, applicationId) => api.fetchLoan(header, applicationId);

export default {
  fetchLoan,
};
