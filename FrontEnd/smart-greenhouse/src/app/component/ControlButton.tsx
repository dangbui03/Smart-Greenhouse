"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import useControl from "../hook/useControl";
import { ControlContextType } from "../context/controlContext";
import Create from "../../../action/Create";
import GetLast from "../../../action/GetLast";
import toast from "react-hot-toast";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function ControlButton() {
  const { controlContext, setcontrolContext } =
    useControl() as ControlContextType;
  const pathname = usePathname();
  return (
    <>
      {pathname == "/dashboard" && (
        <form
          action={(formData: FormData) => {
            toast(
              <>
                {!controlContext && (
                  <div className="flex flex-col items-center gap-5">
                    <div>
                      The system is on autopilot mode, are you sure want to
                      control it manually?
                    </div>
                    <div className="flex gap-10">
                      <button
                        className=" bg-red-600 rounded-xl p-2"
                        onClick={() => {
                          toast.remove();
                          Create("priority", 1);
                          setcontrolContext(!controlContext);
                        }}
                      >
                        Yes
                      </button>
                      <button
                        className=" bg-green-600 rounded-xl p-2"
                        onClick={() => toast.remove()}
                      >
                        No
                      </button>
                    </div>
                  </div>
                )}
                {controlContext && (
                  <div className="flex flex-col items-center gap-5">
                    <div>Are you sure want to turn on the autopilot mode?</div>
                    <div className="flex gap-10">
                      <button
                        className=" bg-red-600 rounded-xl p-2"
                        onClick={() => {
                          toast.remove();
                          Create("priority", 0);
                          setcontrolContext(!controlContext);
                        }}
                      >
                        Yes
                      </button>
                      <button
                        className=" bg-green-600 rounded-xl p-2"
                        onClick={() => toast.remove()}
                      >
                        No
                      </button>
                    </div>
                  </div>
                )}
              </>,
              { id: "control" }
            );
          }}
        >
          <button>
            <Image
              src="/icon/control-multimedia-player-svgrepo-com.svg"
              alt="control"
              width={35}
              height={35}
            />
          </button>
        </form>
      )}
      {pathname != "/dashboard" && (
        <Link href="/dashboard">
          <Image
            src="/icon/control-multimedia-player-svgrepo-com.svg"
            alt="control"
            width={35}
            height={35}
          />
        </Link>
      )}
    </>
  );
}
