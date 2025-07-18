import React from "react";

import { Typography, Avatar } from "@bigbinary/neetoui";
import Logger from "js-logger";
import { useParams } from "react-router-dom";

import CategoryBadgeList from "./CategoryBadgeList";

import { useShowPost } from "../../hooks/reactQuery/usePostsApi";
import Header from "../commons/Header";
import PageLoader from "../commons/PageLoader";
import Navbar from "../Sidebar";

const formatDate = dateString => {
  const options = { day: "numeric", month: "long", year: "numeric" };

  return new Date(dateString).toLocaleDateString("en-IN", options);
};

const Show = () => {
  const { slug } = useParams();

  const { data: post, isLoading } = useShowPost(slug);

  if (isLoading || !post) return <PageLoader />;
  Logger.info("Post data:", post);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Navbar />
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto px-4 pt-2 md:px-12 md:pt-10">
        {/* Category badges */}
        <Header
          drafted={post.status === "drafted"}
          postUserId={post.user_id}
          title={post.title || "Loading..."}
        />
        <div className="mb-4">
          <CategoryBadgeList categories={post.categories} />
        </div>
        {/* Post title */}
        {/* Author section */}
        <div className="mb-6 mt-4 flex items-center space-x-4">
          <Avatar
            size="medium"
            user={{
              name: post.author_name || "Unknown Author",
              imageUrl: undefined,
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
