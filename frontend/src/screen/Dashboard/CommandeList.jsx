import { useTheme } from "@emotion/react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { forwardRef, ReactElement, Ref, useState } from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteOrder, listOrders } from "../../actions/orderActions";
import Chargement from "../../Components/Chargement";
import EnTete from "../../Components/EnTete";
import FlexBetween from "../../Components/FlexBetween";
import MessageBox from "../../Components/MessageBox";
import { ORDER_DELETE_RESET } from "../../constants/orderConstants";
import { DataGrid } from "@mui/x-data-grid";
import CustomColumnMenu from "../../Components/Dashboard/DataGridCustomColumnMenu";
import Header from "../../Components/Header";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CommandeList = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { pathname } = useLocation();
  const sellerMode = pathname.indexOf("/seller") >= 0;
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;
  const orderDelete = useSelector((state) => state.orderDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = orderDelete;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listOrders({ seller: sellerMode ? userInfo._id : " " }));
  }, [dispatch, sellerMode, successDelete, userInfo._id]);

  const deleteHandler = (orderId) => {
    dispatch(deleteOrder(orderId));
    setOpen(false);
  };

  const [open, setOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

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
    { field: "utilisateur", headerName: "Utilisateur", flex: 1 },
    { field: "date", headerName: "Date", flex: 1 },
    { field: "total", headerName: "Total", flex: 1 },
    { field: "paiement", headerName: "Paiement", flex: 1 },
    { field: "livraison", headerName: "Livraison", flex: 1 },
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
              navigate(`/orders/${params.id}`);
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

  if (!loading && !error && orders) {
    rows = orders.map((order) => ({
      id: order._id,
      utilisateur: order.utilisateur.nom,
      date: order.createdAt.substring(0, 10),
      total: `${order.totalPrice.toFixed(2)} $`,
      paiement: order.isPaid ? order.paidAt.substring(0, 10) : "No",
      livraison: order.isDelivered ? order.deliveredAt.substring(0, 10) : "No",
      action: (
        <FlexBetween>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              navigate(`/orders/${order._id}`);
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
        <Header title="COMMANDES" subtitle="Liste de toutes les commandes" />
        {loadingDelete && <Chargement />}
        {errorDelete && <MessageBox severity="error">{errorDelete}</MessageBox>}
        {loading ? (
          <Chargement />
        ) : error ? (
          <MessageBox variant="error">{error}</MessageBox>
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

export default CommandeList;
