import React from "react";
import Image from "next/image";
export default function SoilMoisture() {
  return (
    <section className=" bg-yellow-800 rounded-xl flex justify-center items-center relative">
      <Image
        src="/icon/soil-moisture-svgrepo-com.svg"
        alt="temperature"
        width={50}
        height={50}
        className=" absolute top-0 right-2"
      />
      SoilMoisture
    </section>
  );
}
