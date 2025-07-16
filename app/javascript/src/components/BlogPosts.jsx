import React, { useEffect, useState } from "react";

import {
  Typography,
  Tooltip,
  Table,
  Dropdown,
  Toastr,
} from "@bigbinary/neetoui";
import { useHistory } from "react-router-dom";

import PageLoader from "./commons/PageLoader";
import Navbar from "./Navbar"; // 👈 Import Navbar

import postsApi from "../apis/post";

const BlogPosts = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const history = useHistory();
  const { Menu, MenuItem, Divider } = Dropdown;

  // Fetch current user's posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await postsApi.fetchMyPosts();
        setPosts(response.data.posts);
      } catch (error) {
        logger.error("Failed to fetch posts", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleStatusChange = async (slug, newStatus) => {
    try {
      await postsApi.update({ slug, payload: { status: newStatus } });
      const updatedPostRes = await postsApi.show(slug);
      const updatedPost = updatedPostRes.data.post;
      setPosts(prev =>
        prev.map(post => (post.slug === slug ? updatedPost : post))
      );

      Toastr.success(
        `Post ${
          newStatus === "published" ? "published" : "unpublished"
        } successfully.`
      );
    } catch (error) {
      logger.error(error);
      Toastr.error("Failed to update post status.");
    }
  };

  const handleDelete = async slug => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      await postsApi.destroy(slug);
      setPosts(prev => prev.filter(p => p.slug !== slug));
      Toastr.success("Post deleted successfully.");
    } catch (error) {
      logger.error(error);
      Toastr.error("Something went wrong while deleting the post.");
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
      title: "Last Published At",
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

  if (loading) return <PageLoader />;

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Navbar />
      {/* Main Content */}
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
