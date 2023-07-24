import "./App.css";
import Page from "./Components/Page";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useMemo } from "react";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./Components/theme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className='App'>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToastContainer position='bottom-center' limit={1} />
        <Page />
      </ThemeProvider>
    </div>
  );
}

export default App;
