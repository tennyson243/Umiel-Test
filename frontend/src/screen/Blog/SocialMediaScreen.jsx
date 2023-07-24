import { Box } from "@mui/system";
import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import { IconButton, Stack, Typography } from "@mui/material";
import { Pinterest, Twitter, YouTube } from "@mui/icons-material";

const SocialMediaScreen = () => {
  return (
    <>
      <Box>
        <Stack direction='row' spacing={2}>
          <IconButton>
            <FacebookIcon />
          </IconButton>
          <Typography
            variant='h6'
            sx={{
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            12,740 Likes
          </Typography>
        </Stack>

        <Stack direction='row' spacing={2}>
          <IconButton>
            <InstagramIcon />
          </IconButton>
          <Typography
            variant='h6'
            sx={{
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            22,700 Followers
          </Typography>
        </Stack>

        <Stack direction='row' spacing={2}>
          <IconButton>
            <Pinterest />
          </IconButton>
          <Typography
            variant='h6'
            sx={{
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            5,600 Fans
          </Typography>
        </Stack>

        <Stack direction='row' spacing={2}>
          <IconButton>
            <Twitter />
          </IconButton>
          <Typography
            variant='h6'
            sx={{
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            8,700 Followers
          </Typography>
        </Stack>

        <Stack direction='row' spacing={2}>
          <IconButton>
            <YouTube />
          </IconButton>
          <Typography
            variant='h6'
            sx={{
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            2,700 Subscriber
          </Typography>
        </Stack>
      </Box>
    </>
  );
};

export default SocialMediaScreen;
