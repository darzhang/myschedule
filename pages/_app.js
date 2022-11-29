import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { blue, blueGrey, indigo } from "@mui/material/colors";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import ProtectedRoute from "../components/ProtectedRoute";
import AuthContextProvider from "../context/AuthContext";
import "../styles/globals.css";
import "../styles/react-big-calendar.css";

const noAuthRequired = ["/", "/signin", "/signup", "/schedule/[uid]"];

const theme = createTheme({
  palette: {
    primary: {
      main: blueGrey[500],
    },
    secondary: {
      main: blue[500],
    },
  },
});

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <Layout>
          {noAuthRequired.includes(router.pathname) ? (
            <Component {...pageProps} />
          ) : (
            <ProtectedRoute>
              <Component {...pageProps} />
            </ProtectedRoute>
          )}
        </Layout>
      </AuthContextProvider>
    </ThemeProvider>
  );
}

export default MyApp;
