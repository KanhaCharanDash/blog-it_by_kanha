import React, { forwardRef, useState } from "react";

import { Input, Typography, Button, Modal, Toastr } from "@bigbinary/neetoui";
import classNames from "classnames";
import { isEmpty, isNil, either } from "ramda";
import { useTranslation } from "react-i18next";

import {
  useCategories,
  useCreateCategory,
} from "../../hooks/reactQuery/useCategories";
import usePostStore from "../stores/usePostStore";

const CategorySidebar = forwardRef(({ modalRef }, ref) => {
  const { t } = useTranslation();

  const { selectedCategories, toggleCategory } = usePostStore();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  const { data: categories = [], isLoading: isCategoriesLoading } =
    useCategories();

  const { mutate: createCategory, isLoading: isCreatingCategory } =
    useCreateCategory();

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) return;

    createCategory(
      { name: newCategoryName },
      {
        onSuccess: () => {
          Toastr.success(t("categories.toastr.success"));
          setNewCategoryName("");
          setIsAddModalOpen(false);
        },
        onError: () => {
          Toastr.error(t("categories.toastr.error"));
        },
      }
    );
  };

  const handleCategoryChange = event => {
    setNewCategoryName(event.target.value);
  };

  const handleModalClose = () => {
    setIsAddModalOpen(false);
  };

  const handleToggleCategory = category => {
    toggleCategory(category);
  };

  const isCategoryListEmpty = either(isNil, isEmpty)(categories);

  return (
    <>
      <div
        className="z-10 h-full w-64 flex-shrink-0 bg-white p-4 shadow-md"
        ref={ref}
      >
        <div className="mb-4 flex items-center justify-between">
          <Typography style="h5">{t("categories.title")}</Typography>
          <Button
            label="+"
            style="text"
            onClick={() => setIsAddModalOpen(true)}
          />
        </div>
        <div className="space-y-2 overflow-y-auto pr-1">
          {isCategoriesLoading ? (
            <Typography>{t("common.loading")}</Typography>
          ) : (
            !isCategoryListEmpty &&
            categories.map(category => {
              const isSelected = selectedCategories.some(
                selectedCategory => selectedCategory.id === category.id
              );

              return (
                <Button
                  key={category.id}
                  label={t(`categories.${category.name}`, category.name)}
                  size="small"
                  style="secondary"
                  className={classNames(
                    "w-full justify-start",
                    isSelected ? "bg-blue-600 text-white" : "bg-gray-100"
                  )}
                  onClick={() => handleToggleCategory(category)}
                />
              );
            })
          )}
        </div>
      </div>
      <Modal isOpen={isAddModalOpen} size="large" onClose={handleModalClose}>
        <div className="space-y-6 px-6 py-4" ref={modalRef}>
          <div className="space-y-1">
            <Typography component="h4" style="h4">
              {t("categories.addModal.title")}
            </Typography>
            <Typography className="text-gray-600" style="body2">
              {t("categories.addModal.subtitle")}
            </Typography>
          </div>
          <div className="space-y-1">
            <Typography className="font-medium" style="body2">
              {t("categories.addModal.nameLabel")}
            </Typography>
            <Input
              placeholder={t("categories.addModal.namePlaceholder")}
              value={newCategoryName}
              onChange={handleCategoryChange}
            />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button
              label={t("common.cancel")}
              style="text"
              onClick={handleModalClose}
            />
            <Button
              disabled={!newCategoryName.trim() || isCreatingCategory}
              label={
                isCreatingCategory
                  ? t("categories.addModal.adding")
                  : t("categories.addModal.add")
              }
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
