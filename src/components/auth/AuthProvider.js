import React, { useState, useEffect, useContext } from "react";
import { Route, Switch } from "react-router-dom";
import axios from "axios";
import TemplateContext from "../utils/TemplateContext";
import CreateCV from "../create/CreateCV";
import SignUp from "./SignUp";
import Login from "./Login";
import Dashboard from "../dashboard/Dashboard";
import Error404 from "../utils/Error404";
import LoadingScreen from "../utils/LoadingScreen";
import Home from "../home/Home";
import "../styles/main.css";

/**
 * @description - It laods after the App Component, makes an API request
 * and if the user is authenticated, it adds it to the global state.
 */
function AuthProvider() {
  const [loading, setLoading] = useState(true);
  const state = useContext(TemplateContext);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await axios.get("/api/v1/protected");
        state.addUser(res.data.user);

        setLoading(false);
      } catch (err) {
        state.addUser(null);
        setLoading(false);
      }
    }

    fetchUser();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Switch>
      <Route
        path="/login"
        render={(routeProps) => <Login {...routeProps} />}
        exact
      />
      <Route
        path="/login/save"
        render={(routeProps) => <Login {...routeProps} save={true} />}
        exact
      />
      <Route
        path="/signup"
        render={(routeProps) => <SignUp {...routeProps} />}
        exact
      />
      <Route
        path="/dashboard"
        render={(routeProps) => <Dashboard {...routeProps} />}
        exact
      />
      <Route path="/loading" component={LoadingScreen} exact />
      <Route path="/create" component={CreateCV} exact />
      <Route path="/" component={Home} exact />
      <Route path="/" component={Error404} />
    </Switch>
  );
}

export default AuthProvider;
