// app/javascript/src/components/commons/CategoryBadgeList.jsx

import React from "react";

import { Typography } from "@bigbinary/neetoui";
import { isNil, isEmpty, either } from "ramda";

const CategoryBadgeList = ({ categories }) => {
  if (either(isNil, isEmpty)(categories)) {
    return null;
  }

  return (
    <div className="mt-2 flex flex-wrap gap-2">
      {categories.map(category => (
        <Typography
          className="rounded bg-green-100 px-2 py-1 text-green-700"
          component="span"
          key={category.id}
          style="body3"
        >
          {category.name}
        </Typography>
      ))}
    </div>
  );
};

export default CategoryBadgeList;
