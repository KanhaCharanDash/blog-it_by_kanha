import React, { forwardRef, useState } from "react";

import { Input, Typography, Button, Modal, Toastr } from "@bigbinary/neetoui";

import categoriesApi from "../../apis/category";
import useCategoryStore from "../stores/useCategoryStore";

const CategorySidebar = forwardRef(({ modalRef }, ref) => {
  const { categories, setCategory } = useCategoryStore();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  const allCategories = Object.values(categories); // ✅ convert object to array

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;

    try {
      const {
        data: { category },
      } = await categoriesApi.create({ name: newCategoryName });

      setCategory(category.id, category);
      Toastr.success("Category added successfully");
      setNewCategoryName("");
      setIsAddModalOpen(false);
    } catch {
      Toastr.error("Failed to add category");
    }
  };

  return (
    <>
      <div
        className="fixed left-48 top-0 z-30 h-full w-64 bg-white p-4 shadow-md"
        ref={ref}
      >
        <div className="mb-4 flex items-center justify-between">
          <Typography style="h5">Categories</Typography>
          <Button
            label="+"
            style="text"
            onClick={() => setIsAddModalOpen(true)}
          />
        </div>
        <div className="space-y-2 overflow-y-auto">
          {allCategories.map(category => (
            <Button
              className="w-full justify-start"
              key={category.id}
              label={category.name}
              size="small"
              style="secondary"
            />
          ))}
        </div>
      </div>
      <Modal
        isOpen={isAddModalOpen}
        size="large"
        onClose={() => setIsAddModalOpen(false)}
      >
        <div className="space-y-6 px-6 py-4" ref={modalRef}>
          <div className="space-y-1">
            <Typography component="h4" style="h4">
              Add New Category
            </Typography>
            <Typography className="text-gray-600" style="body2">
              Create and manage blog post categories.
            </Typography>
          </div>
          <div className="space-y-1">
            <Typography className="font-medium" style="body2">
              Category Title
            </Typography>
            <Input
              placeholder="Enter category name"
              value={newCategoryName}
              onChange={e => setNewCategoryName(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button
              label="Cancel"
              style="text"
              onClick={() => setIsAddModalOpen(false)}
            />
            <Button
              disabled={!newCategoryName.trim()}
              label="Add"
              onClick={handleAddCategory}
            />
          </div>
        </div>
      </Modal>
    </>
  );
});

CategorySidebar.displayName = "CategorySidebar";

export default CategorySidebar;
