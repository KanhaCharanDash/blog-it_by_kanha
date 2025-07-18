import React from "react";

import { Button, Input, Select, Typography } from "@bigbinary/neetoui";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Signup = ({
  handleSubmit,
  setName,
  setEmail,
  setPassword,
  loading,
  setPasswordConfirmation,
  organizations = [],
  selectedOrganization,
  setSelectedOrganization,
}) => {
  const { t } = useTranslation();

  const organizationOptions = organizations.map(organization => ({
    label: organization.name,
    value: organization.id,
  }));

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <Typography className="mt-6 text-center text-gray-700" style="h2">
          {t("signup.heading")}
        </Typography>
        <div className="text-center">
          <Link
            className="mt-2 text-sm font-medium text-bb-purple transition duration-150 ease-in-out focus:underline focus:outline-none"
            to="/"
          >
            {t("signup.loginLink")}
          </Link>
        </div>
        <form className="mt-8 flex flex-col gap-y-6" onSubmit={handleSubmit}>
          <Input
            label={t("signup.nameLabel")}
            placeholder={t("signup.namePlaceholder")}
            onChange={event => setName(event.target.value)}
          />
          <Input
            label={t("signup.emailLabel")}
            placeholder={t("signup.emailPlaceholder")}
            type="email"
            onChange={event => setEmail(event.target.value)}
          />
          <Input
            label={t("signup.passwordLabel")}
            placeholder={t("signup.passwordPlaceholder")}
            type="password"
            onChange={event => setPassword(event.target.value)}
          />
          <Input
            label={t("signup.passwordConfirmationLabel")}
            placeholder={t("signup.passwordPlaceholder")}
            type="password"
            onChange={event => setPasswordConfirmation(event.target.value)}
          />
          <Select
            label={t("signup.organizationLabel")}
            options={organizationOptions}
            placeholder={t("signup.organizationPlaceholder")}
            value={selectedOrganization}
            onChange={setSelectedOrganization}
          />
          <Button
            label={t("signup.registerButton")}
            loading={loading}
            style="primary"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

export default Signup;
