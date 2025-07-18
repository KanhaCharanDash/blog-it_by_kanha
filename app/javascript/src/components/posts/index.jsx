import React, { useEffect } from "react";

import classnames from "classnames";
import queryString from "query-string";
import { isEmpty } from "ramda";
import { useHistory, useLocation } from "react-router-dom";

import PostCard from "./PostCard";

import { usePosts } from "../../hooks/reactQuery/usePostsApi";
import Header from "../commons/Header";
import NoDataPage from "../commons/NoDataPage";
import PageLoader from "../commons/PageLoader";
import Navbar from "../Sidebar";
import usePostStore from "../stores/usePostStore";

const Posts = () => {
  const { selectedCategories } = usePostStore();
  const { data: posts = [], isLoading: loadingPosts } =
    usePosts(selectedCategories);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const selectedCategoryNames = selectedCategories
      .map(cat => cat.name)
      .join(",");
    const currentParams = queryString.parse(location.search);
    const newParams = {
      ...currentParams,
      type: selectedCategoryNames || undefined,
    };

    history.replace({
      pathname: location.pathname,
      search: queryString.stringify(newParams),
    });
  }, [selectedCategories]);

  const filteredPosts = posts;

  if (loadingPosts) return <PageLoader />;

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
