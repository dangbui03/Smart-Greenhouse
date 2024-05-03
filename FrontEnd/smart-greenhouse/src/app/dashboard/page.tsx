"use client";
import GridLayout from "../component/GridLayout";
import useAuth from "@/app/hook/useAuth";
import { AuthContextType } from "@/app/context/authContext";
import Image from "next/image";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import useControlState from "../hook/useControlState";
import { ControlStateContextType } from "../context/controlStateContext";
import GetLast from "../../../action/GetLast";
import useControl from "../hook/useControl";
import { ControlContextType } from "../context/controlContext";
export default function Dashboard() {
  const [mounted, setMounted] = useState(false);
  const u = getCookie("user") ? JSON.parse(getCookie("user") as string) : "";
  const { authContext, setAuthContext } = useAuth() as AuthContextType;
  const { controlStateContext, setcontrolStateContext } =
    useControlState() as ControlStateContextType;
  const { controlContext, setcontrolContext } =
    useControl() as ControlContextType;
  useEffect(() => {
    let cs: ControlState = {
      water: "0",
      led: "0",
      fan: { state: "0", velocity: 0 },
    };
    const water = GetLast("water").then((result) => {
      cs.water = result.value;
    });
    const led = GetLast("led").then((result) => {
      cs.led = result.value;
    });
    const fan = GetLast("fan").then((result) => {
      cs.fan.state = result.value;
    });
    const fanspeed = GetLast("fanspeed").then((result) => {
      cs.fan.velocity = Number(result.value);
      setcontrolStateContext(cs);
    });
  }, []);

  useEffect(() => {
    if (u) setAuthContext(u);
  }, []);

  useEffect(() => {
    const cc = GetLast("priority").then((result) => {
      setcontrolContext(result.value == "1" ? true : false);
    });
  }, []);

  useEffect(() => {
    setMounted(false);
    setTimeout(() => setMounted(true), 100);
  }, [authContext]);

  return (
    <>
      {authContext && <GridLayout />}
      {!authContext && mounted && (
        <main className=" h-screen w-screen flex justify-center items-center">
          <Image
            src="/required.png"
            alt="bb warned you"
            width={500}
            height={500}
          />
        </main>
      )}
    </>
  );
}
