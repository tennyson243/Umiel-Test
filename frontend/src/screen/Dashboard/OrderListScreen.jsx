import { useTheme } from "@emotion/react";
import { Button } from "@mui/base";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteOrder, listOrders } from "../../actions/orderActions";
import Chargement from "../../Components/Chargement";
import EnTete from "../../Components/EnTete";
import MessageBox from "../../Components/MessageBox";
import { ORDER_DELETE_RESET } from "../../constants/orderConstants";
import { DataGrid } from "@mui/x-data-grid";
import CustomColumnMenu from "../../Components/Dashboard/DataGridCustomColumnMenu";

const OrderListScreen = () => {
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
    dispatch({ type: ORDER_DELETE_RESET });
    dispatch(listOrders({ seller: sellerMode ? userInfo._id : "" }));
  }, [dispatch, sellerMode, successDelete, userInfo._id]);
  const deleteHandler = (order) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteOrder(order._id));
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "utilisateur", headerName: "Utilisateur", width: 200 },
    { field: "date", headerName: "Date", width: 150 },
    { field: "total", headerName: "Total", width: 150 },
    { field: "paiement", headerName: "Paiement", width: 150 },
    { field: "livraison", headerName: "Livraison", width: 150 },
    { field: "action", headerName: "Action", width: 200 },
  ];

  const rows = orders.map((order) => ({
    id: order._id,
    utilisateur: order.user.nom,
    date: order.createdAt.substring(0, 10),
    total: `${order.totalPrice.toFixed(2)} $`,
    paiement: order.isPaid ? order.paidAt.substring(0, 10) : "No",
    livraison: order.isDelivered ? order.deliveredAt.substring(0, 10) : "No",
    action: (
      <Box>
        <Button
          variant="contained"
          onClick={() => navigate(`/orders/${order._id}`)}
        >
          Details
        </Button>
        <Button variant="contained" onClick={() => deleteHandler(order)}>
          Supprimer
        </Button>
      </Box>
    ),
  }));

  return (
    <>
      <Helmet>
        <title>Listes des Commandes</title>
      </Helmet>
      <EnTete title="List des Commandes" />

      <Box width="80%" m="100px auto">
        {loadingDelete && <Chargement />}
        {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
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
                loading={loading || !rows}
                getRowId={(row) => row._id}
                rows={rows || []}
                columns={columns}
                components={{
                  ColumnMenu: CustomColumnMenu,
                }}
              />
            </Box>
            {/* <TableContainer overflowX='auto' minHeight='0.01%'>
              <Table
                background='#fff none repeat scroll 0 0'
                borderColor='#c1c1c1'
                borderRadius='0'
                borderStyle='solid'
                borderWidth='1px 0 0 1px'
                margin=' 0 0 50px'
                textAlign='center'
                width='100%'
              >
                <TableHead>
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": {
                        borderTop: "medium none",
                        fontWeight: "bold",
                        padding: "20px 10px",
                        textAlign: " center",
                        textTransform: "uppercase",
                        verticalAlign: "middle",
                        whiteSpace: "nowrap",
                        borderBottom: "1px solid #c1c1c1",
                        borderRight: " 1px solid #c1c1c1",
                        background: `${theme.palette.primary.main}`,
                      },
                    }}
                  >
                    <TableCell>ID</TableCell>
                    <TableCell>UTILISATEUR</TableCell>
                    <TableCell>DATE</TableCell>
                    <TableCell>TOTAL</TableCell>
                    <TableCell>PAYEMENT</TableCell>
                    <TableCell>LIVRAISON</TableCell>
                    <TableCell>ACTION</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order._id}>
                      <TableCell
                        sx={{
                          borderBottom: "1px solid #c1c1c1",
                          borderRight: "1px solid #c1c1c1",
                          textAlign: " center",
                        }}
                      >
                        <Typography variant='h5'>{order._id}</Typography>
                      </TableCell>
                      <TableCell
                        sx={{
                          borderBottom: "1px solid #c1c1c1",
                          borderRight: "1px solid #c1c1c1",
                          textAlign: " center",
                        }}
                      >
                        <Typography variant='h5'>{order.user.nom}</Typography>
                      </TableCell>
                      <TableCell
                        sx={{
                          borderBottom: "1px solid #c1c1c1",
                          borderRight: "1px solid #c1c1c1",
                          textAlign: " center",
                        }}
                      >
                        <Typography variant='h5'>
                          {order.createdAt.substring(0, 10)}
                        </Typography>
                      </TableCell>
                      <TableCell
                        fontSize='15px'
                        fontWeight=' 700px'
                        color=' #777'
                        sx={{
                          borderBottom: "1px solid #c1c1c1",
                          borderRight: "1px solid #c1c1c1",
                          textAlign: " center",
                        }}
                      >
                        <Typography variant='h5'>
                          {order.totalPrice.toFixed(2)} $
                        </Typography>
                      </TableCell>
                      <TableCell
                        fontSize='15px'
                        fontWeight=' 700px'
                        color=' #777'
                        sx={{
                          borderBottom: "1px solid #c1c1c1",
                          borderRight: "1px solid #c1c1c1",
                          textAlign: " center",
                        }}
                      >
                        <Typography variant='h5'>
                          {order.isPaid ? order.paidAt.substring(0, 10) : "No"}
                        </Typography>
                      </TableCell>
                      <TableCell
                        fontSize='15px'
                        fontWeight=' 700px'
                        color=' #777'
                        sx={{
                          borderBottom: "1px solid #c1c1c1",
                          borderRight: "1px solid #c1c1c1",
                          textAlign: " center",
                        }}
                      >
                        <Typography variant='h5'>
                          {order.isDelivered
                            ? order.deliveredAt.substring(0, 10)
                            : "No"}
                        </Typography>
                      </TableCell>
                      <TableCell
                        width='180px'
                        font-size='20px'
                        letter-spacing='6px'
                        sx={{
                          borderBottom: "1px solid #c1c1c1",
                          borderRight: "1px solid #c1c1c1",
                          textAlign: " center",
                        }}
                      >
                        <Box>
                          <Button
                            variant='contained'
                            onClick={() => {
                              navigate(`/orders/${order._id}`);
                            }}
                          >
                            Details
                          </Button>

                          <Button
                            variant='contained'
                            onClick={() => deleteHandler(order)}
                          >
                            Supprimer
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer> */}
          </Box>
        )}
      </Box>
    </>
  );
};

export default OrderListScreen;
