import React, { useEffect, useState } from "react";
import Image from "next/image";
import useControl from "../hook/useControl";
import { ControlContextType } from "../context/controlContext";
import Create from "../../../action/Create";
import toast from "react-hot-toast";
import { usePathname } from "next/navigation";
import { setCookie, getCookie } from "cookies-next";
import { motion } from "framer-motion";
import GetLast from "../../../action/GetLast";

const initialState = {
  priority: false,
};

export default function ControlButton() {
  const { controlContext, setcontrolContext } =
    useControl() as ControlContextType;
  const pathname = usePathname();
  initialState.priority = getCookie("priority")
    ? getCookie("priority") === "true"
    : false;

  const handleControlToggle = (newValue: boolean) => {
    toast.remove();
    Create("priority", newValue ? 1 : 0);
    setcontrolContext(newValue);
    setCookie("priority", newValue);
  };

  const renderConfirmationDialog = (isManualControl: boolean) => {
    return (
      <div className="flex flex-col items-center gap-5">
        <div>
          {isManualControl
            ? "The system is on autopilot mode, are you sure want to control it manually?"
            : "Are you sure want to turn on the autopilot mode?"}
        </div>
        <div className="flex gap-10">
          <button
            className="bg-red-600 rounded-xl p-2"
            onClick={() => handleControlToggle(!controlContext)}
          >
            Yes
          </button>
          <button
            className="bg-green-600 rounded-xl p-2"
            onClick={() => toast.remove()}
          >
            No
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      {pathname === "/dashboard" && (
        <form
          action={(formData: FormData) => {
            toast(renderConfirmationDialog(!controlContext), {
              id: "control",
            });
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
