import React from "react";

import { Button, Input, Typography } from "@bigbinary/neetoui";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Login = ({ handleSubmit, setEmail, setPassword, loading }) => {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <Typography className="mt-6 text-center text-gray-700" style="h2">
          {t("login.heading")}
        </Typography>
        <div className="text-center">
          <Link
            className="mt-2 text-sm font-medium text-indigo-500 transition duration-150 ease-in-out focus:underline focus:outline-none"
            to="/signup"
          >
            {t("login.signupLink")}
          </Link>
        </div>
        <form className="mt-8 flex flex-col gap-y-6" onSubmit={handleSubmit}>
          <Input
            required
            label={t("login.emailLabel")}
            placeholder={t("login.emailPlaceholder")}
            type="email"
            onChange={event => setEmail(event.target.value)}
          />
          <Input
            required
            label={t("login.passwordLabel")}
            placeholder={t("login.passwordPlaceholder")}
            type="password"
            onChange={event => setPassword(event.target.value)}
          />
          <Button label={t("login.button")} loading={loading} type="submit" />
        </form>
      </div>
    </div>
  );
};

export default Login;
