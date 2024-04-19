import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ControlContextProvider from "./context/controlContext";
import AuthContextProvider from "./context/authContext";

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
    <AuthContextProvider>
      <ControlContextProvider>
        <html lang="en">
          <body className={inter.className + " overflow-hidden"}>
            {children}
          </body>
        </html>
      </ControlContextProvider>
    </AuthContextProvider>
  );
}
