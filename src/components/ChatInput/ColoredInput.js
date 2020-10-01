import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Typography } from "@material-ui/core";
import { textDescriptor } from "../../utils";

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
    padding: "8px 14px",
    pointerEvents: "none",
  },
  dice: {
    display: "inline",
    color: "#F00",
  },
  regular: {
    display: "inline",
    color: "#000",
  },
  input: {
    "&input": {
      color: "transparent",
    },
  },
});

export function ChatInput({ onChange, value }) {
  const classes = styles();
  const formatedText = () =>
    textDescriptor(value).map((des) => (
      <Typography
        className={des.type === "dice" ? classes.dice : classes.regular}
      >
        {des.text}
      </Typography>
    ));
  return (
    <div className={classes.root}>
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
      <div className={classes.textContainer}>{formatedText()}</div>
    </div>
  );
}

export default ChatInput;
