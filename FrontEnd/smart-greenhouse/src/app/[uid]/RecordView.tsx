"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  },
  exit: {
    x: 1000,
    y: 0,
    opacity: 0,
  },
};

export default function RecordView(props: Props) {
  return (
    <section className="flex absolute top-0 right-0 w-screen h-screen">
      <section className=" h-full w-20 bg-transparent flex-grow-0 flex justify-center items-center">
        <motion.button
          whileHover={{ scale: 1.3 }}
          onClick={() => {
            props.setClicked(false);
          }}
        >
          <Image
            src="/icon/left-chevron-svgrepo-com.svg"
            alt="move left"
            width={50}
            height={50}
          />
        </motion.button>
      </section>
      <motion.section
        className=" flex justify-center items-center"
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
      <motion.section
        className=" bg-white flex-grow p-5"
        variants={RVars}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <h1 className=" text-7xl text-center font-bold">
          {props.record.id}-
          {props.record.data.mode.booleanValue ? "Manual" : "Autopilot"}
        </h1>
        <div className=" text-5xl font-mono">
          <p className=" text-6xl">Environment</p>
          Temperature: {props.record.data.temperature.integerValue}°C
          <br />
          Moisture: {props.record.data.moisture.integerValue}%
          <br />
          Soil moisture: {props.record.data.soilmoisture.integerValue}%
          <br />
          Light: {props.record.data.light.integerValue}lx
        </div>
        <div className=" text-5xl font-mono">
          <p className=" text-6xl">Device status</p>
          Fan: {props.record.data.fan.booleanValue ? "on" : "off"} <br />
          Fan speed: {props.record.data.fanspeed.integerValue} <br />
          Water: {props.record.data.water.booleanValue ? "on" : "off"} <br />
          Led: {props.record.data.led.booleanValue ? "on" : "off"} <br />
        </div>
      </motion.section>
    </section>
  );
}
