"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import BarChart from "@/components/BarChart";
import Navbar from "@/components/Navbar";

interface StockQuote {
  c: number; // Current price
  d: number; // Change
  dp: number; // Percent change
  h: number; // High price of the day
  l: number; // Low price of the day
  o: number; // Open price of the day
  pc: number; // Previous close price
}

const FINNHUB_API_BASE_URL = "https://finnhub.io/api/v1";
const API_KEY = process.env.NEXT_PUBLIC_FINNHUB_API_KEY;

if (!API_KEY) {
  throw new Error("Missing NEXT_PUBLIC_FINNHUB_API_KEY environment variable");
}

// After this point, TypeScript knows API_KEY is definitely a string
const FINNHUB_KEY: string = API_KEY;

export default function ChartPage() {
  const [stockData, setStockData] = useState<StockQuote | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isChartVisible, setIsChartVisible] = useState(false);

  async function fetchFinancialData(
    endpoint: string,
    params: Record<string, string> = {}
  ) {
    const url = new URL(`${FINNHUB_API_BASE_URL}/${endpoint}`);
    url.searchParams.append("token", FINNHUB_KEY);

    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });

    try {
      const response = await axios.get<StockQuote>(url.toString());
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 429) {
        throw new Error(
          "API rate limit exceeded. Please try again in a minute."
        );
      }
      throw error;
    }
  }

  useEffect(() => {
    const symbol = "AAPL";

    const fetchData = async () => {
      try {
        const financialData = await fetchFinancialData("quote", { symbol });
        setStockData(financialData);
        setError(null);
      } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred");
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 10000);

    return () => clearInterval(intervalId);
  }, []);

  const chartData = {
    labels: ["Current", "Open", "High", "Low", "Previous Close"],
    datasets: [
      {
        label: "Stock Prices",
        data: stockData
          ? [stockData.c, stockData.o, stockData.h, stockData.l, stockData.pc]
          : [],
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-900 rounded-lg shadow p-6">
          <button
            onClick={() => setIsChartVisible(!isChartVisible)}
            className="flex items-center w-full text-left mb-4 hover:opacity-80 transition-opacity"
          >
            <h1 className="text-2xl font-bold">AAPL Stock Price Chart</h1>
            <svg
              className={`w-6 h-6 ml-2 transform transition-transform ${
                isChartVisible ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {error && <div className="text-red-400 mb-4">{error}</div>}
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              isChartVisible ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="h-[400px]">
              {stockData ? (
                <BarChart data={chartData} />
              ) : (
                <div>Loading...</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
