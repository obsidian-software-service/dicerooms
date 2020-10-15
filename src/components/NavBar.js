import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  IconButton,
  Button,
  Typography,
  Toolbar,
  AppBar,
  MenuItem,
  Menu,
  Avatar,
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import db from '../config/dbFirebase';
import { clearUser, saveUser } from '../redux/authSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  buttonGoBack: {
    display: ({ location }) =>
      location.pathname === '/rooms' || location.pathname === '/'
        ? 'none'
        : '',
  },
  title: {
    flexGrow: 1,
    cursor: 'default',
  },
  avatar: { borderRadius: '50%' },
}));

const NavBar = () => {
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles({ location });
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const user = useSelector((store) => store.auth.user);

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

  const handleGoBack = () => {
    history.push('/rooms');
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

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {'DICEROOMS'}
          </Typography>
          <Button
            onClick={handleGoBack}
            color="inherit"
            className={`${classes.menuButton} ${classes.buttonGoBack}`}
          >
            <ArrowBackIosIcon />
            <Typography variant="caption">Rooms</Typography>
          </Button>
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
                  <Avatar
                    src={`${user.photoURL}`}
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
                <MenuItem onClick={handleClose} disabled={true}>
                  Profile
                </MenuItem>
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
