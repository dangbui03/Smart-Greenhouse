"use client";
import React from "react";
import SignOutButton from "./SignOutButton";
import RecordButton from "./RecordButton";
import ControlButton from "./ControlButton";
import { motion, AnimatePresence, delay } from "framer-motion";

const NavVars = {
  initial: {
    x: 0,
    y: -20,
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
    x: 0,
    y: -20,
    opacity: 0,
  },
};

export default function Navbar() {
  return (
    <motion.nav
      className="navArea bg-slate-100 my-10 mx-32 rounded-full md:flex justify-center items-center gap-80 hidden"
      variants={NavVars}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <ControlButton />
      <RecordButton />
      <SignOutButton />
    </motion.nav>
  );
}
