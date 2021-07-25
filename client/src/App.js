import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import Landing from "./components/layouts/Landing";
import Alert from "./components/layouts/Alert";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Route exact path="/" component={Landing} />
      <Alert />
      <Switch>
        <Route exact path="#" />
      </Switch>
    </Router>
  );
};

export default App;
