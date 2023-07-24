import {
  Box,
  Button,
  Drawer,
  FormControl,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Actions from "./Actions";
import { AppbarContainer, AppbarHeader, MyList } from "./AppBarStyle";
import { useUIContext } from "./UseUIContext.js";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useTheme } from "@emotion/react";
import { setMode } from "../../Components/Index";
import { LightModeOutlined, DarkModeOutlined } from "@mui/icons-material";
import SearcheBox from "../SearcheBox";

const AppBarDesketop = ({ matches }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();

  const [state, setState] = useState({
    top: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role='presentation'
      padding={"30px"}
      backgroundColor={theme.palette.primary.main}
    >
      <SearcheBox />
    </Box>
  );

  const handleMenuOpen = () => {
    setIsMenuOpen(true);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const handleMenuItemClick = (route) => {
    navigate(route);
    handleMenuClose();
  };

  return (
    <>
      <AppbarContainer>
        <AppbarHeader variant='h4' color={theme.palette.secondary.main}>
          Umiel
        </AppbarHeader>
        <MyList type='row'>
          <ListItemText
            primary='Home'
            onClick={() => {
              navigate("/Home");
            }}
          />
          <ListItemText
            primary='Blog'
            onClick={() => {
              navigate("/Blog");
            }}
          />
          <ListItemText
            primary='Shop'
            onClick={() => {
              navigate("/Shop");
            }}
          />
          <ListItemText
            primary='À propos '
            onClick={() => {
              navigate("/apropos");
            }}
          />

          <ListItemText
            primary='Contact'
            onClick={() => {
              navigate("/nous-contacter");
            }}
          />
          <ListItemButton onClick={toggleDrawer("top", true)}>
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <IconButton onClick={() => dispatch(setMode())}>
                {theme.palette.mode === "dark" ? (
                  <DarkModeOutlined sx={{ fontSize: "25px" }} />
                ) : (
                  <LightModeOutlined sx={{ fontSize: "25px" }} />
                )}
              </IconButton>
            </ListItemIcon>
          </ListItemButton>
        </MyList>
        <Actions matches={matches} />
      </AppbarContainer>

      <Drawer
        anchor={"top"}
        open={state["top"]}
        onClose={toggleDrawer("top", false)}
      >
        {list("top")}
      </Drawer>
    </>
  );
};

export default AppBarDesketop;
