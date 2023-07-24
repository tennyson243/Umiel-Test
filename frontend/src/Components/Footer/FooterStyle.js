import styled from "@emotion/styled";
import { TextField, Typography } from "@mui/material";

export const FooterTitle = styled(Typography)(() => ({
  textTransform: "uppercase",
  marginBottom: "1em",
}));

export const SubscribeTf = styled(TextField)(() => ({
  ".MuiInputLabel-root": {},

  ".MuiInput-root::before": {
    borderBottom: `1px solid `,
  },
}));
