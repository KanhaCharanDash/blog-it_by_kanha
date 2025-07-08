import React, { useState, useEffect } from "react";

import PostCard from "./PostCard";

import postsApi from "../../apis/post";
import PageLoader from "../commons/PageLoader";
import Navbar from "../Navbar";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const {
        data: { posts },
      } = await postsApi.fetch();
      setPosts(posts);
      logger.error(posts);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  if (loading) return <PageLoader />;

  return (
    <div className="relative flex h-screen overflow-hidden">
      <Navbar />
      <div className="w-full flex-1 overflow-y-auto p-4 pt-16 transition-all duration-300 ease-in-out md:ml-48 md:pt-8">
        <h1 className="mb-6 text-2xl font-bold">Blog Posts</h1>
        <div className="space-y-6">
          {posts.map((post, index) => (
            <PostCard key={index} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Posts;
