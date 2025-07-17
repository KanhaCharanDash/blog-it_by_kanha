import React from "react";

import { Typography, Button, Tag, Tooltip } from "@bigbinary/neetoui";
import PropTypes from "prop-types";
import { FiEdit } from "react-icons/fi"; // ✅ React icon
import { useHistory, useParams } from "react-router-dom";

import useAuthStore from "../stores/useAuthStore";

const Header = ({ title, showAddButton = false, postUserId = -1, drafted }) => {
  const { slug } = useParams();
  const history = useHistory();
  const userId = useAuthStore(state => state.userId);

  const handleAddClick = () => {
    history.push("/posts/new");
  };

  return (
    <div className="flex items-center justify-between border-b bg-white px-6 py-3 shadow-sm">
      <div className="flex items-center gap-2">
        <Typography className="text-xl font-semibold">{title}</Typography>
        {drafted && <Tag label="Draft" style="warning" />}
      </div>
      <div className="flex items-center gap-2">
        {showAddButton && (
          <Button
            icon="ri-add-line"
            label="Add new post"
            onClick={handleAddClick}
          />
        )}
        {postUserId && userId && postUserId === userId && (
          <Tooltip content="Edit post" position="bottom">
            <button
              className="hover:text-primary-500 rounded p-1 text-gray-600"
              onClick={() => history.push(`/posts/${slug}/edit`)}
            >
              <FiEdit size={18} />
            </button>
          </Tooltip>
        )}
      </div>
    </div>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  showAddButton: PropTypes.bool,
  postUserId: PropTypes.number,
  drafted: PropTypes.bool,
};

export default Header;
