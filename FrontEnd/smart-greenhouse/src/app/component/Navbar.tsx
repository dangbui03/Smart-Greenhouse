import React from "react";
import SignOutButton from "./SignOutButton";
import RecordButton from "./RecordButton";
import ControlButton from "./ControlButton";

export default function Navbar() {
  return (
    <nav className="navArea bg-slate-100 my-10 mx-32 rounded-full flex justify-center items-center gap-80">
      <ControlButton />
      <RecordButton />
      <SignOutButton />
    </nav>
  );
}
