import "../styles/globals.css";
import { PROVIDER } from "../context/context";

import toast, { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  return (
    <>
      <PROVIDER>
        <Component {...pageProps} />
      </PROVIDER>
      <Toaster></Toaster>
      <script type="text/javascript" src="js/jquery.js?ver=1.0.0"></script>
      <script src="" />
      <script type="text/javascript" src="js/plugins.js?ver=1.0.0"></script>
      <script type="text/javascript" src="/js/init.js?ver=1.0.0"></script>
    </>
  );
}
