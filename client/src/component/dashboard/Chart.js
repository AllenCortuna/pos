import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  LinearScale,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { totalStore } from "../../zustand/total";

ChartJS.register(ArcElement, Tooltip, Legend, LinearScale);

const Chart = () => {
  const total = totalStore((state) => state.total);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };
  const data = {
    labels: ["Incoming Goods", "Outgoing Goods"],
    datasets: [
      {
        label: "",
        data: [total.incoming, total.outgoing],
        // backgroundColor: ["#FDC639", "#A5DB73"],
        backgroundColor: ["#f79256", "#1d4e89"],
        // borderColor: ["#FDC639", "#A5DB73"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <span className="p-5 rounded-3xl bg-white h-80 w-80 shadow-md grid border">
      <Doughnut data={data} options={options} />
    </span>
  );
};

export default Chart;
