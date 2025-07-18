import React, { useState } from "react";

import Logger from "js-logger";
import { useHistory } from "react-router-dom";

import PostForm from "./PostForm";

import { useCategories } from "../../hooks/reactQuery/useCategories";
import { useCreatePost } from "../../hooks/reactQuery/usePostsApi";
import useAuthStore from "../stores/useAuthStore";

const NewPost = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [selectedCategories, setSelectedCategories] = useState([]);

  const { data: categories = [] } = useCategories();
  const { userId, organizationId } = useAuthStore.getState();
  const { mutate: createPost, isPending } = useCreatePost();

  const formattedOptions = categories.map(({ name, id }) => ({
    label: name,
    value: id,
  }));

  const handleChange = ({ target: { name, value } }) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePostSubmit = status => {
    const payload = {
      ...formData,
      status,
      user_id: userId,
      organization_id: organizationId,
      category_ids: selectedCategories.map(option => option.value),
    };

    createPost(payload, {
      onSuccess: () => history.push("/"),
      onError: Logger.error,
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    handlePostSubmit("published");
  };

  const handleSaveDraft = event => {
    event.preventDefault();
    handlePostSubmit("drafted");
  };

  const handleCancel = () => {
    setFormData({ title: "", description: "" });
    setSelectedCategories([]);
    history.push("/");
  };

  return (
    <PostForm
      categories={formattedOptions}
      description={formData.description}
      isSubmitting={isPending}
      selectedCategories={selectedCategories}
      title={formData.title}
      onCancel={handleCancel}
      onCategoryChange={setSelectedCategories}
      onChange={handleChange}
      onSaveDraft={handleSaveDraft}
      onSubmit={handleSubmit}
    />
  );
};

export default NewPost;
