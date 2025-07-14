import React, { useEffect, useRef, useState } from "react";

import { Button, Typography } from "@bigbinary/neetoui";
import classNames from "classnames";
import {
  RiMenuLine,
  RiBookLine,
  RiFileAddLine,
  RiFolderLine,
} from "react-icons/ri";
import { Link } from "react-router-dom";

import CategorySidebar from "./Sidebar/CategorySidebar";

const Navbar = ({ categories = [], onCategorySelect, onAddCategory }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const sidebarRef = useRef(null);
  const categorySidebarRef = useRef(null);
  const modalRef = useRef(null); // ✅ modal ref

  const handleOutsideClick = event => {
    const clickedOutsideSidebar =
      sidebarRef.current && !sidebarRef.current.contains(event.target);

    const clickedOutsideCategorySidebar =
      categorySidebarRef.current &&
      !categorySidebarRef.current.contains(event.target);

    const clickedOutsideModal =
      modalRef.current && !modalRef.current.contains(event.target);

    if (
      clickedOutsideSidebar &&
      clickedOutsideCategorySidebar &&
      clickedOutsideModal
    ) {
      setIsOpen(false);
      setShowCategories(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <>
      {/* Hamburger Button */}
      <Button
        className="fixed left-4 top-4 z-50 md:hidden"
        icon={RiMenuLine}
        style="text"
        onClick={() => {
          setIsOpen(prev => {
            const newIsOpen = !prev;
            if (!newIsOpen) setShowCategories(false); // 👈 Close sidebar too

            return newIsOpen;
          });
        }}
      />
      {/* Primary Sidebar */}
      <div
        ref={sidebarRef}
        className={classNames(
          "fixed inset-y-0 left-0 z-40 w-48 transform bg-white shadow-md transition-transform duration-300 ease-in-out",
          {
            "-translate-x-full": !isOpen,
            "translate-x-0": isOpen,
            "md:translate-x-0": true,
          }
        )}
      >
        <nav className="mt-12 flex flex-col space-y-4 p-4 md:mt-4">
          <Link
            className="flex items-center space-x-2 text-gray-800 hover:text-blue-600"
            to="/"
          >
            <RiBookLine />
            <Typography component="span" style="body2">
              Blog Posts
            </Typography>
          </Link>
          <Link
            className="flex items-center space-x-2 text-gray-800 hover:text-blue-600"
            to="/posts/new"
          >
            <RiFileAddLine />
            <Typography component="span" style="body2">
              New Post
            </Typography>
          </Link>
          <button
            className="flex items-center space-x-2 text-gray-800 hover:text-blue-600"
            onClick={() => setShowCategories(prev => !prev)}
          >
            <RiFolderLine />
            <Typography component="span" style="body2">
              Categories
            </Typography>
          </button>
        </nav>
      </div>
      {/* Category Sidebar */}
      {showCategories && (
        <CategorySidebar
          categories={categories}
          modalRef={modalRef}
          ref={categorySidebarRef}
          onAddCategory={onAddCategory}
          onCategorySelect={onCategorySelect}
        />
      )}
    </>
  );
};

export default Navbar;
