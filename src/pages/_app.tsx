import { UserProvider } from "@auth0/nextjs-auth0";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "../styles/global.css";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <ToastContainer />
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
