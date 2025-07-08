import React from "react";

import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import PageLoader from "./components/PageLoader";

const App = () => (
  <Router>
    <ToastContainer />
    <Switch>
      <Route exact component={PageLoader} path="/" />
    </Switch>
  </Router>
);

export default App;
