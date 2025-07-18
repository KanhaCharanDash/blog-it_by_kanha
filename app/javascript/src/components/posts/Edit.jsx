import React, { useEffect, useState } from "react";

import Logger from "js-logger";
import { useTranslation } from "react-i18next";
import { useHistory, useParams } from "react-router-dom";

import PostForm from "./PostForm";

import { useCategories } from "../../hooks/reactQuery/useCategories";
import { useShowPost, useUpdatePost } from "../../hooks/reactQuery/usePostsApi";
import PageLoader from "../commons/PageLoader";

const Edit = () => {
  const { slug } = useParams();
  const history = useHistory();
  const { t } = useTranslation();

  const { data: categories = [] } = useCategories();
  const { data: post, isLoading } = useShowPost(slug);
  const { mutateAsync: updatePost } = useUpdatePost();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "drafted",
    user_id: null,
    organization_id: null,
  });

  const [selectedCategories, setSelectedCategories] = useState([]);

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

    const mappedCategories = post.categories.map(category => ({
      label: category.name,
      value: category.id,
    }));

    setSelectedCategories(mappedCategories);
  }, [post]);

  const handleChange = event => {
    const { name, value } = event.target;
    setFormData(previousFormData => ({
      ...previousFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (status = "drafted") => {
    const payload = {
      ...formData,
      status,
      category_ids: selectedCategories.map(category => category.value),
    };

    try {
      await updatePost({ slug, payload });
      history.push(`/posts/${slug}`);
    } catch (error) {
      Logger.error(t("editPost.updateError"), error);
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
