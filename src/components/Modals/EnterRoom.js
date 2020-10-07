import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import firebase from 'firebase';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  TextField,
  Button,
  Typography,
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import { useDispatch } from 'react-redux';
import { hideModal } from '../../redux/modalSlice';
import db from '../../config/dbFirebase';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const AddRoom = ({ title, id }) => {
  const classes = useStyles();
  let history = useHistory();

  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const user = useSelector((store) => store.auth.user);

  const dispatch = useDispatch();
  const handleEnter = async () => {
    try {
      await db
        .firestore()
        .collection('rooms')
        .doc(id)
        .collection('private')
        .doc('data')
        .update({
          password,
          allowedUsers: firebase.firestore.FieldValue.arrayUnion(
            user.uid,
          ),
        });

      db.firestore()
        .collection('rooms')
        .doc(id)
        .update({
          [`activeUsers.${user.uid}`]: firebase.firestore.FieldValue.serverTimestamp(),
        });

      history.push(`/rooms/${id}`);
      dispatch(hideModal());
    } catch (err) {
      setErrorMsg('Password Invalido');
    }
  };

  return (
    <Grid
      container
      xs={6}
      className={classes.paper}
      direction="column"
      spacing={2}
    >
      <Grid item>
        <h2 id="transition-modal-title">Ingresar a Sala</h2>
        <Typography variant="body" color="error">
          {errorMsg}
        </Typography>
      </Grid>
      <Grid item container xs={12} justify="center">
        <Typography variant="h6">{title}</Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          size="small"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          endIcon={<SendIcon />}
          size="large"
          fullWidth
          onClick={handleEnter}
        >
          Ingresar
        </Button>
      </Grid>
    </Grid>
  );
};

export default AddRoom;
