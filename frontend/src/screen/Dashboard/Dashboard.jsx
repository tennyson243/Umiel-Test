import { useTheme } from "@emotion/react";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listDashboard, overallStatistique } from "../../actions/generalAction";
import Header from "../../Components/Header";
import { DownloadOutlined, PointOfSale } from "@mui/icons-material";
import FlexBetween from "../../Components/FlexBetween";
import Chargement from "../../Components/Chargement";
import MessageBox from "../../Components/MessageBox";
import StatBox from "../../Components/Dashboard/StatBox";
import { Email, PersonAdd, Traffic } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import OverviewChart from "../../Components/Dashboard/OverviewChart";
import BreakdownChart from "../../Components/Dashboard/BreakdownChart";
import { productStat } from "../../actions/generalAction";
import {
  OVERALL_CREATE_RESET,
  PRODUCTSTAT_CREATE_RESET,
} from "../../constants/generalConstant";

const Dashboard = () => {
  const theme = useTheme();
  const dashboardList = useSelector((state) => state.dashboardList);
  const { loading, error, dashboards } = dashboardList;
  const dispatch = useDispatch();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

  useEffect(() => {
    dispatch(listDashboard());
    dispatch(productStat());
    dispatch(overallStatistique());
    dispatch({ type: PRODUCTSTAT_CREATE_RESET });
    dispatch({ type: OVERALL_CREATE_RESET });
  }, [dispatch]);

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
        <FlexBetween>
          <Header
            title="DASHBOARD"
            subtitle="Bienvenue sur votre tableau de bord"
          />

          <Box>
            <Button
              sx={{
                backgroundColor: theme.palette.secondary.light,
                color: theme.palette.background.alt,
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
            >
              <DownloadOutlined sx={{ mr: "10px" }} />
              Download Reports
            </Button>
          </Box>
        </FlexBetween>

        {loading ? (
          <Chargement />
        ) : error ? (
          <MessageBox severity="error">{error}</MessageBox>
        ) : (
          <Box
            mt="20px"
            display="grid"
            gridTemplateColumns="repeat(12, 1fr)"
            gridAutoRows="160px"
            gap="20px"
            sx={{
              "& > div": {
                gridColumn: isNonMediumScreens ? undefined : "span 12",
              },
            }}
          >
            {/* ROW 1 */}
            <StatBox
              title="Total Customers"
              value={dashboards && dashboards.totalCustomers}
              increase="+14%"
              description="Since last month"
              icon={
                <Email
                  sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
                />
              }
            />
            <StatBox
              title="Sales Today"
              value={
                dashboards && dashboards.todayStats
                  ? dashboards.todayStats.totalSales
                  : 0
              }
              increase="+21%"
              description="Since last month"
              icon={
                <PointOfSale
                  sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
                />
              }
            />
            <Box
              gridColumn="span 8"
              gridRow="span 2"
              backgroundColor={theme.palette.background.alt}
              p="1rem"
              borderRadius="0.55rem"
            >
              <OverviewChart view="sales" isDashboard={true} />
            </Box>
            <StatBox
              title="Monthly Sales"
              value={dashboards && dashboards.thisMonthStats.totalSales}
              increase="+5%"
              description="Since last month"
              icon={
                <PersonAdd
                  sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
                />
              }
            />
            <StatBox
              title="Yearly Sales"
              value={dashboards && dashboards.yearlySalesTotal}
              increase="+43%"
              description="Since last month"
              icon={
                <Traffic
                  sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
                />
              }
            />

            {/* ROW 2 */}
            <Box
              gridColumn="span 8"
              gridRow="span 3"
              sx={{
                "& .MuiDataGrid-root": {
                  border: "none",
                  borderRadius: "5rem",
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
                  backgroundColor: theme.palette.background.alt,
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
                loading={loading || !dashboards}
                getRowId={(row) => row._id}
                rows={(dashboards && dashboards.transactions) || []}
                columns={columns}
              />
            </Box>
            <Box
              gridColumn="span 4"
              gridRow="span 3"
              backgroundColor={theme.palette.background.alt}
              p="1.5rem"
              borderRadius="0.55rem"
            >
              <Typography
                variant="h6"
                sx={{ color: theme.palette.secondary[100] }}
              >
                Sales By Category
              </Typography>
              <BreakdownChart isDashboard={true} />
              <Typography
                p="0 0.6rem"
                fontSize="0.8rem"
                sx={{ color: theme.palette.secondary[200] }}
              >
                Breakdown of real states and information via category for
                revenue made for this year and total sales.
              </Typography>
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

export default Dashboard;
