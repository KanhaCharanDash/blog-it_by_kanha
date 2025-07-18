import React from "react";

import { Typography } from "@bigbinary/neetoui";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import CategoryBadgeList from "./CategoryBadgeList";

const truncateText = (text, limit) => {
  if (!text) return "";

  return text.length > limit ? `${text.slice(0, limit)}...` : text;
};

const formatPostDate = dateString => {
  const options = { day: "numeric", month: "long", year: "numeric" };

  return new Date(dateString).toLocaleDateString("en-IN", options);
};

const PostCard = ({ post }) => {
  const { t } = useTranslation();

  return (
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
        {truncateText(post.description, 25)}
      </Typography>
      {post.categories?.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          <CategoryBadgeList categories={post.categories} />
        </div>
      )}
      <div className="mt-3 text-sm text-gray-600">
        <Typography className="font-medium" style="body3">
          {post.author_name || t("postCard.unknownAuthor")}
        </Typography>
        <Typography style="body3">{formatPostDate(post.created_at)}</Typography>
      </div>
    </div>
  );
};

export default PostCard;
