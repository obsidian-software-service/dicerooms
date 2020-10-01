import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Button, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useDispatch } from 'react-redux';
import { openModal } from '../redux/modalSlice';
import db from '../config/dbFirebase';

import Container from '../components/Container';
import RoomsList from '../components/RoomList';

const styles = makeStyles({
  root: {
    height: '90%',
  },
  roomsContainer: {
    flex: 1,
  },
  rooms: {
    height: '100%',
  },
});
const background =
  'radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)';

export function Rooms(props) {
  const classes = styles(props);
  const [rooms, setRooms] = useState([]);
  const dispatch = useDispatch();

  const handleAddRoomModal = () => {
    dispatch(openModal({ modalType: 'add' }));
  };

  useEffect(() => {
    db.firestore()
      .collection('rooms')
      .onSnapshot((querySnapshot) => {
        const auxRooms = [];
        querySnapshot.forEach((doc) => {
          auxRooms.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setRooms(auxRooms);
      });
  }, []);

  return (
    <Container background={background} transparent>
      <Grid
        container
        spacing={2}
        className={classes.root}
        direction="column"
      >
        <Grid item container spacing={2}>
          <Grid item xs={8}>
            <Paper elevation={2}>
              <Typography variant="h4">Salas</Typography>
            </Paper>
          </Grid>
          <Grid item xs={4}>
            <Paper elevation={2}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                endIcon={<AddIcon />}
                size="large"
                fullWidth
                onClick={handleAddRoomModal}
              >
                Agregar Sala
              </Button>
            </Paper>
          </Grid>
        </Grid>
        <Grid item className={classes.roomsContainer}>
          <Paper elevation={2} className={classes.rooms}>
            <RoomsList rooms={rooms} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Rooms;
