import React, { useState } from "react";

import {
  Typography,
  Tooltip,
  Table,
  Dropdown,
  Toastr,
  Alert,
} from "@bigbinary/neetoui";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import PageLoader from "./commons/PageLoader";
import Navbar from "./Sidebar";

import {
  useMyPosts,
  useUpdatePost,
  useDeletePost,
} from "../hooks/reactQuery/usePostsApi";

const BlogPosts = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const { Menu, MenuItem, Divider } = Dropdown;

  const { data: posts = [], isLoading, isError } = useMyPosts();
  const { mutate: updatePost } = useUpdatePost();
  const { mutate: deletePost } = useDeletePost();

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [slugToDelete, setSlugToDelete] = useState(null);

  const handleStatusChange = (slug, newStatus) => {
    updatePost(
      { slug, payload: { status: newStatus } },
      {
        onSuccess: () => Toastr.success(t("blogPosts.toastr.updateSuccess")),
        onError: () => Toastr.error(t("blogPosts.toastr.updateError")),
      }
    );
  };

  const handleDelete = postSlug => {
    setSlugToDelete(postSlug);
    setIsAlertOpen(true);
  };

  const confirmDelete = () => {
    deletePost(slugToDelete, {
      onSuccess: () => Toastr.success(t("blogPosts.toastr.deleteSuccess")),
      onError: () => Toastr.error(t("blogPosts.toastr.deleteError")),
    });
    setIsAlertOpen(false);
    setSlugToDelete(null);
  };

  const getDropdown = post => (
    <Dropdown
      buttonStyle="text"
      label={t("common.actions")}
      position="bottom-end"
    >
      <Menu>
        {post.status === "drafted" ? (
          <MenuItem onClick={() => handleStatusChange(post.slug, "published")}>
            {t("blogPosts.actions.publish")}
          </MenuItem>
        ) : (
          <MenuItem onClick={() => handleStatusChange(post.slug, "drafted")}>
            {t("blogPosts.actions.unpublish")}
          </MenuItem>
        )}
        <Divider />
        <MenuItem onClick={() => handleDelete(post.slug)}>
          {t("blogPosts.actions.delete")}
        </MenuItem>
      </Menu>
    </Dropdown>
  );

  const columns = [
    {
      title: t("blogPosts.columns.title"),
      dataIndex: "title",
      key: "title",
      render: (title, record) => {
        const isTruncated = title.length > 10;
        const truncatedTitle = isTruncated ? `${title.slice(0, 10)}...` : title;

        return (
          <Tooltip content={isTruncated ? title : ""} position="bottom-start">
            <Typography
              className="cursor-pointer text-indigo-600 hover:underline"
              onClick={() => history.push(`/posts/${record.slug}`)}
            >
              {truncatedTitle}
            </Typography>
          </Tooltip>
        );
      },
    },
    {
      title: t("blogPosts.columns.category"),
      dataIndex: "categories",
      key: "categories",
      render: categories =>
        categories.map(category => category.name).join(", "),
    },
    {
      title: t("blogPosts.columns.updatedAt"),
      dataIndex: "updated_at",
      key: "updated_at",
      render: date =>
        date
          ? new Date(date).toLocaleString("en-IN", {
              dateStyle: "medium",
              timeStyle: "short",
            })
          : "--",
    },
    {
      title: t("blogPosts.columns.status"),
      dataIndex: "status",
      key: "status",
      render: status =>
        status ? status.charAt(0).toUpperCase() + status.slice(1) : "--",
    },
    {
      title: "",
      key: "actions",
      render: (_, post) => getDropdown(post),
    },
  ];

  if (isLoading) return <PageLoader />;

  if (isError) {
    Toastr.error(t("blogPosts.toastr.fetchError"));

    return null;
  }

  return (
    <div className="flex h-screen">
      <Navbar />
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <Typography className="mb-2" style="h2">
          {t("blogPosts.heading")}
        </Typography>
        <Typography className="mb-6 text-gray-600" style="body2">
          {posts.length} {t("blogPosts.articles")}
        </Typography>
        <Table
          columnData={columns}
          currentPageNumber={1}
          defaultPageSize={10}
          rowData={Array.isArray(posts) ? posts : []}
          totalCount={posts.length}
        />
        <Alert
          cancelButtonLabel={t("blogPosts.alert.cancel")}
          isOpen={isAlertOpen}
          message={t("blogPosts.alert.message")}
          submitButtonLabel={t("blogPosts.alert.confirm")}
          title={t("blogPosts.alert.title")}
          onClose={() => setIsAlertOpen(false)}
          onSubmit={confirmDelete}
        />
      </div>
    </div>
  );
};

export default BlogPosts;
