"use client";

import Link from "next/link";
import Image from "next/image";
import localFont from "next/font/local";
import { motion, AnimatePresence, delay } from "framer-motion";

// Font files can be colocated inside of `pages`
const Brandford = localFont({ src: "../../public/font/Brandford.otf" });
const VintageKing = localFont({ src: "../../public/font/VintageKing.ttf" });
export default function Home() {
  return (
    <main className="h-screen w-screen grid homeArea justify-center items-center overflow-hidden">
      <h1 className="flex justify-center items-center">
        <Image src="/logo.png" alt="sign out" width={500} height={500} />
      </h1>
      <section className="flex">
        <h2 className="flex justify-center items-center flex-col">
          <div className={" text-7xl text-green-50 " + Brandford.className}>
            SMART
          </div>
          <div
            className={" text-8xl " + VintageKing.className}
            style={{
              color: "#258450",
            }}
          >
            Greenhouse
          </div>
        </h2>
        <motion.div whileHover={{ x: 50 }}>
          <Link href="/dashboard">
            <Image
              src="/icon/sign-in-svgrepo-com.svg"
              alt="sign out"
              width={200}
              height={200}
            />
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
