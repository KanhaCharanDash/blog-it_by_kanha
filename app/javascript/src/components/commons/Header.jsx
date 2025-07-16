import React from "react";

import { Typography, Button, Tag } from "@bigbinary/neetoui"; // ⬅️ Added Tag
import PropTypes from "prop-types";
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
          <Button
            icon="ri-edit-box-line"
            label="Edit post"
            style="secondary"
            onClick={() => history.push(`/posts/${slug}/edit`)}
          />
        )}
      </div>
    </div>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  showAddButton: PropTypes.bool,
  postUserId: PropTypes.number,
  drafted: PropTypes.bool, // ✅ Add prop type
};

export default Header;
