import React, { useEffect } from "react";

import classnames from "classnames";
import queryString from "query-string";
import { isEmpty } from "ramda";
import { useTranslation } from "react-i18next";
import { useHistory, useLocation } from "react-router-dom";

import PostCard from "./PostCard";

import { usePosts } from "../../hooks/reactQuery/usePostsApi";
import Header from "../commons/Header";
import NoDataPage from "../commons/NoDataPage";
import PageLoader from "../commons/PageLoader";
import Navbar from "../Sidebar";
import usePostStore from "../stores/usePostStore";

const Posts = () => {
  const { t } = useTranslation();
  const { selectedCategories } = usePostStore();
  const { data: posts = [], isLoading } = usePosts(selectedCategories);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const selectedCategoryNames = selectedCategories
      .map(cat => cat.name)
      .join(",");
    const currentParams = queryString.parse(location.search);

    history.replace({
      pathname: location.pathname,
      search: queryString.stringify({
        ...currentParams,
        type: selectedCategoryNames || undefined,
      }),
    });
  }, [selectedCategories]);

  if (isLoading) return <PageLoader />;

  if (isEmpty(posts)) return <NoDataPage />;

  return (
    <div className="flex h-screen overflow-hidden">
      <Navbar />
      <div className="flex flex-1 flex-col">
        <Header showAddButton title={t("posts.blogPosts")} />
        <div
          className={classnames(
            "flex-1 overflow-y-auto px-4 pb-6 pt-4 md:px-6",
            "transition-all duration-300 ease-in-out"
          )}
        >
          <div className="space-y-6">
            {posts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Posts;
