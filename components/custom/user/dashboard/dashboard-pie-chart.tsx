"use client";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Legend, Tooltip } from "chart.js";

ChartJS.register(ArcElement, Legend, Tooltip);

export const DashboardPieChart = ({ dataF }: { dataF: any[] }) => {
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
        backgroundColor: ["#89dceb", "#a6e3a1", "#f1807e"],
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
