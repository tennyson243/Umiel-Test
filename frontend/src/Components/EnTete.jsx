import { Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const EnTete = ({ title, cover }) => {
  const theme = useTheme();
  return (
    <>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          height: "320px",
          backgroundColor: theme.palette.background.alt,
          backgroundImage: `url("../Images/bg/b1.png")`,
          backgroundRepeat: "no-repeat",
        }}
      >
        <Box max-width="90%" margin="auto">
          <Box textAlign={"center"}>
            <Typography variant="h1" line-height="40px">
              {title}
            </Typography>
            <Typography variant="h5">Acceuil /{title}</Typography>
            <Typography variant="h5"></Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default EnTete;

// import * as React from 'react';
// import Breadcrumbs from '@mui/material/Breadcrumbs';
// import Typography from '@mui/material/Typography';
// import Link from '@mui/material/Link';
// import Stack from '@mui/material/Stack';
// import NavigateNextIcon from '@mui/icons-material/NavigateNext';

// function handleClick(event) {
//   event.preventDefault();
//   console.info('You clicked a breadcrumb.');
// }

// export default function CustomSeparator() {
//   const breadcrumbs = [
//     <Link underline="hover" key="1" color="inherit" href="/" onClick={handleClick}>
//       MUI
//     </Link>,
//     <Link
//       underline="hover"
//       key="2"
//       color="inherit"
//       href="/material-ui/getting-started/installation/"
//       onClick={handleClick}
//     >
//       Core
//     </Link>,
//     <Typography key="3" color="text.primary">
//       Breadcrumb
//     </Typography>,
//   ];

//   return (
//     <Stack spacing={2}>
//       <Breadcrumbs separator="›" aria-label="breadcrumb">
//         {breadcrumbs}
//       </Breadcrumbs>
//       <Breadcrumbs separator="-" aria-label="breadcrumb">
//         {breadcrumbs}
//       </Breadcrumbs>
//       <Breadcrumbs
//         separator={<NavigateNextIcon fontSize="small" />}
//         aria-label="breadcrumb"
//       >
//         {breadcrumbs}
//       </Breadcrumbs>
//     </Stack>
//   );
// }
