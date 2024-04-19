"use client";
import { motion, AnimatePresence, delay } from "framer-motion";

const ChartVars = {
  initial: {
    x: -20,
    y: 0,
    opacity: 0,
  },
  animate: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.7,
    },
  },
  exit: {
    x: -20,
    y: 0,
    opacity: 0,
  },
};

export default function Chart() {
  return (
    <motion.section
      className="chartArea bg-slate-100 ml-10 rounded-xl mb-10 flex justify-center items-center"
      variants={ChartVars}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      Chart
    </motion.section>
  );
}
