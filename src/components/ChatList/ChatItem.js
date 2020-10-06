import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography } from '@material-ui/core';
import { textDescriptor } from '../../utils';

const styles = makeStyles({
  root: {
    margin: 5,
    width: 'fit-content',
    maxWidth: '85%',
  },
  paper: {
    padding: 8,
  },
  userName: {
    marginRight: 5,
    fontWeight: 'bold',
    color: (props) => props.color || '#efec',
    lineHeight: '24px',
  },
  content: {
    lineHeight: '24px',
    display: 'inline',
  },
  dice: {
    display: 'inline',
    fontWeight: 'bold',
  },
  regular: {
    display: 'inline',
    overflowWrap: 'anywhere',
  },
});
export function Chatitem({ msg }) {
  const classes = styles({ color: msg.color });

  const formatedText = () =>
    textDescriptor(msg.content).map((des) => (
      <Typography
        className={
          des.type === 'dice' ? classes.dice : classes.regular
        }
      >
        {des.text}
      </Typography>
    ));

  return (
    <Grid item className={classes.root}>
      <Paper elevation={3} className={classes.paper}>
        <Typography variant="subtitle1" className={classes.userName}>
          {msg.user.name}:
        </Typography>
        {formatedText()}
      </Paper>
    </Grid>
  );
}

export default Chatitem;
