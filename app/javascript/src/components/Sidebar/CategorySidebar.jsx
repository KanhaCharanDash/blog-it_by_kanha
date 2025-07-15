import React, { forwardRef, useState } from "react";

import { Input, Typography, Button, Modal, Toastr } from "@bigbinary/neetoui";

import categoriesApi from "../../apis/category";
import useCategoryStore from "../stores/useCategoryStore";
import usePostStore from "../stores/usePostStore";

const CategorySidebar = forwardRef(({ modalRef }, ref) => {
  const { categories, setCategory } = useCategoryStore();
  const { selectedCategoryIds, toggleCategoryId } = usePostStore();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;

    try {
      const {
        data: { category },
      } = await categoriesApi.create({ name: newCategoryName });

      setCategory(category);
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
        className="z-10 h-full w-64 flex-shrink-0 bg-white p-4 shadow-md"
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
        <div className="space-y-2 overflow-y-auto pr-1">
          {categories.map(category => {
            const isSelected = selectedCategoryIds.includes(category.id);

            return (
              <Button
                key={category.id}
                label={category.name}
                size="small"
                style="secondary"
                className={`w-full justify-start ${
                  isSelected ? "bg-blue-600 text-white" : "bg-gray-100"
                }`}
                onClick={() => toggleCategoryId(category.id)}
              />
            );
          })}
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
