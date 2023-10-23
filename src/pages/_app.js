import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { CartContextProvider } from "@/services/cart.service";
import { Layout } from "@/modules/layout/";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  return (
    // <SessionProvider session={pageProps.session}>
      <CartContextProvider>
        {!["/auth/signin"].includes(router.pathname) ? (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        ) : (
          <Component {...pageProps} />
        )}
        <Toaster />
      </CartContextProvider>
    // </SessionProvider>
  );
}
