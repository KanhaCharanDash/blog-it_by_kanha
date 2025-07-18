import React from "react";

import {
  Typography,
  Tooltip,
  Table,
  Dropdown,
  Toastr,
} from "@bigbinary/neetoui";
import { useHistory } from "react-router-dom";

import PageLoader from "./commons/PageLoader";
import Navbar from "./Sidebar";

import {
  useMyPosts,
  useUpdatePost,
  useDeletePost,
} from "../hooks/reactQuery/usePostsApi";

const BlogPosts = () => {
  const history = useHistory();
  const { Menu, MenuItem, Divider } = Dropdown;

  const { data: posts = [], isLoading, isError } = useMyPosts();

  const { mutate: updatePost } = useUpdatePost();
  const { mutate: deletePost } = useDeletePost();

  const handleStatusChange = (slug, newStatus) => {
    updatePost(
      { slug, payload: { status: newStatus } },
      {
        onSuccess: () => Toastr.success("Post status updated successfully."),
        onError: () => Toastr.error("Failed to update post status."),
      }
    );
  };

  const handleDelete = slug => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      deletePost(slug, {
        onSuccess: () => Toastr.success("Post deleted successfully."),
        onError: () =>
          Toastr.error("Something went wrong while deleting the post."),
      });
    }
  };

  const getDropdown = post => (
    <Dropdown buttonStyle="text" label="Actions" position="bottom-end">
      <Menu>
        {post.status === "drafted" ? (
          <MenuItem onClick={() => handleStatusChange(post.slug, "published")}>
            Publish
          </MenuItem>
        ) : (
          <MenuItem onClick={() => handleStatusChange(post.slug, "drafted")}>
            Unpublish
          </MenuItem>
        )}
        <Divider />
        <MenuItem onClick={() => handleDelete(post.slug)}>Delete</MenuItem>
      </Menu>
    </Dropdown>
  );

  const columns = [
    {
      title: "Title",
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
      title: "Category",
      dataIndex: "categories",
      key: "categories",
      render: categories => categories.map(cat => cat.name).join(", "),
    },
    {
      title: "Last Updated At",
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
      title: "Status",
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

  if (isError) return <div>Failed to load posts</div>;

  return (
    <div className="flex h-screen">
      <Navbar />
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <Typography className="mb-2" style="h2">
          My blog posts
        </Typography>
        <Typography className="mb-6 text-gray-600" style="body2">
          {posts.length} articles
        </Typography>
        <Table
          columnData={columns}
          currentPageNumber={1}
          defaultPageSize={10}
          rowData={Array.isArray(posts) ? posts : []}
          totalCount={posts.length}
        />
      </div>
    </div>
  );
};

export default BlogPosts;
