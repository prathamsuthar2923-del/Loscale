import axiosClient from './axiosClient';

/**
 * Builds the standard set of calls for a resource that follows the
 * public/admin CRUD pattern used across the API (services, works, team,
 * testimonials, success stories).
 */
export default function createResourceApi(resourcePath) {
  return {
    listPublic: (params) => axiosClient.get(`/api/${resourcePath}`, { params }).then((r) => r.data),
    // Convenience wrapper for the homepage teaser sections — only items
    // marked "show on homepage" (and active) come back.
    listHomepage: () => axiosClient.get(`/api/${resourcePath}`, { params: { homepage: true } }).then((r) => r.data),
    listAdmin: () => axiosClient.get(`/api/admin/${resourcePath}`).then((r) => r.data),
    getOne: (id) => axiosClient.get(`/api/admin/${resourcePath}/${id}`).then((r) => r.data),
    create: (data) => axiosClient.post(`/api/admin/${resourcePath}`, data).then((r) => r.data),
    update: (id, data) => axiosClient.put(`/api/admin/${resourcePath}/${id}`, data).then((r) => r.data),
    toggleVisible: (id) => axiosClient.patch(`/api/admin/${resourcePath}/${id}/toggle`).then((r) => r.data),
    toggleHomepage: (id) => axiosClient.patch(`/api/admin/${resourcePath}/${id}/toggle-homepage`).then((r) => r.data),
    remove: (id) => axiosClient.delete(`/api/admin/${resourcePath}/${id}`).then((r) => r.data),
  };
}
