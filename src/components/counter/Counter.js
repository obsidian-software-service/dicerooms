import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  selectCount,
} from "../../redux/counterSlice";

const styles = makeStyles({
  row: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "&$not(:lastChild)": {
      marginBottom: "16px",
    },
  },
  value: {
    fontSize: "78px",
    paddingLeft: "16px",
    paddingRight: "16px",
    marginTop: "2px",
    fontFamily: "'Courier New', Courier, monospace",
  },
  button: {
    appearance: "none",
    background: "none",
    fontSize: "32px",
    paddingLeft: "12px",
    paddingRight: "12px",
    outline: "none",
    border: "2px solid transparent",
    color: "rgb(112, 76, 182)",
    paddingBottom: "4px",
    cursor: "pointer",
    backgroundColor: "rgba(112, 76, 182, 0.1)",
    borderRadius: "2px",
    transition: "all 0.15s",
    "&$hover": {
      border: "2px solid rgba(112, 76, 182, 0.4)",
    },
    "&$focus": {
      border: "2px solid rgba(112, 76, 182, 0.4)",
    },
    "&$active": {
      backgroundColor: "rgba(112, 76, 182, 0.2)",
    },
  },
  textbox: {
    fontSize: "32px",
    padding: "2px",
    width: "64px",
    textAlign: "center",
    marginRight: "8px",
  },
  asyncButton: {
    position: "relative",
    marginLeft: "8px",
    "&$after": {
      content: "",
      backgroundColor: "rgba(112, 76, 182, 0.15)",
      display: "block",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: "0",
      top: "0",
      opacity: "0",
      transition: "width 1s linear, opacity 0.5s ease 1s",
    },
    "&$active$after": {
      width: "0%",
      opacity: "1",
      transition: "0s",
    },
  },
});

export function Counter(props) {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState("2");

  const classes = styles(props);

  return (
    <div>
      <div className={classes.row}>
        <button
          className={classes.button}
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
        <span className={classes.value}>{count}</span>
        <button
          className={classes.button}
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
      </div>
      <div className={classes.row}>
        <input
          className={classes.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button
          className={classes.button}
          onClick={() =>
            dispatch(incrementByAmount(Number(incrementAmount) || 0))
          }
        >
          Add Amount
        </button>
        <button
          className={`${classes.button} ${classes.asyncButton}`}
          onClick={() => dispatch(incrementAsync(Number(incrementAmount) || 0))}
        >
          Add Async
        </button>
      </div>
    </div>
  );
}
