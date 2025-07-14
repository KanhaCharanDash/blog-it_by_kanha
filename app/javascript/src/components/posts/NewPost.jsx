import React, { useEffect, useState } from "react";

import {
  Typography,
  Input,
  Textarea,
  Button,
  Select,
} from "@bigbinary/neetoui";
import { useHistory } from "react-router-dom";

import categoriesApi from "../../apis/category"; // ✅ You need to implement this
import postsApi from "../../apis/post";
import Header from "../commons/Header";

const NewPost = () => {
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [categories, setCategories] = useState([]); // All categories from API
  const [selectedCategories, setSelectedCategories] = useState([]); // IDs of selected categories

  const history = useHistory();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await categoriesApi.fetch(); // Make sure this returns all categories
      const formattedOptions = response.data.map(category => ({
        label: category.name,
        value: category.id,
      }));
      setCategories(formattedOptions);
    } catch (error) {
      logger.error(error);
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const payload = {
      ...formData,
      category_ids: selectedCategories.map(option => option.value), // Send category IDs
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
                options={categories}
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
