"use client";

import Image from "next/image";
import useControl from "../hook/useControl";
import useControlState from "../hook/useControlState";
import { ControlContextType } from "../context/controlContext";
import { ControlStateContextType } from "../context/controlStateContext";
import { motion, AnimatePresence, delay } from "framer-motion";
import Create from "../../../action/Create";
import NumberState from "./NumberState";
import Dictaphone from "./Voice";
import toast from "react-hot-toast";
import { setCookie, getCookie } from "cookies-next";
import ControlButton from "./ControlButton";
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

let c: ControlState = getCookie("cs")
  ? JSON.parse(getCookie("cs") as string)
  : {
      water: "0",
      led: "0",
      fan: {
        state: "0",
        velocity: 0,
      },
    };

let p = getCookie("priority")
  ? getCookie("priority") == "true"
    ? true
    : false
  : false;

export default function Sidebar() {
  const { controlContext, setcontrolContext } =
    useControl() as ControlContextType;
  const { controlStateContext, setcontrolStateContext } =
    useControlState() as ControlStateContextType;

  if (!controlStateContext) setcontrolStateContext(c);
  if (!controlContext) setcontrolContext(p as boolean);
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
                (controlStateContext?.fan.state == "1" ||
                controlStateContext?.fan.state == "2"
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
              <div className=" bg-black md:w-full md:h-10 absolute md:top-3 md:right-0 right-1 h-1 top-1 md:rounded-none rounded-full">
                <p className=" absolute md:w-full md:text-center md:text-white w-fit text-black right-1 font-mono">
                  {controlStateContext?.fan.state == "1" ||
                  controlStateContext?.fan.state == "2"
                    ? controlStateContext?.fan.velocity
                    : 0}
                  %
                </p>
                <div
                  className=" bg-green-400 md:h-10 self-end text-center h-1"
                  style={{
                    width: `${
                      controlStateContext?.fan.state == "1" ||
                      controlStateContext?.fan.state == "2"
                        ? controlStateContext?.fan.velocity
                        : 0
                    }%`,
                  }}
                ></div>
              </div>
              <section className=" absolute bottom-0 w-full h-full md:w-40 md:h-40 md:bottom-2 md:flex justify-center items-end">
                <button
                  className=" absolute w-full h-full md:w-fit md:h-fit md:block"
                  formAction={(formData: FormData) => {
                    const cc: ControlState = {
                      water: controlStateContext?.water,
                      led: controlStateContext?.led,
                      fan: {
                        state:
                          controlStateContext?.fan.state == "1" ||
                          controlStateContext?.fan.state == "2"
                            ? "3"
                            : "2",
                        velocity:
                          controlStateContext?.fan.state == "1" ||
                          controlStateContext?.fan.state == "2"
                            ? 0
                            : 50,
                      },
                    };
                    setcontrolStateContext(cc);
                    setCookie("cs", JSON.stringify(cc));
                    Create("fan", cc.fan.state);
                  }}
                >
                  <Image
                    className="md:block hidden"
                    src={
                      controlStateContext?.fan.state == "1" ||
                      controlStateContext?.fan.state == "2"
                        ? "/icon/on-rounded-svgrepo-com.svg"
                        : "/icon/off-rounded-svgrepo-com.svg"
                    }
                    alt="on - off"
                    width={50}
                    height={90}
                  />
                </button>
                <button
                  className="md:block absolute right-0 bottom-0 translate-x-4 translate-y-5 md:translate-x-0 md:translate-y-0"
                  formAction={(formData: FormData) => {
                    if (
                      controlStateContext?.fan.state == "0" ||
                      controlStateContext?.fan.state == "3"
                    ) {
                      toast.error("Please turn on the fan first", {
                        style: {
                          backgroundColor: "white",
                          color: "black",
                        },
                      });
                    } else {
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
                      setCookie("cs", JSON.stringify(cc));
                      Create("fanspeed", cc.fan.velocity);
                    }
                  }}
                >
                  <Image
                    className="md:block hidden"
                    src="/icon/increase-circle-svgrepo-com.svg"
                    alt="increase"
                    width={50}
                    height={90}
                  />
                  <Image
                    className="md:hidden block"
                    src="/icon/increase-circle-svgrepo-com.svg"
                    alt="increase"
                    width={40}
                    height={25}
                  />
                </button>
                <button
                  className="md:block absolute left-0 bottom-0 -translate-x-4 translate-y-5 md:translate-x-0 md:translate-y-0"
                  formAction={(formData: FormData) => {
                    if (
                      controlStateContext?.fan.state == "0" ||
                      controlStateContext?.fan.state == "3"
                    ) {
                      toast.error("Please turn on the fan first", {
                        style: {
                          backgroundColor: "white",
                          color: "black",
                        },
                      });
                    } else {
                      const cc: ControlState = {
                        water: controlStateContext?.water,
                        led: controlStateContext?.led,
                        fan: {
                          state: controlStateContext?.fan.state,
                          velocity:
                            (controlStateContext?.fan.velocity as number) -
                              10 <=
                            10
                              ? 10
                              : (controlStateContext?.fan.velocity as number) -
                                10,
                        },
                      };
                      setcontrolStateContext(cc);
                      setCookie("cs", JSON.stringify(cc));
                      Create("fanspeed", cc.fan.velocity);
                    }
                  }}
                >
                  <Image
                    className="md:block hidden"
                    src="/icon/decrease-circle-svgrepo-com.svg"
                    alt="increase"
                    width={50}
                    height={90}
                  />
                  <Image
                    className="md:hidden block"
                    src="/icon/decrease-circle-svgrepo-com.svg"
                    alt="increase"
                    width={40}
                    height={25}
                  />
                </button>
              </section>
            </motion.form>
            <motion.form
              className={
                (controlStateContext?.water == "1" ||
                controlStateContext?.water == "2"
                  ? "bg-blue-200"
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
                className=" absolute md:bottom-2 bottom-0 w-full h-full md:w-fit md:h-fit"
                formAction={(formData: FormData) => {
                  const cc: ControlState = {
                    water:
                      controlStateContext?.water == "1" ||
                      controlStateContext?.water == "2"
                        ? "3"
                        : "2",
                    led: controlStateContext?.led,
                    fan: {
                      state: controlStateContext?.fan.state,
                      velocity: controlStateContext?.fan.velocity,
                    },
                  };
                  setcontrolStateContext(cc);
                  setCookie("cs", JSON.stringify(cc));
                  Create("water", cc.water);
                }}
              >
                <Image
                  className=" hidden md:block"
                  src={
                    controlStateContext?.water == "1" ||
                    controlStateContext?.water == "2"
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
                (controlStateContext?.led == "1" ||
                controlStateContext?.led == "2"
                  ? "bg-yellow-400"
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
                className=" absolute md:bottom-2 bottom-0 w-full h-full md:w-fit md:h-fit"
                formAction={(formData: FormData) => {
                  const cc: ControlState = {
                    water: controlStateContext?.water,
                    led:
                      controlStateContext?.led == "1" ||
                      controlStateContext?.led == "2"
                        ? "3"
                        : "2",
                    fan: {
                      state: controlStateContext?.fan.state,
                      velocity: controlStateContext?.fan.velocity,
                    },
                  };
                  setcontrolStateContext(cc);
                  setCookie("cs", JSON.stringify(cc));
                  Create("led", cc.led);
                }}
              >
                <Image
                  className=" hidden md:block"
                  src={
                    controlStateContext?.led == "1" ||
                    controlStateContext?.led == "2"
                      ? "/icon/on-rounded-svgrepo-com.svg"
                      : "/icon/off-rounded-svgrepo-com.svg"
                  }
                  alt="on - off"
                  width={50}
                  height={90}
                />
              </button>
            </motion.form>
            <Dictaphone />
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
