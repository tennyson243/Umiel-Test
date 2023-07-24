import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import { useTheme } from "@emotion/react";
import { Box } from "@mui/system";

const SearcheBox = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [nom, setName] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/search/nom/${nom}`);
  };
  return (
    <>
      <form onSubmit={submitHandler}>
        <Box
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            backgroundColor: theme.palette.background.alt,
          }}
        >
          <IconButton sx={{ p: "10px" }} aria-label='menu'>
            <MenuIcon />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder='Rechercher un produits, un Articles, un Commentaire etc....'
            onChange={(e) => setName(e.target.value)}
          />
          <IconButton sx={{ p: "10px" }} aria-label='search' type='submit'>
            <SearchIcon />
          </IconButton>
          <Divider sx={{ height: 28, m: 0.5 }} orientation='vertical' />
          <IconButton
            color='primary'
            sx={{ p: "10px" }}
            aria-label='directions'
          >
            <DirectionsIcon />
          </IconButton>
        </Box>
      </form>
    </>
  );
};

export default SearcheBox;
