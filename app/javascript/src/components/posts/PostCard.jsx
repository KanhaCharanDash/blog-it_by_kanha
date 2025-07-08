import React from "react";

const PostCard = ({ post }) => (
  <div className="rounded bg-white p-4 shadow transition hover:shadow-md">
    <h2 className="mb-2 text-xl font-semibold">{post.title}</h2>
    <p className="mb-2 line-clamp-2 text-gray-700">{post.description}</p>
  </div>
);

export default PostCard;
