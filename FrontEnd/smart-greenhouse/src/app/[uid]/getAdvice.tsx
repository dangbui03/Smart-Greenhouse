import React from "react";
import { TypeAnimation } from "react-type-animation";

const getTextColor = (bgColor: string) => {
  if (bgColor.includes("blue") && !bgColor.includes("blue-400"))
    return "text-black";
  if (
    bgColor.includes("blue") ||
    bgColor.includes("amber") ||
    bgColor.includes("neutral")
  )
    return "text-white";
  if (bgColor.includes("yellow")) return "text-black";
  return "text-white"; // Default to white for other dark backgrounds
};

// Function to determine the background color based on temperature
const getTemperatureBgColor = (temp: number) => {
  if (temp <= 0) return "bg-blue-300";
  if (temp > 0 && temp <= 15) return "bg-blue-100";
  if (temp > 15 && temp <= 30) return "";
  if (temp > 30 && temp <= 40) return "bg-red-400";
  return "bg-red-600";
};

// Function to determine the background color based on moisture
const getMoistureBgColor = (moisture: number) => {
  if (moisture <= 20) return "bg-blue-50";
  if (moisture > 20 && moisture <= 40) return "bg-blue-100";
  if (moisture > 40 && moisture <= 60) return "";
  if (moisture > 60 && moisture <= 80) return "bg-blue-300";
  return "bg-blue-400";
};

// Function to determine the background color based on soil moisture
const getSoilMoistureBgColor = (soilMoisture: number) => {
  if (soilMoisture <= 20) return "bg-amber-600";
  if (soilMoisture > 20 && soilMoisture <= 40) return "bg-amber-700";
  if (soilMoisture > 40 && soilMoisture <= 60) return "";
  if (soilMoisture > 60 && soilMoisture <= 80) return "bg-amber-900";
  return "bg-amber-950";
};

// Function to determine the background color based on light
const getLightBgColor = (light: number) => {
  if (light <= 100) return "bg-neutral-900";
  if (light > 100 && light <= 1000) return "bg-neutral-400";
  if (light > 1000 && light <= 2500) return "";
  if (light > 2500 && light <= 4000) return "bg-yellow-200";
  return "bg-yellow-500";
};

const getTemperatureAdvice = (temp: number) => {
  if (temp <= 0)
    return "Temperature is too low! Consider heating your greenhouse.";
  if (temp > 0 && temp <= 15)
    return "Temperature is low! Monitor your plants for cold stress.";
  if (temp > 15 && temp <= 30)
    return "Temperature is within the optimal range.";
  if (temp > 30 && temp <= 40)
    return "Temperature is high! Ensure proper ventilation.";
  return "Temperature is too high! Consider cooling down your greenhouse.";
};

const getMoistureAdvice = (moisture: number) => {
  if (moisture <= 20)
    return "Moisture level is too low! Consider watering your plants.";
  if (moisture > 20 && moisture <= 40)
    return "Moisture level is low! Monitor your plants for dryness.";
  if (moisture > 40 && moisture <= 60)
    return "Moisture level is within the optimal range.";
  if (moisture > 60 && moisture <= 80)
    return "Moisture level is high! Avoid overwatering.";
  return "Moisture levels are too high! Ensure proper drainage.";
};

const getSoilMoistureAdvice = (soilMoisture: number) => {
  if (soilMoisture <= 20)
    return "Soil moisture is too low! Consider watering your plants.";
  if (soilMoisture > 20 && soilMoisture <= 40)
    return "Soil moisture is low! Monitor your plants for dryness.";
  if (soilMoisture > 40 && soilMoisture <= 60)
    return "Soil moisture is within the optimal range.";
  if (soilMoisture > 60 && soilMoisture <= 80)
    return "Soil moisture is high! Avoid overwatering.";
  return "Soil moisture is too high! Ensure proper drainage.";
};

const getLightAdvice = (light: number) => {
  if (light <= 100)
    return "Light intensity is too low! Consider increasing light exposure.";
  if (light > 100 && light <= 1000)
    return "Light intensity is low! Monitor your plants for light deficiency.";
  if (light > 1000 && light <= 2500)
    return "Light intensity is within the optimal range.";
  if (light > 2500 && light <= 4000)
    return "Light intensity is high! Ensure proper shading.";
  return "Light intensity is too high! Consider reducing light exposure.";
};

const getAdvice = (record: StateRecord) => {
  const temperatureAdvice = getTemperatureAdvice(record.data.temperature);
  const moistureAdvice = getMoistureAdvice(record.data.moisture);
  const soilMoistureAdvice = getSoilMoistureAdvice(record.data.soilmoisture);
  const lightAdvice = getLightAdvice(record.data.light);

  return (
    <div className="p-4">
      <div
        className={`p-2 mb-2 ${getTemperatureBgColor(
          record.data.temperature
        )} ${
          getTemperatureBgColor(record.data.temperature)
            ? getTextColor(getTemperatureBgColor(record.data.temperature))
            : ""
        }`}
      >
        <TypeAnimation
          sequence={[temperatureAdvice]}
          speed={75}
          wrapper="div"
          cursor={false}
          repeat={0}
        />
      </div>
      <div
        className={`p-2 mb-2 ${getMoistureBgColor(record.data.moisture)} ${
          getMoistureBgColor(record.data.moisture)
            ? getTextColor(getMoistureBgColor(record.data.moisture))
            : ""
        }`}
      >
        <TypeAnimation
          sequence={[moistureAdvice]}
          speed={75}
          wrapper="div"
          cursor={false}
          repeat={0}
        />
      </div>
      <div
        className={`p-2 mb-2 ${getSoilMoistureBgColor(
          record.data.soilmoisture
        )} ${
          getSoilMoistureBgColor(record.data.soilmoisture)
            ? getTextColor(getSoilMoistureBgColor(record.data.soilmoisture))
            : ""
        }`}
      >
        <TypeAnimation
          sequence={[soilMoistureAdvice]}
          speed={75}
          wrapper="div"
          cursor={false}
          repeat={0}
        />
      </div>
      <div
        className={`p-2 mb-2 ${getLightBgColor(record.data.light)} ${
          getLightBgColor(record.data.light)
            ? getTextColor(getLightBgColor(record.data.light))
            : ""
        }`}
      >
        <TypeAnimation
          sequence={[lightAdvice]}
          speed={75}
          wrapper="div"
          cursor={false}
          repeat={0}
        />
      </div>
    </div>
  );
};

export default getAdvice;
