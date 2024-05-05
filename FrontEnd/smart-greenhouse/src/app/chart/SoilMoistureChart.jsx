import { useEffect, useState, useRef } from "react";
import React from "react";
import { Line } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
import addData from "./addData";
import removeData from "./removeData";
import GetLast from "../../../action/GetLast";
import GetFeed from "../../../action/GetFeed";

function SoilMoistureChart() {
  const chartRef = useRef();

  const [soilMoistureData, setSoilMoistureData] = useState({
    labels: [],
    datasets: [
      {
        label: "Soil moisture",
        data: [],
        backgroundColor: ["rgb(133,77,14,1)"],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  useEffect(() => {
    const n = GetFeed("soilmoisture").then((result) => {
      setSoilMoistureData({
        labels: (result.map((data) =>
          new Date(data.created_at).toLocaleTimeString()
        )).reverse(),
        datasets: [
          {
            label: "Soil moisture",
            data: (result.map((data) => data.value)).reverse(),
            backgroundColor: ["rgb(133,77,14,1)"],
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      });
    });

    const interval = setInterval(() => {
      const n = GetLast("soilmoisture").then((result) => {
        addData(
          chartRef.current,
          new Date(result.created_at).toLocaleTimeString(),
          result.value
        );
        removeData(chartRef.current);
      });
    }, Number(process.env.NEXT_PUBLIC_REFRESH_RATE));

    return () => clearInterval(interval);
  }, []);

  return (
    <>
    <div
    className="flex md:hidden mt-5 m-2"
      style={{
        width: "18rem",
        height: "20rem",
      }}
    >
      <Line data={soilMoistureData} ref={chartRef} 

      options={{
        responsive: true,
    maintainAspectRatio: false,
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero:true
            }
        }]
    },
                plugins: {
                  legend: {
                      labels: {
                          font: {
                              size: 10
                          }
                      }
                  }
              }
      }}/>
    </div>
    <div
    className="hidden md:flex"
      style={{
        width: "40rem",
        height: "30rem",
      }}
    >
      <Line data={soilMoistureData} ref={chartRef} 

      options={{
        responsive: true,
    maintainAspectRatio: false,
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero:true
            }
        }]
    },
                plugins: {
                  legend: {
                      labels: {
                          font: {
                              size: 30
                          }
                      }
                  }
              }
      }}/>
    </div>
    </>
  );
}

export default SoilMoistureChart;