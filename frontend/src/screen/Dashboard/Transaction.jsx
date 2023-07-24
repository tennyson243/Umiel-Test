import { useTheme } from "@emotion/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listTransaction } from "../../actions/transactionAction";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "../../Components/Header";
import Chargement from "../../Components/Chargement";
import MessageBox from "../../Components/MessageBox";
import { DataGrid } from "@mui/x-data-grid";
import DataGridCustomToolbar from "../../Components/Dashboard/DataGridCustomToolbar";

const Transaction = () => {
  const [pageNumber, setPageNumber] = useState(1); // Utilisez pageNumber au lieu de page
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");
  const theme = useTheme();
  const transactionList = useSelector((state) => state.transactionList);
  const {
    loading,
    error,
    transactions,
    total,
    pageSize: totalPageSize,
    page: totalPage,
  } = transactionList; // Renommez pageSize en totalPageSize et page en totalPage

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      listTransaction({
        pageNumber,
        page: pageSize,
        sort: JSON.stringify(sort),
        search,
      })
    );
  }, [dispatch, pageSize, pageNumber, sort, search]); // Ajoutez pageNumber comme dépendance

  const [searchInput, setSearchInput] = useState("");

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "userId",
      headerName: "User ID",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "CreatedAt",
      flex: 1,
    },
    {
      field: "products",
      headerName: "# of Products",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
  ];

  return (
    <>
      <Box m="1.5rem 2.5rem">
        <Header
          title="TRANSACTIONS"
          subtitle="Liste complete des transactions"
        />

        {loading ? (
          <Chargement />
        ) : error ? (
          <MessageBox severity="error">{error}</MessageBox>
        ) : (
          <Box
            height="80vh"
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
              getRowId={(row) => row._id}
              rows={transactions || []}
              columns={columns}
              rowCount={totalPageSize || 0}
              rowsPerPageOptions={[20, 50, 100]}
              pagination
              page={pageNumber - 1}
              pageSize={pageSize}
              paginationMode="server"
              sortingMode="server"
              onPageChange={(newPage) => setPageNumber(newPage + 1)} // Ajoutez 1 à newPage pour ajuster la valeur de la page
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              onSortModelChange={(newSortModel) => setSort(...newSortModel)}
              components={{ Toolbar: DataGridCustomToolbar }}
              componentsProps={{
                toolbar: { searchInput, setSearchInput, setSearch },
              }}
            />
          </Box>
        )}
      </Box>
    </>
  );
};

export default Transaction;
