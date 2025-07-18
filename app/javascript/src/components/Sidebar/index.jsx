import React, { useRef, useState } from "react";

import { Tooltip, Button, Avatar } from "@bigbinary/neetoui";
import Logger from "js-logger";
import {
  RiBookLine,
  RiFileAddLine,
  RiFolderLine,
  RiLogoutBoxRLine,
  RiUser3Line,
} from "react-icons/ri";
import { Link } from "react-router-dom";

import CategorySidebar from "./CategorySidebar";

import authApi from "../../apis/auth";
import { resetAuthTokens } from "../../apis/axios";
import useAuthStore from "../stores/useAuthStore";
import usePostStore from "../stores/usePostStore";

const Navbar = () => {
  const sidebarRef = useRef(null);
  const categorySidebarRef = useRef(null);
  const modalRef = useRef(null);

  const { showCategories, toggleSidebar } = usePostStore();
  const [isLogoutVisible, setIsLogoutVisible] = useState(false);

  const { resetAuth, userName, email } = useAuthStore();

  const handleLogout = async () => {
    try {
      await authApi.logout();
      resetAuth();
      resetAuthTokens();
      window.location.href = "/";
    } catch (error) {
      Logger.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className="relative flex h-full w-14 flex-col items-center justify-between bg-white py-4 shadow"
        ref={sidebarRef}
      >
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
              type="button"
              onClick={toggleSidebar}
            >
              <RiFolderLine size={24} />
            </button>
          </Tooltip>
        </div>
        <div className="relative mb-2">
          <Avatar
            className="cursor-pointer"
            size="small"
            user={{
              name: userName || "Guest",
              imageUrl: `https://ui-avatars.com/api/?name=${
                userName || "Guest"
              }&background=random`,
            }}
            onClick={() => setIsLogoutVisible(prev => !prev)}
          />
          {isLogoutVisible && (
            <div className="absolute bottom-0 left-16 z-50 w-60 rounded-lg border bg-white p-4 shadow-lg">
              <div className="mb-3">
                <p className="text-sm font-semibold text-gray-700">
                  {userName}
                </p>
                <p className="break-words text-xs text-gray-500">{email}</p>
              </div>
              <Button
                fullWidth
                icon={RiLogoutBoxRLine}
                label="Logout"
                size="small"
                style="secondary"
                onClick={handleLogout}
              />
            </div>
          )}
        </div>
      </div>
      {showCategories && (
        <CategorySidebar modalRef={modalRef} ref={categorySidebarRef} />
      )}
    </div>
  );
};

export default Navbar;
