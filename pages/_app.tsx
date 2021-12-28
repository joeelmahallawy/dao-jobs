import { ChakraProvider, extendTheme, theme } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Layout from "../components/Layout";
import { Chakratheme } from "../utils/theme";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/900.css";

const MyApp = ({ Component, pageProps: { session, ...pageProps } }) => (
  <SessionProvider session={session}>
    <ChakraProvider theme={Chakratheme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  </SessionProvider>
);

export default MyApp;
