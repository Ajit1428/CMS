"use client";

import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, Legend, Tooltip } from "chart.js";

ChartJS.register(BarElement, Legend, Tooltip);

export const BarChart = ({ dataF }: { dataF: any[] }) => {
  const totalUser = dataF.length.toString();
  const kbslUser = dataF.filter((a) => a === "kbsl").length.toString();
  const kblUser = dataF.filter((a) => a === "kbl").length.toString();
  const data = {
    labels: [
      "Total User",
      "K.B.L. Securities Limited User's",
      "Kumari Bank Limited User",
    ],
    datasets: [
      {
        label: "Total",
        data: [totalUser, kbslUser, kblUser],
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
