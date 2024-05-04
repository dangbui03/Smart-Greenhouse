"use client";
import { motion, AnimatePresence, delay } from "framer-motion";
import TemperatureChart from "../chart/TemperatureChart";
import MoistureChart from "../chart/MoistureChart";
import SoilMoistureChart from "../chart/SoilMoistureChart";
import LightChart from "../chart/LightChart";
import { useState } from "react";
import Image from "next/image";
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

export default function ChartSection() {
  const [chart, setChart] = useState(0);
  const moveLeft = () => {
    setChart((chart - 1) % 4 < 0 ? 3 : (chart - 1) % 4);
  };
  const moveRight = () => {
    setChart((chart + 1) % 4);
  };
  return (
    <motion.section
      id="canvas"
      className="chartArea bg-slate-100 ml-10 rounded-xl mb-10 flex justify-center items-center gap-5"
      variants={ChartVars}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <button onClick={() => moveLeft()}>
        <Image
          src="/icon/left-chevron-svgrepo-com.svg"
          alt="move left"
          width={50}
          height={50}
        />
      </button>
      {chart == 0 && <TemperatureChart />}
      {chart == 1 && <MoistureChart />}
      {chart == 2 && <SoilMoistureChart />}
      {chart == 3 && <LightChart />}
      <section>
        <button onClick={() => moveRight()}>
          <Image
            src="/icon/right-chevron-svgrepo-com.svg"
            alt="move right"
            width={50}
            height={50}
          />
        </button>
      </section>
    </motion.section>
  );
}
