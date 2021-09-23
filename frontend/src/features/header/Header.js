import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import "./header.css";
import { Link } from "react-router-dom"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  homeButton: {
    marginRight: theme.spacing(2),
  },
}));

export const Header = () => {
  const classes = useStyles();

  const refreshPage = () => {
    window.location.reload();
    window.scrollTo(0, 0);
  }

  return (
    <div className={classes.root}>
      <AppBar position= 'sticky'>
        <Toolbar className="toolbar" variant="dense">
          <Link to="/home">
            <IconButton
              edge="start"
              className={classes.homeButton}
              color="inherit"
              aria-label="home"
            >
              <HomeIcon />
            </IconButton>
          </Link>
          <Typography variant="h6" color="inherit">
            Sciencelab @ FA 2021
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
