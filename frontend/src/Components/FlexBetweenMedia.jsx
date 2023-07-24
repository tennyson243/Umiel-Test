import styled from "@emotion/styled";
import { Box } from "@mui/system";

const FlexBetweenMedia = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "center",
  },
}));

export default FlexBetweenMedia;
