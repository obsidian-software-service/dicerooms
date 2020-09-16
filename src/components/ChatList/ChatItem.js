import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, Typography } from "@material-ui/core";

const styles = makeStyles({
  root: { margin: 5 },
  paper: {
    padding: 8,
    display: "flex",
    alignItems: "flex-start",
  },
  userName: {
    marginRight: 5,
    fontWeight: "bold",
    color: "#F00",
    lineHeight: "24px",
  },
  content: {
    lineHeight: "24px",
  },
});
export function Chatitem({ msg }) {
  const classes = styles();
  return (
    <Grid item xs={11} className={classes.root}>
      <Paper elevation={3} className={classes.paper}>
        <Typography variant="subtitle1" className={classes.userName}>
          {msg.user.name}:
        </Typography>
        <Typography variant="body1" className={classes.content}>
          {msg.content}
        </Typography>
      </Paper>
    </Grid>
  );
}

export default Chatitem;
