import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import GetLast from "../../../../action/GetLast";
import Create from "../../../../action/Create";
import toast from "react-hot-toast";

type Props = {
  setCLoading: React.Dispatch<React.SetStateAction<boolean>>;
  fan: fanState;
  setFan: React.Dispatch<React.SetStateAction<fanState>>;
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

export default function FanButton({ fan, setFan, setCLoading }: Props) {
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    setCLoading(true);

    // Fetch fan and fanspeed concurrently
    const [result, resultV] = await Promise.all([
      GetLast("fan"),
      GetLast("fanspeed"),
    ]);

    setFan({
      state: result.value === "1" || result.value === "2",
      velocity: +resultV.value,
    });

    setLoading(false);
    setCLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <motion.form
        className={`bg-white rounded-xl flex justify-center items-center relative brightness-50 cursor-not-allowed`}
        variants={SectionVars}
      >
        <Image
          src="/icon/fan-svgrepo-com.svg"
          alt="fan"
          width={128}
          height={90}
        />
        <div className="bg-black md:w-full md:h-10 absolute md:top-0 md:right-0 right-1 h-1 top-1 md:rounded-none rounded-full">
          <p className="absolute md:w-full md:text-center md:text-white w-fit text-black right-1 font-mono">
            0%
          </p>
          <div
            className="bg-green-400 md:h-10 self-end text-center h-1"
            style={{
              width: `0%`,
            }}
          ></div>
        </div>
        <section className="absolute bottom-0 w-full h-full md:w-40 md:h-40 md:bottom-2 md:flex justify-center items-end">
          <button
            className="absolute w-full h-full md:w-fit md:h-fit md:block cursor-not-allowed"
            type="button"
          >
            <Image
              className="md:block hidden"
              src={"/icon/off-rounded-svgrepo-com.svg"}
              alt="fan on/off"
              width={50}
              height={90}
            />
          </button>
          <button
            className="md:block absolute right-0 bottom-0 translate-x-4 translate-y-5 md:translate-x-0 md:translate-y-0 cursor-not-allowed"
            type="button"
          >
            <Image
              className="md:block hidden"
              src="/icon/increase-circle-svgrepo-com.svg"
              alt="increase speed"
              width={50}
              height={90}
            />
            <Image
              className="md:hidden block"
              src="/icon/increase-circle-svgrepo-com.svg"
              alt="increase speed"
              width={40}
              height={25}
            />
          </button>
          <button
            className="md:block absolute left-0 bottom-0 -translate-x-4 translate-y-5 md:translate-x-0 md:translate-y-0 cursor-not-allowed"
            type="button"
          >
            <Image
              className="md:block hidden"
              src="/icon/decrease-circle-svgrepo-com.svg"
              alt="decrease speed"
              width={50}
              height={90}
            />
            <Image
              className="md:hidden block"
              src="/icon/decrease-circle-svgrepo-com.svg"
              alt="decrease speed"
              width={40}
              height={25}
            />
          </button>
        </section>
      </motion.form>
    );
  }

  const handleFanToggle = () => {
    const newFanState = fan.state ? "3" : "2";
    const newFanVelocity = fan.state ? 0 : 50;

    setFan({
      state: !fan.state,
      velocity: newFanVelocity,
    });
    Create("fan", newFanState);
    Create("fanspeed", newFanVelocity);
  };

  const handleIncreaseSpeed = () => {
    if (!fan.state) {
      toast.error("Please turn on the fan first", {
        style: {
          backgroundColor: "white",
          color: "black",
        },
        id: "speed",
      });
    } else {
      const newFanVelocity = fan.velocity >= 100 ? 100 : fan.velocity + 10;
      setFan({ ...fan, velocity: newFanVelocity });
      Create("fanspeed", newFanVelocity);
    }
  };

  const handleDecreaseSpeed = () => {
    if (!fan.state) {
      toast.error("Please turn on the fan first", {
        style: {
          backgroundColor: "white",
          color: "black",
        },
        id: "speed",
      });
    } else {
      const newFanVelocity = fan.velocity - 10 <= 10 ? 10 : fan.velocity - 10;
      setFan({ ...fan, velocity: newFanVelocity });
      Create("fanspeed", newFanVelocity);
    }
  };

  return (
    <motion.form
      className={`${
        fan.state ? "bg-green-500" : "bg-white"
      } rounded-xl flex justify-center items-center relative`}
      variants={SectionVars}
    >
      <Image
        src="/icon/fan-svgrepo-com.svg"
        alt="fan"
        width={128}
        height={90}
      />
      <div className="bg-black md:w-full md:h-10 absolute md:top-0 md:right-0 right-1 h-1 top-1 md:rounded-none rounded-full">
        <p className="absolute md:w-full md:text-center md:text-white w-fit text-black right-1 font-mono">
          {fan.state ? fan.velocity : 0}%
        </p>
        <div
          className="bg-green-400 md:h-10 self-end text-center h-1"
          style={{
            width: `${fan.state ? fan.velocity : 0}%`,
          }}
        ></div>
      </div>
      <section className="absolute bottom-0 w-full h-full md:w-40 md:h-40 md:bottom-2 md:flex justify-center items-end">
        <button
          className="absolute w-full h-full md:w-fit md:h-fit md:block"
          type="button"
          onClick={handleFanToggle}
        >
          <Image
            className="md:block hidden"
            src={
              fan.state
                ? "/icon/on-rounded-svgrepo-com.svg"
                : "/icon/off-rounded-svgrepo-com.svg"
            }
            alt="fan on/off"
            width={50}
            height={90}
          />
        </button>
        <button
          className="md:block absolute right-0 bottom-0 translate-x-4 translate-y-5 md:translate-x-0 md:translate-y-0"
          type="button"
          onClick={handleIncreaseSpeed}
        >
          <Image
            className="md:block hidden"
            src="/icon/increase-circle-svgrepo-com.svg"
            alt="increase speed"
            width={50}
            height={90}
          />
          <Image
            className="md:hidden block"
            src="/icon/increase-circle-svgrepo-com.svg"
            alt="increase speed"
            width={40}
            height={25}
          />
        </button>
        <button
          className="md:block absolute left-0 bottom-0 -translate-x-4 translate-y-5 md:translate-x-0 md:translate-y-0"
          type="button"
          onClick={handleDecreaseSpeed}
        >
          <Image
            className="md:block hidden"
            src="/icon/decrease-circle-svgrepo-com.svg"
            alt="decrease speed"
            width={50}
            height={90}
          />
          <Image
            className="md:hidden block"
            src="/icon/decrease-circle-svgrepo-com.svg"
            alt="decrease speed"
            width={40}
            height={25}
          />
        </button>
      </section>
    </motion.form>
  );
}
