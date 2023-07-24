import { IconButton, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import Actions from "./Actions";
import { AppbarContainer, AppbarHeader } from "./AppBarStyle";
import { useUIContext } from "./UseUIContext";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@emotion/react";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { LightModeOutlined, DarkModeOutlined } from "@mui/icons-material";
import {
  Badge,
  Button,
  Collapse,
  CssBaseline,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Menu,
  MenuItem,
} from "@mui/material";
import { Box } from "@mui/system";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { ExpandLess, ExpandMore, StarBorder } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { setMode } from "../../Components/Index";
import SearcheBox from "../SearcheBox";
import SideNavBar from "../NavBarMobile/SideNavBar";

const drawerWidth = 300;
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  justifyContent: "flex-end",
}));

const AppBarMobile = ({ matches }) => {
  const isNotMobile = useMediaQuery("(min-width:600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const { setDrawerOpen, setShowSearchBox } = useUIContext();
  const [opene, setOpene] = useState(false);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpene(true);
  };

  const handleDrawerClose = () => {
    setOpene(false);
  };

  const [openne, setOpenne] = useState(false);

  const handleClick2 = () => {
    setOpenne(!openne);
  };

  const [openne1, setOpenne1] = useState(false);

  const handleClick3 = () => {
    setOpenne1(!openne1);
  };

  const [openne2, setOpenne2] = useState(false);

  const handleClick4 = () => {
    setOpenne2(!openne2);
  };
  const [openne3, setOpenne3] = useState(false);

  const handleClick5 = () => {
    setOpenne3(!openne3);
  };

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
  const theme = useTheme();
  return (
    <>
      <AppbarContainer>
        <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <MenuIcon />
        </IconButton>
        <AppbarHeader
          textAlign={"center"}
          variant='h4'
          color={theme.palette.secondary.main}
        >
          Umiel
        </AppbarHeader>
        <IconButton onClick={toggleDrawer("top", true)}>
          <SearchIcon />
        </IconButton>
        <IconButton onClick={() => dispatch(setMode())}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlined sx={{ fontSize: "25px" }} />
          ) : (
            <LightModeOutlined sx={{ fontSize: "25px" }} />
          )}
        </IconButton>
        <Actions matches={matches} />
      </AppbarContainer>

      {/* <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant='persistent'
          anchor='left'
          open={opene}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate("/");
                  handleDrawerClose();
                }}
              >
                <ListItemIcon></ListItemIcon>
                <ListItemText primary='Home' />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate("/portfolio");
                  handleDrawerClose();
                }}
              >
                <ListItemIcon></ListItemIcon>
                <ListItemText primary='portfolio' />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate("/Blog");
                  handleDrawerClose();
                }}
              >
                <ListItemIcon></ListItemIcon>
                <ListItemText primary='Blog' />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate("/shop");
                  handleDrawerClose();
                }}
              >
                <ListItemIcon></ListItemIcon>
                <ListItemText primary='Shop' />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate("/page");
                  handleDrawerClose();
                }}
              >
                <ListItemIcon></ListItemIcon>
                <ListItemText primary='Page' />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate("/page");
                  handleDrawerClose();
                }}
              >
                <ListItemIcon></ListItemIcon>
                <ListItemText primary='Contact' />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <List
            subheader={
              <ListSubheader component='div' id='nested-list-subheader'>
                Nested List Items
              </ListSubheader>
            }
          >
            <ListItemButton onClick={handleClick2}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary='Notre Univers' />
              {openne ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openne} timeout='auto' unmountOnExit>
              <List component='div' disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary='Histoire de UMIEL' />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary='Du Bonheur a Partager' />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary='Les Bienfaits De Nos Actifs' />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary='Temoignage' />
                </ListItemButton>
              </List>
            </Collapse>

            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary='Vente a Domicile' />
            </ListItemButton>

            <ListItemButton onClick={handleClick5}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary='Devenir Guide' />
              {openne3 ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openne3} timeout='auto' unmountOnExit>
              <List component='div' disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary='Devenir VDI' />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary='Une avanture Humaine"' />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary='Nos kit de demmarage' />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary='La vente en ligne' />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary='Remuneration chez Umiel' />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary='La formation Umiel' />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary='Le club' />
                </ListItemButton>
                <ListItemButton>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary='Etez-vous un guide' />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary='Postulez Ici' />
                </ListItemButton>
              </List>
            </Collapse>

            <ListItemButton onClick={handleClick3}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary='Produits de la Ruche' />
              {openne1 ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openne1} timeout='auto' unmountOnExit>
              <List component='div' disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary='Miel' />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary='Gelee Royale' />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary='Pollen' />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary='Propolis' />
                </ListItemButton>
              </List>
            </Collapse>

            <ListItemButton onClick={handleClick4}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary='Nos Selection' />
              {openne2 ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openne2} timeout='auto' unmountOnExit>
              <List component='div' disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary='Nos nouveautes' />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary='idees cadeaux' />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary='Bons plans' />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary='Best sellers' />
                </ListItemButton>
              </List>
            </Collapse>
          </List>
        </Drawer>
      </Box> */}
      <SideNavBar
        isNotMobile={isNotMobile}
        drawerWidth='250px'
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

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

export default AppBarMobile;
