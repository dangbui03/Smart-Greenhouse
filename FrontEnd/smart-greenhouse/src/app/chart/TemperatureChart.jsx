import { useEffect, useState, useRef } from "react";
import React from "react";
import { Line } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
import addData from "./addData";
import removeData from "./removeData";
import GetLast from "../../../action/GetLast";
import GetFeed from "../../../action/GetFeed";

function TemperatureChart() {
  const chartRef = useRef();

  const [temperatureData, setTemperatureData] = useState({
    labels: [],
    datasets: [
      {
        label: "Temperature",
        data: [],
        backgroundColor: ["rgb(252,165,165,1)"],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  useEffect(() => {
    const n = GetFeed("temperature").then((result) => {
      setTemperatureData({
        labels: (result.map((data) =>
          new Date(data.created_at).toLocaleTimeString()
        )).reverse(),
        datasets: [
          {
            label: "Temperature",
            data: (result.map((data) => data.value)).reverse(),
            backgroundColor: ["rgb(252,165,165,1)"],
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      });
    });

    const interval = setInterval(() => {
      const n = GetLast("temperature").then((result) => {
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
    <div
      style={{
        width: "40rem",
      }}
    >
      <Line data={temperatureData} ref={chartRef} options={{
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
  );
}

export default TemperatureChart;
