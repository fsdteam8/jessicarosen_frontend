"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Line, LineChart, XAxis, YAxis, ResponsiveContainer } from "recharts"

const data = [
  { date: "3 Oct", thisMonth: 1000, lastMonth: 800 },
  { date: "10 Oct", thisMonth: 3000, lastMonth: 1200 },
  { date: "14 Oct", thisMonth: 2000, lastMonth: 1000 },
  { date: "20 Oct", thisMonth: 4000, lastMonth: 3000 },
  { date: "23 Oct", thisMonth: 2000, lastMonth: 2000 },
  { date: "27 Oct", thisMonth: 1000, lastMonth: 3000 },
  { date: "30 Oct", thisMonth: 4000, lastMonth: 2000 },
]

export function RevenueChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Revenue Report</CardTitle>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            Day
          </Button>
          <Button variant="outline" size="sm">
            Week
          </Button>
          <Button variant="default" size="sm">
            Month
          </Button>
          <Button variant="outline" size="sm">
            Year
          </Button>
        </div>
        <div className="flex items-center space-x-4 text-sm">
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
        <ResponsiveContainer width="100%" height={200}>
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
  )
}
