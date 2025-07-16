import axios from "axios";

const fetch = () => axios.get("/posts");
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
