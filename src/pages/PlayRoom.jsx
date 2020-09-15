import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, TextField, Button, Typography } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import Container from "../components/Container";
import db from "../config/dbFirebase";

const styles = makeStyles({
  root: {
    height: "90%",
  },
  chatContainer: {
    flex: 1,
  },
  chat: {
    height: "100%",
  },
});
const background =
  "radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)";

export function PlayRoom(props) {
  const [room, setRoom] = useState({});

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
  }, []);

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
            Chat
          </Paper>
        </Grid>
        <Grid item container direction="column" spacing={1}>
          <Grid item>
            <Paper elevation={2}>Botonera</Paper>
          </Grid>
          <Grid item>
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
                    label="Chat"
                    variant="outlined"
                    size="small"
                    fullWidth
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
                  >
                    Enviar
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default PlayRoom;
