import { useTheme } from "@emotion/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Chargement from "../../Components/Chargement";
import MessageBox from "../../Components/MessageBox";
import { ResponsiveChoropleth } from "@nivo/geo";
import { geoData } from "../../geoData";
import { Box } from "@mui/material";
import Header from "../../Components/Header";
import { usersGeography } from "../../actions/userActions";

const GeographyDash = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const userGeography = useSelector((state) => state.userGeography);
  const { loading, error, users } = userGeography;

  useEffect(() => {
    dispatch(usersGeography());
  }, [dispatch]);

  return (
    <>
      <Box m='1.5rem 2.5rem'>
        <Header
          title='LOCALISATION'
          subtitle='Localiser ou se trouve les Utilisateurs.'
        />
        <Box
          mt='40px'
          height='75vh'
          border={`1px solid ${theme.palette.secondary[200]}`}
          borderRadius='4px'
        >
          {loading ? (
            <Chargement />
          ) : error ? (
            <MessageBox severity='error'>{error}</MessageBox>
          ) : (
            <ResponsiveChoropleth
              data={users}
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
              features={geoData.features}
              margin={{ top: 0, right: 0, bottom: 0, left: -50 }}
              domain={[0, 60]}
              unknownColor='#666666'
              label='properties.name'
              valueFormat='.2s'
              projectionScale={150}
              projectionTranslation={[0.45, 0.6]}
              projectionRotation={[0, 0, 0]}
              borderWidth={1.3}
              borderColor='#ffffff'
              legends={[
                {
                  anchor: "bottom-right",
                  direction: "column",
                  justify: true,
                  translateX: 0,
                  translateY: -125,
                  itemsSpacing: 0,
                  itemWidth: 94,
                  itemHeight: 18,
                  itemDirection: "left-to-right",
                  itemTextColor: theme.palette.secondary[200],
                  itemOpacity: 0.85,
                  symbolSize: 18,
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemTextColor: theme.palette.background.alt,
                        itemOpacity: 1,
                      },
                    },
                  ],
                },
              ]}
            />
          )}
        </Box>
      </Box>
    </>
  );
};

export default GeographyDash;
