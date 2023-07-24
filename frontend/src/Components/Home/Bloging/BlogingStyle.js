import styled from "@emotion/styled";
import { Box } from "@mui/system";
import { slideInBottom, slideInRight } from "../../Animation";

export const Bloging = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  [theme.breakpoints.up("md")]: {
    position: "relative",
  },
}));

export const BlogingImage = styled("img")(({ src, theme }) => ({
  src: `url(${src})`,
  width: "100%",
  height: "15rem",
  [theme.breakpoints.down("md")]: {
    width: "96%",
  },
}));

export const BlogingMeta = styled(Box, {
  shouldForwardProp: (prop) => prop !== "show",
})(({ show, theme }) => ({
  width: "19rem",
  fontSize: "12px",
  [theme.breakpoints.up("md")]: {
    position: "absolute",
    bottom: "2%",
    width: "23rem",
    padding: "10px",
    animation:
      show &&
      `${slideInBottom} 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`,
  },
  opacity: 0.9,
}));

export const BlogingActionsWrapper = styled(Box)(({ show, theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: show ? "visible" : "none",
    position: "absolute",
    right: 100,
    top: 10,
    animation:
      show &&
      `${slideInRight} 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`,
  },
}));
