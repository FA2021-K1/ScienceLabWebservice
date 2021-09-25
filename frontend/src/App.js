import React from "react";
import "./App.css";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import { Header } from "./features/header/Header.js";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"
import routes from "./routes";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

export const App = () => {
  return (
    <React.StrictMode>
      <Router>
        <Switch>
          <Route exact path="/" render={() => {
            return (<Redirect to="/home" />)
          }} />
          {routes.map(({ path, Component }, key) => (
            <Route exact path={path} key={key} render={props => {
              const crumbs = routes
                .filter(({ path }) => props.match.path.includes(path))
                // replace id placeholders in parameterized routes
                .map(({ path, ...rest }) => ({
                  path: Object.keys(props.match.params).length
                    ? Object.keys(props.match.params).reduce(
                      (path, param) => path.replace(`:${param}`, props.match.params[param]), path)
                    : path,
                  ...rest
                }));
              return (
                <div>
                  <div id="content-container">
                    <Component {...props} />
                  </div>
                  <div id="header-container">
                    <Header crumbs={crumbs} />
                  </div>
                </div>
              );
            }} />
          ))}
        </Switch>
      </Router>
    </React.StrictMode>
  );
}

export default App;
