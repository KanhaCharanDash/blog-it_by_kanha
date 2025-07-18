import React from "react";

import { NoData } from "@bigbinary/neetoui";
import { useTranslation } from "react-i18next";

const NoDataPage = () => {
  const { t } = useTranslation();

  return (
    <div className="flex justify-center pt-24">
      <NoData
        title={t("noDataPage.notFound")}
        primaryButtonProps={{
          label: t("noDataPage.addNewPost"),
          to: "/posts/new",
        }}
      />
    </div>
  );
};

export default NoDataPage;
