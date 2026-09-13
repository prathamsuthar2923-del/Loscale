import axiosClient from './axiosClient';

export default {
  login: (username, password) => axiosClient.post('/api/auth/login', { username, password }).then((r) => r.data),
  me: () => axiosClient.get('/api/auth/me').then((r) => r.data),
};
