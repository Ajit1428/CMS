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
  const totalKYC = dataF.length.toString();
  const approved = dataF
    .filter((a) => a?.status === "Approved")
    .length.toString();
  const unapproved = dataF
    .filter((a) => a?.status === "Approved")
    .length.toString();
  const data = {
    labels: ["Received KYC", "Approved KYC", "Uapproved KYC"],
    datasets: [
      {
        label: "Total",
        data: [totalKYC, approved, unapproved],
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
    aspectRatio: 4.6,
  };

  return <Line data={data} options={options} />;
};
