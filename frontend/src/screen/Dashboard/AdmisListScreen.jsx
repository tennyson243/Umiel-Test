import { useTheme } from "@emotion/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listModerateurs } from "../../actions/userActions";
import Chargement from "../../Components/Chargement";
import MessageBox from "../../Components/MessageBox";
import Header from "../../Components/Header";
import { Box } from "@mui/material";
import CustomColumnMenu from "../../Components/Dashboard/DataGridCustomColumnMenu";
import { DataGrid } from "@mui/x-data-grid";

const AdmisListScreen = () => {
  const theme = useTheme();
  const admisList = useSelector((state) => state.admisList);
  const { loading, error, admis } = admisList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listModerateurs());
  }, [dispatch]);

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "nom",
      headerName: "Nom",
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "telephone",
      headerName: "Telephone",
      flex: 0.5,
    },
    {
      field: "pays",
      headerName: "Pays",
      flex: 0.4,
    },
  ];
  return (
    <>
      <Box m='1.5rem 2.5rem'>
        <Header
          title='ADMINS'
          subtitle='Gestions des Admins et Liste des Admins'
        />
        {loading ? (
          <Chargement />
        ) : error ? (
          <MessageBox severity='error'>{error}</MessageBox>
        ) : (
          <Box
            mt='40px'
            height='75vh'
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
              loading={loading || !admis}
              getRowId={(row) => row._id}
              rows={admis || []}
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

export default AdmisListScreen;
