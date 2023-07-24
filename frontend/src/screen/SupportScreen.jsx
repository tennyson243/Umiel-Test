import { useTheme } from "@emotion/react";
import { Button } from "@mui/base";
import {
  Chip,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import socketIOClient from "socket.io-client";
import EnTete from "../Components/EnTete";
import MessageBox from "../Components/MessageBox";
import Header from "../Components/Header";

let allUsers = [];
let allMessages = [];
let allSelectedUser = {};
const ENDPOINT =
  window.location.host.indexOf("localhost") >= 0
    ? "http://127.0.0.1:5000"
    : window.location.host;

const SupportScreen = () => {
  const [selectedUser, setSelectedUser] = useState({});
  const [socket, setSocket] = useState(null);
  const uiMessagesRef = useRef(null);
  const [messageBody, setMessageBody] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();

  useEffect(() => {
    if (uiMessagesRef.current) {
      uiMessagesRef.current.scrollBy({
        top: uiMessagesRef.current.clientHeight,
        left: 0,
        behavior: "smooth",
      });
    }

    if (!socket) {
      const sk = socketIOClient(ENDPOINT);
      setSocket(sk);
      sk.emit("onLogin", {
        _id: userInfo._id,
        name: userInfo.nom,
        isAdmin: userInfo.isAdmin,
      });
      sk.on("message", (data) => {
        if (allSelectedUser._id === data._id) {
          allMessages = [...allMessages, data];
        } else {
          const existUser = allUsers.find((user) => user._id === data._id);
          if (existUser) {
            allUsers = allUsers.map((user) =>
              user._id === existUser._id ? { ...user, unread: true } : user
            );
            setUsers(allUsers);
          }
        }
        setMessages(allMessages);
      });
      sk.on("updateUser", (updatedUser) => {
        const existUser = allUsers.find((user) => user._id === updatedUser._id);
        if (existUser) {
          allUsers = allUsers.map((user) =>
            user._id === existUser._id ? updatedUser : user
          );
          setUsers(allUsers);
        } else {
          allUsers = [...allUsers, updatedUser];
          setUsers(allUsers);
        }
      });
      sk.on("listUsers", (updatedUsers) => {
        allUsers = updatedUsers;
        setUsers(allUsers);
      });
      sk.on("selectUser", (user) => {
        allMessages = user.messages;
        setMessages(allMessages);
      });
    }
  }, [messages, socket, users, userInfo]);

  const selectUser = (user) => {
    allSelectedUser = user;
    setSelectedUser(allSelectedUser);
    const existUser = allUsers.find((x) => x._id === user._id);
    if (existUser) {
      allUsers = allUsers.map((x) =>
        x._id === existUser._id ? { ...x, unread: false } : x
      );
      setUsers(allUsers);
    }
    socket.emit("onUserSelected", user);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!messageBody.trim()) {
      alert("Error. Please type message.");
    } else {
      allMessages = [
        ...allMessages,
        { body: messageBody, name: userInfo.name },
      ];
      setMessages(allMessages);
      setMessageBody("");
      setTimeout(() => {
        socket.emit("onMessage", {
          body: messageBody,
          name: userInfo.nom,
          isAdmin: userInfo.isAdmin,
          _id: selectedUser._id,
        });
      }, 1000);
    }
  };
  return (
    <>
      <Helmet>
        <title>Support Utilisateur</title>
      </Helmet>
      <Box m="1.5rem 2.5rem">
        <Header
          title="ASSISTANCE"
          subtitle="Ici vous pouvez repondre aux messages des utilisateurs"
        />
        <Box
          display="grid"
          gap="12px"
          gridTemplateColumns="repeat(4, minmax(0,1fr))"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          <Box
            mt="10px"
            backgroundColor={theme.palette.background.alt}
            sx={{ gridColumn: "span 1" }}
          >
            <Box
              textAlign={"center"}
              backgroundColor={theme.palette.primary.main}
              p="15px"
            >
              <Typography varaint="h3" textTransform={"uppercase"}>
                Utilisateur
              </Typography>
            </Box>
            <Box p="20px">
              {users.filter((x) => x._id !== userInfo._id).length === 0 && (
                <MessageBox>Aucun Utilisateur en Ligne</MessageBox>
              )}
              <List>
                {users
                  .filter((x) => x._id !== userInfo._id)
                  .map((user) => (
                    <ListItem
                      key={user._id}
                      className={
                        user._id === selectedUser._id ? "  selected" : "  "
                      }
                    >
                      <ListItemButton
                        className="block"
                        type="button"
                        onClick={() => selectUser(user)}
                      >
                        <ListItemText primary={user.name} />
                      </ListItemButton>
                      <span
                        className={
                          user.unread
                            ? "unread"
                            : user.online
                            ? "online"
                            : "offline"
                        }
                      />
                    </ListItem>
                  ))}
              </List>
            </Box>
          </Box>

          <Box
            mt="10px"
            backgroundColor={theme.palette.background.alt}
            sx={{ gridColumn: "span 3" }}
          >
            <Box
              textAlign={"center"}
              backgroundColor={theme.palette.primary.main}
              p="15px"
            >
              <Typography varaint="h3" textTransform={"uppercase"}>
                Chat Utilisateur
              </Typography>
            </Box>
            <Box p="20px">
              {!selectedUser._id ? (
                <MessageBox>Selection un Utilisateur pour chatter</MessageBox>
              ) : (
                <Box>
                  <Box
                    textAlign={"center"}
                    backgroundColor={theme.palette.primary.main}
                    p="15px"
                  >
                    <Typography varaint="h3" textTransform={"uppercase"}>
                      Chat with {selectedUser.name}
                    </Typography>
                  </Box>
                  <List ref={uiMessagesRef}>
                    {messages.length === 0 && <ListItem>No message.</ListItem>}
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
                  <Box textAlign="center">
                    <form onSubmit={submitHandler} className="row">
                      <TextField
                        value={messageBody}
                        onChange={(e) => setMessageBody(e.target.value)}
                        fullWidth
                        required
                        placeholder="Ecrivez un message"
                      />
                      <Button variant="contained" type="submit" fullWidth>
                        Envoyer
                      </Button>
                    </form>
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SupportScreen;
