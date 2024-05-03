import { useEffect, useState, useRef } from "react";
import { Data } from "./TemperatureData";
import React from "react";
import {Line} from "react-chartjs-2"
import { Chart } from "chart.js/auto";
import { setTimeout } from "timers";

function addData(chart, label, newData) {
  chart.data.labels.push(label);
  chart.data.datasets.forEach((dataset) => {
      dataset.data.push(newData);
  });
  chart.update();
}

function removeData(chart) {
  chart.data.labels.pop();
  chart.data.datasets.forEach((dataset) => {
      dataset.data.pop();
  });
  chart.update();
}

function TemperatureChart() {
  const chartRef = useRef();
  

  const [temperatureData, setTemperatureData] = useState({
    labels: Data.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained",
        data: Data.map((data) => data.userGain),
        backgroundColor: [
          "rgb(252,165,165,1)",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });
    useEffect(() => {
      setInterval(() => {
        addData(chartRef.current,"2021", "10000")
      },1000)
    }, [])

  return (
    <div style={{
        width: "40rem"
    }}>
      <Line data={temperatureData} ref={chartRef}/>
    </div>
  );
}

export default TemperatureChart;