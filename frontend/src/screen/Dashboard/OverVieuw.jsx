import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useTheme } from "@emotion/react";
import { ResponsiveLine } from "@nivo/line";

import Header from "../../Components/Header";
import { listGeneral } from "../../actions/generalAction";
import MessageBox from "../../Components/MessageBox";
import Chargement from "../../Components/Chargement";

const OverVieuw = ({ isDashboard = false }) => {
  const [view, setView] = useState("units");

  const generalList = useSelector((state) => state.generalList);
  const { loading, error, sales } = generalList;
  const dispatch = useDispatch();
  const theme = useTheme();

  useEffect(() => {
    dispatch(listGeneral());
  }, [dispatch]);

  const totalSalesLine = [];
  const totalUnitsLine = [];

  if (!loading && !error && sales) {
    const { monthlyData } = sales;

    const initialData = {
      sales: 0,
      units: 0,
    };

    Object.values(monthlyData).reduce(
      (acc, { month, totalSales, totalUnits }) => {
        const curSales = acc.sales + totalSales;
        const curUnits = acc.units + totalUnits;

        totalSalesLine.push({ x: month, y: curSales });
        totalUnitsLine.push({ x: month, y: curUnits });

        return { sales: curSales, units: curUnits };
      },
      initialData
    );
  }

  console.log(totalUnitsLine);
  return (
    <>
      <Box m="1.5rem 2.5rem">
        <Header
          title="OVERVIEW"
          subtitle="Overview of general revenue and profit"
        />
        <Box height="75vh">
          <FormControl sx={{ mt: "1rem" }}>
            <InputLabel>View</InputLabel>
            <Select
              value={view}
              label="View"
              onChange={(e) => setView(e.target.value)}
            >
              <MenuItem value="sales">Sales</MenuItem>
              <MenuItem value="units">Units</MenuItem>
            </Select>
          </FormControl>
          <Box width="100%" height="400px">
            {loading ? (
              <Chargement />
            ) : error ? (
              <MessageBox severity="error">{error}</MessageBox>
            ) : (
              <Box>
                <ResponsiveLine
                  data={view === "sales" ? [totalSalesLine] : [totalUnitsLine]}
                  theme={{
                    axis: {
                      domain: {
                        line: {
                          stroke: theme.palette.secondary[200],
                        },
                      },
                      legend: {
                        text: {
                          fill: theme.palette.secondary[200],
                        },
                      },
                      ticks: {
                        line: {
                          stroke: theme.palette.secondary[200],
                          strokeWidth: 1,
                        },
                        text: {
                          fill: theme.palette.secondary[200],
                        },
                      },
                    },
                    legends: {
                      text: {
                        fill: theme.palette.secondary[200],
                      },
                    },
                    tooltip: {
                      container: {
                        color: theme.palette.primary.main,
                      },
                    },
                  }}
                  margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
                  xScale={{ type: "point" }}
                  yScale={{
                    type: "linear",
                    min: "auto",
                    max: "auto",
                    stacked: false,
                    reverse: false,
                  }}
                  yFormat=" >-.2f"
                  curve="catmullRom"
                  enableArea={isDashboard}
                  axisTop={null}
                  axisRight={null}
                  axisBottom={{
                    format: (v) => {
                      if (isDashboard) return v.slice(0, 3);
                      return v;
                    },
                    orient: "bottom",
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: isDashboard ? "" : "Month",
                    legendOffset: 36,
                    legendPosition: "middle",
                  }}
                  axisLeft={{
                    orient: "left",
                    tickValues: 5,
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: isDashboard
                      ? ""
                      : `Total ${
                          view === "sales" ? "Revenue" : "Units"
                        } for Year`,
                    legendOffset: -60,
                    legendPosition: "middle",
                  }}
                  enableGridX={false}
                  enableGridY={false}
                  pointSize={10}
                  pointColor={{ theme: "background" }}
                  pointBorderWidth={2}
                  pointBorderColor={{ from: "serieColor" }}
                  pointLabelYOffset={-12}
                  useMesh={true}
                  legends={
                    !isDashboard
                      ? [
                          {
                            anchor: "bottom-right",
                            direction: "column",
                            justify: false,
                            translateX: 30,
                            translateY: -40,
                            itemsSpacing: 0,
                            itemDirection: "left-to-right",
                            itemWidth: 80,
                            itemHeight: 20,
                            itemOpacity: 0.75,
                            symbolSize: 12,
                            symbolShape: "circle",
                            symbolBorderColor: "rgba(0, 0, 0, .5)",
                            effects: [
                              {
                                on: "hover",
                                style: {
                                  itemBackground: "rgba(0, 0, 0, .03)",
                                  itemOpacity: 1,
                                },
                              },
                            ],
                          },
                        ]
                      : undefined
                  }
                />
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default OverVieuw;
