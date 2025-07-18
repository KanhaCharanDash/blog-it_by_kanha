import React, { useState } from "react";

import authApi from "apis/auth";
import { setAuthHeaders } from "apis/axios";
import LoginForm from "components/Authentication/Form/Login";
import Logger from "js-logger";

import useAuthStore from "../stores/useAuthStore";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const setAuth = useAuthStore(state => state.setAuth);

  const handleSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await authApi.login({ email, password });
      const authData = {
        authToken: response.data.authentication_token,
        userId: response.data.id,
        userName: response.data.name,
        email: email.toLowerCase(),
        organizationId: response.data.organization_id,
      };

      setAuth(authData);
      setAuthHeaders();
      window.location.href = "/";
    } catch (error) {
      setLoading(false);
      Logger.error("Login failed:", error);
    }
  };

  return (
    <LoginForm
      handleSubmit={handleSubmit}
      loading={loading}
      setEmail={setEmail}
      setPassword={setPassword}
    />
  );
};

export default Login;
