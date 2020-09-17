import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Button } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import ColoredInput from "./ColoredInput";
import { textDescriptor, rollToText } from "../../utils";

const styles = makeStyles({
  button: {},
});

export function ChatInput({ onSubmitMessage }) {
  const [message, setMessage] = useState("");
  const classes = styles();

  const handleSubmitMessage = (e) => {
    e.preventDefault();

    const formatedMessage = textDescriptor(message).reduce((a, v) => {
      if (v.type === "dice") {
        const { text, number, dice, plus } = v;
        return `${a}${text}: ${rollToText(number, dice, plus)}`;
      }
      return `${a}${v.text}`;
    }, "");

    onSubmitMessage(formatedMessage);
    setMessage("");
  };
  return (
    <Grid item xs={12}>
      <Grid container direction="column" spacing={1}>
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
                  <ColoredInput
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
  );
}

export default ChatInput;
