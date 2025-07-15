import React from "react";

import { Typography, Button } from "@bigbinary/neetoui";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

const Header = ({ title, showAddButton = false }) => {
  const history = useHistory();

  const handleAddClick = () => {
    history.push("/posts/new");
  };

  return (
    <div className="flex items-center justify-between border-b bg-white px-6 py-3 shadow-sm">
      <div className="flex items-center">
        <Typography className="text-xl font-semibold">{title}</Typography>
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
    </div>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  showAddButton: PropTypes.bool,
};

export default Header;
