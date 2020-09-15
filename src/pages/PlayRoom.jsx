import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, TextField, Button, Typography } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import Container from "../components/Container";
import firebase from "firebase/app";
import db from "../config/dbFirebase";

const styles = makeStyles({
  root: {
    height: "90%",
  },
  chatContainer: {
    flex: 1,
    overflow: "auto",
  },
  chat: {
    height: "100%",
    overflow: "auto",
  },
});
const background =
  "radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)";

export function PlayRoom(props) {
  const [room, setRoom] = useState({});
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const { id } = useParams();
  const classes = styles(props);

  useEffect(() => {
    db.collection("rooms")
      .doc(id)
      .get()
      .then((doc) => {
        setRoom({
          id: doc.id,
          ...doc.data(),
        });
      });
    db.collection("rooms")
      .doc(id)
      .collection("messages")
      .orderBy("created")
      .onSnapshot((querySnapshot) => {
        const auxMessages = [];
        querySnapshot.forEach((doc) => {
          auxMessages.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setMessages(auxMessages);
      });
  }, []);

  const handleSubmitMessage = (e) => {
    e.preventDefault();
    db.collection("rooms")
      .doc(id)
      .collection("messages")
      .add({
        content: message,
        user: {
          id: 0,
          name: "Test1",
        },
        created: firebase.firestore.FieldValue.serverTimestamp(),
      });
    setMessage("");
  };

  return (
    <Container background={background} transparent>
      <Grid
        container
        xs={12}
        spacing={2}
        className={classes.root}
        direction="column"
      >
        <Grid item container spacing={2}>
          <Grid item xs={6}>
            <Paper elevation={2}>
              <Typography variant="h5">Play room: {room.title}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper elevation={2}>
              <Typography variant="h5">Nombre Jugador</Typography>
            </Paper>
          </Grid>
        </Grid>
        <Grid item className={classes.chatContainer}>
          <Paper elevation={2} className={classes.chat}>
            {messages.map((msg) => (
              <Typography>
                {msg.user.name}:{msg.content}
              </Typography>
            ))}
          </Paper>
        </Grid>
        <Grid item container direction="column" spacing={1}>
          <Grid item>
            <Paper elevation={2}>Botonera</Paper>
          </Grid>
          <Grid item>
            <form onSubmit={handleSubmitMessage}>
              <Paper elevation={2}>
                <Grid
                  item
                  container
                  xs={12}
                  direction="row"
                  justify="space-between"
                  spacing={1}
                  alignItems="center"
                >
                  <Grid item xs={10}>
                    <TextField
                      id="chatInput"
                      label="Mensaje"
                      variant="outlined"
                      size="small"
                      fullWidth
                      multiline
                      rows={2}
                      onChange={(e) => setMessage(e.target.value)}
                      value={message}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      endIcon={<SendIcon />}
                      size="large"
                      fullWidth
                      type="submit"
                    >
                      Enviar
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </form>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default PlayRoom;
