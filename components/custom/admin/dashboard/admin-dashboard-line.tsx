"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
);

export const LineChart = ({ dataF }: { dataF: any[] }) => {
  const totalUser = dataF.length.toString();
  const activeUser = dataF.filter((a) => a === "Approved").length.toString();
  const inactiveUser = dataF
    .filter((a) => a === "Unapproved")
    .length.toString();
  const data = {
    labels: ["Total User", "Active User", "Inactive User"],
    datasets: [
      {
        label: "Total",
        data: [totalUser, activeUser, inactiveUser],
        backgroundColor: "#f9e2af",
        borderWidth: 3,
        borderColor: "#89dceb",
      },
    ],
  };
  const options = {
    responsive: true,
    filter: {
      propagate: false,
    },
    interaction: {
      intersect: false,
    },

    aspectRatio: 2,
  };

  return <Line data={data} options={options} />;
};
