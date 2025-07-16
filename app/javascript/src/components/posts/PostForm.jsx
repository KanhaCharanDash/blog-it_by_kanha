// components/Posts/Form.jsx
import React from "react";

import {
  Typography,
  Input,
  Textarea,
  Button,
  Select,
} from "@bigbinary/neetoui";

import Header from "../commons/Header";

const PostForm = ({
  title,
  description,
  categories = [],
  selectedCategories = [],
  onChange,
  onCategoryChange,
  onSubmit,
  onCancel,
  isEdit = false,
}) => (
  <div className="flex min-h-screen w-full flex-col">
    <Header title={isEdit ? "Edit post" : "New blog post"} />
    <div className="flex flex-1 items-start justify-center p-4 md:pt-6">
      <div className="w-full max-w-4xl rounded-2xl bg-white p-6 shadow-sm">
        <form className="space-y-6" onSubmit={onSubmit}>
          <div>
            <Typography className="mb-1 font-medium">Title*</Typography>
            <Input
              name="title"
              placeholder="Enter title"
              value={title}
              onChange={onChange}
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
              onChange={onCategoryChange}
            />
          </div>
          <div>
            <Typography className="mb-1 font-medium">Description*</Typography>
            <Textarea
              name="description"
              placeholder="Enter description"
              value={description}
              onChange={onChange}
            />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button
              label="Cancel"
              style="secondary"
              type="button"
              onClick={onCancel}
            />
            <Button label="Submit" type="submit" />
          </div>
        </form>
      </div>
    </div>
  </div>
);

export default PostForm;
