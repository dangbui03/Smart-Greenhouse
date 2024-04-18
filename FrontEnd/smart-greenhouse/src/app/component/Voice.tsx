import React from "react";
import Image from "next/image";

export default function Voice() {
  return (
    <button className="bg-red-300 rounded-xl flex justify-center items-center">
      <Image
        src="/icon/voice-tools-svgrepo-com.svg"
        alt="fan"
        width={90}
        height={90}
      />
    </button>
  );
}
