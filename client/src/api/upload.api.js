import axiosClient from './axiosClient';

// Uploads a single image and returns its stored URL, e.g. { url: "/uploads/xyz.jpg" }
export default {
  uploadImage: (file) => {
    const formData = new FormData();
    formData.append('image', file);
    return axiosClient
      .post('/api/admin/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((r) => r.data);
  },
};
