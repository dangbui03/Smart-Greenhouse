"use client";

import Temperature from "./Temperature";
import Moisture from "./Moisture";
import SoilMoisture from "./SoilMoisture";
import Light from "./Light";
import Fan from "./Fan";
import Led from "./Led";
import Watering from "./Watering";
import Voice from "./Voice";
import useControl from "../hook/useControl";
import { ControlContextType } from "../context/controlContext";

export default function Sidebar() {
  const { controlContext, setcontrolContext } =
    useControl() as ControlContextType;
  return (
    <>
      {!controlContext && (
        <aside className="SidebarArea grid rounded-xl mx-10 mb-10 gap-5">
          <Temperature />
          <Moisture />
          <SoilMoisture />
          <Light />
        </aside>
      )}
      {controlContext && (
        <aside className="SidebarArea grid rounded-xl mx-10 mb-10 gap-5">
          <Fan />
          <Watering />
          <Led />
          <Voice />
        </aside>
      )}
    </>
  );
}
