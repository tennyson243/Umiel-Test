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
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUser, listUsers } from "../actions/userActions";
import { toast } from "react-toastify";
import FlexBetween from "../Components/FlexBetween";
import Header from "../Components/Header";
import Chargement from "../Components/Chargement";
import MessageBox from "../Components/MessageBox";
import { DataGrid } from "@mui/x-data-grid";
import CustomColumnMenu from "../Components/Dashboard/DataGridCustomColumnMenu";
import { useTheme } from "@emotion/react";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CustomerEditScreen = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch]);

  const userDelete = useSelector((state) => state.userDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = userDelete;

  useEffect(() => {
    if (successDelete) {
      toast.info("Utilisateur Supprimer avec Succès");
    }
  }, [successDelete]);

  const deleteHandler = (utilisateur) => {
    dispatch(deleteUser(utilisateur));
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columns = [
    { field: "_id", headerName: "ID", flex: 1 },
    { field: "nom", headerName: "NOM", flex: 0.5 },
    { field: "email", headerName: "EMAIL", flex: 1 },
    { field: "isSeller", headerName: "C'EST UN VENDEUR?", flex: 1 },
    { field: "isAdmin", headerName: "C'EST UN ADMIN?", flex: 1 },
    { field: "isInfluenceur", headerName: "C'EST UN INFLUENCEUR?", flex: 1 },
    { field: "isMembreEquipe", headerName: "C'EST UN MEMBRE?", flex: 1 },
    {
      field: "actions",
      headerName: "ACTIONS",
      width: 180,
      renderCell: (params) => (
        <FlexBetween>
          <Button
            variant="contained"
            color="success"
            onClick={() => navigate(`/user/${params.row._id}/edit`)}
          >
            Details
          </Button>
          <Button variant="contained" color="error" onClick={handleClickOpen}>
            Supprimer
          </Button>
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>
              <Typography variant="h4">Confirmation de Suppression</Typography>
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                Vous êtes sûr de vouloir supprimer cet utilisateur?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Annuler
              </Button>
              <Button
                onClick={() => deleteHandler(params.row._id)}
                color="error"
              >
                Supprimer
              </Button>
            </DialogActions>
          </Dialog>
        </FlexBetween>
      ),
    },
  ];
  return (
    <>
      <Box m="1.5rem 2.5rem">
        <Header
          title="UTILISATEURS"
          subtitle="Gestions des utilisateurs et Liste des utilisateurs"
        />
        {loading ? (
          <Chargement />
        ) : error ? (
          <MessageBox severity="error">{error}</MessageBox>
        ) : (
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
              loading={loading || !users}
              getRowId={(row) => row._id}
              rows={users || []}
              columns={columns}
              components={{
                ColumnMenu: CustomColumnMenu,
              }}
            />
          </Box>
        )}
      </Box>
    </>
  );
};

export default CustomerEditScreen;
