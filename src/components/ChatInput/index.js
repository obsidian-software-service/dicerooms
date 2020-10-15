import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Paper,
  Button,
  withWidth,
  Hidden,
  Typography,
  IconButton,
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import ColoredInput from './ColoredInput';
import { textDescriptor, rollToText } from '../../utils';

const styles = makeStyles({
  containerButton: {
    padding: 5,
  },
});

export function ChatInput({ onSubmitMessage }) {
  const [message, setMessage] = useState('');
  const classes = styles();
  const handleSubmitMessage = (e) => {
    e.preventDefault();

    const formatedMessage = textDescriptor(message).reduce((a, v) => {
      if (v.type === 'dice') {
        const { text, number, dice, plus } = v;
        return `${a}${text}: ${rollToText(number, dice, plus)}`;
      }
      return `${a}${v.text}`;
    }, '');

    onSubmitMessage(formatedMessage);
    setMessage('');
  };
  return (
    <Grid item xs={12}>
      <Grid container spacing={2} direction="column">
        <Grid item>
          <Hidden smDown>
            <Paper elevation={2}>{'Botonera'}</Paper>
          </Hidden>
        </Grid>
        <Grid item>
          <form onSubmit={handleSubmitMessage}>
            <Paper elevation={2}>
              <Grid
                item
                container
                direction="row"
                alignItems="center"
                justify="space-evenly"
                className={classes.containerButton}
              >
                <Grid item xs={10}>
                  <ColoredInput
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                    required
                  />
                </Grid>
                <Grid item xs={2}>
                  <Hidden xsDown>
                    <Button
                      variant="contained"
                      color="primary"
                      endIcon={<SendIcon />}
                      size="large"
                      fullWidth
                      type="submit"
                    >
                      <Typography variant="button">
                        {'Enviar'}
                      </Typography>
                    </Button>
                  </Hidden>
                  <Hidden smUp>
                    <IconButton
                      color="primary"
                      className={classes.button}
                      type="submit"
                    >
                      <SendIcon />
                    </IconButton>
                  </Hidden>
                </Grid>
              </Grid>
            </Paper>
          </form>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default withWidth()(ChatInput);
