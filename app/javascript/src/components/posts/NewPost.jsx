import React, { useState } from "react";

import {
  Typography,
  Input,
  Textarea,
  Button,
  Select,
} from "@bigbinary/neetoui";
import { useHistory } from "react-router-dom";

import postsApi from "../../apis/post";
import Header from "../commons/Header";
import useAuthStore from "../stores/useAuthStore";
import useCategoryStore from "../stores/useCategoryStore";

const NewPost = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [selectedCategories, setSelectedCategories] = useState([]);

  const { categories } = useCategoryStore();

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

    const { userId, organizationId } = useAuthStore.getState();

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
      logger.error(error);
    }
  };

  const handleCancel = () => {
    setFormData({ title: "", description: "" });
    setSelectedCategories([]);
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header title="New blog post" />
      <div className="flex flex-1 items-start justify-center p-4 md:pt-6">
        <div className="w-full max-w-4xl rounded-2xl bg-white p-6 shadow-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <Typography className="mb-1 font-medium">Title*</Typography>
              <Input
                name="title"
                placeholder="Enter title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>
            <div>
              <Typography className="mb-1 font-medium">Description*</Typography>
              <Textarea
                name="description"
                placeholder="Enter description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            <div>
              <Typography className="mb-1 font-medium">Categories</Typography>
              <Select
                isMulti
                isSearchable
                options={formattedOptions}
                placeholder="Select categories"
                value={selectedCategories}
                onChange={setSelectedCategories}
              />
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button
                label="Cancel"
                style="secondary"
                type="button"
                onClick={handleCancel}
              />
              <Button label="Submit" type="submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewPost;
