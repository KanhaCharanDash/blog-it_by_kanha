// components/Posts/NewPost.jsx
import React, { useState } from "react";

import Logger from "js-logger";
import { useHistory } from "react-router-dom";

import PostForm from "./PostForm";

import postsApi from "../../apis/post";
import useAuthStore from "../stores/useAuthStore";
import useCategoryStore from "../stores/useCategoryStore";

const NewPost = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [selectedCategories, setSelectedCategories] = useState([]);

  const { categories } = useCategoryStore();
  const { userId, organizationId } = useAuthStore.getState();

  const formattedOptions = categories.map(category => ({
    label: category.name,
    value: category.id,
  }));

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const payload = {
      ...formData,
      user_id: userId,
      organization_id: organizationId,
      category_ids: selectedCategories.map(option => option.value),
    };

    try {
      await postsApi.create(payload);
      history.push("/");
    } catch (error) {
      Logger.error(error);
    }
  };

  const handleCancel = () => {
    setFormData({ title: "", description: "" });
    setSelectedCategories([]);
  };

  return (
    <PostForm
      categories={formattedOptions}
      description={formData.description}
      selectedCategories={selectedCategories}
      title={formData.title}
      onCancel={handleCancel}
      onCategoryChange={setSelectedCategories}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
};

export default NewPost;
