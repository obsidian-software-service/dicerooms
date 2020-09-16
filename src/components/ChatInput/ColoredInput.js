import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Typography } from "@material-ui/core";

const styles = makeStyles({
  root: {
    position: "relative",
  },
  textContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  text: {
    padding: "8px 14px",
  },
  input: {
    color: "transparent",
  },
});

export function ChatInput({ onChange, value }) {
  const classes = styles();
  return (
    <div className={classes.root}>
      <div className={classes.textContainer}>
        <Typography className={classes.text}>{value}</Typography>
      </div>
      <TextField
        id="chatInput"
        label="Mensaje"
        variant="outlined"
        size="small"
        fullWidth
        onChange={onChange}
        value={value}
        className={classes.input}
      />
    </div>
  );
}

export default ChatInput;
