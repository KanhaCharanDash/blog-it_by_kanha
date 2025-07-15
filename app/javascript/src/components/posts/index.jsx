import React, { useEffect, useState } from "react";

import classnames from "classnames";
import { isEmpty } from "ramda";

import PostCard from "./PostCard";

import categoriesApi from "../../apis/category";
import postsApi from "../../apis/post";
import Header from "../commons/Header";
import NoDataPage from "../commons/NoDataPage";
import PageLoader from "../commons/PageLoader";
import Navbar from "../Navbar";
import useCategoryStore from "../stores/useCategoryStore";
import usePostStore from "../stores/usePostStore";

const Posts = () => {
  const [loading, setLoading] = useState(false);
  const { posts, setPosts, selectedCategoryIds } = usePostStore();
  const { setAllCategories } = useCategoryStore();

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const [postsResponse, categoriesResponse] = await Promise.all([
        postsApi.fetch(),
        categoriesApi.fetch(),
      ]);
      setPosts(postsResponse.data.posts);
      setAllCategories(categoriesResponse.data);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  const filteredPosts = !isEmpty(selectedCategoryIds)
    ? posts.filter(post =>
        post.categories?.some(category =>
          selectedCategoryIds.includes(category.id)
        )
      )
    : posts;

  if (loading) return <PageLoader />;

  if (isEmpty(filteredPosts)) return <NoDataPage />;

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left Sidebar (Navbar) */}
      <Navbar />
      {/* Right Side: Header + Content */}
      <div className="flex flex-1 flex-col">
        {/* Header (Fixed Height) */}
        <div className="">
          <Header showAddButton title="Blog Posts" />
        </div>
        {/* Scrollable Content */}
        <div
          className={classnames(
            "flex-1 overflow-y-auto px-4 pb-6 pt-4 md:px-6",
            "transition-all duration-300 ease-in-out"
          )}
        >
          <div className="space-y-6">
            {filteredPosts.map((post, index) => (
              <PostCard key={index} post={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
