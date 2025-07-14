import React, { useEffect, useState } from "react";

import { Typography } from "@bigbinary/neetoui";
import Logger from "js-logger";
import { useParams } from "react-router-dom";

import CategoryBadgeList from "./CategoryBadgeList"; // ✅ Import the badge list component

import postsApi from "../../apis/post";
import Header from "../commons/Header";
import PageLoader from "../commons/PageLoader"; // ✅ Import loader
import Navbar from "../Navbar";

const Show = () => {
  const { slug } = useParams();
  const [post, setPost] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(true); // ✅ Add loading state

  const fetchPost = async () => {
    try {
      const {
        data: { post },
      } = await postsApi.show(slug);
      setPost(post);
    } catch (error) {
      Logger.ERROR(error);
    } finally {
      setLoading(false); // ✅ Stop loading
    }
  };

  useEffect(() => {
    fetchPost();
  }, [slug]);

  if (loading) return <PageLoader />; // ✅ Show loader

  return (
    <div className="relative flex min-h-screen overflow-hidden">
      <div className="flex h-20 w-20 items-center justify-center" />
      <Navbar />
      <div className="w-full flex-1 overflow-y-auto px-4 pt-20 md:ml-48 md:px-12 md:pt-10">
        <CategoryBadgeList categories={post.categories} />
        <Header title={post.title || "Loading..."} />
        <div className="mt-4 max-w-4xl space-y-4">
          <Typography className="text-lg leading-7 text-gray-700">
            {post.description}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Show;
