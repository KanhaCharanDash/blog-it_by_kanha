import React from "react";

import { NoData } from "@bigbinary/neetoui";

const NoDataPage = () => (
  <div className="absolute left-1/3 top-1/3">
    <NoData
      title="The page you're looking for can't be found"
      primaryButtonProps={{
        label: "Add New Post",
        className: "bg-neutral-800 hover:bg-neutral-950",
        to: "/posts/new",
      }}
    />
  </div>
);

export default NoDataPage;
