import { BrowserRouter as Router, Route, Switch, Redirect, Link } from "react-router-dom"
import routes from "./routes";
import { Breadcrumbs } from "./features/breadcrumbs/Breadcrumbs";
import { useDispatch, useSelector } from "react-redux";

import { useEffect, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  homeButton: {
    marginRight: theme.spacing(2),
  },
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export const App = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const style = useSelector((state) => state.style);

  useEffect(() => { }, [dispatch, style]);

  return (
    <Box sx={{ display: 'flex', padding: 0 }}>
      <Router>
        <CssBaseline />
        <div id="header-container">
          <AppBar position="fixed" open={open} style={{ background: style.secondaryColor }}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
              >
                <MenuIcon />
              </IconButton>
              <Link to="/home">
                <Typography variant="h6" color="inherit">
                  ScienceLab @ FA 2021
                </Typography>
              </Link>
              <Breadcrumbs />
            </Toolbar>
          </AppBar>
        </div>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <div id="sidebar">
            <List>
              {routes.map(({ path, name, Icon }, key) => (
                <Link key={`nav-item-${key}`} to={path} onClick={handleDrawerClose}>
                  <ListItem key={`nav-list-item-${key}`}>
                    <ListItemIcon>
                      <Icon />
                    </ListItemIcon>
                    <ListItemText primary={name} />
                  </ListItem>
                </Link>
              ))}
            </List>
          </div>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3, padding: 0 }}>
          <DrawerHeader />
          <Switch>
            <Route exact path="/" render={() => {
              return (<Redirect to="/home" />)
            }} />
            {routes.map(({ path, Component }, key) => (
              <Route exact path={path} key={key} render={props => {
                return (
                  <div>
                    <div id="content-container">
                      <Component {...props} />
                    </div>
                  </div>
                );
              }} />
            ))}
          </Switch>
        </Box>
      </Router>
    </Box>
  );
}