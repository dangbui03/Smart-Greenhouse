import React from "react";
import Image from "next/image";
export default function RecordButton() {
  return (
    <button>
      <Image
        src="/icon/document-svgrepo-com.svg"
        alt="record"
        width={45}
        height={45}
      />
    </button>
  );
}
