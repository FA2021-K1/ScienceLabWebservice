import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import routes from '../../routes';
import { Link, withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';

export const Sidebar = withRouter(props => {
  const dispatch = useDispatch();
  const style = useSelector((state) => state.style);

  useEffect(() => { }, [dispatch, style]);

  return (<div id="sidebar">
    <List>
      {routes.map(({ path, name, Icon, externalUrl }, key) => {
        const color = path?.localeCompare(props.location.pathname) === 0 ? style.secondaryColor : style.lightGray;
        if (!externalUrl) {
          return (
            <Link key={`nav-item-${key}`} to={path}>
              <ListItem key={`nav-list-item-${key}`} >
                <ListItemIcon style={{ color: color }}>
                  <Icon />
                </ListItemIcon>
                <ListItemText primary={name} style={{ color: color }} />
              </ListItem>
            </Link>
          );
        } else {
          return (
            <a href={path} target="blank">
              <ListItem key={`nav-list-item-${key}`} >
                <ListItemIcon style={{ color: style.lightGray }}>
                  <Icon />
                </ListItemIcon>
                <ListItemText primary={name} style={{ color: style.lightGray }} />
              </ListItem>
            </a>)
        }
      })}
    </List>
  </div>)
});