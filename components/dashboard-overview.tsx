"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Package, TrendingUp } from "lucide-react";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { ProductChart } from "./product-chart";
import { ProductSellChart } from "./product-sell-chart";
import { RevenueChart } from "./revenue-chart";
import { useState } from "react";

export function DashboardOverview() {
  const { data: session, status } = useSession();
  const token = session?.user?.accessToken;
  const isLoggedIn = status === "authenticated";

  const [revenueFilter, setRevenueFilter] = useState("month");

  // Fetch dashboard summary
  const {
    data: dashboardResponse,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["dashboard-overview"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/seller/dashboard/dashboard-summary`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) throw new Error("Failed to fetch dashboard data");
      return res.json();
    },
    enabled: isLoggedIn && !!token,
  });

  // Fetch revenue report based on filter
  const { data: revenue, isLoading: revenueLoading } = useQuery({
    queryKey: ["revenue", revenueFilter],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/seller/dashboard/revenue-report?filter=${revenueFilter}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) throw new Error("Failed to fetch revenue data");
      const json = await res.json();

      type RevenueItem = { month?: string; day?: string; date?: string; revenue: number };
      return (json.data as RevenueItem[]).map((item) => {
        if (revenueFilter === "month") {
          return { date: item.month ?? "", thisMonth: item.revenue, lastMonth: 0 };
        } else if (revenueFilter === "week") {
          return { date: item.day ?? "", thisMonth: item.revenue, lastMonth: 0 };
        } else if (revenueFilter === "day") {
          return { date: item.date ?? "", thisMonth: item.revenue, lastMonth: 0 };
        } else {
          return { date: item.month ?? item.date ?? "", thisMonth: item.revenue, lastMonth: 0 };
        }
      });
    },
    enabled: isLoggedIn && !!token,
  });

  const dashboardData = dashboardResponse?.data;
  const totalRevenue = dashboardData?.totalRevenue ?? 0;
  const liveProducts = dashboardData?.liveProducts ?? 0;
  const productSellData = dashboardData?.productSell ?? [];
  const newProductsData = dashboardData?.newProducts ?? {
    thisDay: 0,
    thisWeek: 0,
    thisMonth: 0,
    thisYear: 0,
  };

  if (error) {
    return (
      <div className="space-y-[32px]">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Overview</h1>
          <p className="text-red-600">
            Failed to load dashboard data. Please try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-[32px]">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Overview</h1>
        <p className="text-gray-600">Dashboard</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white">
          <CardContent className="pt-6 pb-6 px-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xl mb-2 font-bold text-gray-900">
                  Total Revenue
                </p>
                <p className="text-lg font-medium text-gray-600">
                  <span className="text-green-500">●</span>{" "}
                  {isLoading ? "Loading..." : totalRevenue.toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-gray-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="pt-6 pb-6 px-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xl mb-2 font-bold text-gray-900">
                  Live Product
                </p>
                <p className="text-lg font-medium text-gray-600">
                  <span className="text-orange-500">●</span>{" "}
                  {isLoading ? "Loading..." : liveProducts.toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-gray-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <RevenueChart
            revenueData={revenue || []}
            isLoading={revenueLoading}
            onFilterChange={setRevenueFilter}
            currentFilter={revenueFilter}
          />
        </div>
        <div className="lg:col-span-1">
          <ProductChart
            newProductsData={newProductsData}
            isLoading={isLoading}
          />
        </div>
        <div className="lg:col-span-1">
          <ProductSellChart
            productSellData={productSellData}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
