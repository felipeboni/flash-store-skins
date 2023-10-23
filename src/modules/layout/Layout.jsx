import { useState, useEffect } from "react";

import { Loader } from "./Loader";
import { Navbar } from "./Navbar";

import { useRouter } from "next/router";
import Link from "next/link";

import { AnimatePresence, motion } from "framer-motion";

const Layout = ({ children }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  function handleRouteChange(state) {
    setLoading(state);
  }

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);

    router.events.on("routeChangeStart", () => handleRouteChange(true));
    router.events.on("routeChangeComplete", () => handleRouteChange(false));

    return () => {
      router.events.off("routeChangeStart", handleRouteChange(true));
    };
  }, []);

  return (
    <div className="flex flex-col justify-center overflow-hidden">
      {/* <AnimatePresence>{loading && <Loader />}</AnimatePresence> */}
      <Navbar/>

      <main className="py-2">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key={`__page__${children.type.name}`}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export { Layout };
