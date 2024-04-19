"use client";

import Image from "next/image";
import useControl from "../hook/useControl";
import { ControlContextType } from "../context/controlContext";
import { motion, AnimatePresence, delay } from "framer-motion";

const SidebarVars = {
  initital: {
    transition: {
      staggerChildren: 0.3,
      staggerDirection: -1,
    },
  },
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.7,
      staggerDirection: 1,
    },
  },
  exit: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
      staggerDirection: -1,
    },
  },
};

const SectionVars = {
  initial: {
    x: 10,
    y: 10,
    opacity: 0,
  },
  animate: {
    x: 0,
    y: 0,
    opacity: 1,
  },
  exit: {
    x: 10,
    y: 10,
    opacity: 0,
  },
};

export default function Sidebar() {
  const { controlContext, setcontrolContext } =
    useControl() as ControlContextType;
  return (
    <>
      <AnimatePresence>
        {!controlContext && (
          <motion.aside
            className="SidebarArea grid rounded-xl mx-10 mb-10 gap-5"
            variants={SidebarVars}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <motion.section
              className=" bg-red-300 rounded-xl flex justify-center items-center relative"
              variants={SectionVars}
            >
              <Image
                src="/icon/temperature-half-svgrepo-com.svg"
                alt="temperature"
                width={50}
                height={50}
                className=" absolute top-0 right-0"
              />
              <p className="w-28 h-28 flex justify-center items-center">
                Temperature
              </p>
            </motion.section>
            <motion.section
              className=" bg-blue-200 rounded-xl flex justify-center items-center relative"
              variants={SectionVars}
            >
              <Image
                src="/icon/moisture-svgrepo-com.svg"
                alt="temperature"
                width={50}
                height={50}
                className=" absolute top-0 right-1"
              />
              Moisture
            </motion.section>
            <motion.section
              className=" bg-yellow-800 rounded-xl flex justify-center items-center relative"
              variants={SectionVars}
            >
              <Image
                src="/icon/soil-moisture-svgrepo-com.svg"
                alt="temperature"
                width={50}
                height={50}
                className=" absolute top-0 right-2"
              />
              SoilMoisture
            </motion.section>
            <motion.section
              className=" bg-yellow-400 rounded-xl flex justify-center items-center relative"
              variants={SectionVars}
            >
              <Image
                src="/icon/light-svgrepo-com.svg"
                alt="temperature"
                width={50}
                height={50}
                className=" absolute top-0 right-1"
              />
              Light
            </motion.section>
          </motion.aside>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {controlContext && (
          <motion.aside
            className="SidebarArea grid rounded-xl mx-10 mb-10 gap-5"
            variants={SidebarVars}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <motion.button
              className="bg-red-300 rounded-xl flex justify-center items-center"
              variants={SectionVars}
            >
              <Image
                src="/icon/fan-svgrepo-com.svg"
                alt="fan"
                width={112}
                height={90}
              />
            </motion.button>
            <motion.button
              className="bg-red-300 rounded-xl flex justify-center items-center"
              variants={SectionVars}
            >
              <Image
                src="/icon/watering-can-4-svgrepo-com.svg"
                alt="fan"
                width={90}
                height={90}
              />
            </motion.button>
            <motion.button
              className="bg-red-300 rounded-xl flex justify-center items-center"
              variants={SectionVars}
            >
              <Image
                src="/icon/flashlight-svgrepo-com.svg"
                alt="fan"
                width={90}
                height={90}
              />
            </motion.button>
            <motion.button
              className="bg-red-300 rounded-xl flex justify-center items-center"
              variants={SectionVars}
            >
              <Image
                src="/icon/voice-tools-svgrepo-com.svg"
                alt="fan"
                width={90}
                height={90}
              />
            </motion.button>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
