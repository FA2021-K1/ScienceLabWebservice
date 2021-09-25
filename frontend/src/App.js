import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import "./App.css";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import { Header } from "./features/header/Header.js";
import { BrowserRouter as Router, Route, Switch, Redirect, Link } from "react-router-dom"
import routes from "./routes";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import store from "./app/store";
import { updateSidebar } from "./sidebarSlice";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

export const App = () => {
  const dispatch = useDispatch();
  const open = useSelector((state) => state.sidebar.open);

  useEffect(() => {
  }, [dispatch, open]);

  return (
    <React.StrictMode>
      <Router>
        <Drawer
          anchor={"left"}
          open={open}
          onClose={() => store.dispatch(updateSidebar(false))}
        >
          <div id="sidebar">
            <Box sx={{ width: '100%', minWidth: 240, padding: 1 }}>
              <List>
                {routes.map(({ path, name, Icon }, key) => (
                  <Link key={`nav-item-${key}`} to={path} onClick={() => store.dispatch(updateSidebar(false))}>
                    <ListItem key={`nav-list-item-${key}`} disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <Icon />
                        </ListItemIcon>
                        <ListItemText primary={name} />
                      </ListItemButton>
                    </ListItem>
                  </Link>
                ))}
              </List>
            </Box>
          </div>
        </Drawer>

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
