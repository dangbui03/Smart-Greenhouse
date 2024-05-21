"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface Props {
  record: StateRecord;
  setClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

const LVars = {
  initial: {
    x: -1000,
    y: 0,
    opacity: 0,
  },
  animate: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      ease: "linear",
    },
  },
  exit: {
    x: -1000,
    y: 0,
    opacity: 0,
  },
};

const RVars = {
  initial: {
    x: 1000,
    y: 0,
    opacity: 0,
  },
  animate: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      ease: "linear",
    },
  },
  exit: {
    x: 1000,
    y: 0,
    opacity: 0,
  },
};

export default function RecordView({ record, setClicked }: Props) {
  const handleClose = () => {
    setClicked(false);
  };

  return (
    <section className="flex absolute top-0 right-0 w-screen h-screen">
      {/* Close button for desktop */}
      <section className="absolute top-2 right-2 z-50 md:block hidden">
        <motion.button whileHover={{ scale: 1.3 }} onClick={handleClose}>
          <Image
            src="/icon/cross-svgrepo-com.svg"
            alt="close"
            width={40}
            height={40}
          />
        </motion.button>
      </section>
      {/* Close button for mobile */}
      <section className="md:hidden absolute top-2 right-2 z-50">
        <motion.button whileHover={{ scale: 1.3 }} onClick={handleClose}>
          <Image
            src="/icon/cross-svgrepo-com.svg"
            alt="close"
            width={30}
            height={30}
          />
        </motion.button>
      </section>
      {/* Record icon for desktop */}
      <motion.section
        className="md:flex justify-center items-center w-full hidden"
        style={{
          backdropFilter: "blur(10px)",
        }}
        variants={LVars}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <Image
          src="/icon/record-svgrepo-com.svg"
          alt="record"
          width={500}
          height={50}
        />
      </motion.section>
      {/* Record details */}
      <motion.section
        className="bg-white flex-grow md:p-5 p-0 rounded-xl md:w-fit w-full md:block flex justify-center flex-col"
        variants={RVars}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {/* Record ID and Mode */}
        <h1 className="text-7xl text-center font-bold py-7 md:block hidden">
          {record.id} - {record.data.mode.booleanValue ? "Manual" : "Autopilot"}
        </h1>
        <h1 className="text-xl text-center font-bold pb-10 w-full md:hidden block">
          {record.id} <br />
          {record.data.mode.booleanValue ? "Manual" : "Autopilot"}
        </h1>
        {/* Environment information */}
        <div className="md:text-5xl text-xl font-mono pb-4 md:pl-0 pl-5">
          <p className="md:text-6xl">Environment</p>
          <p>Temperature: {record.data.temperature}°C</p>
          <p>Moisture: {record.data.moisture}%</p>
          <p>Soil Moisture: {record.data.soilmoisture}%</p>
          <p>Light: {record.data.light}lx</p>
        </div>
        {/* Device status */}
        <div className="md:text-5xl text-xl font-mono md:pl-0 pl-5">
          <p className="md:text-6xl">Device Status</p>
          <p>Fan: {record.data.fan ? "On" : "Off"}</p>
          <p>Fan Speed: {record.data.fanspeed}</p>
          <p>Water: {record.data.water ? "On" : "Off"}</p>
          <p>LED: {record.data.led ? "On" : "Off"}</p>
        </div>
      </motion.section>
    </section>
  );
}
