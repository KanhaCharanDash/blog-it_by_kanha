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
    <div className="flex items-center justify-between border-b px-6 py-4 shadow-sm">
      <Typography className="text-2xl font-bold">{title}</Typography>
      {showAddButton && (
        <Button
          icon="ri-add-line"
          label="Add new post"
          onClick={handleAddClick}
        />
      )}
    </div>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  showAddButton: PropTypes.bool,
};

export default Header;
