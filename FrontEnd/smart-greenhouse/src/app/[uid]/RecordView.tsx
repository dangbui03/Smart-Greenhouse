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

export default function RecordView(props: Props) {
  return (
    <section className="flex absolute top-0 right-0 w-screen h-screen">
      <section className="absolute top-2 right-2 z-50 md:block hidden">
        <motion.button
          whileHover={{ scale: 1.3 }}
          onClick={() => {
            props.setClicked(false);
          }}
        >
          <Image
            src="/icon/cross-svgrepo-com.svg"
            alt="move left"
            width={40}
            height={40}
          />
        </motion.button>
      </section>
      <section className="md:hidden absolute top-2 right-2  z-50">
        <motion.button
          whileHover={{ scale: 1.3 }}
          onClick={() => {
            props.setClicked(false);
          }}
        >
          <Image
            src="/icon/cross-svgrepo-com.svg"
            alt="move left"
            width={30}
            height={30}
          />
        </motion.button>
      </section>
      <motion.section
        className=" md:flex justify-center items-center w-full hidden"
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
        className=" bg-white flex-grow md:p-5 p-0 rounded-xl md:w-fit w-full md:block flex justify-center flex-col"
        variants={RVars}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <h1 className=" text-7xl text-center font-bold py-7 md:block hidden">
          {props.record.id}-
          {props.record.data.mode.booleanValue ? "Manual" : "Autopilot"}
        </h1>
        <h1 className=" text-xl text-center font-bold pb-10 w-full md:hidden block">
          {props.record.id} <br />
          {props.record.data.mode.booleanValue ? "Manual" : "Autopilot"}
        </h1>
        <div className=" md:text-5xl text-xl font-mono pb-4 md:pl-0 pl-5">
          <p className=" md:text-6xl ">Environment</p>
          Temperature: {props.record.data.temperature.integerValue}°C
          <br />
          Moisture: {props.record.data.moisture.integerValue}%
          <br />
          Soil moisture: {props.record.data.soilmoisture.integerValue}%
          <br />
          Light: {props.record.data.light.integerValue}lx
        </div>
        <div className=" md:text-5xl text-xl font-mono md:pl-0 pl-5">
          <p className=" md:text-6xl">Device status</p>
          Fan: {props.record.data.fan.booleanValue ? "on" : "off"} <br />
          Fan speed: {props.record.data.fanspeed.integerValue} <br />
          Water: {props.record.data.water.booleanValue ? "on" : "off"} <br />
          Led: {props.record.data.led.booleanValue ? "on" : "off"} <br />
        </div>
      </motion.section>
    </section>
  );
}
