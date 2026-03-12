"use client";

import type React from "react";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {  Eye, Loader2, Search, X } from "lucide-react";
import { useSession } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface SalesData {
  productId: string;
  quantity: number;
  totalSellAmount: number;
  adminCharge: number;
  sellerRevenue: number;
  productTitle?: string;
  orderId?: string;
  createdAt?: string;
  customer?: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
}

interface ApiOrderItem {
  _id: string;
  totalAmount: number;
  paymentStatus: string;
  orderStatus: string;
  createdAt: string;
  customer: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
  orderId: string;
  item: {
    quantity: number;
    price: number;
    sellerAmount: number;
    product: {
      productId: string;
      title: string;
      image: string;
    };
  };
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: {
    totalSales: number;
    orders: ApiOrderItem[];
  };
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

export function MySales() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCustomer, setSelectedCustomer] = useState<{
    name: string;
    email: string;
    phone: string;
    orderId: string;
  } | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const itemsPerPage = 10;

  const session = useSession();
  const TOKEN = session?.data?.user?.accessToken;

  // Transform API data to match component structure
  const transformApiData = (orders: ApiOrderItem[]): SalesData[] => {
    return orders.map((order) => {
      const adminCharge = order.totalAmount - order.item.sellerAmount;
      
      return {
        productId: order.item.product.productId,
        quantity: order.item.quantity,
        totalSellAmount: order.totalAmount,
        adminCharge: adminCharge,
        sellerRevenue: order.item.sellerAmount,
        productTitle: order.item.product.title,
        orderId: order.orderId,
        createdAt: order.createdAt,
        customer: {
          id: order.customer.id,
          name: order.customer.name,
          email: order.customer.email,
          phone: order.customer.phone || "N/A",
        },
      };
    });
  };

  // Fetch all sales data
  const fetchAllSales = async (): Promise<SalesData[]> => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/seller/dashboard/my-sales`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ApiResponse = await response.json();
    console.log("API Response:", result);

    if (!result.success || !result.data) {
      throw new Error(result.message || "Failed to fetch sales data");
    }

    return transformApiData(result.data.orders);
  };

  // Search sales data
  const searchSales = async (query: string): Promise<SalesData[]> => {
    if (!query.trim()) return [];

    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL
      }/seller/dashboard/my-sales?search=${encodeURIComponent(query)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ApiResponse = await response.json();
    console.log("Search API Response:", result);

    if (!result.success || !result.data) {
      throw new Error(result.message || "Failed to search sales data");
    }

    return transformApiData(result.data.orders);
  };

  // Main sales data query
  const {
    data: allSalesData = [],
    isLoading: isLoadingAll,
    error: allSalesError,
    refetch: refetchAll,
  } = useQuery({
    queryKey: ["sales", "all"],
    queryFn: fetchAllSales,
    enabled: !!TOKEN,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  // Search query
  const {
    data: searchResults = [],
    isLoading: isLoadingSearch,
    error: searchError,
    refetch: refetchSearch,
  } = useQuery({
    queryKey: ["sales", "search", searchTerm],
    queryFn: () => searchSales(searchTerm),
    enabled: !!TOKEN && isSearching && searchTerm.trim().length > 0,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
  });

  // Determine which data to display
  const displayData =
    isSearching && searchTerm.trim() ? searchResults : allSalesData;
  const isLoading =
    isSearching && searchTerm.trim() ? isLoadingSearch : isLoadingAll;
  const error = isSearching && searchTerm.trim() ? searchError : allSalesError;

  // Pagination
  const paginatedData = displayData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalSales = allSalesData.reduce(
    (sum, item) => sum + item.totalSellAmount,
    0
  );

  const handleSearch = () => {
    if (searchTerm.trim()) {
      setIsSearching(true);
      setCurrentPage(1);
      refetchSearch();
    }
  };

  const handleReset = () => {
    setSearchTerm("");
    setIsSearching(false);
    setCurrentPage(1);
  };

  const handleRefresh = () => {
    if (isSearching && searchTerm.trim()) {
      refetchSearch();
    } else {
      refetchAll();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleViewCustomer = (item: SalesData) => {
    if (item.customer) {
      setSelectedCustomer({
        name: item.customer.name,
        email: item.customer.email,
        phone: item.customer.phone,
        orderId: item.orderId || "N/A",
      });
      setIsDialogOpen(true);
    }
  };

  if (isLoading && displayData.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center space-x-2">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>
            {isSearching ? "Searching sales data..." : "Loading sales data..."}
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="text-red-600 text-center">
          <p className="font-semibold">
            {isSearching
              ? "Error searching sales data"
              : "Error loading sales data"}
          </p>
          <p className="text-sm">{error.message}</p>
        </div>
        <Button onClick={handleRefresh} variant="outline">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center mt-[40px] sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Sales</h1>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>Dashboard</span>
            <span>›</span>
            <span>wallet</span>
          </div>
        </div>
        {/* <div className="flex space-x-2">
          <Button onClick={handleRefresh} variant="outline" size="sm" disabled={isLoading}>
            {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
            Refresh
          </Button>
          <Button className="bg-slate-700 hover:bg-slate-800">
            <Download className="w-4 h-4 mr-2" />
            Withdraw
          </Button>
        </div> */}
      </div>

      {/* Total Sales Card */}
      <div className="grid grid-cols-3">
        <Card className="bg-[#525773] text-white">
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
          <div className="flex flex-col gap-4">
            <CardTitle className="text-lg font-semibold">
              Sales History ({displayData.length} items)
              {isSearching && searchTerm && (
                <span className="text-sm font-normal text-gray-600 ml-2">
                  - Search results for {searchTerm}
                </span>
              )}
            </CardTitle>
            <div className="flex items-center space-x-2">
              <div className="relative flex-1 max-w-md">
                <Input
                  placeholder="Enter Product ID to search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full border-[#616161] pr-20"
                />
                <div className="absolute right-1 top-1/2 -translate-y-1/2 flex space-x-1">
                  {searchTerm && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={handleReset}
                      className="h-8 w-8 p-0"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                  <Button
                    size="sm"
                    onClick={handleSearch}
                    disabled={!searchTerm.trim() || isLoadingSearch}
                    className="h-8 px-3"
                  >
                    {isLoadingSearch ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Search className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
              {isSearching && (
                <Button variant="outline" onClick={handleReset}>
                  Show All
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="bg-[#EDEEF1]">
          {displayData.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              {isSearching && searchTerm
                ? "No sales found matching your search."
                : "No sales data available."}
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b">
                    <tr>
                      <th className="text-left px-[50px] font-medium text-[#131313]">
                        Product ID
                      </th>
                      <th className="text-left p-4 font-medium text-[#131313]">
                        Product Title
                      </th>
                      <th className="text-left p-4 font-medium text-[#131313]">
                        Quantity
                      </th>
                      <th className="text-left p-4 font-medium text-[#131313]">
                        Total Sell Amount
                      </th>
                      <th className="text-left p-4 font-medium text-[#131313]">
                        Admin Charge
                      </th>
                      <th className="text-left p-4 font-medium text-[#131313]">
                        Seller Revenue
                      </th>
                      <th className="text-left p-4 font-medium text-[#131313]">
                        Customer Details
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData.map((item, index) => (
                      <tr
                        key={`${item.productId}-${index}`}
                        className="border-b hover:bg-gray-50"
                      >
                        <td className="py-[30px] px-[50px] text-[#131313]">
                          {item.productId}
                        </td>
                        <td className="p-4 text-[#424242]">
                          {item.productTitle || 'N/A'}
                        </td>
                        <td className="p-4 text-[#424242]">{item.quantity}</td>
                        <td className="p-4 text-[#424242]">
                          ${item.totalSellAmount.toFixed(2)}
                        </td>
                        <td className="p-4 text-[#424242]">
                          ${item.adminCharge.toFixed(2)}
                        </td>
                        <td className="p-4 text-[#424242]">
                          ${item.sellerRevenue.toFixed(2)}
                        </td>
                        <td className="p-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewCustomer(item)}
                            className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between pt-4 border-t">
                <span className="text-sm text-gray-600">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                  {Math.min(currentPage * itemsPerPage, displayData.length)} of{" "}
                  {displayData.length} results
                </span>
                {displayData.length > itemsPerPage && (
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setCurrentPage(Math.max(1, currentPage - 1))
                      }
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={
                        currentPage * itemsPerPage >= displayData.length
                      }
                    >
                      Next
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Customer Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Customer Details</DialogTitle>
          </DialogHeader>
          {selectedCustomer && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-3 gap-4 py-2 border-b">
                <span className="font-medium text-gray-600">Order ID:</span>
                <span className="col-span-2 text-gray-900">{selectedCustomer.orderId}</span>
              </div>
              <div className="grid grid-cols-3 gap-4 py-2 border-b">
                <span className="font-medium text-gray-600">Name:</span>
                <span className="col-span-2 text-gray-900">{selectedCustomer.name}</span>
              </div>
              <div className="grid grid-cols-3 gap-4 py-2 border-b">
                <span className="font-medium text-gray-600">Email:</span>
                <span className="col-span-2 text-gray-900 break-all">{selectedCustomer.email}</span>
              </div>
              <div className="grid grid-cols-3 gap-4 py-2">
                <span className="font-medium text-gray-600">Phone:</span>
                <span className="col-span-2 text-gray-900">{selectedCustomer.phone}</span>
              </div>
            </div>
          )}
          <div className="flex justify-end">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}