import React from "react";

import { either, isEmpty, isNil } from "ramda";
import { QueryClientProvider } from "react-query";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Login from "./components/Authentication/Login";
import Signup from "./components/Authentication/Signup";
import BlogPosts from "./components/BlogPosts";
import NoDataPage from "./components/commons/NoDataPage";
import PrivateRoute from "./components/commons/PrivateRoute";
import Posts from "./components/posts";
import Edit from "./components/posts/Edit";
import NewPost from "./components/posts/NewPost";
import Show from "./components/posts/Show";
import useAuthStore from "./components/stores/useAuthStore";
import queryClient from "./utils/queryClient";

const App = () => {
  const authToken = useAuthStore(state => state.authToken);
  const isLoggedIn = !either(isNil, isEmpty)(authToken);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ToastContainer />
        <Switch>
          <Route exact component={Signup} path="/signup" />
          <Route exact component={Login} path="/login" />
          <PrivateRoute
            exact
            component={Posts}
            condition={isLoggedIn}
            path="/posts"
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
          <Route exact path="/">
            <Redirect to="/posts" />
          </Route>
          <Route exact component={NoDataPage} path="*" />
        </Switch>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
