import { useTheme } from "@emotion/react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listOrderMine } from "../actions/orderActions";
import Chargement from "../Components/Chargement";
import MessageBox from "../Components/MessageBox";
import Header from "../Components/Header";

const OrderHistoryScreen = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const orderMineList = useSelector((state) => state.orderMineList);
  const { loading, error, orders } = orderMineList;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listOrderMine());
  }, [dispatch]);
  return (
    <>
      <Helmet>
        <title>Historique de Commandes</title>
      </Helmet>

      <Box m="1.5rem 2.5rem">
        <Header
          title="HISTORIQUE DES COMMANDES"
          subtitle="Voici une liste de toutes vos commandes"
        />
        {loading ? (
          <Chargement />
        ) : error ? (
          <MessageBox variant="error">{error}</MessageBox>
        ) : (
          <Box>
            <TableContainer overflowX="auto" minHeight="0.01%">
              <Table
                background="#fff none repeat scroll 0 0"
                borderColor="#c1c1c1"
                borderRadius="0"
                borderStyle="solid"
                borderWidth="1px 0 0 1px"
                margin=" 0 0 50px"
                textAlign="center"
                width="100%"
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
                        <Typography variant="h5">{order._id}</Typography>
                      </TableCell>
                      <TableCell
                        sx={{
                          borderBottom: "1px solid #c1c1c1",
                          borderRight: "1px solid #c1c1c1",
                          textAlign: " center",
                        }}
                      >
                        <Typography variant="h5">
                          {order.createdAt.substring(0, 10)}
                        </Typography>
                      </TableCell>
                      <TableCell
                        fontSize="15px"
                        fontWeight=" 700px"
                        color=" #777"
                        sx={{
                          borderBottom: "1px solid #c1c1c1",
                          borderRight: "1px solid #c1c1c1",
                          textAlign: " center",
                        }}
                      >
                        <Typography variant="h5">
                          {order.totalPrice.toFixed(2)} $
                        </Typography>
                      </TableCell>
                      <TableCell
                        fontSize="15px"
                        fontWeight=" 700px"
                        color=" #777"
                        sx={{
                          borderBottom: "1px solid #c1c1c1",
                          borderRight: "1px solid #c1c1c1",
                          textAlign: " center",
                        }}
                      >
                        <Typography variant="h5">
                          {order.isPaid ? order.paidAt.substring(0, 10) : "No"}
                        </Typography>
                      </TableCell>
                      <TableCell
                        fontSize="15px"
                        fontWeight=" 700px"
                        color=" #777"
                        sx={{
                          borderBottom: "1px solid #c1c1c1",
                          borderRight: "1px solid #c1c1c1",
                          textAlign: " center",
                        }}
                      >
                        <Typography variant="h5">
                          {order.isDelivered
                            ? order.deliveredAt.substring(0, 10)
                            : "No"}
                        </Typography>
                      </TableCell>
                      <TableCell
                        width="180px"
                        font-size="20px"
                        letter-spacing="6px"
                        sx={{
                          borderBottom: "1px solid #c1c1c1",
                          borderRight: "1px solid #c1c1c1",
                          textAlign: " center",
                        }}
                      >
                        <Box>
                          <Button
                            variant="contained"
                            onClick={() => {
                              navigate(`/orders/${order._id}`);
                            }}
                          >
                            Details
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </Box>
    </>
  );
};

export default OrderHistoryScreen;
