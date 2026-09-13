import axiosClient from './axiosClient';
import createResourceApi from './createResourceApi';

const base = createResourceApi('works');

// Public detail lookup by slug, for the Work Detail page.
base.getBySlug = (slug) => axiosClient.get(`/api/works/${slug}`).then((r) => r.data);

export default base;
