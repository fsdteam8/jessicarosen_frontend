"use client"

import { useState } from "react"
import { Download } from "lucide-react"
import { AccountLayout } from "@/components/account/account-layout"
import { Button } from "@/components/ui/button"
import { DocumentDetailsModal } from "@/components/account/document-details-modal"

// Mock data for orders
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
      <div className="bg-white rounded-lg shadow-sm overflow-hidden border-2 border-black">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr className="">
                <th className="py-4 px-6 text-center font-medium text-gray-700">Resource Name</th>
                <th className="py-4 px-6 text-center font-medium text-gray-700">Price</th>
                <th className="py-4 px-6 text-center font-medium text-gray-700">Date</th>
                <th className="py-4 px-6 text-center font-medium text-gray-700">Status</th>
                <th className="py-4 px-6 text-center font-medium text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {paginatedOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="py-4 px-6 text-center">{order.name}</td>
                  <td className="py-4 px-6 text-center">${order.price.toFixed(2)}</td>
                  <td className="py-4 px-6 text-center">{order.date}</td>
                  <td className="py-4 px-6 text-center">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        order.status === "Delivered" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 flex justify-center">
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-[#2c5d7c] border-[#2c5d7c] hover:bg-[#2c5d7c]/10"
                        onClick={() => handleViewDetails(order.id)}
                      >
                        View Details
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="text-[#2c5d7c] border-[#2c5d7c] hover:bg-[#2c5d7c]/10"
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
        <div className="py-4 px-6 bg-white border-t flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, mockOrders.length)}{" "}
            of {mockOrders.length} results
          </div>
          <div className="flex space-x-1">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <span className="sr-only">Previous</span>
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
                  className={pageNumber === currentPage ? "bg-[#2c5d7c]" : ""}
                  onClick={() => handlePageChange(pageNumber)}
                >
                  {pageNumber}
                </Button>
              )
            })}
            {totalPages > 5 && (
              <>
                <span className="px-2">...</span>
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
              <span className="sr-only">Next</span>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </div>
        </div>
      </div>

      {/* Document Details Modal */}
      <DocumentDetailsModal isOpen={!!selectedDocument} onClose={handleCloseModal} />
    </AccountLayout>
  )
}
