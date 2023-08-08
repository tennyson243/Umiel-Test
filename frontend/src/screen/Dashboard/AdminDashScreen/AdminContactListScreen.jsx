import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Typography,
} from "@mui/material";
import React, { forwardRef, useEffect, useState } from "react";
import FlexBetween from "../../../Components/FlexBetween";
import { deleteContact, listContacts } from "../../../actions/contactActions";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { DataGrid } from "@mui/x-data-grid";
import MessageBox from "../../../Components/MessageBox";
import Chargement from "../../../Components/Chargement";
import Header from "../../../Components/Header";
import { Helmet } from "react-helmet-async";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const AdminContactListScreen = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const contactList = useSelector((state) => state.contactList);
  const { loading, error, contacts } = contactList;
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    dispatch(listContacts());
  }, [dispatch]);

  const contactDelete = useSelector((state) => state.contactDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = contactDelete;

  useEffect(() => {
    if (successDelete) {
      toast.info("Message Supprimer avec Succès");
    }
  }, [successDelete]);

  const deleteHandler = (contactId) => {
    dispatch(deleteContact(contactId));
    setOpen(false);
  };

  const handleClickOpen = (orderId) => {
    // Set the orderId in the state before opening the dialog
    setSelectedOrderId(orderId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "date", headerName: "date", flex: 1 },
    { field: "telephone", headerName: "Telephone", flex: 1 },
    { field: "refcommande", headerName: "Ref Commande", flex: 1 },
    { field: "fichier", headerName: "Fichier", flex: 1 },
    { field: "message", headerName: "Message", flex: 1 },
    { field: "statut", headerName: "Statut", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => (
        <FlexBetween>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              navigate(`/contact/${params.id}`);
            }}
          >
            Details
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleClickOpen(params.id)}
          >
            Supprimer
          </Button>
        </FlexBetween>
      ),
    },
  ];

  let rows = [];

  if (!loading && !error && contacts) {
    rows = contacts.map((contact) => ({
      id: contact._id,
      date: contact.createdAt.substring(0, 10),
      email: contact.email,
      telephone: contact.telephone,
      refcommande: contact.refcommande,
      fichier: contact.fichier,
      message: contact.message,
      statut: contact.statut ? "Message Repondu" : "No Repondu",
      action: (
        <FlexBetween>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              navigate(`/contacts/${contact._id}`);
            }}
          >
            Details
          </Button>

          <Button variant="contained" color="error" onClick={handleClickOpen}>
            Supprimer
          </Button>
        </FlexBetween>
      ),
    }));
  }
  return (
    <>
      <Helmet>
        <title>Listes des Commandes</title>
      </Helmet>

      <Box m="1.5rem 2.5rem">
        <Header title="MESSAGES" subtitle="Liste de tous les messages" />
        {loadingDelete && <Chargement />}
        {errorDelete && <MessageBox severity="error">{errorDelete}</MessageBox>}
        {loading ? (
          <Chargement />
        ) : error ? (
          <MessageBox severity="error">{error}</MessageBox>
        ) : (
          <Box>
            <Box
              mt="40px"
              height="75vh"
              sx={{
                "& .MuiDataGrid-root": {
                  border: "none",
                },
                "& .MuiDataGrid-cell": {
                  borderBottom: "none",
                },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: theme.palette.background.alt,
                  color: theme.palette.secondary[100],
                  borderBottom: "none",
                },
                "& .MuiDataGrid-virtualScroller": {
                  backgroundColor: theme.palette.primary.light,
                },
                "& .MuiDataGrid-footerContainer": {
                  backgroundColor: theme.palette.background.alt,
                  color: theme.palette.secondary[100],
                  borderTop: "none",
                },
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                  color: `${theme.palette.secondary[200]} !important`,
                },
              }}
            >
              <DataGrid
                columns={columns}
                rows={rows}
                pageSize={5}
                disableSelectionOnClick
              />
            </Box>

            <Dialog
              open={open}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClose}
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle>
                <Typography variant="h4">
                  Confirmation de Suppression
                </Typography>
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  Vous êtes sûr de vouloir supprimer cette commande ?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleClose}
                >
                  Non
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => deleteHandler(selectedOrderId)}
                >
                  Oui
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        )}
      </Box>
    </>
  );
};

export default AdminContactListScreen;
