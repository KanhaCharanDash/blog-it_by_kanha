import React from "react";

import { NoData } from "@bigbinary/neetoui";
import Header from "components/commons/Header";
import Navbar from "components/Sidebar";
import { useTranslation } from "react-i18next";

const NoDataPage = () => {
  const { t } = useTranslation();

  return (
    <div className="flex h-screen flex-col">
      <Header title="Blog Post" />
      <div className="flex flex-1">
        <Navbar />
        <div className="flex flex-1 items-center justify-center">
          <NoData
            title={t("noDataPage.notFound")}
            primaryButtonProps={{
              label: t("noDataPage.addNewPost"),
              to: "/posts/new",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default NoDataPage;
