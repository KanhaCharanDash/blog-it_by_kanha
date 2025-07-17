import axios from "axios";
import queryString from "query-string";

const fetch = params => {
  const query = queryString.stringify(params);

  return axios.get(`/posts${query ? `?${query}` : ""}`);
};
const create = payload => axios.post("/posts", payload);
const show = slug => axios.get(`/posts/${slug}`);
const update = ({ slug, payload }) =>
  axios.put(`/posts/${slug}`, {
    post: payload,
  });
const fetchMyPosts = () => axios.get("/posts/my_posts");
const destroy = slug => axios.delete(`/posts/${slug}`); // 👈 this is important

const postsApi = { fetch, create, show, update, fetchMyPosts, destroy };

export default postsApi;
