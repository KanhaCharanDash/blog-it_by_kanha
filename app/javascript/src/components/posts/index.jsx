import React, { useState, useEffect } from "react";

import classnames from "classnames";
import { isNil, isEmpty, either } from "ramda";

import PostCard from "./PostCard";

import categoriesApi from "../../apis/category";
import postsApi from "../../apis/post";
import Header from "../commons/Header";
import NoDataPage from "../commons/NoDataPage";
import PageLoader from "../commons/PageLoader";
import Navbar from "../Navbar";
import useCategoryStore from "../stores/useCategoryStore";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const setAllCategories = useCategoryStore(store => store.setAllCategories); // ✅ from store

  const fetchInitialData = async () => {
    try {
      const [postsResponse, categoriesResponse] = await Promise.all([
        postsApi.fetch(),
        categoriesApi.fetch(),
      ]);

      const posts = postsResponse.data.posts;
      const categories = categoriesResponse.data; // ✅ array

      setPosts(posts);
      setAllCategories(categories); // ✅ this should now work correctly
      logger.info("Posts and categories fetched successfully");
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  if (loading) return <PageLoader />;

  if (either(isNil, isEmpty)(posts)) {
    return <NoDataPage />;
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
