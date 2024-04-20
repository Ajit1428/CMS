"use client";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Legend, Tooltip } from "chart.js";

ChartJS.register(ArcElement, Legend, Tooltip);

export const DashboardPieChart = ({ dataF }: { dataF: number }) => {
  const data = {
    labels: ["Total Branch"],
    datasets: [
      {
        label: "Total",
        data: [dataF],
        backgroundColor: ["#a6e3a1"],
      },
    ],
  };
  const options = {
    responsive: true,
    borderColor: "white",
    borderWidth: 5,
    borderRadius: 14,
    aspectRatio: 2,
  };
  return <Doughnut data={data} options={options} />;
};
