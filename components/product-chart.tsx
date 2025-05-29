"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";
import { RadialBar, RadialBarChart } from "recharts";

export function ProductChart() {
  const chartData = [
    { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
    { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
    { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
    { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
    { browser: "other", visitors: 90, fill: "var(--color-other)" },
  ];

  const chartConfig = {
    visitors: {
      label: "Visitors",
    },
    chrome: {
      label: "Chrome",
      color: "hsl(var(--chart-1))",
    },
    safari: {
      label: "Safari",
      color: "hsl(var(--chart-2))",
    },
    firefox: {
      label: "Firefox",
      color: "hsl(var(--chart-3))",
    },
    edge: {
      label: "Edge",
      color: "hsl(var(--chart-4))",
    },
    other: {
      label: "Other",
      color: "hsl(var(--chart-5))",
    },
  } satisfies ChartConfig;

  return (
    <div className="">
      {/* Circular progress chart placeholder */}
      <Card className="flex flex-col h-[473px]  shadow-[0px_2px_6px_0px_#00000014] border-none">
        <CardHeader>
          <div className="flex  justify-between">
            <div className="flex flex-col justify-between items-start ">
              <CardTitle className="text-lg font-semibold">
                Total New Products Report
              </CardTitle>
              <div className="flex mt-[12px]">
                <div className="flex space-x-[29px] bg-[#E7E7E7] py-[13px] px-[16px] rounded-lg">
                  <button>Day</button>
                  <button>Week</button>
                  <button className="bg-[#525773] text-white py-[8px] px-[14px] rounded-md">
                    Month
                  </button>
                  <button>Year</button>
                </div>
              </div>
            </div>

            <div className="flex flex-col ">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span> This day</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-[#C6D2FD] rounded-full"></div>
                <span> This Week</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                <span>Last Month</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 pb-0 ">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <RadialBarChart data={chartData} innerRadius={30} outerRadius={110}>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel nameKey="browser" />}
              />
              <RadialBar dataKey="visitors" background />
            </RadialBarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
