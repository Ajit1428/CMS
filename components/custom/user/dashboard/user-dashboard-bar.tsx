"use client";

import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, Legend, Tooltip } from "chart.js";

ChartJS.register(BarElement, Legend, Tooltip);

export const BarChart = ({ dataF }: { dataF: any[] }) => {
  const totalCourier = dataF.length.toString();
  const received = dataF.filter((a) => a === "Received").length.toString();
  const notReceived = dataF
    .filter((a) => a === "Not Received")
    .length.toString();
  const data = {
    labels: ["Total Courier", "Received Courier", "Courier Not Received"],
    datasets: [
      {
        label: "Total",
        data: [totalCourier, received, notReceived],
        backgroundColor: ["#89dceb", "#a6e3a1", "#f1807e"],
        borderColor: "#89dceb",
      },
    ],
  };
  const options = {
    responsive: true,
  };

  return <Bar data={data} options={options} />;
};
