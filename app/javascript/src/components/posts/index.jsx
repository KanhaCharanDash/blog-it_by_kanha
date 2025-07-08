import React, { useState, useEffect } from "react";

import { isNil, isEmpty, either } from "ramda";

import PostCard from "./PostCard";

import postsApi from "../../apis/post";
import Container from "../commons/Container";
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

  if (either(isNil, isEmpty)(posts)) {
    return (
      <Container>
        <h1 className="my-5 text-center text-xl leading-5">
          You have not created or been assigned any tasks 🥳
        </h1>
      </Container>
    );
  }

  return (
    <div className="relative flex h-screen overflow-hidden">
      <div className="flex h-20 w-20 items-center justify-center" />
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
