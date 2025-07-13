import React, { useEffect, useRef, useState } from "react";

import classNames from "classnames";
import { RiMenuLine, RiBookLine, RiFileAddLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);

  const handleOutsideClick = event => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <>
      {/* Hamburger Button */}
      <button
        className="fixed left-4 top-4 z-50 rounded bg-white p-2 shadow md:hidden"
        onClick={() => setIsOpen(prev => !prev)}
      >
        <RiMenuLine size={24} />
      </button>
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={classNames(
          "fixed inset-y-0 left-0 z-40 w-48 transform bg-white shadow-md transition-transform duration-300 ease-in-out",
          {
            "-translate-x-full": !isOpen,
            "translate-x-0": isOpen,
            "md:translate-x-0": true, // Always show on md+
          }
        )}
      >
        <nav className="mt-12 flex flex-col space-y-4 p-4 md:mt-4">
          <Link
            className="flex items-center space-x-2 text-gray-800 hover:text-blue-600"
            to="/"
          >
            <RiBookLine />
            <span>Blog Posts</span>
          </Link>
          {/* New Post Link */}
          <Link
            className="flex items-center space-x-2 text-gray-800 hover:text-blue-600"
            to="/posts/new"
          >
            <RiFileAddLine />
            <span>New Post</span>
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
