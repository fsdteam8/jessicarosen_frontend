"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";
import { RadialBar, RadialBarChart } from "recharts";
import { useState } from "react";

interface NewProductsData {
  thisDay: number;
  thisWeek: number;
  thisMonth: number;
  thisYear: number;
}

interface ProductChartProps {
  newProductsData: NewProductsData;
  isLoading: boolean;
}

export function ProductChart({
  newProductsData,
  isLoading,
}: ProductChartProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<
    "Day" | "Week" | "Month" | "Year"
  >("Month");

  // Define fixed colors for periods
  const colors = {
    thisDay: "#3B82F6", // blue-500
    thisWeek: "#60A5FA", // blue-400
    thisMonth: "#8B5CF6", // purple-500
    thisYear: "#7C3AED", // purple-700
  };

  // Prepare chart data with fixed colors
  const chartData = [
    {
      period: "thisDay",
      products: newProductsData.thisDay,
      fill: colors.thisDay,
    },
    {
      period: "thisWeek",
      products: newProductsData.thisWeek,
      fill: colors.thisWeek,
    },
    {
      period: "thisMonth",
      products: newProductsData.thisMonth,
      fill: colors.thisMonth,
    },
    {
      period: "thisYear",
      products: newProductsData.thisYear,
      fill: colors.thisYear,
    },
  ];

  const chartConfig = {
    products: {
      label: "Products",
    },
    thisDay: {
      label: "This Day",
      color: colors.thisDay,
    },
    thisWeek: {
      label: "This Week",
      color: colors.thisWeek,
    },
    thisMonth: {
      label: "This Month",
      color: colors.thisMonth,
    },
    thisYear: {
      label: "This Year",
      color: colors.thisYear,
    },
  } satisfies ChartConfig;

  const periods = ["Day", "Week", "Month", "Year"] as const;

  const getCurrentValue = () => {
    switch (selectedPeriod) {
      case "Day":
        return newProductsData.thisDay;
      case "Week":
        return newProductsData.thisWeek;
      case "Month":
        return newProductsData.thisMonth;
      case "Year":
        return newProductsData.thisYear;
      default:
        return newProductsData.thisMonth;
    }
  };

  return (
    <div>
      <Card className="flex flex-col h-[473px] shadow-[0px_2px_6px_0px_#00000014] border-none bg-white">
        <CardHeader>
          <div className="flex justify-between items-center w-full">
            {/* Title */}
            <CardTitle className="text-lg font-semibold">
              Total New Products Report
            </CardTitle>

            {/* Period buttons */}
            <div className="flex space-x-3 bg-gray-200 py-2 px-3 rounded-lg">
              {periods.map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`py-1 px-3 rounded-md transition-colors ${
                    selectedPeriod === period
                      ? "bg-slate-600 text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-gray-500">Loading chart data...</div>
            </div>
          ) : (
            <div className="relative">
              <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square max-h-[250px]"
              >
                <RadialBarChart
                  data={chartData}
                  innerRadius={30}
                  outerRadius={110}
                >
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel nameKey="period" />}
                  />
                  <RadialBar dataKey="products" background />
                </RadialBarChart>
              </ChartContainer>

              {/* Center text showing selected period value */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {getCurrentValue()}
                  </div>
                  <div className="text-sm text-gray-600">
                    This {selectedPeriod}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* The legend below remains unchanged */}
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: colors.thisDay }}
              />
              <span className="text-sm">
                This Day ({newProductsData.thisDay})
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: colors.thisWeek }}
              />
              <span className="text-sm">
                This Week ({newProductsData.thisWeek})
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: colors.thisMonth }}
              />
              <span className="text-sm">
                This Month ({newProductsData.thisMonth})
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: colors.thisYear }}
              />
              <span className="text-sm">
                This Year ({newProductsData.thisYear})
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
