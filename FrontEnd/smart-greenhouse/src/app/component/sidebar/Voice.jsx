"use client"
import "regenerator-runtime/runtime";
import React, { useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import Image from "next/image";
import { motion } from "framer-motion";
import Create from "../../../../action/Create";
import toast from "react-hot-toast";


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



const Dictaphone = ({led, setLed, water, setWater, fan, setFan}) => {

  const processTranscript = (transcript) => {
    transcript = transcript.toLowerCase()

    // Fan control
    if (transcript.includes('mở quạt') || 
        transcript.includes('bật quạt') || 
        transcript.includes('khởi động quạt') || 
        transcript.includes('turn on fan') || 
        transcript.includes('start fan') || 
        transcript.includes('activate fan') || 
        transcript.includes('fan on') || 
        transcript.includes('enable fan')) {

        toast("🍃 Fan on",{id:"fanon"})
        Create("fan", "2");
        Create("fanspeed", 50);
        setFan({
          state: true,
          velocity: 50,
        })
    } else if (transcript.includes('tắt quạt') || 
               transcript.includes('dừng quạt') || 
               transcript.includes('ngừng quạt') || 
               transcript.includes('turn off fan') || 
               transcript.includes('stop fan') || 
               transcript.includes('disable fan') || 
               transcript.includes('fan off')) {

        toast("Fan off",{id:"fanoff"})
        Create("fan", "3");
        Create("fanspeed", 0);
        setFan({
          state: false,
          velocity: 0,
        })
    }

    if (transcript.includes('tăng tốc độ quạt') || 
        transcript.includes('tăng quạt') || 
        transcript.includes('tăng tốc quạt') || 
        transcript.includes('increase fan speed') || 
        transcript.includes('fan faster') || 
        transcript.includes('speed up fan') || 
        transcript.includes('boost fan speed')) {
          if (!fan.state) {
            toast.error("Please turn on the fan first", {
              style: {
                backgroundColor: "white",
                color: "black",
              },
            });
          } else {
        const velocity = fan.velocity + 10 >= 100 ? 100 : fan.velocity + 10
        toast("⏫ Fan speed increased",{id:"speed"})
        setFan({...fan, velocity: velocity})
        Create("fanspeed", velocity)
        }
    } else if (transcript.includes('giảm tốc độ quạt') || 
               transcript.includes('giảm quạt') || 
               transcript.includes('giảm tốc quạt') || 
               transcript.includes('decrease fan speed') || 
               transcript.includes('fan slower') || 
               transcript.includes('slow down fan') || 
               transcript.includes('reduce fan speed')) {
                if (!fan.state) {
                  toast.error("Please turn on the fan first", {
                    style: {
                      backgroundColor: "white",
                      color: "black",
                    },
                  });
                } else {
              const velocity =  fan.velocity - 10 <= 10 ? 10 : fan.velocity - 10
              toast("⏫ Fan speed decreased",{id:"speed"})
              setFan({...fan, velocity: velocity})
              Create("fanspeed", velocity)
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
        toast("💧Watering", {style:{
          backgroundColor: "rgb(191,219,254)"
        },id:"wateron"})
        setWater(true)
        Create("water", "2");
    } else if (transcript.includes('tắt nước') || 
               transcript.includes('ngừng nước') || 
               transcript.includes('dừng nước') || 
               transcript.includes('turn off water') || 
               transcript.includes('stop watering') || 
               transcript.includes('disable watering') || 
               transcript.includes('water off')) {
        toast("Stop watering", {style:{
          backgroundColor: "rgb(191,219,254)"
        },id:"wateroff"})
        setWater(false)
        Create("water", "3");
    }

    // LED lighting system control
    if (transcript.includes('mở đèn') || 
        transcript.includes('bật đèn') || 
        transcript.includes('khởi động đèn') || 
        transcript.includes('turn on lights') || 
        transcript.includes('start lights') || 
        transcript.includes('activate lights') || 
        transcript.includes('lights on')) {
        toast("🔦Light on", {style:{
          backgroundColor: "rgb(250,204,21)"
        },id:"lighton"})
        setLed(true)
        Create("led", "2");
    } else if (transcript.includes('tắt đèn') || 
               transcript.includes('dừng đèn') || 
               transcript.includes('ngừng đèn') || 
               transcript.includes('turn off lights') || 
               transcript.includes('stop lights') || 
               transcript.includes('disable lights') || 
               transcript.includes('lights off')) {
        toast("Light off", {style:{
          backgroundColor: "rgb(250,204,21)"
        },
      id:"lightoff"})
        setLed(false)
        Create("led", "3");
    }
};

  const {
    transcript,
    listening,
  } = useSpeechRecognition();

  useEffect(() => {
    processTranscript(transcript)
  },[transcript])

  const startListen = () => {
    SpeechRecognition.startListening({continuous: true})
  }

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
      <button onClick={ listening ? SpeechRecognition.stopListening : startListen} className=" absolute md:bottom-2 bottom-0 w-full h-full md:w-fit md:h-fit">
      <Image
      className=" hidden md:block"
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