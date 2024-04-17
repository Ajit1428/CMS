"use client";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Legend, Tooltip } from "chart.js";

ChartJS.register(ArcElement, Legend, Tooltip);

type dataProps = {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: string[];
      backgroundColor: string[];
    }[];
  };
};

export const DashboardPieChart: React.FC<dataProps> = ({ data }) => {
  const options = {
    responsive: true,
    borderColor: "white",
    borderWidth: 5,
    borderRadius: 14,
    aspectRatio: 2,
  };
  return <Doughnut data={data} options={options} />;
};
