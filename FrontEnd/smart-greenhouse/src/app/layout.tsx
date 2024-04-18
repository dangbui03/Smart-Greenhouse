import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ControlContextProvider from "./context/controlContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Smart Greenhouse",
  description: "provide by Sỹ Lâm",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ControlContextProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ControlContextProvider>
  );
}
