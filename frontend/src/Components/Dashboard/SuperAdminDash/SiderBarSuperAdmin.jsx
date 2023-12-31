import { useTheme } from "@emotion/react";
import {
  AdminPanelSettingsOutlined,
  Beenhere,
  CalendarMonthOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  ContactEmergency,
  Flag,
  Groups2Outlined,
  HomeOutlined,
  IntegrationInstructionsSharp,
  MusicNote,
  OutlinedFlagRounded,
  PictureAsPdf,
  PieChartOutlined,
  PointOfSaleOutlined,
  PublicOutlined,
  ReceiptLongOutlined,
  SettingsOutlined,
  Shop2TwoTone,
  ShoppingCartOutlined,
  SupportAgent,
  TodayOutlined,
  TrendingUpOutlined,
} from "@mui/icons-material";
import GradeIcon from "@mui/icons-material/Grade";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "../../FlexBetween";

const navItems = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    text: "Face à la clientèle",
    icon: null,
  },
  {
    text: "Produits",
    icon: <ShoppingCartOutlined />,
  },
  {
    text: "Utilisateurs",
    icon: <Groups2Outlined />,
  },
  {
    text: "Commandes",
    icon: <Shop2TwoTone />,
  },
  {
    text: "Transactions",
    icon: <ReceiptLongOutlined />,
  },
  {
    text: "Localisation",
    icon: <PublicOutlined />,
  },
  {
    text: "Ventes",
    icon: null,
  },
  {
    text: "Aperçu",
    icon: <PointOfSaleOutlined />,
  },
  {
    text: "Journaliere",
    icon: <TodayOutlined />,
  },
  {
    text: "Mensuelle",
    icon: <CalendarMonthOutlined />,
  },
  {
    text: "Détails",
    icon: <PieChartOutlined />,
  },
  {
    text: "Blog",
    icon: null,
  },
  {
    text: "Remedes",
    icon: <OutlinedFlagRounded />,
  },
  {
    text: "Nutritions",
    icon: <GradeIcon />,
  },
  {
    text: "Santé",
    icon: <IntegrationInstructionsSharp />,
  },
  {
    text: "Apitherapie",
    icon: <Beenhere />,
  },
  {
    text: "TikTok",
    icon: <MusicNote />,
  },
  {
    text: "Galerie",
    icon: <PictureAsPdf />,
  },
  {
    text: "Gestion",
    icon: null,
  },
  {
    text: "Admins",
    icon: <AdminPanelSettingsOutlined />,
  },
  {
    text: "Performance",
    icon: <TrendingUpOutlined />,
  },
  {
    text: "Baniere",
    icon: <Flag />,
  },
  {
    text: "Assistance",
    icon: <SupportAgent />,
  },
  {
    text: "Contacts",
    icon: <ContactEmergency />,
  },
];
const SiderBarSuperAdmin = ({
  user,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);
  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSixing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography variant="h4" fontWeight="bold">
                    UMIEL
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {navItems.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                      {text}
                    </Typography>
                  );
                }
                const lcText = text.toLowerCase();

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcText}`);
                        setActive(lcText);
                      }}
                      sx={{
                        backgroundColor:
                          active === lcText
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active === lcText
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === lcText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>

          <Box position="relative" bottom="2rem" top="5rem">
            <Divider />
            <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
              <Box
                component="img"
                alt="profile"
                src={user.photoURL}
                height="40px"
                width="40px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.9rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {user.nom}
                </Typography>
                <Typography
                  fontSize="0.8rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {user.occupation}
                </Typography>
              </Box>
              <SettingsOutlined
                sx={{
                  color: theme.palette.secondary[300],
                  fontSize: "25px ",
                }}
              />
            </FlexBetween>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default SiderBarSuperAdmin;
