"use client";
import GridLayout from "../component/GridLayout";
import useAuth from "@/app/hook/useAuth";
import { AuthContextType } from "@/app/context/authContext";
import Image from "next/image";

export default function Dashboard() {
  const { authContext, setAuthContext } = useAuth() as AuthContextType;

  return (
    <>
      {authContext && <GridLayout />}
      {!authContext && (
        <main className=" h-screen w-screen flex justify-center items-center">
          <Image
            src="/required.png"
            alt="bb warned you"
            width={500}
            height={500}
          />
        </main>
      )}
    </>
  );
}
