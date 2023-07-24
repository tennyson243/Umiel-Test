import { ImageListItem } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import CircularProgressWithLabel from "./CircularProgressWithLabel";
import { CheckCircleOutline } from "@mui/icons-material";

const ProgressItem = () => {
  const [progress, setProgress] = useState(0);
  const [imageURL, setImageURL] = useState(null);
  return (
    <>
      {imageURL && (
        <ImageListItem cols={1} rows={1}>
          <img src={imageURL} alt='gallery' loading='lazy' />
          <Box sx={backDrop}>
            {progress < 100 ? (
              <CircularProgressWithLabel value={progress} />
            ) : (
              <CheckCircleOutline
                sx={{ width: 60, height: 60, color: "lightgreen" }}
              />
            )}
          </Box>
        </ImageListItem>
      )}
    </>
  );
};

export default ProgressItem;

const backDrop = {
  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "rgba(0,0,0, .5)",
};
