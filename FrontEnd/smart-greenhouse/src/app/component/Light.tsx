import React from "react";
import Image from "next/image";
export default function Light() {
  return (
    <section className=" bg-yellow-400 rounded-xl flex justify-center items-center relative">
      <Image
        src="/icon/light-svgrepo-com.svg"
        alt="temperature"
        width={50}
        height={50}
        className=" absolute top-0 right-1"
      />
      Light
    </section>
  );
}
