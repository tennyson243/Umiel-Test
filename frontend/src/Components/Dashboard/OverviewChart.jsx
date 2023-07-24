import React, { useEffect, useMemo } from "react";
import { ResponsiveLine } from "@nivo/line";
import { Box, useTheme } from "@mui/material";
import Chargement from "../Chargement";
import MessageBox from "../MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { overviewList } from "../../actions/transactionAction";
import { listGeneral } from "../../actions/generalAction";

const OverviewChart = ({ isDashboard = false, view }) => {
  const generalList = useSelector((state) => state.generalList);
  const { loading, error, sales } = generalList;
  const dispatch = useDispatch();
  const theme = useTheme();

  useEffect(() => {
    dispatch(listGeneral());
  }, [dispatch]);

  let chartData = null;
  if (!loading && !error) {
    chartData = Object.values(sales.monthlyData).reduce(
      (acc, { month, totalSales, totalUnits }) => {
        const curSales = acc.totalSales + totalSales;
        const curUnits = acc.totalUnits + totalUnits;

        const totalSalesLine = {
          id: "totalSales",
          color: theme.palette.secondary.main,
          sales: [...acc.totalSalesLine.sales, { x: month, y: curSales }],
        };
        const totalUnitsLine = {
          id: "totalUnits",
          color: theme.palette.secondary[600],
          sales: [...acc.totalUnitsLine.sales, { x: month, y: curUnits }],
        };

        return {
          totalSales: curSales,
          totalUnits: curUnits,
          totalSalesLine,
          totalUnitsLine,
        };
      },
      {
        totalSales: 0,
        totalUnits: 0,
        totalSalesLine: { sales: [] },
        totalUnitsLine: { sales: [] },
      }
    );
  }

  const { totalSalesLine, totalUnitsLine } = chartData || {};

  return (
    <>
      <Box>
        {loading ? (
          <Chargement />
        ) : error ? (
          <MessageBox severity='error'>{error}</MessageBox>
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
              yFormat=' >-.2f'
              curve='catmullRom'
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
                  : `Total ${view === "sales" ? "Revenue" : "Units"} for Year`,
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
    </>
  );
};

export default OverviewChart;
