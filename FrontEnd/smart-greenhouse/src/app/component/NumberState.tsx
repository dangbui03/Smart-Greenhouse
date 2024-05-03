import React, { useState, useEffect } from "react";
import GetLast from "../../../action/GetLast";
interface Props {
  feed: string;
}

export default function NumberState(props: Props) {
  const [number, setNumber] = useState(0);
  const n = GetLast(props.feed).then((result) => {
    setNumber(Number(result.value));
  });
  useEffect(() => {
    const interval = setInterval(() => {
      const n = GetLast(props.feed).then((result) => {
        setNumber(Number(result.value));
      });
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <p className=" w-32 h-32 flex justify-center items-center text-6xl">
      {number}
      {props.feed == "temperature"
        ? "°C"
        : props.feed == "moisture"
        ? "%"
        : props.feed == "light"
        ? "lx"
        : "%"}
    </p>
  );
}
