import "../stylesheets/application.scss";
import ReactRailsUJS from "react_ujs";
import "../src/common/i18n"; // i18n initialization
// i18n should load before App initialization. Hence, disabling import/order rule.
// eslint-disable-next-line import/order
import App from "../src/App";

import { registerIntercepts, setAuthHeaders } from "apis/axios";
import { initializeLogger } from "common/logger";

registerIntercepts();
initializeLogger();
setAuthHeaders();

const componentsContext = { App };
ReactRailsUJS.getConstructor = name => {
  return componentsContext[name];
};
