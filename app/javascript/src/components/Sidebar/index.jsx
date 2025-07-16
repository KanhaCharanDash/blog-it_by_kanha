import React, { useRef, useState } from "react";

import { Tooltip, Button, Avatar } from "@bigbinary/neetoui";
import Logger from "js-logger";
import {
  RiBookLine,
  RiFileAddLine,
  RiFolderLine,
  RiLogoutBoxRLine,
  RiUser3Line, // 👤 Icon for My Posts
} from "react-icons/ri";
import { Link } from "react-router-dom";

import CategorySidebar from "./CategorySidebar";

import authApi from "../../apis/auth";
import { resetAuthTokens } from "../../apis/axios";
import useAuthStore from "../stores/useAuthStore";
import useCategoryStore from "../stores/useCategoryStore";

const Navbar = () => {
  const sidebarRef = useRef(null);
  const categorySidebarRef = useRef(null);
  const modalRef = useRef(null);

  const [showCategories, setShowCategories] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  const { categories } = useCategoryStore();
  const { resetAuth } = useAuthStore.getState();

  const handleLogout = async () => {
    try {
      await authApi.logout();
      resetAuth(); // Zustand logout
      resetAuthTokens(); // Clear Axios headers
      window.location.href = "/";
    } catch (error) {
      Logger.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar container */}
      <div
        className="flex h-full w-14 flex-col items-center justify-between bg-white py-4 shadow"
        ref={sidebarRef}
      >
        {/* Top icons */}
        <div className="flex flex-col items-center space-y-6">
          <Tooltip content="Blog Posts" position="right">
            <Link className="text-gray-700 hover:text-blue-600" to="/">
              <RiBookLine size={24} />
            </Link>
          </Tooltip>
          <Tooltip content="New Post" position="right">
            <Link className="text-gray-700 hover:text-blue-600" to="/posts/new">
              <RiFileAddLine size={24} />
            </Link>
          </Tooltip>
          <Tooltip content="My Posts" position="right">
            <Link className="text-gray-700 hover:text-blue-600" to="/my-posts">
              <RiUser3Line size={24} />
            </Link>
          </Tooltip>
          <Tooltip content="Categories" position="right">
            <button
              className="text-gray-700 hover:text-blue-600"
              onClick={() => setShowCategories(prev => !prev)}
            >
              <RiFolderLine size={24} />
            </button>
          </Tooltip>
        </div>
        {/* Bottom Profile */}
        <div className="flex flex-col items-center space-y-6">
          {showLogout && (
            <Button
              className="mb-2"
              icon={RiLogoutBoxRLine}
              label="Logout"
              size="small"
              style="secondary"
              onClick={handleLogout}
            />
          )}
          <Avatar
            className="cursor-pointer"
            size="small"
            user={{
              name: "John Doe",
              imageUrl:
                "https://ui-avatars.com/api/?name=John+Doe&background=random",
            }}
            onClick={() => setShowLogout(prev => !prev)}
          />
        </div>
      </div>
      {/* Category sidebar if toggled */}
      {showCategories && (
        <CategorySidebar
          categories={categories}
          modalRef={modalRef}
          ref={categorySidebarRef}
        />
      )}
    </div>
  );
};

export default Navbar;
