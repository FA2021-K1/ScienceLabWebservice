import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import "./header.css";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "semantic-ui-react";
import { updateSelectedData } from "../../dataSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  homeButton: {
    marginRight: theme.spacing(2),
  },
}));

export const Header = () => {
  const dispatch = useDispatch()
  const classes = useStyles();
  const selectedData = useSelector(state => state.data.selectedData)
  const style = useSelector((state) => state.style)

  const refreshPage = () => {
    window.location.reload();
    window.scrollTo(0, 0);
  }

  return (
    <div className={classes.root}>
      <AppBar position='sticky' style={{ background: style.secondaryColor }}>
        <Toolbar variant="dense" >
          <IconButton
            edge="start"
            className={classes.homeButton}
            color="inherit"
            aria-label="home"
            onClick={refreshPage}
          >

            <HomeIcon />
          </IconButton>
          <Typography variant="h6" color="inherit">
            Sciencelab @ FA 2021
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
