import React from "react";

import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Posts from "./components/posts";
import NewPost from "./components/posts/NewPost";
import Show from "./components/posts/Show";

const App = () => (
  <Router>
    <ToastContainer />
    <Switch>
      <Route exact component={Posts} path="/" />
      <Route exact component={NewPost} path="/posts/new" />
      <Route exact component={Show} path="/posts/:slug" />
    </Switch>
  </Router>
);

export default App;
