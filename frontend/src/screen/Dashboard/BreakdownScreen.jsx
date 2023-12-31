import { Box } from "@mui/material";
import React from "react";
import Header from "../../Components/Header";
import BreakdownChart from "../../Components/Dashboard/BreakdownChart";

const BreakdownScreen = () => {
  return (
    <>
      <Box m='1.5rem 2.5rem'>
        <Header title='BREAKDOWN' subtitle='Breakdown of Sales By Category' />
        <Box mt='40px' height='75vh'>
          <BreakdownChart />
        </Box>
      </Box>
    </>
  );
};

export default BreakdownScreen;
