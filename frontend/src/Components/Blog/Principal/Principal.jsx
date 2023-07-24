import { Box } from "@mui/system";
import React from "react";
import Side from "../../../screen/Blog/Side";
import Lifestyle from "../LifeStyle/Lifestyle";
import Music from "../Music/Music";
import Populaire from "../Populaire/Populaire";
import Ppost from "../Ppost/Ppost";

const Principal = () => {
  return (
    <>
      <main>
        <Box width='90%' m='auto'>
          <Box
            sx={{
              display: " flex",
              justifyContent: "space-between",
              flexDirection: {
                xs: "column",
                sm: "row",
              },
            }}
          >
            <Box
              sx={{
                width: {
                  sm: "75%",
                  xs: "100%",
                },
              }}
            >
              <Populaire />
              <Ppost />
              <Lifestyle />
              <Music />
            </Box>

            <Box
              sx={{
                width: {
                  sm: "23%",
                  xs: "100%",
                },
              }}
            >
              <Side />
            </Box>
          </Box>
        </Box>
      </main>
    </>
  );
};

export default Principal;
