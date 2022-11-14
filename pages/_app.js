import { useRouter } from "next/router";
import Layout from "../components/Layout";
import ProtectedRoute from "../components/ProtectedRoute";
import AuthContextProvider from "../context/AuthContext";
import "../styles/globals.css";
import "../styles/react-big-calendar.css";

const noAuthRequired = ["/", "/signin", "/signup", "/schedule/[uid]"];

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
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
  );
}

export default MyApp;
