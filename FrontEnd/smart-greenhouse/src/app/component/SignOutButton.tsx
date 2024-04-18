import React from "react";
import Image from "next/image";
export default function SignOutButton() {
  return (
    <button>
      <Image
        src="/icon/sign-in-svgrepo-com.svg"
        alt="sign out"
        width={40}
        height={40}
      />
    </button>
  );
}
