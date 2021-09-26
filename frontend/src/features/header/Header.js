import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import "./header.css";
import { Link } from "react-router-dom"
import { Breadcrumbs } from "./../breadcrumbs/Breadcrumbs";
import { updateSidebar } from "../../sidebarSlice"
import store from "../../app/store";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  homeButton: {
    marginRight: theme.spacing(2),
  },
}));

export const Header = (crumbs) => {
  const dispatch = useDispatch()
  const classes = useStyles();
  const selectedData = useSelector(state => state.data.selectedData)
  const style = useSelector((state) => state.style)

  const openDrawer = () => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    store.dispatch(updateSidebar(true));
  }

  return (
    <div className={classes.root}>
      <AppBar style = {{background: style.secondaryColor}}>
        <Toolbar variant="dense">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={openDrawer()}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
          <Link to="/home">
            <Typography variant="h6" color="inherit">
              ScienceLab @ FA 2021
            </Typography>
          </Link>
          <Breadcrumbs crumbs={crumbs} />
        </Toolbar>
      </AppBar>
    </div>
  );
}
