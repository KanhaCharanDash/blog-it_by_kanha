import React, { useState, useEffect } from "react";

import { Typography } from "@bigbinary/neetoui";
import classnames from "classnames";
import { isNil, isEmpty, either } from "ramda";

import PostCard from "./PostCard";

import postsApi from "../../apis/post";
import Container from "../commons/Container";
import Header from "../commons/Header";
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
      <Container className="flex h-screen items-center justify-center">
        <Typography className="text-center text-gray-600" style="h4">
          You have not created or been assigned any tasks 🥳
        </Typography>
      </Container>
    );
  }

  return (
    <div className="relative flex h-screen overflow-hidden">
      <div className="flex h-20 w-20 items-center justify-center" />
      <Navbar />
      <div
        className={classnames(
          "w-full flex-1 overflow-y-auto p-4 transition-all duration-300 ease-in-out",
          "pt-16 md:ml-48 md:pt-8"
        )}
      >
        <Header showAddButton title="Blog Posts" />
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
