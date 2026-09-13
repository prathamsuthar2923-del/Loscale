import axiosClient from './axiosClient';

export default {
  submit: (data) => axiosClient.post('/api/contact', data).then((r) => r.data),
  listAdmin: () => axiosClient.get('/api/admin/contact').then((r) => r.data),
  toggleRead: (id) => axiosClient.patch(`/api/admin/contact/${id}/read`).then((r) => r.data),
  remove: (id) => axiosClient.delete(`/api/admin/contact/${id}`).then((r) => r.data),
};
