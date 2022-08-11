import "../styles/globals.css";
import Head from "next/dist/shared/lib/head";
import { AppProps } from "next/app";
import { useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const [data, setData] = useState();

  return (
    <Component {...pageProps}>
      <Head>
        <title>C.bi Projects</title>
        <link rel="icon" href="/snowflake-solid.svg" />
      </Head>
    </Component>
  );
}

export default MyApp;
