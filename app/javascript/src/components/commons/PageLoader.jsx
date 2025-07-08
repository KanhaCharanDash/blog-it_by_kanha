import React from "react";

import { Spinner } from "@bigbinary/neetoui";
import classnames from "classnames";

const PageLoader = ({ className = "" }) => (
  <div
    className={classnames(
      [className],
      "flex h-screen w-screen flex-row items-center justify-center"
    )}
  >
    <div className="flex h-20 w-20 items-center justify-center">
      <Spinner />
    </div>
    <h1 className="text-lg leading-5">Loading...</h1>
  </div>
);

export default PageLoader;
