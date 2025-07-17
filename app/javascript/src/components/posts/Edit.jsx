import React, { useEffect, useState } from "react";

import Logger from "js-logger";
import { useHistory, useParams } from "react-router-dom";

import PostForm from "./PostForm";

import postsApi from "../../apis/post";
import PageLoader from "../commons/PageLoader";
import useCategoryStore from "../stores/useCategoryStore";

const Edit = () => {
  const { slug } = useParams();
  const history = useHistory();

  const { categories } = useCategoryStore();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "drafted", // <-- added
    user_id: null,
    organization_id: null,
  });

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const formattedOptions = categories.map(category => ({
    label: category.name,
    value: category.id,
  }));

  const fetchPost = async () => {
    try {
      const {
        data: { post },
      } = await postsApi.show(slug);

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
    } catch (error) {
      Logger.error("Error loading post for editing:", error);
      history.replace("/");
    } finally {
      setLoading(false);
    }
  };

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
      await postsApi.update({ slug, payload });
      history.push(`/posts/${slug}`);
    } catch (error) {
      Logger.error("Error updating post:", error);
    }
  };

  const handleCancel = () => {
    history.goBack();
  };

  useEffect(() => {
    fetchPost();
  }, [slug]);

  if (loading) return <PageLoader />;

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
