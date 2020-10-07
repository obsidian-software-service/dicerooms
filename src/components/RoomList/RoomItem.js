import React from 'react';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
} from '@material-ui/core';
import GroupIcon from '@material-ui/icons/Group';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { useDispatch } from 'react-redux';
import { openModal } from '../../redux/modalSlice';

// Set inactivity time as 30 minutes
const MAX_INACTIVITY_TIME = 30 * 60 * 1000;

export default function RoomItem({ room }) {
  const dispatch = useDispatch();
  const handleEnterRoomModal = () => {
    dispatch(openModal({ modalType: 'enter', content: room }));
  };

  const currentDate = new Date();

  return (
    <ListItem button onClick={handleEnterRoomModal}>
      <ListItemIcon>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <ListItemText
              primary={
                Object.values(room.activeUsers).filter(
                  (date) =>
                    currentDate - new Date(date.seconds * 1000) <
                    MAX_INACTIVITY_TIME,
                ).length
              }
            />
          </Grid>
          <Grid item>
            <GroupIcon />
          </Grid>
        </Grid>
      </ListItemIcon>

      <ListItemIcon>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            {room.private ? <LockIcon /> : <LockOpenIcon />}
          </Grid>
        </Grid>
      </ListItemIcon>

      <ListItemText primary={room.title} />
    </ListItem>
  );
}
