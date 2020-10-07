import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography } from '@material-ui/core';
import Container from '../components/Container';
import ChatList from '../components/ChatList';
import ChatInput from '../components/ChatInput';
import { assignColor } from '../utils';
import firebase from 'firebase/app';
import db from '../config/dbFirebase';

const styles = makeStyles({
  root: {
    height: '90%',
  },
  title: {
    textTransform: 'uppercase',
    marginLeft: '1em',
    fontWeight: 'bold',
  },
  displayName: {
    fontWeight: 'bold',
  },
});
const background =
  'radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)';

let timeOut = null;

export function PlayRoom(props) {
  const { displayName, uid } = useSelector(
    (state) => state.auth.user,
  );
  const [room, setRoom] = useState({});
  const [messages, setMessages] = useState([]);
  const { id } = useParams();
  const classes = styles(props);

  useEffect(() => {
    db.firestore()
      .collection('rooms')
      .doc(id)
      .get()
      .then((doc) => {
        setRoom({
          id: doc.id,
          ...doc.data(),
        });
      });
    db.firestore()
      .collection('rooms')
      .doc(id)
      .collection('messages')
      .orderBy('created')
      .onSnapshot((querySnapshot) => {
        const auxMessages = [];
        querySnapshot.forEach((doc) => {
          const { user } = doc.data();
          auxMessages.push({
            id: doc.id,
            color: assignColor(user.id),
            ...doc.data(),
          });
        });
        setMessages(auxMessages);
      });
  }, [id]);

  const handleSubmitMessage = (message) => {
    db.firestore()
      .collection('rooms')
      .doc(id)
      .collection('messages')
      .add({
        content: message,
        user: {
          id: `${uid}`,
          name: `${displayName}`,
        },
        created: firebase.firestore.FieldValue.serverTimestamp(),
      });

    db.firestore()
      .collection('rooms')
      .doc(id)
      .update({
        [`activeUsers.${uid}`]: firebase.firestore.FieldValue.serverTimestamp(),
      });
  };

  const startTimer = () => {
    if (timeOut) {
      clearTimeout(timeOut);
    }
    timeOut = setTimeout(() => {
      alert('Estas ahi?');
      db.firestore()
        .collection('rooms')
        .doc(id)
        .update({
          [`activeUsers.${uid}`]: firebase.firestore.FieldValue.serverTimestamp(),
        });
      startTimer();
    }, 30 * 60 * 1000);
  };

  useEffect(() => {
    startTimer();
  });

  return (
    <Container background={background} transparent>
      <Grid container spacing={2} xs={12} className={classes.root}>
        <Grid container item justify="space-between" xs={12}>
          <Grid item xs={5}>
            <Paper elevation={2}>
              <Grid container direction="row" justify="center">
                <Typography variant="h5">{'Play room:'}</Typography>
                <Typography variant="h5" className={classes.title}>
                  {room.title}
                </Typography>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={5}>
            <Paper elevation={2}>
              <Grid container direction="row" justify="space-around">
                <Typography variant="h5">
                  {'Nombre Jugador:'}
                </Typography>
                <Typography
                  variant="h5"
                  className={classes.displayName}
                >
                  {displayName}
                </Typography>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        <ChatList messages={messages} />
        <ChatInput onSubmitMessage={handleSubmitMessage} />
      </Grid>
    </Container>
  );
}

export default PlayRoom;
