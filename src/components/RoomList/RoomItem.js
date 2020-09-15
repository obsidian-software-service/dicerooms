import React from "react";
import { ListItem, ListItemIcon, ListItemText, Grid } from "@material-ui/core";
import GroupIcon from "@material-ui/icons/Group";
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { useDispatch } from "react-redux";
import { openModal } from "../../redux/modalSlice";

export default function RoomItem({ room }) {
  const dispatch = useDispatch();
  const handleEnterRoomModal = () => {
    dispatch(openModal("enter"));
  };
  return (
    <ListItem button onClick={handleEnterRoomModal}>
      <ListItemIcon>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <ListItemText primary={room.users} />
          </Grid>
          <Grid item>
            <GroupIcon />
          </Grid>
        </Grid>
      </ListItemIcon>

      <ListItemIcon>
        <Grid container spacing={2} alignItems="center">
          <Grid item>{room.private ? <LockIcon /> : <LockOpenIcon />}</Grid>
        </Grid>
      </ListItemIcon>

      <ListItemText primary={room.title} />
    </ListItem>
  );
}
