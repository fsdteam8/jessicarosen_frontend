"use client"

import { useState } from "react"
import { Download } from "lucide-react"
import { AccountLayout } from "@/components/account/account-layout"
import { Button } from "@/components/ui/button"
import { DocumentDetailsModal } from "@/components/account/document-details-modal"

const mockOrders = Array(20)
  .fill(null)
  .map((_, index) => ({
    id: `order-${index + 1}`,
    name: "Muslim Law",
    price: 10.0,
    date: "Feb 10, 2025",
    status: index % 3 === 0 ? "Pending" : "Delivered",
  }))

export default function OrderHistoryPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null)
  const itemsPerPage = 10
  const totalPages = Math.ceil(mockOrders.length / itemsPerPage)

  const paginatedOrders = mockOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return
    setCurrentPage(page)
  }

  const handleViewDetails = (orderId: string) => {
    setSelectedDocument(orderId)
  }

  const handleCloseModal = () => {
    setSelectedDocument(null)
  }

  return (
    <AccountLayout activeTab="orders">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden border-2 border-[#23547B] p-4 sm:p-6 md:p-8">
        <div className="overflow-x-auto border-2 border-[#23547B] rounded-lg">
          <table className="w-full min-w-[640px]">
            <thead className="bg-gray-50 border-b border-black">
              <tr>
                {["Resource Name", "Price", "Date", "Status", "Action"].map((heading) => (
                  <th
                    key={heading}
                    className="py-3 px-4 text-xs sm:text-sm md:text-base text-center font-medium text-black border-r last:border-r-0 border-r-black"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-black">
              {paginatedOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 text-xs sm:text-sm md:text-base">
                  <td className="py-3 px-4 text-center border-r last:border-r-0 border-r-black">{order.name}</td>
                  <td className="py-3 px-4 text-center border-r last:border-r-0 border-r-black">${order.price.toFixed(2)}</td>
                  <td className="py-3 px-4 text-center border-r last:border-r-0 border-r-black">{order.date}</td>
                  <td className="py-3 px-4 text-center border-r last:border-r-0 border-r-black">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        order.status === "Delivered" ? "bg-[#016102] text-white" : "bg-[#ff9900] text-white"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center border-r last:border-r-0 border-r-black">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                      <button
                        onClick={() => handleViewDetails(order.id)}
                        className="text-[#424242] underline text-sm"
                      >
                        View Details
                      </button>
                      <Button
                        variant="outline"
                        size="icon"
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

        {/* Pagination */}
        <div className="py-4 px-4 sm:px-6 mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-700 text-center sm:text-left">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, mockOrders.length)} of {mockOrders.length} results
          </div>
          <div className="flex flex-wrap gap-1 items-center justify-center">
            <Button
              variant="default"
              size="icon"
              className="h-8 w-8 bg-[#016102]"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNumber = i + 1
              return (
                <Button
                  key={pageNumber}
                  variant={pageNumber === currentPage ? "default" : "outline"}
                  size="sm"
                  className={pageNumber === currentPage ? "bg-[#016102]" : ""}
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber}
                </Button>
              )
            })}
            {totalPages > 5 && (
              <>
                <span className="px-2 text-sm">...</span>
                <Button variant="outline" size="sm" onClick={() => handlePageChange(totalPages)}>
                  {totalPages}
                </Button>
              </>
            )}
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <DocumentDetailsModal isOpen={!!selectedDocument} onClose={handleCloseModal} />
    </AccountLayout>
  )
}



