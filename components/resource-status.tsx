"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Trash2, Edit, MessageCircle, Plus, AlertTriangle, Loader2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
// import type { Resource, ApiResponse } from "@/lib/types"
import { ResourceSkeleton } from "./resource-skeleton"
// import { MessageModal } from "./message-modal"
import { EditResourceModal } from "./edit-resource-modal"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination"
import { useSession } from "next-auth/react"


// Types
export interface ResourceFile {
  url: string
  type: string
}

export interface Resource {
  _id: string
  title: string
  country: string
  states: string[]
  resourceType: string[]
  description: string
  price: number
  discountPrice: number
  quantity: number
  format: string
  thumbnail: string // Assuming this is the image URL
  createdBy: string
  status: string // "Pending", "Approved", "Rejected"
  practiceAreas: string[]
  productId: string
  file: ResourceFile
  createdAt: string // Date string e.g., "2024-04-21T15:18:00.000Z"
  updatedAt: string // Date string
  __v: number
}

export interface ApiResponse {
  status: boolean
  message: string
  data: Resource[]
}


export function ResourceStatus() {
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5 // Adjusted for better demo with potentially fewer items

  // const [selectedResourceForMessage, setSelectedResourceForMessage] = useState<Resource | null>(null)
  // const [messageModalOpen, setMessageModalOpen] = useState(false)
  const [editingResource, setEditingResource] = useState<Resource | null>(null)
  const [editModalOpen, setEditModalOpen] = useState(false)

  const queryClient = useQueryClient()

  // IMPORTANT: Replace with your actual API URL and token management strategy
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://api.example.com" // Fallback for safety

      const session = useSession();
      const token = session?.data?.user?.accessToken;
  // const token =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODFhZGYyYjVmYzQyNjAwMGM4MWQ2Y2UiLCJyb2xlIjoiU0VMTEVSIiwiaWF0IjoxNzUwMDU0Mjc1LCJleHAiOjE3NTA2NTkwNzV9.2HLQzofcpP-dZgsdKe1wrin7-XL-IrtH77tQbQcC5Hg"

  // Fetch resources
  const {
    data: apiResponse,
    isLoading,
    error,
  } = useQuery<ApiResponse, Error>({
    queryKey: ["resources", currentPage], // Add currentPage to queryKey if API supports pagination
    queryFn: async () => {
      // If your API supports pagination, pass page and limit query params
      // const response = await fetch(`${baseUrl}/resource/my-resource?page=${currentPage}&limit=${itemsPerPage}`, {
      const response = await fetch(`${baseUrl}/resource/my-resource`, {
        // Assuming API returns all for now
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: "Failed to fetch resources" }))
        throw new Error(errorData.message || "Failed to fetch resources")
      }
      return response.json()
    },
    // enabled: !!baseUrl, // Ensure baseUrl is available
  })

  // Delete resource mutation
  const deleteMutation = useMutation<ApiResponse, Error, string>({
    mutationFn: async (id: string) => {
      const response = await fetch(`${baseUrl}/resource/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: "Failed to delete resource" }))
        throw new Error(errorData.message || "Failed to delete resource")
      }
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resources"] })
      setDeleteId(null)
      // Optionally, show a success toast
    },
    onError: (error) => {
      // Optionally, show an error toast
      console.error("Delete failed:", error.message)
      setDeleteId(null)
    },
  })

  const handleDeleteClick = (id: string) => {
    setDeleteId(id)
  }

  const confirmDelete = () => {
    if (deleteId) {
      deleteMutation.mutate(deleteId)
    }
  }

  const resources = apiResponse?.data || []

  // Client-side pagination (if API doesn't support it or for simplicity)
  const totalItems = resources.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const paginatedResources = resources.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }


  // handle message 
  // const handleMessageClick = (resource: Resource) => {
  //   setSelectedResourceForMessage(resource)
  //   setMessageModalOpen(true)
  // }

  const handleEdit = (resource: Resource) => {
    setEditingResource(resource)
    setEditModalOpen(true)
  }

  const handleUpdateResource = (updatedResource: Resource) => {
    // This would typically involve another mutation to update the resource on the backend
    // For now, we'll just close the modal and rely on query invalidation if an update mutation was made
    console.log("Updated resource (client-side placeholder):", updatedResource)
    queryClient.invalidateQueries({ queryKey: ["resources"] }) // Invalidate if you had an update mutation
    setEditModalOpen(false)
    setEditingResource(null)
  }

  const getStatusColor = (status: string | undefined) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-yellow-400 hover:bg-yellow-500 text-yellow-900"
      case "approved":
        return "bg-green-500 hover:bg-green-600 text-white"
      case "rejected":
        return "bg-red-500 hover:bg-red-600 text-white"
      default:
        return "bg-gray-200 hover:bg-gray-300 text-gray-800"
    }
  }

  if (isLoading) {
    return <ResourceSkeleton />
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-red-600 bg-red-50 rounded-lg shadow">
        <AlertTriangle className="w-12 h-12 mb-4" />
        <h2 className="text-xl font-semibold mb-2">Error Loading Resources</h2>
        <p className="text-center">{error.message}</p>
        <Button onClick={() => queryClient.invalidateQueries({ queryKey: ["resources"] })} className="mt-4">
          Try Again
        </Button>
      </div>
    )
  }

  if (!baseUrl || baseUrl === "https://api.example.com") {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-orange-600 bg-orange-50 rounded-lg shadow">
        <AlertTriangle className="w-12 h-12 mb-4" />
        <h2 className="text-xl font-semibold mb-2">Configuration Incomplete</h2>
        <p className="text-center">Please set the `NEXT_PUBLIC_API_URL` environment variable.</p>
        <p className="text-sm text-gray-500 mt-2">Currently using fallback: {baseUrl}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col mt-[56px] mx-auto sm:flex-row sm:items-center sm:justify-between gap-4 px-4 md:px-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Resource List</h1>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>Dashboard</span>
            <span>›</span>
            <span>Resource List</span>
          </div>
        </div>
        <Link href="/dashboard/resources/add">
          <Button className="bg-slate-700 hover:bg-slate-800 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Resource
          </Button>
        </Link>
      </div>

      <Card className="border-none shadow-none">
        <div className="overflow-x-auto bg-[#EDEEF1]">
          <table className="w-full min-w-[1000px]">
            <thead className="border-b">
              <tr className="hover:bg-gray-50">
                <th className="text-left px-6 py-4 font-medium text-gray-900">Resource Name</th>
                <th className="text-left px-4 py-4 font-medium text-gray-900">ID</th>
                <th className="text-left px-4 py-4 font-medium text-gray-900">Price</th>
                <th className="text-left px-4 py-4 font-medium text-gray-900">Discount</th>
                <th className="text-left px-4 py-4 font-medium text-gray-900">Quantity</th>
                <th className="text-left px-4 py-4 font-medium text-gray-900">Format</th>
                <th className="text-left px-4 py-4 font-medium text-gray-900">Date</th>
                <th className="text-left px-4 py-4 font-medium text-gray-900">Action</th>
                <th className="text-left px-4 py-4 font-medium text-gray-900">Status</th>
              </tr>
            </thead>
            <tbody>
              {paginatedResources.length === 0 && !isLoading ? (
                <tr>
                  <td colSpan={9} className="text-center py-10 text-gray-500">
                    No resources found.
                  </td>
                </tr>
              ) : (
                paginatedResources.map((resource) => (
                  <tr key={resource._id} className="border-b border-[#B6B6B6] hover:bg-gray-50 bg-white">
                    <td className="px-6 py-3">
                      <div className="flex items-center space-x-3">
                        <Image
                          src={resource.thumbnail || "/placeholder.svg?height=60&width=60&query=resource+thumbnail"}
                          alt={resource.title}
                          width={60}
                          height={60}
                          className="rounded-lg object-cover aspect-square"
                        />
                        <span className="font-medium text-[#424242] text-sm max-w-xs truncate" title={resource.title}>
                          {resource.title}
                        </span>
                      </div>
                    </td>
                    <td className="font-medium text-[#424242] text-sm px-4 py-3 truncate" title={resource._id}>
                      {resource._id}
                    </td>
                    <td className="font-medium text-[#424242] text-sm px-4 py-3">${resource.price?.toFixed(2)}</td>
                    <td className="font-medium text-[#424242] text-sm px-4 py-3">
                      ${resource.discountPrice?.toFixed(2)}
                    </td>
                    <td className="font-medium text-[#424242] text-sm px-4 py-3">{resource.quantity}</td>
                    <td className="font-medium text-[#424242] text-sm px-4 py-3">{resource.format}</td>
                    <td className="font-medium text-[#424242] text-sm px-4 py-3">
                      {new Date(resource.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(resource)}
                          className="text-[#424242] hover:text-blue-600"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteClick(resource._id)}
                              className="text-[#424242] hover:text-red-600"
                              title="Delete"
                              disabled={deleteMutation.isPending && deleteId === resource._id}
                            >
                              {deleteMutation.isPending && deleteId === resource._id ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Trash2 className="w-4 h-4" />
                              )}
                            </Button>
                          </AlertDialogTrigger>
                          {deleteId === resource._id && (
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will permanently delete the resource titled &quot;
                                  {resource.title}&quot;.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel onClick={() => setDeleteId(null)}>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={confirmDelete}
                                  className="bg-red-600 hover:bg-red-700"
                                  disabled={deleteMutation.isPending}
                                >
                                  {deleteMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          )}
                        </AlertDialog>
                        <Button
                          variant="ghost"
                          size="icon"
                          // onClick={() => handleMessageClick(resource)}
                          className="text-[#424242] hover:text-green-600"
                          title="Message"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge className={`${getStatusColor(resource.status)} text-xs`}>{resource.status || "N/A"}</Badge>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between p-4 border-t bg-white">
            <span className="text-sm text-gray-600">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of{" "}
              {totalItems} results
            </span>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      handlePageChange(currentPage - 1)
                    }}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : undefined}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  if (
                    totalPages <= 5 || // Show all pages if 5 or less
                    page === 1 || // Always show first page
                    page === totalPages || // Always show last page
                    (page >= currentPage - 1 && page <= currentPage + 1) // Show current and adjacent pages
                  ) {
                    return (
                      <PaginationItem key={page}>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault()
                            handlePageChange(page)
                          }}
                          isActive={currentPage === page}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  } else if (
                    (page === currentPage - 2 && currentPage > 3) ||
                    (page === currentPage + 2 && currentPage < totalPages - 2)
                  ) {
                    // Show ellipsis
                    return <PaginationEllipsis key={`ellipsis-${page}`} />
                  }
                  return null
                })}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      handlePageChange(currentPage + 1)
                    }}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : undefined}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </Card>

      {/* <MessageModal open={messageModalOpen} onOpenChange={setMessageModalOpen} resource={selectedResourceForMessage} /> */}

      <EditResourceModal
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        resource={editingResource}
        onUpdate={handleUpdateResource}
      />
    </div>
  )
}
