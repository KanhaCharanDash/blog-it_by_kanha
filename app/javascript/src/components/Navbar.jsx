import React, { useRef, useEffect } from "react";

import { Tooltip } from "@bigbinary/neetoui";
import { RiBookLine, RiFileAddLine, RiFolderLine } from "react-icons/ri";
import { Link } from "react-router-dom";

import CategorySidebar from "./Sidebar/CategorySidebar";

const Navbar = ({ categories = [], onCategorySelect, onAddCategory }) => {
  const sidebarRef = useRef(null);
  const categorySidebarRef = useRef(null);
  const modalRef = useRef(null);
  const [showCategories, setShowCategories] = React.useState(false);

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
      setShowCategories(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <>
      {/* Slim Sidebar with Icons Only */}
      <div
        className="fixed inset-y-0 left-0 z-40 flex w-14 flex-col items-center bg-white py-4 shadow"
        ref={sidebarRef}
      >
        <Tooltip content="Blog Posts" position="right">
          <Link className="mb-6 text-gray-700 hover:text-blue-600" to="/">
            <RiBookLine size={24} />
          </Link>
        </Tooltip>
        <Tooltip content="New Post" position="right">
          <Link
            className="mb-6 text-gray-700 hover:text-blue-600"
            to="/posts/new"
          >
            <RiFileAddLine size={24} />
          </Link>
        </Tooltip>
        <Tooltip content="Categories" position="right">
          <button
            className="mb-6 text-gray-700 hover:text-blue-600"
            onClick={() => setShowCategories(prev => !prev)}
          >
            <RiFolderLine size={24} />
          </button>
        </Tooltip>
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
