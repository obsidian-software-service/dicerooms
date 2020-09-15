import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, TextField, Button, Typography } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import { useDispatch } from "react-redux";
import { hideModal } from "../../redux/modalSlice";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const AddRoom = ({ title, id }) => {
  const classes = useStyles();
  let history = useHistory();

  const dispatch = useDispatch();
  const handleEnter = () => {
    history.push(`/rooms/${id}`);
    dispatch(hideModal());
  };

  return (
    <Grid
      container
      xs={6}
      className={classes.paper}
      direction="column"
      spacing={2}
    >
      <Grid item>
        <h2 id="transition-modal-title">Ingresar a Sala</h2>
      </Grid>
      <Grid item container xs={12} justify="center">
        <Typography variant="h6">{title}</Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          size="small"
          type="password"
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          endIcon={<SendIcon />}
          size="large"
          fullWidth
          onClick={handleEnter}
        >
          Ingresar
        </Button>
      </Grid>
    </Grid>
  );
};

export default AddRoom;
