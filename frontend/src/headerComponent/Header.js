import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import './header.css'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    homeButton: {
        marginRight: theme.spacing(2),
    },
}));

export default function DenseAppBar() {
    const classes = useStyles();

    function refreshPage() {
        window.location.reload();
        window.scrollTo(0, 0);
    }

    return (
        <div className={classes.root}>
            <AppBar>
                <Toolbar className="toolbar" variant="dense">
                    <IconButton edge="start" className={classes.homeButton} color="inherit" aria-label="home">
                        <HomeIcon onClick={refreshPage}/>
                    </IconButton>
                    <Typography variant="h6" color="inherit">
                        Sciencelab @ FA 2021
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}
