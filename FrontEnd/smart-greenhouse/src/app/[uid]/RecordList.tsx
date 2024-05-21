"use client";
import React, { useEffect, useState } from "react";
import { DocumentData } from "firebase/firestore";
import Image from "next/image";
import { motion } from "framer-motion";
import RecordView from "./RecordView";
import GetRecord from "../../../action/GetRecord";
import LoadMoreButton from "./LoadMoreButton"; // Import the new component

interface Props {
  uid: string;
}

interface StateRecord {
  id: string;
  data: DocumentData;
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
    y: 0,
    opacity: 0,
  },
};

export default function RecordList({ uid }: Props) {
  const [clicked, setClicked] = useState(false);
  const [indexC, setIndexC] = useState(0);
  const [mapped, setMapped] = useState<StateRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(true); // New state to track if there are more records

  const fetchInitialRecords = async () => {
    setLoading(true);
    try {
      const { docSnap, hasMore } = await GetRecord(uid);
      const newRecords: StateRecord[] = docSnap.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      setMapped(newRecords);
      setHasMore(hasMore); // Update the hasMore state
    } catch (error) {
      console.error("Error fetching initial records:", error);
    }
    setLoading(false);
  };

  const fetchMoreRecords = async () => {
    setLoading(true);
    try {
      const { docSnap, hasMore } = await GetRecord(uid, true);
      const newRecords: StateRecord[] = docSnap.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      setMapped((prevRecords) => [...prevRecords, ...newRecords]);
      setHasMore(hasMore); // Update the hasMore state
    } catch (error) {
      console.error("Error fetching more records:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchInitialRecords();
  }, [uid]);

  return (
    <>
      <motion.ul
        variants={UlVars}
        initial="initial"
        animate="animate"
        exit="exit"
        className="h-full w-full flex-grow bg-white rounded-l-3xl flex flex-wrap gap-10 overflow-scroll justify-center md:justify-normal"
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
        <LoadMoreButton
          loading={loading}
          fetchMoreRecords={fetchMoreRecords}
          hasMore={hasMore}
        />
      </motion.ul>
    </>
  );
}
