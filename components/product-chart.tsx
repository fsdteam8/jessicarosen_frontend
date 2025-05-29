"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function ProductChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Total New Products Report</CardTitle>
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
        <div className="flex flex-col space-y-2 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span>This day</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
            <span>This Week</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
            <span>This Month</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative w-48 h-48 mx-auto">
          {/* Circular progress chart placeholder */}
          <div className="w-full h-full rounded-full border-8 border-gray-200 relative">
            <div className="absolute inset-0 rounded-full border-8 border-purple-500 border-t-transparent transform rotate-45"></div>
            <div className="absolute inset-2 rounded-full border-8 border-blue-400 border-t-transparent transform rotate-90"></div>
            <div className="absolute inset-4 rounded-full border-8 border-purple-300 border-t-transparent transform rotate-180"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
