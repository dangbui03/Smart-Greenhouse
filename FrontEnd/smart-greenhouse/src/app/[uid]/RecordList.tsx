"use client";
import React, { useState } from "react";
import { QuerySnapshot, DocumentData } from "firebase/firestore";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import RecordView from "./RecordView";
import BackButton from "./BackButton";

interface Props {
  records: any;
}

const UlVars = {
  initital: {
    transition: {
      staggerChildren: 0.3,
      staggerDirection: -1,
    },
  },
  animate: {
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.1,
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
    y: 10,
    opacity: 0,
  },
};

export default function RecordList({ records }: Props) {
  const [clicked, setClicked] = useState(false);
  const [indexC, setIndexC] = useState(0);
  let mapped: StateRecord[] = [];

  records = records.forEach((record: any) => {
    mapped.push({
      id: record._key.path.segments[record._key.path.segments.length - 1],
      data: record._document.data.value.mapValue.fields,
    });
  });

  return (
    <>
      <motion.ul
        variants={UlVars}
        initial="initial"
        animate="animate"
        exit="exit"
        className="h-full w-full flex-grow bg-white flex flex-wrap gap-10 overflow-scroll justify-center"
      >
        {mapped.map((doc, index) => (
          <motion.li
            variants={LiVars}
            key={index}
            className="flex justify-center items-center w-52"
          >
            <button
              className="flex justify-center items-center flex-col"
              onClick={() => {
                setClicked(true);
                setIndexC(index);
              }}
            >
              {doc.id}
              <Image
                src="/icon/record-svgrepo-com.svg"
                alt="record"
                width={100}
                height={50}
              />
            </button>
            {clicked && index == indexC && (
              <RecordView record={doc} setClicked={setClicked} />
            )}
          </motion.li>
        ))}
      </motion.ul>
    </>
  );
}
