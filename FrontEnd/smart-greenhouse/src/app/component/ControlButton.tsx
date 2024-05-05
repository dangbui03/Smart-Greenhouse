"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import useControl from "../hook/useControl";
import { ControlContextType } from "../context/controlContext";
import Create from "../../../action/Create";
import toast from "react-hot-toast";
import { usePathname } from "next/navigation";
import { setCookie } from "cookies-next";
import { motion } from "framer-motion";

export default function ControlButton() {
  const { controlContext, setcontrolContext } =
    useControl() as ControlContextType;
  const pathname = usePathname();
  return (
    <>
      {pathname == "/dashboard" && (
        <form
          action={(formData: FormData) => {
            toast(
              <>
                {!controlContext && (
                  <div className="flex flex-col items-center gap-5">
                    <div>
                      The system is on autopilot mode, are you sure want to
                      control it manually?
                    </div>
                    <div className="flex gap-10">
                      <button
                        className=" bg-red-600 rounded-xl p-2"
                        onClick={() => {
                          toast.remove();
                          Create("priority", 1);
                          setcontrolContext(!controlContext);
                          setCookie("priority", !controlContext);
                        }}
                      >
                        Yes
                      </button>
                      <button
                        className=" bg-green-600 rounded-xl p-2"
                        onClick={() => toast.remove()}
                      >
                        No
                      </button>
                    </div>
                  </div>
                )}
                {controlContext && (
                  <div className="flex flex-col items-center gap-5">
                    <div>Are you sure want to turn on the autopilot mode?</div>
                    <div className="flex gap-10">
                      <button
                        className=" bg-red-600 rounded-xl p-2"
                        onClick={() => {
                          toast.remove();
                          Create("priority", 0);
                          setcontrolContext(!controlContext);
                          setCookie("priority", !controlContext);
                        }}
                      >
                        Yes
                      </button>
                      <button
                        className=" bg-green-600 rounded-xl p-2"
                        onClick={() => toast.remove()}
                      >
                        No
                      </button>
                    </div>
                  </div>
                )}
              </>,
              { id: "control" }
            );
          }}
        >
          <motion.button
            className="md:hidden flex"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1.1 }}
          >
            <Image
              src="/icon/control-multimedia-player-svgrepo-com.svg"
              alt="control"
              width={25}
              height={25}
            />
          </motion.button>
          <motion.button
            className="md:flex hidden"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 1.1 }}
          >
            <Image
              src="/icon/control-multimedia-player-svgrepo-com.svg"
              alt="control"
              width={35}
              height={35}
            />
          </motion.button>
        </form>
      )}
    </>
  );
}
