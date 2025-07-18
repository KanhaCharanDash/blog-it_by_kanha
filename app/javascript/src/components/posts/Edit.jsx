import React, { useEffect, useState } from "react";

import Logger from "js-logger";
import { useHistory, useParams } from "react-router-dom";

import PostForm from "./PostForm";

import { useCategories } from "../../hooks/reactQuery/useCategories";
import { useShowPost, useUpdatePost } from "../../hooks/reactQuery/usePostsApi";
import PageLoader from "../commons/PageLoader";

// ✅ Import categories hook
const Edit = () => {
  const { slug } = useParams();
  const history = useHistory();
  const { data: categories = [] } = useCategories();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "drafted",
    user_id: null,
    organization_id: null,
  });
  const [selectedCategories, setSelectedCategories] = useState([]);

  const { data: post, isLoading } = useShowPost(slug);
  const { mutateAsync: updatePost } = useUpdatePost();

  const formattedOptions = categories.map(category => ({
    label: category.name,
    value: category.id,
  }));

  useEffect(() => {
    if (!post) return;

    setFormData({
      title: post.title,
      description: post.description,
      status: post.status || "drafted",
      user_id: post.user_id,
      organization_id: post.organization_id,
    });

    setSelectedCategories(
      post.categories.map(cat => ({
        label: cat.name,
        value: cat.id,
      }))
    );
  }, [post]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (status = "drafted") => {
    const payload = {
      ...formData,
      status,
      category_ids: selectedCategories.map(cat => cat.value),
    };

    try {
      await updatePost({ slug, payload });
      history.push(`/posts/${slug}`);
    } catch (error) {
      Logger.error("Error updating post:", error);
    }
  };

  const handleCancel = () => {
    history.goBack();
  };

  if (isLoading) return <PageLoader />;

  return (
    <PostForm
      isEdit
      categories={formattedOptions}
      description={formData.description}
      selectedCategories={selectedCategories}
      title={formData.title}
      onCancel={handleCancel}
      onCategoryChange={setSelectedCategories}
      onChange={handleChange}
      onSaveDraft={() => handleSubmit("drafted")}
      onSubmit={() => handleSubmit("published")}
    />
  );
};

export default Edit;
