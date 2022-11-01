import { BrowserRouter as Router } from "react-router-dom";
import Loader from "./componenets/Loader";
import {
  SnackbarError,
  SnackbarInfo,
  SnackbarSuccess,
  SnackbarWarning,
} from "./componenets/snackBar";
import { Pages } from "./routes";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useTypedSelector } from "./hooks/redux/useSelectedTypes";
import { switchTheme } from "./interfaces";

function App() {
  const app = useTypedSelector((s) => s.app);
  const darkTheme = createTheme({
    palette: {
      mode: app.darkTheme ? switchTheme.dark : switchTheme.light,
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Router>
        <Loader />
        <SnackbarError />
        <SnackbarInfo />
        <SnackbarWarning />
        <SnackbarSuccess />
        <Pages />
      </Router>
    </ThemeProvider>
  );
}

export default App;
