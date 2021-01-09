import React from 'react';
import { auth } from '../../Services/firebase';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" className={classes.menuButton} href="/">A LIGHT OF HOPE</Button>
          <Typography variant="h6" className={classes.title} href="/">

          </Typography>

          {auth().currentUser
            ? <div className="navbar-nav">
              <Button color="inherit" href="/profile">Profile</Button>
              <Button color="inherit" onClick={() => auth().signOut()}>Logout</Button>
            </div>
            : <div className="navbar-nav">
              <Button color="inherit" href="/login">Login</Button>
              <Button color="inherit" href="/signup">Signup</Button>
            </div>}
        </Toolbar>
      </AppBar>
    </div>
  );
}