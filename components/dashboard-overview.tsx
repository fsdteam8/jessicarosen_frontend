"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Package, TrendingUp } from "lucide-react";
// import { useSession } from "next-auth/react";
import { ProductChart } from "./product-chart";
import { ProductSellChart } from "./product-sell-chart";
import { RevenueChart } from "./revenue-chart";
// import { RevenueReport } from "./Revenue_report";

export function DashboardOverview() {
  // const session = useSession();
  // const token = session?.data?.user?.accessToken;
  // console.log("Token:", token);
  // console.log("Session Data:", session?.data?.user?.accessToken);
  return (
    <div className="space-y-[32px]">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Overview</h1>
        <p className="text-gray-600">Dashboard</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-[24px] pb-[42px] px-[32px]">
            <div className="flex items-center ">
              <div className="mr-10">
                <p className="text-[20px] mb-[8px] font-bold text-[#131313] ">
                  Total Revenue
                </p>
                <p className="text-[18px] font-medium text-[#424242]">
                  <span className="text-green-500">●</span> 132,570
                </p>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-gray-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center ">
              <div className="mr-10">
                <p className="text-[20px] mb-[8px] font-bold text-[#131313] ">
                  Live Product
                </p>
                <p className="text-[18px] font-medium text-[#424242]">
                  <span className="text-orange-500">●</span> 132,570
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
          <RevenueChart />
        </div>
        <div className="lg:col-span-1">
          <ProductChart />
        </div>
        <div className="lg:col-span-1">
          <ProductSellChart />
        </div>
      </div>
      {/* <div>
        <RevenueReport/>
      </div> */}
    </div>
  );
}
