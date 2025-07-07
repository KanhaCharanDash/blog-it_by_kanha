import React from "react";

import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" render={() => <div>About hhh</div>} />
    </Switch>
  </Router>
);

export default App;
