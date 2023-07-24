import { Alert } from "@mui/material";
import React from "react";

const MessageBox = (props) => {
  return (
    <Alert variant='filled' severity={props.severity || "info"}>
      {props.children}
    </Alert>
  );
};

export default MessageBox;
