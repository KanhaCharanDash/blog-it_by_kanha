import React from "react";

import { Typography, Avatar } from "@bigbinary/neetoui";
import Logger from "js-logger";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import CategoryBadgeList from "./CategoryBadgeList";

import { useShowPost } from "../../hooks/reactQuery/usePostsApi";
import Header from "../commons/Header";
import PageLoader from "../commons/PageLoader";
import Navbar from "../Sidebar";

const formatPostDate = dateString => {
  const options = { day: "numeric", month: "long", year: "numeric" };

  return new Date(dateString).toLocaleDateString("en-IN", options);
};

const Show = () => {
  const { slug } = useParams();
  const { t } = useTranslation();

  const { data: post, isLoading } = useShowPost(slug);

  if (isLoading || !post) return <PageLoader />;
  Logger.info("Post data:", post);

  return (
    <div className="flex min-h-screen">
      <Navbar />
      <div className="flex-1 overflow-y-auto px-4 pt-2 md:px-12 md:pt-10">
        <Header
          drafted={post.status === "drafted"}
          postUserId={post.user_id}
          title={post.title || t("showPost.loading")}
        />
        <div className="mb-4">
          <CategoryBadgeList categories={post.categories} />
        </div>
        <div className="mb-6 mt-4 flex items-center space-x-4">
          <Avatar
            size="medium"
            user={{
              name: post.author_name || t("showPost.unknownAuthor"),
              imageUrl: undefined,
            }}
          />
          <div className="flex flex-col">
            <Typography className="font-semibold" style="h6">
              {post.author_name || t("showPost.unknownAuthor")}
            </Typography>
            <Typography className="text-gray-600" style="body3">
              {formatPostDate(post.created_at)}
            </Typography>
          </div>
        </div>
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
