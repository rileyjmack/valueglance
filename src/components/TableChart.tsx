"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Scale,
  CoreScaleOptions,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Scatter } from "react-chartjs-2";
import type { Context } from "chartjs-plugin-datalabels";

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, ChartDataLabels);

interface TableData {
  headers: string[];
  rows: string[][];
}

const TableChart = ({ data }: { data: TableData }) => {
  const chartData = {
    datasets: data.rows.map((row, rowIndex) => ({
      data: row.map((cell, colIndex) => ({
        x: colIndex,
        y: -rowIndex,
      })),
      pointRadius: 0,
      showLine: false,
      datalabels: {
        labels: {
          value: {
            formatter: (_value: unknown, context: Context) =>
              row[context.dataIndex],
          },
        },
      },
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "linear" as const,
        position: "top" as const,
        min: -0.3,
        max: data.headers.length - 0.3,
        ticks: {
          callback: function (
            this: Scale<CoreScaleOptions>,
            tickValue: string | number
          ) {
            const idx =
              typeof tickValue === "number"
                ? Math.floor(tickValue)
                : parseInt(tickValue);
            return data.headers[idx] || "";
          },
          stepSize: 1,
        },
        grid: {
          display: true,
          drawBorder: true,
          drawOnChartArea: true,
        },
      },
      y: {
        type: "linear" as const,
        min: -(data.rows.length - 0.3),
        max: 0.3,
        ticks: {
          display: false,
        },
        grid: {
          display: true,
          drawBorder: true,
          drawOnChartArea: true,
        },
      },
    },
    plugins: {
      tooltip: {
        enabled: false,
      },
      legend: {
        display: false,
      },
      datalabels: {
        align: "center" as const,
        anchor: "center" as const,
        color: "#888",
        font: {
          size: 18,
        },
      },
    },
  };

  return (
    <div style={{ height: `${Math.max(data.rows.length * 40, 200)}px` }}>
      <Scatter data={chartData} options={options} />
    </div>
  );
};

export default TableChart;
