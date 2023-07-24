import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { Box, Typography, useMediaQuery } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listDiscovery } from "../../../actions/Blog/discoveryActions";
import Chargement from "../../Chargement";
import Healding from "../../Healding";
import MessageBox from "../../MessageBox";

const Discovery = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const discoveryList = useSelector((state) => state.discoveryList);
  const { loading, error, discoverys } = discoveryList;
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();

  useEffect(() => {
    dispatch(listDiscovery());
  }, [dispatch]);

  const ProductImage = styled("img")(({ src, theme }) => ({
    src: `url(${src})`,
    width: "200px",
    height: "100px",
    objectFit: "cover",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  }));

  return (
    <>
      <Box>
        <Box width='90%' m='auto'>
          <Healding title='Discover' />
          <Box>
            {loading ? (
              <Chargement />
            ) : error ? (
              <MessageBox>{error}</MessageBox>
            ) : (
              <Box>
                <Box
                  display='grid'
                  gap='15px'
                  gridTemplateColumns='repeat(6, minmax(0, 1fr))'
                  sx={{
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span 3",
                    },
                  }}
                >
                  {discoverys.map((val) => (
                    <Box
                      key={val._id}
                      sx={{
                        backgroundColor: theme.palette.background.alt,
                        boxShadow:
                          "0 4px 8px rgb(0 0 0 / 4%), 0 0 2px rgb(0 0 0 / 6%), 0 0 1px rgb(0 0 0 / 4%)",
                        cursor: "pointer",
                        gridColumn: "span 1",
                      }}
                      alignItems='center'
                    >
                      <Box
                        sx={{
                          width: "150px",
                          height: "100px",
                        }}
                      >
                        <ProductImage src={val.cover} />
                      </Box>
                      <Typography
                        variant='h4'
                        sx={{
                          p: "10px",
                          textAlign: "center",
                          textTransform: "uppercase",
                          margin: "0",
                        }}
                      >
                        {val.title}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Discovery;
