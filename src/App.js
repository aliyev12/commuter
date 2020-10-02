import React from "react";
import { Home } from "./components/Home";
import { EditList } from "./components/EditList";
import { Layout } from "./components/Layout";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/edit">
            <EditList />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
