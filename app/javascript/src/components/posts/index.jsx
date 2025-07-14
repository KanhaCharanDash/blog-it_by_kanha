import React, { useEffect } from "react";

import classnames from "classnames";
import { either, isEmpty, isNil } from "ramda";

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
  const { posts, setPosts, selectedCategoryIds } = usePostStore();

  const { setAllCategories } = useCategoryStore();

  const fetchInitialData = async () => {
    try {
      const [postsResponse, categoriesResponse] = await Promise.all([
        postsApi.fetch(),
        categoriesApi.fetch(),
      ]);

      setPosts(postsResponse.data.posts);
      setAllCategories(categoriesResponse.data);
      logger.info("Posts and categories fetched successfully");
    } catch (error) {
      logger.error(error);
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

  if (either(isNil, isEmpty)(posts)) return <PageLoader />;

  if (isEmpty(filteredPosts)) return <NoDataPage />;

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
          {filteredPosts.map((post, index) => (
            <PostCard key={index} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Posts;
