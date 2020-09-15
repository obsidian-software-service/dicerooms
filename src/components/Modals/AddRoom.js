import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper, TextField, Button, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

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

const AddRoom = (props) => {
  const classes = useStyles();
  return (
    <Grid
      container
      xs={6}
      className={classes.paper}
      direction="column"
      spacing={2}
    >
      <Grid item>
        <h2 id="transition-modal-title">Crear Sala</h2>
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="roomTitle"
          label="Nombre de la Sala"
          variant="outlined"
          size="small"
          fullWidth
        />
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
          endIcon={<AddIcon />}
          size="large"
          fullWidth
        >
          Crear
        </Button>
      </Grid>
    </Grid>
  );
};

export default AddRoom;
