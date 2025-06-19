"use client";

import { LabelList, RadialBar, RadialBarChart } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";

interface ProductSellData {
  name: string;
  percentage: number;
}

interface ProductSellChartProps {
  productSellData?: ProductSellData[];
  isLoading?: boolean;
}

export function ProductSellChart({ productSellData = [], isLoading = false }: ProductSellChartProps) {
  // Define consistent colors to match the reference style
  const colors = [
    "#10B981", // Green/Teal
    "#3B82F6", // Blue
    "#F59E0B", // Orange/Yellow
    "#EF4444", // Red
    "#8B5CF6", // Purple
  ];

  // Transform the API data into chart format
  const chartData = productSellData.map((product, index) => ({
    browser: product.name.toLowerCase().replace(/\s+/g, ''),
    visitors: product.percentage,
    fill: colors[index % colors.length],
    name: product.name,
  }));

  // Create chart config dynamically based on the data
  const chartConfig = productSellData.reduce((config, product, index) => {
    const key = product.name.toLowerCase().replace(/\s+/g, '');
    config[key] = {
      label: product.name,
      color: colors[index % colors.length],
    };
    return config;
  }, {
    visitors: {
      label: "Percentage",
    },
  } as ChartConfig);

  // Fallback data if no data is available
  const fallbackData = [
    { browser: "nodata", visitors: 100, fill: colors[0], name: "No Data" },
  ];

  const displayData = chartData.length > 0 ? chartData : fallbackData;

  return (
    <div className="space-y-4">
      <Card className="flex flex-col h-[473px] shadow-lg border border-gray-100 bg-white rounded-xl">
        <CardHeader className="px-6 pt-6 pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-gray-900">Product Sell</CardTitle>
            <button className="text-blue-600 text-sm hover:text-blue-700 flex items-center gap-1 cursor-pointer transition-colors">
              View Details
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </button>
          </div>
        </CardHeader>
        <CardContent className="flex-1 px-6 pb-6">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-gray-500">Loading chart data...</div>
            </div>
          ) : productSellData.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-gray-500">No product sell data available</div>
            </div>
          ) : (
            <div className="flex flex-col h-full">
              {/* Legend */}
              <div className="flex flex-col space-y-3 mb-6 bg-gray-50 p-4 rounded-md">
                {productSellData.map((product, index) => (
                  <div key={product.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: colors[index % colors.length] }}
                      ></div>
                      <span className="text-sm text-gray-600">{product.name}</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">
                      {product.percentage}%
                    </span>
                  </div>
                ))}
              </div>

              {/* Chart */}
              <div className="flex-1 flex items-center justify-center mt-auto">
                <ChartContainer
                  config={chartConfig}
                  className="aspect-square w-full max-w-[280px] max-h-[280px]"
                >
                  <RadialBarChart
                    data={displayData}
                    startAngle={90}
                    endAngle={450}
                    innerRadius={60}
                    outerRadius={120}
                    barSize={12}
                  >
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent hideLabel nameKey="name" />}
                    />
                    <RadialBar
                      dataKey="visitors"
                      cornerRadius={6}
                      background={{ fill: "#f3f4f6" }}
                    >
                      <LabelList
                        position="insideStart"
                        dataKey="name"
                        className="fill-white capitalize mix-blend-luminosity"
                        fontSize={11}
                      />
                    </RadialBar>
                  </RadialBarChart>
                </ChartContainer>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}