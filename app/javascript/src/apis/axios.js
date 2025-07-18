import { Toastr } from "@bigbinary/neetoui";
import axios from "axios";

import useAuthStore from "../components/stores/useAuthStore";

const DEFAULT_ERROR_NOTIFICATION = "Something went wrong!";

axios.defaults.baseURL = "/";

const setAuthHeaders = () => {
  const { authToken, email } = useAuthStore.getState();

  axios.defaults.headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-CSRF-TOKEN": document
      .querySelector('[name="csrf-token"]')
      ?.getAttribute("content"),
  };

  if (authToken && email) {
    axios.defaults.headers["X-Auth-Email"] = email;
    axios.defaults.headers["X-Auth-Token"] = authToken;
  }
};

const handleSuccessResponse = response => {
  if (response) {
    response.success = response.status === 200;

    const noticeMessage = response.data?.notice;
    if (noticeMessage) {
      Toastr.success(noticeMessage);
    }
  }

  return response;
};

const handleErrorResponse = error => {
  const errorResponse = error.response;

  if (errorResponse?.status === 401) {
    useAuthStore.getState().resetAuth();
    setTimeout(() => {
      window.location.href = "/";
    }, 2000);
  }

  if (errorResponse?.status === 423) {
    window.location.href = "/";
  }

  const errorMessage = errorResponse?.data?.error ?? DEFAULT_ERROR_NOTIFICATION;

  Toastr.error(errorMessage);

  return Promise.reject(error);
};

const registerIntercepts = () => {
  axios.interceptors.response.use(handleSuccessResponse, handleErrorResponse);
};

const resetAuthTokens = () => {
  delete axios.defaults.headers["X-Auth-Email"];
  delete axios.defaults.headers["X-Auth-Token"];
};

export { setAuthHeaders, registerIntercepts, resetAuthTokens };
