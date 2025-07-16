import React from "react";

import { Typography, Button } from "@bigbinary/neetoui";
import PropTypes from "prop-types";
import { useHistory, useParams } from "react-router-dom";

import useAuthStore from "../stores/useAuthStore";

const Header = ({ title, showAddButton = false, postUserId = -1 }) => {
  const { slug } = useParams();

  const history = useHistory();
  const userId = useAuthStore(state => state.userId); // ✅ correct
  const handleAddClick = () => {
    history.push("/posts/new");
  };

  return (
    <div className="flex items-center justify-between border-b bg-white px-6 py-3 shadow-sm">
      <div className="flex items-center">
        <Typography className="text-xl font-semibold">{title} </Typography>
      </div>
      {showAddButton && (
        <div className="flex items-center">
          <Button
            icon="ri-add-line"
            label="Add new post"
            onClick={handleAddClick}
          />
        </div>
      )}
      {postUserId && userId && postUserId === userId && (
        <div className="flex items-center">
          <Button
            icon="ri-delete-bin-5-line"
            label="edit post"
            style="secondary"
            onClick={() => history.push(`/posts/${slug}/edit`)}
          />
        </div>
      )}
    </div>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  showAddButton: PropTypes.bool,
};

export default Header;
