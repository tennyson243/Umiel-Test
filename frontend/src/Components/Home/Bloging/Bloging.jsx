import { Typography, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listHeros } from "../../../actions/Blog/heroActions";
import Chargement from "../../Chargement";
import Header from "../../Header";
import MessageBox from "../../MessageBox";
import CardBloging from "./CardBloging";

const Bloging = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const herosList = useSelector((state) => state.herosList);
  const { loading, error, heros } = herosList;
  const isNonMobile = useMediaQuery("(min-width:600px)");

  useEffect(() => {
    dispatch(listHeros());
  }, [dispatch]);

  return (
    <>
      <Box width='90%' m='auto'>
        <Box textAlign='center' marginTop='30px' marginBottom='30px'>
          <Header
            title='Nos derniers Articles de Blog'
            subtitle='La nature pour vous servir'
          />
        </Box>
        {loading ? (
          <Chargement />
        ) : error ? (
          <MessageBox severity='error'>{error}</MessageBox>
        ) : (
          <Box>
            <Box
              display='grid'
              gap='15px'
              gridTemplateColumns='repeat(2, minmax(0, 1fr))'
              sx={{
                "& > div": {
                  gridColumn: isNonMobile ? undefined : "span 3",
                },
              }}
            >
              {heros.map((hero) => (
                <Box key={hero._id}>
                  <CardBloging hero={hero}></CardBloging>
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

export default Bloging;
