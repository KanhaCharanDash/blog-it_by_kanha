// App.jsx
import React from "react";

import { either, isEmpty, isNil } from "ramda";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Login from "./components/Authentication/Login";
import Signup from "./components/Authentication/Signup";
import BlogPosts from "./components/BlogPosts";
import PrivateRoute from "./components/commons/PrivateRoute";
import Posts from "./components/posts";
import Edit from "./components/posts/Edit";
import NewPost from "./components/posts/NewPost";
import Show from "./components/posts/Show";
import useAuthStore from "./components/stores/useAuthStore";

const App = () => {
  const authToken = useAuthStore(state => state.authToken);
  const isLoggedIn = !either(isNil, isEmpty)(authToken);

  return (
    <Router>
      <ToastContainer />
      <Switch>
        <Route exact component={Signup} path="/signup" />
        <Route exact component={Login} path="/login" />
        <PrivateRoute
          exact
          component={Posts}
          condition={isLoggedIn}
          path="/"
          redirectRoute="/login"
        />
        <PrivateRoute
          exact
          component={NewPost}
          condition={isLoggedIn}
          path="/posts/new"
          redirectRoute="/login"
        />
        <PrivateRoute
          exact
          component={Show}
          condition={isLoggedIn}
          path="/posts/:slug"
          redirectRoute="/login"
        />
        <PrivateRoute
          exact
          component={Edit}
          condition={isLoggedIn}
          path="/posts/:slug/edit"
          redirectRoute="/login"
        />
        <PrivateRoute
          exact
          component={BlogPosts}
          condition={isLoggedIn}
          path="/my-posts"
          redirectRoute="/login"
        />
      </Switch>
    </Router>
  );
};

export default App;
