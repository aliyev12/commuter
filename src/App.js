import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { EditList } from "./components/edit/EditList";
import { Add } from "./components/add/Add";
import { Home } from "./components/home/Home";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import { Layout } from "./components/global/Layout";
import { RoutesContext } from "./contexts/RoutesContext";

function App() {
  const { dispatch } = React.useContext(RoutesContext);

  React.useEffect(() => {
    dispatch({ type: "SYNC_BUSSES_TO_TRACK_FROM_LOCAL_STORAGE" });
  }, []);

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
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
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
