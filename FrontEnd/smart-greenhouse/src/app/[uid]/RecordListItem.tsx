"use client";
import React from "react";
import { DocumentData } from "firebase/firestore";
import Image from "next/image";
import { motion } from "framer-motion";
import RecordView from "./RecordView";

interface Props {
  record: {
    id: string;
    data: DocumentData;
  };
  index: number;
  clicked: boolean;
  indexC: number;
  setClicked: React.Dispatch<React.SetStateAction<boolean>>;
  setIndexC: React.Dispatch<React.SetStateAction<number>>;
}

const LiVars = {
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
    y: 0,
    opacity: 0,
  },
};

const isExcessivelyHighTemperature = (temp: number): boolean => {
  return temp > 40; // Harmful if temperature is above 40°C
};

const isExcessivelyHighMoisture = (moisture: number): boolean => {
  return moisture > 80; // Harmful if moisture is above 80%
};

const isExcessivelyHighSoilMoisture = (soilMoisture: number): boolean => {
  return soilMoisture > 80; // Harmful if soil moisture is above 80%
};

const isExcessivelyHighLight = (light: number): boolean => {
  return light > 4000; // Harmful if light intensity is above 4000 lx
};

const isAuto = (priority: number): boolean => {
  return priority == 0;
};

export default function RecordListItem({
  record,
  index,
  clicked,
  indexC,
  setClicked,
  setIndexC,
}: Props) {
  return (
    <motion.li
      variants={LiVars}
      className="flex justify-center items-center w-52"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 1.1 }}
    >
      <button
        className="flex justify-center items-center flex-col relative w-full h-full"
        onClick={() => {
          setClicked(true);
          setIndexC(index);
        }}
      >
        {record.id}
        <Image
          src="/icon/record-svgrepo-com.svg"
          alt="record"
          width={100}
          height={50}
        />
        {isAuto(record.data.mode) && (
          <div className=" absolute top-5 flex w-full justify-end text-4xl">
            🤖
          </div>
        )}
        <div className=" absolute bottom-0 flex w-full justify-end">
          {isExcessivelyHighTemperature(record.data.temperature) && (
            <div className=" text-3xl">🌡️</div>
          )}
          {isExcessivelyHighMoisture(record.data.moisture) && (
            <div className="text-3xl">💦</div>
          )}
          {isExcessivelyHighSoilMoisture(record.data.soilmoisture) && (
            <div className="text-3xl">🌰</div>
          )}
          {isExcessivelyHighLight(record.data.light) && (
            <div className="text-3xl">☀️</div>
          )}
        </div>
      </button>
    </motion.li>
  );
}
