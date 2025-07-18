import React from "react";

import {
  Typography,
  Input,
  Textarea,
  Button,
  Select,
  Dropdown,
} from "@bigbinary/neetoui";
import { useTranslation } from "react-i18next";

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
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="flex items-center justify-between border-b bg-white px-6 py-3 shadow-sm">
        <Typography className="text-xl font-semibold">
          {isEdit ? t("postForm.editHeading") : t("postForm.newHeading")}
        </Typography>
        <div className="flex items-center gap-2">
          <Button
            label={t("postForm.cancel")}
            style="secondary"
            onClick={onCancel}
          />
          <Dropdown
            buttonProps={{ size: "small" }}
            buttonStyle="primary"
            label={t("postForm.publish")}
          >
            <li onClick={onSubmit}>{t("postForm.publishNow")}</li>
            <li onClick={onSaveDraft}>{t("postForm.saveAsDraft")}</li>
          </Dropdown>
        </div>
      </div>
      <div className="flex flex-1 items-start justify-center p-4 md:pt-6">
        <div className="w-full max-w-4xl rounded-2xl bg-white p-6 shadow-sm">
          <form className="space-y-6">
            <div>
              <Typography className="mb-1 font-medium">
                {t("postForm.titleLabel")}
              </Typography>
              <Input
                name="title"
                placeholder={t("postForm.titlePlaceholder")}
                value={title}
                onChange={onChange}
              />
            </div>
            <div>
              <Typography className="mb-1 font-medium">
                {t("postForm.categoryLabel")}
              </Typography>
              <Select
                isMulti
                isSearchable
                options={categories}
                placeholder={t("postForm.categoryPlaceholder")}
                value={selectedCategories}
                onChange={onCategoryChange}
              />
            </div>
            <div>
              <Typography className="mb-1 font-medium">
                {t("postForm.descriptionLabel")}
              </Typography>
              <Textarea
                maxLength="1000"
                name="description"
                placeholder={t("postForm.descriptionPlaceholder")}
                value={description}
                onChange={onChange}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostForm;
