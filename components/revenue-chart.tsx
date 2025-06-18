"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Line, LineChart, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { useState } from "react";

interface RevenueData {
  date: string;
  thisMonth: number;
  lastMonth: number;
}

interface RevenueChartProps {
  revenueData?: RevenueData[];
  isLoading?: boolean;
  onFilterChange?: (filter: string) => void;
  currentFilter?: string;
}

// Fallback data for when API data is not available
const fallbackData = [
  { date: "3 Oct", thisMonth: 1000, lastMonth: 800 },
  { date: "10 Oct", thisMonth: 3000, lastMonth: 1200 },
  { date: "14 Oct", thisMonth: 2000, lastMonth: 1000 },
  { date: "20 Oct", thisMonth: 4000, lastMonth: 3000 },
  { date: "23 Oct", thisMonth: 2000, lastMonth: 2000 },
  { date: "27 Oct", thisMonth: 1000, lastMonth: 3000 },
  { date: "30 Oct", thisMonth: 4000, lastMonth: 2000 },
];

export function RevenueChart({ 
  revenueData, 
  isLoading = false, 
  onFilterChange,
  currentFilter = "month"
}: RevenueChartProps) {
  const [activeFilter, setActiveFilter] = useState(currentFilter);

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    onFilterChange?.(filter);
  };

  const chartData = revenueData && revenueData.length > 0 ? revenueData : fallbackData;


  return (
    <Card className="flex flex-col h-[473px] shadow-[0px_2px_6px_0px_#00000014] border-none bg-white">
      <CardHeader className="mb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">
            Revenue Report
          </CardTitle>
          <div className="flex space-x-[29px] bg-[#E7E7E7] py-[7px] px-[10px] rounded-lg">
            {['day', 'week', 'month', 'year'].map((filter) => (
              <button
                key={filter}
                onClick={() => handleFilterClick(filter)}
                className={`py-[5px] px-[10px] rounded-md capitalize transition-colors ${
                  activeFilter === filter
                    ? 'bg-[#525773] text-white'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
        {/* <div className="flex flex-col mt-[16px] space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span>{labels.current}</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
            <span>{labels.previous}</span>
          </div>
        </div> */}
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center h-[300px]">
            <div className="text-gray-500">Loading revenue data...</div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <XAxis 
                dataKey="date" 
                axisLine={false} 
                tickLine={false}
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false}
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `${value.toLocaleString()}`}
              />
              <Line
                type="monotone"
                dataKey="thisMonth"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="lastMonth"
                stroke="#a855f7"
                strokeWidth={2}
                dot={{ fill: "#a855f7", strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
