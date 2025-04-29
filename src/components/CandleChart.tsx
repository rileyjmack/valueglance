// "use client";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   TimeScale,
// } from "chart.js";
// import { Line } from "react-chartjs-2";
// import "chartjs-adapter-date-fns";

// // Register ChartJS components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   TimeScale
// );

// interface CandleData {
//   c: number[]; // Close prices
//   h: number[]; // High prices
//   l: number[]; // Low prices
//   o: number[]; // Open prices
//   t: number[]; // Timestamps
//   s: string; // Status
// }

// const CandleChart = ({ data }: { data: CandleData | null }) => {
//   if (!data || data.s !== "ok") {
//     return <div>No data available</div>;
//   }

//   const chartData = {
//     labels: data.t.map((timestamp) => new Date(timestamp * 1000)),
//     datasets: [
//       {
//         label: "Close Price",
//         data: data.c.map((value, index) => ({
//           x: data.t[index] * 1000,
//           y: value,
//         })),
//         borderColor: "rgb(53, 162, 235)",
//         backgroundColor: "rgba(53, 162, 235, 0.5)",
//         tension: 0.1,
//       },
//       {
//         label: "High Price",
//         data: data.h.map((value, index) => ({
//           x: data.t[index] * 1000,
//           y: value,
//         })),
//         borderColor: "rgb(75, 192, 192)",
//         backgroundColor: "rgba(75, 192, 192, 0.5)",
//         tension: 0.1,
//       },
//       {
//         label: "Low Price",
//         data: data.l.map((value, index) => ({
//           x: data.t[index] * 1000,
//           y: value,
//         })),
//         borderColor: "rgb(255, 99, 132)",
//         backgroundColor: "rgba(255, 99, 132, 0.5)",
//         tension: 0.1,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     interaction: {
//       mode: "index" as const,
//       intersect: false,
//     },
//     plugins: {
//       legend: {
//         position: "top" as const,
//         labels: {
//           color: "white",
//         },
//       },
//       title: {
//         display: true,
//         text: "AAPL Stock Price",
//         color: "white",
//         font: {
//           size: 16,
//         },
//       },
//     },
//     scales: {
//       x: {
//         type: "time" as const,
//         time: {
//           unit: "hour" as const,
//           displayFormats: {
//             hour: "MMM d, HH:mm",
//           },
//         },
//         grid: {
//           color: "rgba(255, 255, 255, 0.1)",
//         },
//         ticks: {
//           color: "white",
//         },
//       },
//       y: {
//         type: "linear" as const,
//         grid: {
//           color: "rgba(255, 255, 255, 0.1)",
//         },
//         ticks: {
//           color: "white",
//           callback: function (value: number) {
//             if (typeof value !== "number") return "";
//             return `$${value.toFixed(2)}`;
//           },
//         },
//       },
//     },
//   };

//   // return <Line options={options} data={chartData} />;
// };

// export default CandleChart;
