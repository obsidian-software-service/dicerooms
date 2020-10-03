import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography } from '@material-ui/core';
import Container from '../components/Container';
import ChatList from '../components/ChatList';
import ChatInput from '../components/ChatInput';
import firebase from 'firebase/app';
import db from '../config/dbFirebase';

const styles = makeStyles({
  root: {
    height: '90%',
  },
});
const background =
  'radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)';

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
  };

  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }
  const colorMap = {};
  const assignColor = (uid) => {
    const arrColor = [
      '#0055ff',
      '#d64d0d',
      '#cc0cb6',
      '#0bad09',
      '#f5e507',
    ];
    shuffleArray(arrColor);
    if (!colorMap[uid]) {
      colorMap[uid] =
        arrColor[Object.entries(colorMap).length % arrColor.length];
    }
    return colorMap[uid];
  };

  return (
    <Container background={background} transparent>
      <Grid container spacing={2} xs={12} className={classes.root}>
        <Grid container item justify="space-between" xs={12}>
          <Grid item xs={5}>
            <Paper elevation={2}>
              <Typography variant="h5">
                Play room: {room.title}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={5}>
            <Paper elevation={2}>
              <Typography variant="h5">{`Nombre Jugador: ${displayName}`}</Typography>
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
