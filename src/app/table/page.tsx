"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import TableChart from "@/components/TableChart";
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

export default function TablePage() {
  const [stockData, setStockData] = useState<StockQuote | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isTableVisible, setIsTableVisible] = useState(false);

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

  const tableData = {
    headers: ["Metric", "Value"],
    rows: stockData
      ? [
          ["Current Price", `$${stockData.c.toFixed(2)}`],
          ["Change", `$${stockData.d.toFixed(2)}`],
          ["Change %", `${stockData.dp.toFixed(2)}%`],
          ["High", `$${stockData.h.toFixed(2)}`],
          ["Low", `$${stockData.l.toFixed(2)}`],
          ["Open", `$${stockData.o.toFixed(2)}`],
          ["Previous Close", `$${stockData.pc.toFixed(2)}`],
        ]
      : [["Loading...", ""]],
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-900 rounded-lg shadow p-6">
          <button
            onClick={() => setIsTableVisible(!isTableVisible)}
            className="flex items-center w-full text-left mb-4 hover:opacity-80 transition-opacity"
          >
            <h1 className="text-2xl font-bold">AAPL Stock Data</h1>
            <svg
              className={`w-6 h-6 ml-2 transform transition-transform ${
                isTableVisible ? "rotate-180" : ""
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
              isTableVisible ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <TableChart data={tableData} />
          </div>
        </div>
      </div>
    </div>
  );
}
