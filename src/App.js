import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { EditList } from "./components/EditList";
import { Add } from "./components/Add";
import { Home } from "./components/Home";
import { Layout } from "./components/Layout";

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/edit">
            <EditList />
          </Route>
          <Route path="/add">
            <Add />
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
