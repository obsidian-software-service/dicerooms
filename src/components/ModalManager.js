import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Modal, Backdrop, Fade } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { hideModal } from "../redux/modalSlice";
import AddRoom from "./Modals/AddRoom";
import EnterRoom from "./Modals/EnterRoom";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const ModalManager = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(hideModal());
  };
  const open = useSelector((state) => state.modal.open);
  const type = useSelector((state) => state.modal.type);
  const content = useSelector((state) => state.modal.content);

  const selectedModal = () => {
    switch (type) {
      case "add":
        return <AddRoom />;
      case "enter":
        return <EnterRoom title={content.title} id={content.id} />;
      default:
        return <h1>No modal</h1>;
    }
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>{selectedModal()}</Fade>
    </Modal>
  );
};

export default ModalManager;
