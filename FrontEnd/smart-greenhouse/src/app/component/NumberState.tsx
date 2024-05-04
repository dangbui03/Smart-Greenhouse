import React, { useState, useEffect } from "react";
import GetLast from "../../../action/GetLast";
import { getCookie, setCookie } from "cookies-next";
import CreateRecord from "../../../action/CreateRecord";
interface Props {
  feed: string;
}

export default function NumberState(props: Props) {
  let ns = JSON.parse(getCookie("ns") as string);

  useEffect(() => {
    const interval = setInterval(() => {
      const n = GetLast(props.feed).then((result) => {
        if (props.feed == "temperature") {
          ns.temperature = result.value;
        } else if (props.feed == "moisture") {
          ns.moisture = result.value;
        } else if (props.feed == "soilmoisture") {
          ns.soilmoisture = result.value;
        } else if (props.feed == "light") {
          ns.light = result.value;
        }
        setCookie("ns", JSON.stringify(ns));
      });
    }, Number(process.env.NEXT_PUBLIC_REFRESH_RATE));

    return () => clearInterval(interval);
  }, []);

  return (
    <p className=" w-32 h-32 flex justify-center items-center text-4xl">
      {props.feed == "temperature"
        ? `${ns.temperature}°C`
        : props.feed == "moisture"
        ? `${ns.moisture}%`
        : props.feed == "light"
        ? `${ns.light}lx`
        : `${ns.soilmoisture}%`}
    </p>
  );
}
