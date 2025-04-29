"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
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
  const allRows = [data.headers, ...data.rows];

  const datasets = allRows.map((row, rowIndex) => ({
    data: row.map((_, colIndex) => ({
      x: colIndex,
      y: -rowIndex,
    })),
    pointRadius: 0,
    showLine: false,
    datalabels: {
      labels: {
        value: {
          formatter: (_: unknown, context: Context) => row[context.dataIndex],
        },
      },
    },
    backgroundColor: "rgba(0, 0, 0, 0)",
    borderColor: "rgba(0, 0, 0, 0)",
  }));

  const chartData = {
    datasets,
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "linear" as const,
        min: -0.5,
        max: data.headers.length - 0.5,
        ticks: {
          display: false,
        },
        grid: {
          display: false,
          drawBorder: false,
          drawOnChartArea: false,
          color: "transparent",
        },
      },
      y: {
        type: "linear" as const,
        min: -(allRows.length - 0.5),
        max: 0.5,
        ticks: {
          display: false,
        },
        grid: {
          display: false,
          drawBorder: false,
          drawOnChartArea: false,
          color: "transparent",
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
        color: "white",
        font: (context: Context) => ({
          size: 14,
          weight:
            context.datasetIndex === 0
              ? ("bold" as const)
              : ("normal" as const),
        }),
      },
    },
  };

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
      <div style={{ height: `${Math.max(data.rows.length * 40, 200)}px` }}>
        <Scatter data={chartData} options={options} />
      </div>
    </div>
  );
};

export default TableChart;
