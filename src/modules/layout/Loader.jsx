import { useState, useEffect } from "react";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

const Loader = () => {
  return (
    <motion.div
      key="__loader__"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="fixed top-0 bottom-0 left-0 right-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-darker/70"
    >
      <Image src="/img/logo.png" width={250} height={250} className="animate__animated animate__swing animate__infinite" />
    </motion.div>
  );
};

export { Loader };
