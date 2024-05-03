"use client";

import { createContext, useState, Dispatch, SetStateAction } from "react";

type Props = {
  children: React.ReactNode;
};

export type ControlStateContextType = {
  controlStateContext: ControlState | undefined;
  setcontrolStateContext: Dispatch<SetStateAction<ControlState | undefined>>;
};

export const ControlStateContext =
  createContext<ControlStateContextType | null>(null);

export default function ControlStateContextProvider({ children }: Props) {
  const [controlStateContext, setcontrolStateContext] =
    useState<ControlState>();

  return (
    <ControlStateContext.Provider
      value={{ controlStateContext, setcontrolStateContext }}
    >
      {children}
    </ControlStateContext.Provider>
  );
}
