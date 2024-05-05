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
import useNumberState from "../hook/useNumberState";
import { NumberStateContextType } from "../context/numberStateContext";
import { setCookie } from "cookies-next";
import CreateRecord from "../../../action/CreateRecord";
import dynamic from "next/dynamic";

export default function DashBoardMain() {
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
    let c: ControlState = {
      water: "0",
      led: "0",
      fan: {
        state: "0",
        velocity: 0,
      },
    };
    const fanspeed = GetLast("fanspeed").then((result) => {
      cs.fan.velocity = Number(result.value);
      setCookie("cs", JSON.stringify(cs));
      c = JSON.parse(getCookie("cs") as string);
    });
    let ns: NumberState = {
      temperature: 0,
      moisture: 0,
      soilmoisture: 0,
      light: 0,
    };
    const temperature = GetLast("temperature").then((result) => {
      ns.temperature = Number(result.value);
    });
    const moisture = GetLast("moisture").then((result) => {
      ns.moisture = Number(result.value);
    });
    const soilmoisture = GetLast("soilmoisture").then((result) => {
      ns.soilmoisture = Number(result.value);
    });

    let n: NumberState = {
      temperature: 0,
      moisture: 0,
      soilmoisture: 0,
      light: 0,
    };
    const light = GetLast("light").then((result) => {
      ns.light = Number(result.value);
      setCookie("ns", JSON.stringify(ns));
      n = JSON.parse(getCookie("ns") as string);
    });
    let p = false;
    const priority = GetLast("priority").then((result) => {
      setCookie("priority", result.value == "1" ? true : false);
      p = Boolean(getCookie("priority"));
    });
    let u: User = {
      displayName: "",
      email: "",
      photoURL: "",
      uid: "",
    };
    if (getCookie("user")) {
      u = JSON.parse(getCookie("user") as string);
    }
    CreateRecord(c, p, n, u.uid);
  }, []);

  useEffect(() => {
    setInterval(() => {
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
        setCookie("cs", JSON.stringify(cs));
      });
      let ns: NumberState = {
        temperature: 0,
        moisture: 0,
        soilmoisture: 0,
        light: 0,
      };
      const temperature = GetLast("temperature").then((result) => {
        ns.temperature = Number(result.value);
      });
      const moisture = GetLast("moisture").then((result) => {
        ns.moisture = Number(result.value);
      });
      const soilmoisture = GetLast("soilmoisture").then((result) => {
        ns.soilmoisture = Number(result.value);
      });
      const light = GetLast("light").then((result) => {
        ns.light = Number(result.value);
        setCookie("ns", JSON.stringify(ns));
      });
      const priority = GetLast("priority").then((result) => {
        setCookie("priority", result.value == "1" ? true : false);
      });
      const n = JSON.parse(getCookie("ns") as string);
      const c = JSON.parse(getCookie("cs") as string);
      let u: User = {
        displayName: "",
        email: "",
        photoURL: "",
        uid: "",
      };
      if (getCookie("user")) {
        u = JSON.parse(getCookie("user") as string);
      }
      const p = Boolean(getCookie("priority"));
      CreateRecord(c, p, n, u.uid);
    }, Number(process.env.NEXT_PUBLIC_REFRESH_RATE));
  }, []);

  let user;
  if (getCookie("user")) {
    user = JSON.parse(getCookie("user") as string);
  }

  return (
    <>
      {user && <GridLayout />}
      {!user && (
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
