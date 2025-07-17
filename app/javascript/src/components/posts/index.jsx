import React, { useEffect, useState } from "react";

import classnames from "classnames";
import queryString from "query-string"; // install this if not present
import { isEmpty } from "ramda";
import { useHistory, useLocation } from "react-router-dom";

import PostCard from "./PostCard";

import categoriesApi from "../../apis/category";
import postsApi from "../../apis/post";
import Header from "../commons/Header";
import NoDataPage from "../commons/NoDataPage";
import PageLoader from "../commons/PageLoader";
import Navbar from "../Sidebar";
import useCategoryStore from "../stores/useCategoryStore";
import usePostStore from "../stores/usePostStore";

const Posts = () => {
  const [loading, setLoading] = useState(false);
  const { setAllCategories } = useCategoryStore();
  const [posts, setPosts] = useState([]);
  const { selectedCategories } = usePostStore();
  const history = useHistory();
  const location = useLocation();

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const [postsResponse, categoriesResponse] = await Promise.all([
        postsApi.fetch(),
        categoriesApi.fetch(),
      ]);
      setPosts(postsResponse.data.posts);
      setAllCategories(categoriesResponse.data);
      history.replace("/posts");
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFilteredPosts = async () => {
    try {
      setLoading(true);

      const selectedCategoryNames = selectedCategories
        .map(cat => cat.name)
        .join(",");

      // Update query params using history
      const currentParams = queryString.parse(location.search);
      const newParams = {
        ...currentParams,
        type: selectedCategoryNames || undefined, // removes `type` if empty
      };

      history.replace({
        pathname: location.pathname,
        search: queryString.stringify(newParams),
      });

      const response = await postsApi.fetch({ type: selectedCategoryNames });
      setPosts(response.data.posts);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCategories.length) {
      fetchFilteredPosts();
    } else {
      fetchInitialData();
    }
  }, [selectedCategories]);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const filteredPosts = posts;

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
