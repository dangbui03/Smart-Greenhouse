import React, { useState, useEffect } from "react";
import GetLast from "../../../action/GetLast";
import { getCookie, setCookie } from "cookies-next";
import CreateRecord from "../../../action/CreateRecord";

interface Props {
  feed: string;
}

interface NumberState {
  temperature: number;
  moisture: number;
  soilmoisture: number;
  light: number;
}

export default function NumberState(props: Props) {
  const [number, setNumber] = useState<NumberState>({
    temperature: 0,
    moisture: 0,
    soilmoisture: 0,
    light: 0,
  });
  const fetchData = async () => {
    const result = await GetLast(props.feed);
    const updatedNumberState = { ...number };
    switch (props.feed) {
      case "temperature":
        updatedNumberState.temperature = result.value;
        break;
      case "moisture":
        updatedNumberState.moisture = result.value;
        break;
      case "soilmoisture":
        updatedNumberState.soilmoisture = result.value;
        break;
      case "light":
        updatedNumberState.light = result.value;
        break;
      default:
        break;
    }
    setNumber(updatedNumberState);
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, Number(process.env.NEXT_PUBLIC_REFRESH_RATE));

    return () => clearInterval(interval);
  }, []);

  const renderValue = () => {
    const { temperature, moisture, soilmoisture, light } = number;
    switch (props.feed) {
      case "temperature":
        return `${temperature}°C`;
      case "moisture":
        return `${moisture}%`;
      case "light":
        return `${light}lx`;
      default:
        return `${soilmoisture}%`;
    }
  };

  return (
    <p className="w-32 h-32 flex justify-center items-center text-4xl">
      {renderValue()}
    </p>
  );
}
