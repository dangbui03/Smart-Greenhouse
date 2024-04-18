import React from "react";
import Image from "next/image";

export default function Temperature() {
  return (
    <section className=" bg-red-300 rounded-xl flex justify-center items-center relative">
      <Image
        src="/icon/temperature-half-svgrepo-com.svg"
        alt="temperature"
        width={50}
        height={50}
        className=" absolute top-0 right-0"
      />
      <p className="w-28 h-28 flex justify-center items-center">Temperature</p>
    </section>
  );
}
