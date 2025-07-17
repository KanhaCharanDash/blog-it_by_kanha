import React from "react";

import {
  Typography,
  Input,
  Textarea,
  Button,
  Select,
  Dropdown,
} from "@bigbinary/neetoui";

const PostForm = ({
  title,
  description,
  categories = [],
  selectedCategories = [],
  onChange,
  onCategoryChange,
  onSubmit,
  onSaveDraft,
  onCancel,
  isEdit = false,
}) => (
  <div className="flex min-h-screen w-full flex-col">
    {/* Header */}
    <div className="flex items-center justify-between border-b bg-white px-6 py-3 shadow-sm">
      <Typography className="text-xl font-semibold">
        {isEdit ? "Edit blog post" : "New blog post"}
      </Typography>
      <div className="flex items-center gap-2">
        <Button label="Cancel" style="secondary" onClick={onCancel} />
        <Dropdown
          buttonProps={{ size: "small" }}
          buttonStyle="primary"
          label="Publish"
        >
          <li onClick={onSubmit}>Publish now</li>
          <li onClick={onSaveDraft}>Save as draft</li>
        </Dropdown>
      </div>
    </div>
    {/* Form */}
    <div className="flex flex-1 items-start justify-center p-4 md:pt-6">
      <div className="w-full max-w-4xl rounded-2xl bg-white p-6 shadow-sm">
        <form className="space-y-6">
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
            <Typography className="mb-1 font-medium">Category*</Typography>
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
              maxLength="1000"
              name="description"
              placeholder="Enter description"
              value={description}
              onChange={onChange}
            />
          </div>
        </form>
      </div>
    </div>
  </div>
);

export default PostForm;
