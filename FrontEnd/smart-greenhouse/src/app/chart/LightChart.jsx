import React, { useEffect, useState, useRef } from "react";
import { Line } from "react-chartjs-2";
import Chart from 'chart.js/auto';
import addData from "./addData";
import removeData from "./removeData";
import GetLast from "../../../action/GetLast";
import GetFeed from "../../../action/GetFeed";

function LightChart() {
  const chartRef = useRef();
  const [lightData, setLightData] = useState({
    labels: [],
    datasets: [
      {
        label: "Light",
        data: [],
        borderWidth: 2,
        tension: 0.3,
        fill: 'start',
        backgroundColor: ["rgb(250,204,21,1)"],
        borderColor: "yellow",
        segment: {
          backgroundColor: ctx => getSegmentBackgroundColor(ctx.p0.parsed.y),
          borderColor: ctx => getSegmentBorderColor(ctx.p0.parsed.y),
        },
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await GetFeed("light");
      setLightData({
        labels: result.map((data) => new Date(data.created_at).toLocaleTimeString()).reverse(),
        datasets: [
          {
            label: "Light",
            data: result.map((data) => data.value).reverse(),
            borderWidth: 2,
            tension: 0.3,
            fill: 'start',
            segment: {
              backgroundColor: ctx => getSegmentBackgroundColor(ctx.p0.parsed.y),
              borderColor: ctx => getSegmentBorderColor(ctx.p0.parsed.y),
            },
          },
        ],
      });
    };

    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      GetLast("light").then((result) => {
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

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 0,
        max: 6000,
      },
    },
    plugins: {
      legend: {
        labels: {
          font: {
            size: 25
          }
        }
      }
    }
  };

  const getSegmentBackgroundColor = (value) => {
    if (value <= 100) return "rgba(23,23,23,0.8)"; // very low
    if (value > 100 && value <= 500) return "rgba(163,163,163,0.8)"; // low
    if (value > 500 && value <= 1500) return "rgba(248,250,252,0.8)"; // normal
    if (value > 1500 && value <= 3000) return "rgba(254,240,138,0.8)"; // bright
    return "rgba(234,179,8,0.8)"; // very bright
  };

  const getSegmentBorderColor = (value) => {
    if (value <= 100) return "rgb(23,23,23)"; // very low
    if (value > 100 && value <= 500) return "rgb(163,163,163)"; // low
    if (value > 500 && value <= 1500) return "rgb(248,250,252)"; // normal
    if (value > 1500 && value <= 3000) return "rgb(254,240,138)"; // bright
    return "rgb(234,179,8)"; // very bright
  };

  return (
    <>
      <div className="flex md:hidden mt-5 m-2" style={{ width: "18rem", height: "20rem" }}>
        <Line data={lightData} ref={chartRef} options={chartOptions} />
      </div>
      <div className="hidden md:flex" style={{ width: "40rem", height: "30rem" }}>
        <Line data={lightData} ref={chartRef} options={chartOptions} />
      </div>
    </>
  );
}

export default LightChart;
