"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download } from "lucide-react";
// import { Pagination } from "@/components/ui/pagination"

interface SalesData {
  productId: string;
  quantity: number;
  totalSellAmount: number;
  adminCharge: number;
  sellerRevenue: number;
}

const mockSalesData: SalesData[] = Array.from({ length: 35 }, (_, i) => {
  const productIds = [
    "45550",
    "45551",
    "45552",
    "45553",
    "45554",
    "45555",
    "45556",
  ];
  const quantities = [2, 3, 4, 5, 6];
  const amounts = [200, 300, 420, 500, 600, 340, 480, 750, 890, 1200];

  const totalAmount = amounts[i % amounts.length];
  const adminCharge = Math.floor(totalAmount * 0.5);
  const sellerRevenue = totalAmount - adminCharge;

  return {
    productId: productIds[i % productIds.length],
    quantity: quantities[i % quantities.length],
    totalSellAmount: totalAmount,
    adminCharge: adminCharge,
    sellerRevenue: sellerRevenue,
  };
});

export function MySales() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredData = mockSalesData.filter((item) =>
    item.productId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const totalSales = mockSalesData.reduce(
    (sum, item) => sum + item.totalSellAmount,
    0
  );

  const handleReset = () => {
    setSearchTerm("");
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center mx-[50px] mt-[40px] sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Sales</h1>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>Dashboard</span>
            <span>›</span>
            <span>wallet</span>
          </div>
        </div>
        <Button className="bg-slate-700 hover:bg-slate-800">
          <Download className="w-4 h-4 mr-2" />
          Withdraw
        </Button>
      </div>

      {/* Total Sales Card */}
      <div className="grid grid-cols-3">
        <Card className="bg-[#525773] mx-[50px] text-white">
          <CardContent className="p-6">
            <div>
              <p className="text-sm opacity-80">Total Sales</p>
              <p className="text-2xl font-bold">
                <span className="text-green-400">●</span> $
                {totalSales.toFixed(2)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales History */}
      <Card className="shadow-none border-none bg-transparent mt-[32px]">
        <CardHeader>
          <div className="flex flex-col  gap-4">
            <CardTitle className="text-lg font-semibold">
              Sales History
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Enter Product ID"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-48 border-[#616161]"
              />
              <button className="text-[#131313]" onClick={handleReset}>
                Reset
              </button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="bg-[#EDEEF1]">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b">
                <tr>
                  <th className="text-left px-[50px] font-medium text-[#131313]">
                    Product ID
                  </th>
                  <th className="text-left p-4 font-medium text-[#131313]">
                    Quantity
                  </th>
                  <th className="text-left p-4 font-medium text-[#131313]">
                    Total Sell Amount
                  </th>
                  <th className="text-left p-4 font-medium text-[#131313]">
                    Admin Charge <span className="text-orange-500">(50%)</span>
                  </th>
                  <th className="text-left p-4 font-medium text-[#131313]">
                    Seller Revenue
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-[30px] px-[50px] text-[#131313]">{item.productId}</td>
                    <td className="p-4 text-[#424242]">{item.quantity}</td>
                    <td className="p-4 text-[#424242]">
                      ${item.totalSellAmount}
                    </td>
                    <td className="p-4 text-[#424242]">${item.adminCharge}</td>
                    <td className="p-4 text-[#424242]">${item.sellerRevenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between pt-4 border-t">
            <span className="text-sm text-gray-600">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, filteredData.length)} of{" "}
              {filteredData.length} results
            </span>
            {/* <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} /> */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
