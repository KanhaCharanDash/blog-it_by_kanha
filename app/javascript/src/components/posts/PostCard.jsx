import React from "react";

import { Typography } from "@bigbinary/neetoui";
import { Link } from "react-router-dom";

const truncate = (text, limit) => {
  if (!text) return "";

  return text.length > limit ? `${text.slice(0, limit)}...` : text;
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
  </div>
);

export default PostCard;
