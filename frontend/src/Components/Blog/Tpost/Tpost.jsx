import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listTiktoks } from "../../../actions/Blog/tiktokActions";
import Chargement from "../../Chargement";
import Healding from "../../Healding";
import MessageBox from "../../MessageBox";

const Tpost = () => {
  const tiktoksList = useSelector((state) => state.tiktoksList);
  const { loading, error, tiktoks } = tiktoksList;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listTiktoks());
  }, [dispatch]);

  return (
    <>
      <Box>
        <Healding title='Tiktok post' />
        {loading ? (
          <Chargement />
        ) : error ? (
          <MessageBox severity='error'>{error}</MessageBox>
        ) : (
          tiktoks.map((val) => (
            <Box
              display='flex'
              alignItems='center'
              justifyContent='space-between'
              sx={{
                mb: "20px",
              }}
            >
              <Box
                sx={{
                  width: {
                    sm: "100px",
                    xs: "200px",
                  },
                  height: {
                    sm: "80px",
                    xs: "150px",
                  },
                }}
              >
                <img
                  src={val.cover}
                  alt=''
                  style={{
                    width: "100px",
                    height: " 80px",
                    objectFit: "cover",
                  }}
                />
              </Box>

              <Box
                sx={{
                  padding: "0 15px",
                  width: {
                    xs: "100%",
                  },
                }}
              >
                <Typography variant='h5'>
                  {val.title.slice(0, 35)}...
                </Typography>
                <Typography
                  variant='h6'
                  sx={{
                    color: "grey",
                  }}
                >
                  a year ago
                </Typography>
              </Box>
            </Box>
          ))
        )}
      </Box>
    </>
  );
};

export default Tpost;
