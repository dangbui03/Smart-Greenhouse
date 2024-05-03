"use client";

import Link from "next/link";
import Image from "next/image";
import localFont from "next/font/local";
import { motion, AnimatePresence, delay } from "framer-motion";
import SignAction from "../../firebase/SignAction";
import useAuth from "@/app/hook/useAuth";
import { AuthContextType } from "@/app/context/authContext";
import { useRouter, redirect } from "next/navigation";
import { useState, useEffect } from "react";
import { setCookie, getCookie } from "cookies-next";

const Brandford = localFont({ src: "../../public/font/Brandford.otf" });
const VintageKing = localFont({ src: "../../public/font/VintageKing.ttf" });

const H1Vars = {
  initial: {
    x: 0,
    y: -1000,
    opacity: 1,
  },
  animate: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, type: "linear" },
  },
  exit: {
    x: 0,
    y: -1000,
    opacity: 1,
  },
};

export default function Home() {
  const { authContext, setAuthContext } = useAuth() as AuthContextType;
  const [clicked, setClicked] = useState(false);
  const router = useRouter();
  const u = getCookie("user") ? JSON.parse(getCookie("user") as string) : "";

  useEffect(() => {
    if (u) {
      setAuthContext(u);
      redirect("/dashboard");
    }
  }, [clicked]);

  return (
    <main className="h-screen w-screen grid homeArea justify-center items-center">
      <AnimatePresence>
        {!authContext && (
          <motion.h1
            variants={H1Vars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex items-center flex-col absolute left-0 h-screen w-96"
            style={{ backgroundColor: "#398254" }}
          >
            <Image src="/logo.png" alt="sign out" width={500} height={500} />
            <section className="flex justify-center items-center flex-col">
              <div className={" text-7xl text-green-50 " + Brandford.className}>
                SMART
              </div>
              <div
                className={" text-8xl " + VintageKing.className}
                style={{
                  color: "#A8E065",
                }}
              >
                Greenhouse
              </div>
            </section>
            <section className="flex w-full justify-center">
              <motion.form
                className={"w-full flex justify-center "}
                action={async (formData) => {
                  const result = await SignAction(formData);
                  const u: User = {
                    displayName: result.user.displayName,
                    email: result.user.email,
                    photoURL: result.user.photoURL,
                    uid: result.user.uid,
                  };
                  setAuthContext(u);
                  setCookie("user", JSON.stringify(u));
                  router.push("/dashboard", { scroll: false });
                }}
              >
                <motion.button
                  onClick={() => {
                    setClicked(true);
                  }}
                  whileHover={{ rotate: -90 }}
                >
                  <Image
                    src="/icon/sign-in-svgrepo-com-green.svg"
                    alt="sign out"
                    width={100}
                    height={100}
                  />
                </motion.button>
              </motion.form>
            </section>
          </motion.h1>
        )}
      </AnimatePresence>
    </main>
  );
}
