import React from "react";
import "./App.css";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import { Header } from "./features/header/Header.js";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import routes from "./routes";
import Home from "./home";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

export const App = ()  => {
    return (
    <React.StrictMode>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" render={() => {
            return (<Redirect to="/home" />)
          }} />
          <Route path="/home" component={Home} />
          {routes.map(({ path, Component }, key) => (
            <Route exact path={path} key={key} component={Component} />
          ))}
        </Switch>
      </Router>
    </React.StrictMode>
  );
}

export default App;
