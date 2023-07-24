import { useTheme } from "@emotion/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listGeneral } from "../../actions/generalAction";
import { ResponsiveLine } from "@nivo/line";
import { Box } from "@mui/material";
import Header from "../../Components/Header";
import Chargement from "../../Components/Chargement";
import MessageBox from "../../Components/MessageBox";
import { generalDashboard } from "../../actions/transactionAction";

const MonthlyScreen = () => {
  const generalList = useSelector((state) => state.generalList);
  const { loading, error, sales } = generalList;
  const dispatch = useDispatch();
  const theme = useTheme();

  useEffect(() => {
    dispatch(generalDashboard());
  }, [dispatch]);

  return (
    <>
      <Box m='1.5rem 2.5rem'>
        <Header title='MONTHLY SALES' subtitle='Chart of monthlysales' />
        {loading ? (
          <Chargement />
        ) : error ? (
          <MessageBox severity='error'>{error}</MessageBox>
        ) : (
          <Box height='75vh'>
            {sales && (
              <ResponsiveLine
                data={
                  sales
                    ? (() => {
                        const { monthlyData } = sales;
                        const totalSalesLine = {
                          id: "totalSales",
                          color: theme.palette.secondary.main,
                          data: [],
                        };
                        const totalUnitsLine = {
                          id: "totalUnits",
                          color: theme.palette.secondary[600],
                          data: [],
                        };

                        Object.values(monthlyData).forEach(
                          ({ month, totalSales, totalUnits }) => {
                            totalSalesLine.data = [
                              ...totalSalesLine.data,
                              { x: month, y: totalSales },
                            ];
                            totalUnitsLine.data = [
                              ...totalUnitsLine.data,
                              { x: month, y: totalUnits },
                            ];
                          }
                        );

                        return [totalSalesLine, totalUnitsLine];
                      })()
                    : []
                }
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
                colors={{ datum: "color" }}
                margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
                xScale={{ type: "point" }}
                yScale={{
                  type: "linear",
                  min: "auto",
                  max: "auto",
                  stacked: false,
                  reverse: false,
                }}
                yFormat=' >-.2f'
                // curve="catmullRom"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                  orient: "bottom",
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 90,
                  legend: "Month",
                  legendOffset: 60,
                  legendPosition: "middle",
                }}
                axisLeft={{
                  orient: "left",
                  tickSize: 5,
                  tickPadding: 5,
                  tickRotation: 0,
                  legend: "Total",
                  legendOffset: -50,
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
                legends={[
                  {
                    anchor: "top-right",
                    direction: "column",
                    justify: false,
                    translateX: 50,
                    translateY: 0,
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
                ]}
              />
            )}
          </Box>
        )}
      </Box>
    </>
  );
};

export default MonthlyScreen;
