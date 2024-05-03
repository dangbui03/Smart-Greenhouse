"use client";

import Image from "next/image";
import useControl from "../hook/useControl";
import useControlState from "../hook/useControlState";
import { ControlContextType } from "../context/controlContext";
import { ControlStateContextType } from "../context/controlStateContext";
import { motion, AnimatePresence, delay } from "framer-motion";
import Create from "../../../action/Create";
import NumberState from "./NumberState";

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
  const { controlStateContext, setcontrolStateContext } =
    useControlState() as ControlStateContextType;
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
              <NumberState feed="temperature" />
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
              <NumberState feed="moisture" />
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
              <NumberState feed="soilmoisture" />
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
              <NumberState feed="light" />
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
            <motion.form
              className={
                (controlStateContext?.fan.state == "1"
                  ? "bg-green-500"
                  : "bg-white") +
                " rounded-xl flex justify-center items-center relative"
              }
              variants={SectionVars}
            >
              <Image
                src="/icon/fan-svgrepo-com.svg"
                alt="fan"
                width={128}
                height={90}
              />
              <div className=" bg-black w-full h-10 absolute top-3 right-0 text-white">
                <p className=" absolute w-full text-center">
                  {controlStateContext?.fan.velocity}%
                </p>
                <div
                  className=" bg-green-400 h-10 self-end text-center"
                  style={{ width: `${controlStateContext?.fan.velocity}%` }}
                ></div>
              </div>
              <section className=" absolute bottom-2">
                <button
                  formAction={(formData: FormData) => {
                    const cc: ControlState = {
                      water: controlStateContext?.water,
                      led: controlStateContext?.led,
                      fan: {
                        state:
                          controlStateContext?.fan.state == "1" ? "0" : "1",
                        velocity:
                          controlStateContext?.fan.state == "1" ? 0 : 50,
                      },
                    };
                    setcontrolStateContext(cc);
                    Create("fan", cc.fan.state);
                  }}
                >
                  <Image
                    src={
                      controlStateContext?.fan.state == "1"
                        ? "/icon/on-rounded-svgrepo-com.svg"
                        : "/icon/off-rounded-svgrepo-com.svg"
                    }
                    alt="on - off"
                    width={50}
                    height={90}
                  />
                </button>
                <button
                  formAction={(formData: FormData) => {
                    const cc: ControlState = {
                      water: controlStateContext?.water,
                      led: controlStateContext?.led,
                      fan: {
                        state: controlStateContext?.fan.state,
                        velocity:
                          (controlStateContext?.fan.velocity as number) >= 100
                            ? 100
                            : (controlStateContext?.fan.velocity as number) +
                              10,
                      },
                    };
                    setcontrolStateContext(cc);
                    Create("fanspeed", cc.fan.velocity);
                  }}
                >
                  <Image
                    src="/icon/increase-circle-svgrepo-com.svg"
                    alt="increase"
                    width={50}
                    height={90}
                  />
                </button>
                <button
                  formAction={(formData: FormData) => {
                    const cc: ControlState = {
                      water: controlStateContext?.water,
                      led: controlStateContext?.led,
                      fan: {
                        state: controlStateContext?.fan.state,
                        velocity:
                          (controlStateContext?.fan.velocity as number) - 10 <=
                          10
                            ? 10
                            : (controlStateContext?.fan.velocity as number) -
                              10,
                      },
                    };
                    setcontrolStateContext(cc);
                    Create("fanspeed", cc.fan.velocity);
                  }}
                >
                  <Image
                    src="/icon/decrease-circle-svgrepo-com.svg"
                    alt="decrease"
                    width={50}
                    height={90}
                  />
                </button>
              </section>
            </motion.form>
            <motion.form
              className={
                (controlStateContext?.water == "1"
                  ? "bg-green-500"
                  : "bg-white") +
                " rounded-xl flex flex-col gap-10 justify-center items-center relative"
              }
              variants={SectionVars}
            >
              <Image
                src="/icon/watering-can-4-svgrepo-com.svg"
                alt="water can"
                width={90}
                height={90}
              />
              <button
                className=" absolute bottom-2"
                formAction={(formData: FormData) => {
                  const cc: ControlState = {
                    water: controlStateContext?.water == "1" ? "0" : "1",
                    led: controlStateContext?.led,
                    fan: {
                      state: controlStateContext?.fan.state,
                      velocity: controlStateContext?.fan.velocity,
                    },
                  };
                  setcontrolStateContext(cc);
                  Create("water", cc.water);
                }}
              >
                <Image
                  src={
                    controlStateContext?.water == "1"
                      ? "/icon/on-rounded-svgrepo-com.svg"
                      : "/icon/off-rounded-svgrepo-com.svg"
                  }
                  alt="on - off"
                  width={50}
                  height={90}
                />
              </button>
            </motion.form>
            <motion.form
              className={
                (controlStateContext?.led == "1"
                  ? "bg-green-500"
                  : "bg-white") +
                " rounded-xl flex flex-col gap-10 justify-center items-center relative"
              }
              variants={SectionVars}
            >
              <Image
                src="/icon/flashlight-svgrepo-com.svg"
                alt="led"
                width={90}
                height={90}
              />
              <button
                className=" absolute bottom-2"
                formAction={(formData: FormData) => {
                  const cc: ControlState = {
                    water: controlStateContext?.water,
                    led: controlStateContext?.led == "1" ? "0" : "1",
                    fan: {
                      state: controlStateContext?.fan.state,
                      velocity: controlStateContext?.fan.velocity,
                    },
                  };
                  setcontrolStateContext(cc);
                  Create("led", cc.led);
                }}
              >
                <Image
                  src={
                    controlStateContext?.led == "1"
                      ? "/icon/on-rounded-svgrepo-com.svg"
                      : "/icon/off-rounded-svgrepo-com.svg"
                  }
                  alt="on - off"
                  width={50}
                  height={90}
                />
              </button>
            </motion.form>
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
