import { Box } from "@mui/system";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import {
  AppBar,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Fab,
  IconButton,
  List,
  ListItem,
  Slide,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import FlexBetween from "./FlexBetween";
import CloseIcon from "@mui/icons-material/Close";
import NavigationIcon from "@mui/icons-material/Navigation";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement,
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const ENDPOINT =
  window.location.host.indexOf("localhost") >= 0
    ? "http://127.0.0.1:5000"
    : window.location.host;

const ChatBox = (props) => {
  const { userInfo } = props;
  const [socket, setSocket] = useState(null);
  const uiMessagesRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [messageBody, setMessageBody] = useState("");
  const [messages, setMessages] = useState([
    { name: "Admin", body: "Salut!, Poser votre question s'il vous plait!." },
  ]);
  const theme = useTheme();
  const [open, setOpen] = useState();

  useEffect(() => {
    if (uiMessagesRef.current) {
      uiMessagesRef.current.scrollBy({
        top: uiMessagesRef.current.clientHeight,
        left: 0,
        behavior: "smooth",
      });
    }
    if (socket) {
      socket.emit("onLogin", {
        _id: userInfo._id,
        name: userInfo.name,
        isAdmin: userInfo.isAdmin,
      });
      socket.on("message", (data) => {
        setMessages([...messages, { body: data.body, name: data.name }]);
      });
    }
  }, [messages, isOpen, socket, userInfo]);

  const supportHandler = () => {
    setIsOpen(true);
    setOpen(true);
    console.log(ENDPOINT);
    const sk = socketIOClient(ENDPOINT);
    setSocket(sk);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (!messageBody.trim()) {
      alert("Error. Please type message.");
    } else {
      setMessages([...messages, { body: messageBody, name: userInfo.nom }]);
      setMessageBody("");
      setTimeout(() => {
        socket.emit("onMessage", {
          body: messageBody,
          name: userInfo.nom,
          isAdmin: userInfo.isAdmin,
          _id: userInfo._id,
        });
      }, 1000);
    }
  };
  const closeHandler = () => {
    setIsOpen(false);
  };

  const handlerClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Box>
        {!isOpen ? (
          <Fab variant='extended' onClick={supportHandler}>
            <NavigationIcon sx={{ mr: 1 }} />
            Assistance
          </Fab>
        ) : (
          <Dialog
            fullScreen
            open={open}
            onClose={handleClose}
            TransitionComponent={Transition}
          >
            <AppBar sx={{ position: "relative" }}>
              <Toolbar>
                <IconButton
                  edge='start'
                  color='inherit'
                  onClick={handleClose}
                  aria-label='close'
                >
                  <CloseIcon />
                </IconButton>
                <Typography
                  sx={{ ml: 2, flex: 1 }}
                  variant='h6'
                  component='div'
                >
                  Assistance
                </Typography>
                <Button autoFocus color='inherit' onClick={handleClose}>
                  Fermer
                </Button>
              </Toolbar>
            </AppBar>
            <DialogContent dividers>
              <DialogContentText>
                <List ref={uiMessagesRef}>
                  {messages.map((msg, index) => (
                    <div key={index}>
                      <ListItem>
                        <Chip label={msg.name} />
                      </ListItem>
                      <Divider />
                      <ListItem>{msg.body}</ListItem>
                    </div>
                  ))}
                </List>
                <Box textAlign='center'>
                  <form onSubmit={submitHandler} className='row'>
                    <TextField
                      value={messageBody}
                      onChange={(e) => setMessageBody(e.target.value)}
                      fullWidth
                      required
                      placeholder='Ecrivez un message'
                    />
                    <Button variant='contained' type='submit' fullWidth>
                      Envoyer
                    </Button>
                  </form>
                </Box>
              </DialogContentText>
            </DialogContent>
          </Dialog>
        )}
      </Box>
    </>
  );
};

export default ChatBox;
