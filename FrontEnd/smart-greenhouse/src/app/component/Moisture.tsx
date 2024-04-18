import React from "react";
import Image from "next/image";
export default function Moisture() {
  return (
    <section className=" bg-blue-200 rounded-xl flex justify-center items-center relative">
      <Image
        src="/icon/moisture-svgrepo-com.svg"
        alt="temperature"
        width={50}
        height={50}
        className=" absolute top-0 right-1"
      />
      Moisture
    </section>
  );
}
