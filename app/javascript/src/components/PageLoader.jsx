import React from "react";

import { Button } from "@bigbinary/neetoui";
import classnames from "classnames";

const PageLoader = ({ className = "" }) => (
  <div
    className={classnames(
      [className],
      "flex h-screen w-screen flex-row items-center justify-center"
    )}
  >
    <h1 className="text-lg leading-5">Loading...</h1>
    <Button label="Cancel" onClick={() => {}} />
  </div>
);

export default PageLoader;
