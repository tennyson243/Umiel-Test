import { useTheme } from "@emotion/react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
const SideSaleCollection = () => {
  const theme = useTheme();
  return (
    <>
      <Box>
        <Box>
          <Box
            backgroundColor={theme.palette.primary.main}
            color={theme.palette.secondary.main}
            font-size='16px'
            font-weight=' normal'
            letter-spacing='1px'
            padding='15px 15px 15px 50px'
            position='relative'
            text-transform='uppercase'
            transition='all 0.3s ease 0s'
            borderTop=' 4px solid red '
            textTransform='uppercase'
          >
            <Typography variant='h6'>Jewelry & watches</Typography>
          </Box>
          <Box
            border='1px solid rgba(129, 129, 129, 0.2)'
            width='100%'
            z-index='99'
            backgroundColor={theme.palette.background.alt}
          >
            <List>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary='awesome Rings' />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary='Hot Earrings' />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary='Jewelry Sets' />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary='Beads Jewelry' />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary='Mens Watches' />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary='Women’s Watches' />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary='Popular Bracelets' />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemText primary='Pendant Necklaces' />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SideSaleCollection;
