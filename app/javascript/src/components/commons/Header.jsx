import React from "react";

import { Button, Tag, Tooltip, Typography } from "@bigbinary/neetoui";
import classNames from "classnames";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { FiEdit } from "react-icons/fi";
import { useHistory, useParams } from "react-router-dom";

import useAuthStore from "../stores/useAuthStore";

const Header = ({ title, showAddButton = false, postUserId = -1, drafted }) => {
  const { slug } = useParams();
  const history = useHistory();
  const { t } = useTranslation();
  const userId = useAuthStore(state => state.userId);

  const handleAddClick = () => {
    history.push("/posts/new");
  };

  const handleEditClick = () => {
    history.push(`/posts/${slug}/edit`);
  };

  const isEditable = postUserId && userId && postUserId === userId;

  return (
    <div className="flex items-center justify-between border-b bg-white px-6 py-3 shadow-sm">
      <div className="flex items-center gap-2">
        <Typography className="text-xl font-semibold">{title}</Typography>
        {drafted && <Tag label={t("header.draft")} style="warning" />}
      </div>
      <div className="flex items-center gap-2">
        {showAddButton && (
          <Button
            icon="ri-add-line"
            label={t("header.addNewPost")}
            onClick={handleAddClick}
          />
        )}
        {isEditable && (
          <Tooltip content={t("header.editPost")} position="bottom">
            <button
              className={classNames(
                "rounded p-1",
                "hover:text-primary-500 text-gray-600"
              )}
              onClick={handleEditClick}
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
