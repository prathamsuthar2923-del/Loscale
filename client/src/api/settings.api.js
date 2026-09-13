import axiosClient from './axiosClient';

export default {
  getPublic: () => axiosClient.get('/api/settings').then((r) => r.data),
  getAdmin: () => axiosClient.get('/api/admin/settings').then((r) => r.data),
  update: (data) => axiosClient.put('/api/admin/settings', data).then((r) => r.data),
};
