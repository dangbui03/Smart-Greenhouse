"use client";
import React from "react";
import Image from "next/image";
import useControl from "../hook/useControl";
import { ControlContextType } from "../context/controlContext";

export default function ControlButton() {
  const { controlContext, setcontrolContext } =
    useControl() as ControlContextType;
  return (
    <button onClick={() => setcontrolContext(!controlContext)}>
      <Image
        src="/icon/control-multimedia-player-svgrepo-com.svg"
        alt="control"
        width={35}
        height={35}
      />
    </button>
  );
}
