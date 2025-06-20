// "use client"

// import { useState } from "react"
// import { Download } from "lucide-react"
// import { AccountLayout } from "@/components/account/account-layout"
// import { Button } from "@/components/ui/button"
// import { DocumentDetailsModal } from "@/components/account/document-details-modal"
// import { useQuery } from "@tanstack/react-query"
// import { useSession } from "next-auth/react"

// type OrderItem = {
//   date: string; // e.g., "Jun 12, 2025"
//   orderId: string; // e.g., "684ab7b69a5a4080d5773ffc"
//   price: string; // e.g., "$180.00"
//   resourceName: string; // e.g., "Tiny shoes"
//   status: "processing" | "completed" | "cancelled" | string; // include known statuses
// };

// export default function OrderHistoryPage() {
//   const [currentPage, setCurrentPage] = useState(1)
//   const [selectedDocument, setSelectedDocument] = useState<string | null>(null)
//   const itemsPerPage = 10

//   const { data: session, status } = useSession()
//   const token = session?.user?.accessToken
//   const isLoggedIn = status === "authenticated"

//   // Fetch orders from API
//   const { data: apiResponse, isLoading, error } = useQuery({
//     queryKey: ['order-history'],
//     queryFn: async () => {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/orders`, {
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`,
//         },
//       })

//       if (!res.ok) {
//         throw new Error('Failed to fetch order history')
//       }

//       const responseData = await res.json()
//       return responseData
//     },
//     enabled: isLoggedIn && !!token, // Only run query when user is authenticated and token exists
//   })

//   console.log('orders', apiResponse)

//   // Extract orders from API response
//   const orders = apiResponse?.data || []
//   const totalPages = Math.ceil(orders.length / itemsPerPage)
//   const paginatedOrders = orders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

//   const handlePageChange = (page: number) => {
//     if (page < 1 || page > totalPages) return
//     setCurrentPage(page)
//   }

//   const handleViewDetails = (orderId: string) => {
//     setSelectedDocument(orderId)
//   }

//   const handleCloseModal = () => {
//     setSelectedDocument(null)
//   }

//   // Function to get status styling
//   const getStatusStyle = (status: string) => {
//     switch (status.toLowerCase()) {
//       case 'delivered':
//         return "bg-[#016102] text-white"
//       case 'processing':
//         return "bg-[#ff9900] text-white"
//       case 'pending':
//         return "bg-[#ff9900] text-white"
//       case 'cancelled':
//         return "bg-red-500 text-white"
//       default:
//         return "bg-gray-500 text-white"
//     }
//   }

//   // Function to format status text
//   const formatStatus = (status: string) => {
//     return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()
//   }

//   // Show loading state
//   if (isLoading) {
//     return (
//       <AccountLayout activeTab="orders">
//         <div className="bg-white rounded-lg shadow-sm overflow-hidden border-2 border-[#23547B] p-4 sm:p-6 md:p-8">
//           <div className="flex items-center justify-center py-12">
//             <div className="text-center">
//               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#23547B] mx-auto mb-4"></div>
//               <div className="text-lg text-gray-600">Loading orders...</div>
//             </div>
//           </div>
//         </div>
//       </AccountLayout>
//     )
//   }

//   // Show error state
//   if (error) {
//     return (
//       <AccountLayout activeTab="orders">
//         <div className="bg-white rounded-lg shadow-sm overflow-hidden border-2 border-[#23547B] p-4 sm:p-6 md:p-8">
//           <div className="flex items-center justify-center py-12">
//             <div className="text-center">
//               <div className="text-lg text-red-600 mb-2">Failed to load orders</div>
//               <div className="text-sm text-gray-600">Please check your connection and try again.</div>
//             </div>
//           </div>
//         </div>
//       </AccountLayout>
//     )
//   }

//   // Show empty state
//   if (!orders || orders.length === 0) {
//     return (
//       <AccountLayout activeTab="orders">
//         <div className="bg-white rounded-lg shadow-sm overflow-hidden border-2 border-[#23547B] p-4 sm:p-6 md:p-8">
//           <div className="flex items-center justify-center py-12">
//             <div className="text-center">
//               <div className="text-lg text-gray-600 mb-2">No orders found</div>
//               <div className="text-sm text-gray-500">You haven&apos;t made any orders yet.</div>
//             </div>
//           </div>
//         </div>
//       </AccountLayout>
//     )
//   }

//   return (
//     <AccountLayout activeTab="orders">
//       <div className="bg-white rounded-lg shadow-sm overflow-hidden border-2 border-[#23547B] p-4 sm:p-6 md:p-8">
//         <div className="overflow-x-auto border-2 border-[#23547B] rounded-lg">
//           <table className="w-full min-w-[640px]">
//             <thead className="bg-gray-50 border-b border-black">
//               <tr>
//                 {["Resource Name", "Price", "Date", "Status", "Action"].map((heading) => (
//                   <th
//                     key={heading}
//                     className="py-3 px-4 text-xs sm:text-sm md:text-base text-center font-medium text-black border-r last:border-r-0 border-r-black"
//                   >
//                     {heading}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-black">
//               {paginatedOrders.map((order:OrderItem, index:number) => (
//                 <tr key={`${order.orderId}-${index}`} className="hover:bg-gray-50 text-xs sm:text-sm md:text-base">
//                   <td className="py-3 px-4 text-center border-r last:border-r-0 border-r-black">
//                     {order.resourceName}
//                   </td>
//                   <td className="py-3 px-4 text-center border-r last:border-r-0 border-r-black">
//                     {order.price}
//                   </td>
//                   <td className="py-3 px-4 text-center border-r last:border-r-0 border-r-black">
//                     {order.date}
//                   </td>
//                   <td className="py-3 px-4 text-center border-r last:border-r-0 border-r-black">
//                     <span
//                       className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(order.status)}`}
//                     >
//                       {formatStatus(order.status)}
//                     </span>
//                   </td>
//                   <td className="py-3 px-4 text-center border-r last:border-r-0 border-r-black">
//                     <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
//                       <button
//                         onClick={() => handleViewDetails(order.orderId)}
//                         className="text-[#424242] underline text-sm hover:text-[#23547B]"
//                       >
//                         View Details
//                       </button>
//                       <Button
//                         variant="outline"
//                         size="icon"
//                         className="text-white border-[#2c5d7c] bg-[#23547B] hover:bg-[#2c5d7c]/10"
//                       >
//                         <Download className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination - Only show if there are multiple pages */}
//         {totalPages > 1 && (
//           <div className="py-4 px-4 sm:px-6 mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
//             <div className="text-sm text-gray-700 text-center sm:text-left">
//               Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
//               {Math.min(currentPage * itemsPerPage, orders.length)} of {orders.length} results
//             </div>
//             <div className="flex flex-wrap gap-1 items-center justify-center">
//               <Button
//                 variant="default"
//                 size="icon"
//                 className="h-8 w-8 bg-[#016102] hover:bg-[#016102]/90"
//                 onClick={() => handlePageChange(currentPage - 1)}
//                 disabled={currentPage === 1}
//               >
//                 <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                 </svg>
//               </Button>

//               {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//                 const pageNumber = i + 1
//                 return (
//                   <Button
//                     key={pageNumber}
//                     variant={pageNumber === currentPage ? "default" : "outline"}
//                     size="sm"
//                     className={pageNumber === currentPage ? "bg-[#016102] hover:bg-[#016102]/90" : ""}
//                     onClick={() => handlePageChange(pageNumber)}
//                   >
//                     {pageNumber}
//                   </Button>
//                 )
//               })}

//               {totalPages > 5 && (
//                 <>
//                   <span className="px-2 text-sm text-gray-500">...</span>
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     onClick={() => handlePageChange(totalPages)}
//                     className={totalPages === currentPage ? "bg-[#016102] text-white hover:bg-[#016102]/90" : ""}
//                   >
//                     {totalPages}
//                   </Button>
//                 </>
//               )}

//               <Button
//                 variant="outline"
//                 size="icon"
//                 className="h-8 w-8 hover:bg-gray-50"
//                 onClick={() => handlePageChange(currentPage + 1)}
//                 disabled={currentPage === totalPages}
//               >
//                 <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                 </svg>
//               </Button>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Modal */}
//       <DocumentDetailsModal isOpen={!!selectedDocument} onClose={handleCloseModal} />
//     </AccountLayout>
//   )
// }

"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { AccountLayout } from "@/components/account/account-layout";
import { Button } from "@/components/ui/button";
import { DocumentDetailsModal } from "@/components/account/document-details-modal";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

type OrderItem = {
  date: string; // e.g., "Jun 12, 2025"
  orderId: string; // e.g., "684ab7b69a5a4080d5773ffc"
  price: string; // e.g., "$180.00"
  resourceName: string; // e.g., "Tiny shoes"
  status: "processing" | "completed" | "cancelled" | string; // include known statuses
  file: {
    url: string;
    type: string;
  };
};

export default function OrderHistoryPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const itemsPerPage = 10;

  const { data: session, status } = useSession();
  const token = session?.user?.accessToken;
  const isLoggedIn = status === "authenticated";

  // Fetch orders from API
  const {
    data: apiResponse,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["order-history"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/orders`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch order history");
      }

      const responseData = await res.json();
      return responseData;
    },
    enabled: isLoggedIn && !!token, // Only run query when user is authenticated and token exists
  });

  // console.log('orders', apiResponse)

  // Extract orders from API response
  const orders = apiResponse?.data || [];
  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const paginatedOrders = orders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  console.log("orders", orders);

  console.log("orders", orders)

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleViewDetails = (orderId: string) => {
    setSelectedOrderId(orderId);
    console.log("orderid", orderId);
  };

  const handleDownload = (orderId: string, resourceName: string, price: string) => {
    console.log("download id ", orderId)
    
    // Find the specific order item that matches the orderId, resourceName, and price
    const orderItem = orders.find((order: OrderItem) => 
      order.orderId === orderId && 
      order.resourceName === resourceName && 
      order.price === price
    )
    
    if (orderItem && orderItem.file && orderItem.file.url) {
      // Open the file URL in a new tab
      window.open(orderItem.file.url, '_blank')
      console.log("Downloading file from:", orderItem.file.url)
    } else {
      console.error("File URL not found for this order")
      // You could show a toast notification here if needed
    }
  }

  const handleCloseModal = () => {
<<<<<<< HEAD
    setSelectedOrderId(null);
  };
=======
    setSelectedOrderId(null)
  }
>>>>>>> 6cf059c (new add downlod)

  // Function to get status styling
  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-[#016102] text-white";
      case "processing":
        return "bg-[#ff9900] text-white";
      case "pending":
        return "bg-[#ff9900] text-white";
      case "cancelled":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  // Function to format status text
  const formatStatus = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  };

  // Show loading state
  if (isLoading) {
    return (
      <AccountLayout activeTab="orders">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden border-2 border-[#23547B] p-4 sm:p-6 md:p-8">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#23547B] mx-auto mb-4"></div>
              <div className="text-lg text-gray-600">Loading orders...</div>
            </div>
          </div>
        </div>
      </AccountLayout>
    );
  }

  // Show error state
  if (error) {
    return (
      <AccountLayout activeTab="orders">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden border-2 border-[#23547B] p-4 sm:p-6 md:p-8">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="text-lg text-red-600 mb-2">
                Failed to load orders
              </div>
              <div className="text-sm text-gray-600">
                Please check your connection and try again.
              </div>
            </div>
          </div>
        </div>
      </AccountLayout>
    );
  }

  // Show empty state
  if (!orders || orders.length === 0) {
    return (
      <AccountLayout activeTab="orders">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden border-2 border-[#23547B] p-4 sm:p-6 md:p-8">
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="text-lg text-gray-600 mb-2">No orders found</div>
              <div className="text-sm text-gray-500">
                You haven&apos;t made any orders yet.
              </div>
            </div>
          </div>
        </div>
      </AccountLayout>
    );
  }

  return (
    <AccountLayout activeTab="orders">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden border-2 border-[#23547B] p-4 sm:p-6 md:p-8">
        <div className="overflow-x-auto border-2 border-[#23547B] rounded-lg">
          <table className="w-full min-w-[640px]">
            <thead className="bg-gray-50 border-b border-black">
              <tr>
                {["Resource Name", "Price", "Date", "Status", "Action"].map(
                  (heading) => (
                    <th
                      key={heading}
                      className="py-3 px-4 text-xs sm:text-sm md:text-base text-center font-medium text-black border-r last:border-r-0 border-r-black"
                    >
                      {heading}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-black">
              {paginatedOrders.map((order: OrderItem, index: number) => (
                <tr
                  key={`${order.orderId}-${index}`}
                  className="hover:bg-gray-50 text-xs sm:text-sm md:text-base"
                >
                  <td className="py-3 px-4 text-center border-r last:border-r-0 border-r-black">
                    {order.resourceName}
                  </td>
                  <td className="py-3 px-4 text-center border-r last:border-r-0 border-r-black">
                    {order.price}
                  </td>
                  <td className="py-3 px-4 text-center border-r last:border-r-0 border-r-black">
                    {order.date}
                  </td>
                  <td className="py-3 px-4 text-center border-r last:border-r-0 border-r-black">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                        order.status
                      )}`}
                    >
                      {formatStatus(order.status)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center border-r last:border-r-0 border-r-black">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                      <button
                        onClick={() => handleViewDetails(order.orderId)}
                        className="text-[#424242] underline text-sm hover:text-[#23547B] transition-colors"
                      >
                        View Details
                      </button>
                      <Button
                        variant="outline"
                        size="icon"
<<<<<<< HEAD
                        onClick={() =>
                          handleDownload(
                            order.orderId,
                            order.resourceName,
                            order.price
                          )
                        }
=======
                        onClick={() => handleDownload(order.orderId, order.resourceName, order.price)}
>>>>>>> 6cf059c (new add downlod)
                        className="text-white border-[#2c5d7c] bg-[#23547B] hover:bg-[#2c5d7c]/10"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination - Only show if there are multiple pages */}
        {totalPages > 1 && (
          <div className="py-4 px-4 sm:px-6 mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-700 text-center sm:text-left">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, orders.length)} of{" "}
              {orders.length} results
            </div>
            <div className="flex flex-wrap gap-1 items-center justify-center">
              <Button
                variant="default"
                size="icon"
                className="h-8 w-8 bg-[#016102] hover:bg-[#016102]/90"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </Button>

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNumber = i + 1;
                return (
                  <Button
                    key={pageNumber}
                    variant={pageNumber === currentPage ? "default" : "outline"}
                    size="sm"
                    className={
                      pageNumber === currentPage
                        ? "bg-[#016102] hover:bg-[#016102]/90"
                        : ""
                    }
                    onClick={() => handlePageChange(pageNumber)}
                  >
                    {pageNumber}
                  </Button>
                );
              })}

              {totalPages > 5 && (
                <>
                  <span className="px-2 text-sm text-gray-500">...</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(totalPages)}
                    className={
                      totalPages === currentPage
                        ? "bg-[#016102] text-white hover:bg-[#016102]/90"
                        : ""
                    }
                  >
                    {totalPages}
                  </Button>
                </>
              )}

              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 hover:bg-gray-50"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      <DocumentDetailsModal
        isOpen={!!selectedOrderId}
        onClose={handleCloseModal}
        orderId={selectedOrderId}
      />
    </AccountLayout>
<<<<<<< HEAD
  );
=======
  )
>>>>>>> 6cf059c (new add downlod)
}
