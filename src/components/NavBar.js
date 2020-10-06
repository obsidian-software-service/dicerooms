import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  IconButton,
  Typography,
  Toolbar,
  AppBar,
  MenuItem,
  Menu,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import db from '../config/dbFirebase';
import { clearUser, saveUser } from '../redux/authSlice';

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
  avatar: { borderRadius: '50%' },
}));

const NavBar = () => {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    db.auth()
      .signOut()
      .then(() => {
        dispatch(clearUser());
        history.push('/');
      });
    setAnchorEl(null);
  };

  useEffect(() => {
    db.auth().onAuthStateChanged((user) => {
      if (user) {
        const {
          displayName,
          email,
          photoURL,
          uid,
          providerData,
        } = user;
        dispatch(
          saveUser({
            displayName,
            email,
            photoURL,
            uid,
            providerData,
          }),
        );
      } else {
        db.auth()
          .signOut()
          .then(() => {
            dispatch(clearUser());
          });
      }
    });
  }, [dispatch]);

  const user = useSelector((store) => store.auth.user);
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {'DICEROOMS'}
          </Typography>
          {
            <div>
              <Typography variant="caption">
                {user.displayName}
              </Typography>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                {user.photoURL ? (
                  <img
                    src={`${user.photoURL}`}
                    height="32px"
                    width="32px"
                    alt="Profile"
                    className={classes.avatar}
                  />
                ) : (
                  <AccountCircle />
                )}
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Salir</MenuItem>
              </Menu>
            </div>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
