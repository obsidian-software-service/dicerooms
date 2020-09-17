import React, { useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";
import ChatItem from "./ChatItem";

const styles = makeStyles({
  chatContainer: {
    height: "60vh",
    overflow: "auto",
  },
  chat: {
    height: "100%",
    overflow: "auto",
    background: "#DDD",
  },
});
export function ChatList({ messages }) {
  const classes = styles();
  const refChatPaper = useRef();
  useEffect(() => {
    refChatPaper.current.scrollTop = refChatPaper.current.scrollHeight;
  }, [messages]);

  return (
    <Grid item xs={12} className={classes.chatContainer} spacing={2}>
      <Paper elevation={2} className={classes.chat} ref={refChatPaper}>
        <Grid container xs={12} direction="column" spacing={1}>
          {messages.map((msg) => (
            <ChatItem msg={msg} />
          ))}
        </Grid>
      </Paper>
    </Grid>
  );
}

export default ChatList;
