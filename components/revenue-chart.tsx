"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Line, LineChart, XAxis, YAxis, ResponsiveContainer } from "recharts";

const data = [
  { date: "3 Oct", thisMonth: 1000, lastMonth: 800 },
  { date: "10 Oct", thisMonth: 3000, lastMonth: 1200 },
  { date: "14 Oct", thisMonth: 2000, lastMonth: 1000 },
  { date: "20 Oct", thisMonth: 4000, lastMonth: 3000 },
  { date: "23 Oct", thisMonth: 2000, lastMonth: 2000 },
  { date: "27 Oct", thisMonth: 1000, lastMonth: 3000 },
  { date: "30 Oct", thisMonth: 4000, lastMonth: 2000 },
];

export function RevenueChart() {
  return (
    <Card className="flex flex-col h-[473px] shadow-[0px_2px_6px_0px_#00000014] border-none">
      <CardHeader className="mb-3">
        <div className="flex justify-between items-center ">
          <CardTitle className="text-lg font-semibold">
            Revenue Report
          </CardTitle>
          <div className="flex space-x-[29px] bg-[#E7E7E7] py-[13px] px-[16px] rounded-lg">
            <button>Day</button>
            <button>Week</button>
            <button className="bg-[#525773] text-white py-[8px] px-[14px] rounded-md">Month</button>
            <button>Year</button>
          </div>
        </div>
        <div className="flex flex-col mt-[16px] ">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span>This Month</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
            <span>Last Month</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="date" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
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
      </CardContent>
    </Card>
  );
}
