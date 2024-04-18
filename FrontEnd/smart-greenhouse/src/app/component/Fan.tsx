import React from "react";
import Image from "next/image";

export default function Fan() {
  return (
    <button className="bg-red-300 rounded-xl flex justify-center items-center">
      <Image
        src="/icon/fan-svgrepo-com.svg"
        alt="fan"
        width={112}
        height={90}
      />
    </button>
  );
}
