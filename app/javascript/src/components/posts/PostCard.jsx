import React from "react";

import { Typography } from "@bigbinary/neetoui";
import { Link } from "react-router-dom";

import CategoryBadgeList from "./CategoryBadgeList";

const truncate = (text, limit) => {
  if (!text) return "";

  return text.length > limit ? `${text.slice(0, limit)}...` : text;
};

const formatDate = dateString => {
  const options = { day: "numeric", month: "long", year: "numeric" };

  return new Date(dateString).toLocaleDateString("en-IN", options);
};

const PostCard = ({ post }) => (
  <div className="rounded bg-white p-4 shadow transition hover:shadow-md">
    <Link to={`/posts/${post.slug}`}>
      <Typography
        className="font-semibold hover:text-blue-600"
        component="h3"
        style="h4"
      >
        {post.title}
      </Typography>
    </Link>
    <Typography className="text-gray-700" component="p" style="body2">
      {truncate(post.description, 25)}
    </Typography>
    {post.categories?.length > 0 && (
      <div className="mt-2 flex flex-wrap gap-2">
        <CategoryBadgeList categories={post.categories} />
      </div>
    )}
    {/* Author and Date */}
    <div className="mt-3 text-sm text-gray-600">
      <Typography className="font-medium" style="body3">
        {post.author_name || "Unknown Author"}
      </Typography>
      <Typography style="body3">{formatDate(post.created_at)}</Typography>
    </div>
  </div>
);

export default PostCard;
