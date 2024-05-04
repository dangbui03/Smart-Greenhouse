"use client"
import "regenerator-runtime/runtime";
import React, { useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Image from "next/image";
import { motion, AnimatePresence, delay } from "framer-motion";
import useControlState from "../hook/useControlState";
import { ControlStateContextType } from "../context/controlStateContext";
import Create from "../../../action/Create";
import toast from "react-hot-toast";
import { setCookie } from "cookies-next";


const SectionVars = {
  initial: {
    x: 10,
    y: 10,
    opacity: 0,
  },
  animate: {
    x: 0,
    y: 0,
    opacity: 1,
  },
  exit: {
    x: 10,
    y: 10,
    opacity: 0,
  },
};


const Dictaphone = () => {
  const { controlStateContext, setcontrolStateContext } =
  useControlState();
  const processTranscript = (transcript) => {
    transcript = transcript.toLowerCase()
    const newControlState = { ...controlStateContext };

    // Fan control
    if (transcript.includes('mở quạt') || 
        transcript.includes('bật quạt') || 
        transcript.includes('khởi động quạt') || 
        transcript.includes('turn on fan') || 
        transcript.includes('start fan') || 
        transcript.includes('activate fan') || 
        transcript.includes('fan on') || 
        transcript.includes('enable fan')) {
        newControlState.fan = {
          state: "2",
          velocity: 50,
        };
        toast("🍃 Fan on")
        Create("fan", newControlState.fan.state);
        Create("fanspeed", newControlState.fan.velocity);
    } else if (transcript.includes('tắt quạt') || 
               transcript.includes('dừng quạt') || 
               transcript.includes('ngừng quạt') || 
               transcript.includes('turn off fan') || 
               transcript.includes('stop fan') || 
               transcript.includes('disable fan') || 
               transcript.includes('fan off')) {
        newControlState.fan = {
          state: "3",
          velocity: 0,
        };
        toast("Fan off")
        Create("fan", newControlState.fan.state);
        Create("fanspeed", newControlState.fan.velocity);
    }

    if (transcript.includes('tăng tốc độ quạt') || 
        transcript.includes('tăng quạt') || 
        transcript.includes('tăng tốc quạt') || 
        transcript.includes('increase fan speed') || 
        transcript.includes('fan faster') || 
        transcript.includes('speed up fan') || 
        transcript.includes('boost fan speed')) {
          if (
            controlStateContext?.fan.state == "0" ||
            controlStateContext?.fan.state == "3"
          ) {
            toast.error("Please turn on the fan first", {
              style: {
                backgroundColor: "white",
                color: "black",
              },
            });
          } else {
        newControlState.fan.velocity = controlStateContext?.fan.velocity + 10 >= 100 ? 100 : controlStateContext?.fan.velocity + 10;
        toast("⏫ Fan speed increased")
        Create("fanspeed", newControlState.fan.velocity);
        }
    } else if (transcript.includes('giảm tốc độ quạt') || 
               transcript.includes('giảm quạt') || 
               transcript.includes('giảm tốc quạt') || 
               transcript.includes('decrease fan speed') || 
               transcript.includes('fan slower') || 
               transcript.includes('slow down fan') || 
               transcript.includes('reduce fan speed')) {
                if (
                  controlStateContext?.fan.state == "0" ||
                  controlStateContext?.fan.state == "3"
                ) {
                  toast.error("Please turn on the fan first", {
                    style: {
                      backgroundColor: "white",
                      color: "black",
                    },
                  });
                } else {
        newControlState.fan.velocity = controlStateContext?.fan.velocity - 10 <= 10 ? 10 : controlStateContext?.fan.velocity - 10;
        toast("⏬ Fan speed decreased")
        Create("fanspeed", newControlState.fan.velocity);
                }
    }

    // Watering system control
    if (transcript.includes('mở nước') || 
        transcript.includes('bật nước') || 
        transcript.includes('tưới nước') || 
        transcript.includes('khởi động nước') || 
        transcript.includes('turn on water') || 
        transcript.includes('start watering') || 
        transcript.includes('activate watering') || 
        transcript.includes('water on')) {
        newControlState.water = '2';
        toast("💧Watering", {style:{
          backgroundColor: "rgb(191,219,254)"
        }})
        Create("water", newControlState.water);
    } else if (transcript.includes('tắt nước') || 
               transcript.includes('ngừng nước') || 
               transcript.includes('dừng nước') || 
               transcript.includes('turn off water') || 
               transcript.includes('stop watering') || 
               transcript.includes('disable watering') || 
               transcript.includes('water off')) {
        newControlState.water = '3';
        toast("Stop watering", {style:{
          backgroundColor: "rgb(191,219,254)"
        }})
        Create("water", newControlState.water);
    }

    // LED lighting system control
    if (transcript.includes('mở đèn') || 
        transcript.includes('bật đèn') || 
        transcript.includes('khởi động đèn') || 
        transcript.includes('turn on lights') || 
        transcript.includes('start lights') || 
        transcript.includes('activate lights') || 
        transcript.includes('lights on')) {
        newControlState.led = '2';
        toast("🔦Light on", {style:{
          backgroundColor: "rgb(250,204,21)"
        }})
        Create("led", newControlState.led);
    } else if (transcript.includes('tắt đèn') || 
               transcript.includes('dừng đèn') || 
               transcript.includes('ngừng đèn') || 
               transcript.includes('turn off lights') || 
               transcript.includes('stop lights') || 
               transcript.includes('disable lights') || 
               transcript.includes('lights off')) {
        newControlState.led = '3';
        toast("Light off", {style:{
          backgroundColor: "rgb(250,204,21)"
        }})
        Create("led", newControlState.led);
    }

    // Update the context with the new state
    setCookie("cs", JSON.stringify(newControlState))
    setcontrolStateContext(newControlState);
};

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  useEffect(() => {
    processTranscript(transcript)
  },[transcript])
  return (
    <motion.section
    className={
      (listening
        ? "bg-green-500"
        : "bg-white") +
      " rounded-xl flex flex-col gap-10 justify-center items-center relative"
    }
    variants={SectionVars}
  >
    <Image
      src="/icon/voice-tools-svgrepo-com.svg"
      alt="fan"
      width={90}
      height={90}
    />
      <button onClick={ listening ? SpeechRecognition.stopListening : SpeechRecognition.startListening} className="absolute bottom-2">
      <Image
                  src={
                    listening
                      ? "/icon/on-rounded-svgrepo-com.svg"
                      : "/icon/off-rounded-svgrepo-com.svg"
                  }
                  alt="on - off"
                  width={50}
                  height={90}
                />
      </button>
  </motion.section>

  );
};
export default Dictaphone;