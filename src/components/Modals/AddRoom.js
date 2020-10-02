import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
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

const AddRoom = (props) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleCreate = async () => {
    setLoading(true);
    await db.firestore().collection('rooms').add({
      title,
      password,
    });
    setLoading(false);
    dispatch(hideModal());
  };

  return (
    <Grid
      container
      item
      xs={6}
      className={classes.paper}
      direction="column"
      spacing={2}
    >
      <Grid item>
        <h2 id="transition-modal-title">Crear Sala</h2>
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="roomTitle"
          label="Nombre de la Sala"
          variant="outlined"
          size="small"
          fullWidth
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          required
        />
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
          endIcon={<AddIcon />}
          size="large"
          fullWidth
          onClick={handleCreate}
          disabled={loading}
        >
          Crear
        </Button>
      </Grid>
    </Grid>
  );
};

export default AddRoom;
