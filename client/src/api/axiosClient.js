import axios from 'axios';

// In dev, VITE_API_URL is empty and vite.config.js proxies /api to the
// server. In production, set VITE_API_URL to your deployed API's origin.
const baseURL = import.meta.env.VITE_API_URL || '';

const axiosClient = axios.create({ baseURL });

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('loscale_admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('loscale_admin_token');
      localStorage.removeItem('loscale_admin_username');
    }
    return Promise.reject(err);
  }
);

export default axiosClient;
