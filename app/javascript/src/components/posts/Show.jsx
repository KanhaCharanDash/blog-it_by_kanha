import React, { useEffect, useState } from "react";

import { Typography, Avatar } from "@bigbinary/neetoui";
import Logger from "js-logger";
import { useParams } from "react-router-dom";

import CategoryBadgeList from "./CategoryBadgeList";

import postsApi from "../../apis/post";
import Header from "../commons/Header";
import PageLoader from "../commons/PageLoader";
import Navbar from "../Navbar";

const formatDate = dateString => {
  const options = { day: "numeric", month: "long", year: "numeric" };

  return new Date(dateString).toLocaleDateString("en-IN", options);
};

const Show = () => {
  const { slug } = useParams();
  const [post, setPost] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(true);

  const fetchPost = async () => {
    try {
      const {
        data: { post },
      } = await postsApi.show(slug);
      setPost(post);
    } catch (error) {
      Logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [slug]);

  if (loading) return <PageLoader />;

  return (
    <div className="relative flex min-h-screen overflow-hidden">
      <div className="flex h-20 w-20 items-center justify-center" />
      <Navbar />
      <div className="w-full flex-1 overflow-y-auto px-4 pt-20 md:ml-48 md:px-12 md:pt-10">
        {/* Category badges */}
        <div className="mb-4">
          <CategoryBadgeList categories={post.categories} />
        </div>
        {/* Post title */}
        <Header title={post.title || "Loading..."} />
        {/* Author section */}
        <div className="mb-6 mt-4 flex items-center space-x-4">
          <Avatar
            size="medium"
            user={{
              name: post.author_name || "Unknown Author",
              imageUrl: undefined, // or a static fallback
            }}
          />
          <div className="flex flex-col">
            <Typography className="font-semibold" style="h6">
              {post.author_name || "Unknown Author"}
            </Typography>
            <Typography className="text-gray-600" style="body3">
              {formatDate(post.created_at)}
            </Typography>
          </div>
        </div>
        {/* Post content */}
        <div className="max-w-4xl space-y-4">
          <Typography className="text-lg leading-7 text-gray-700">
            {post.description}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Show;
