"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Trash2, Edit, MessageCircle, Plus } from "lucide-react"
import { Pagination } from "@/components/ui/pagination"
import { MessageModal } from "./message-modal"
import { ResourceSkeleton } from "./resource-skeleton"
import Link from "next/link"
import Image from "next/image"
import { EditResourceModal } from "./edit-resource-modal"

interface Resource {
  id: string
  name: string
  price: number
  discountPrice: number
  quantity: number
  format: string
  date: string
  status: "Pending" | "Approved" | "Rejected"
  image: string
}

const mockResources: Resource[] = [
  {
    id: "1140",
    name: "Resource Name Admissibility of evidence in civil proceedings",
    price: 8.0,
    discountPrice: 0.25,
    quantity: 100,
    format: "All Format",
    date: "04/21/2025 03:18pm",
    status: "Pending",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "1142",
    name: "Advanced Contract Law Principles and Applications",
    price: 12.5,
    discountPrice: 2.0,
    quantity: 75,
    format: "PDF",
    date: "04/20/2025 02:30pm",
    status: "Approved",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "1141",
    name: "Criminal Law Procedures and Evidence Handling",
    price: 15.0,
    discountPrice: 3.0,
    quantity: 50,
    format: "DOC",
    date: "04/19/2025 01:45pm",
    status: "Rejected",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "1143",
    name: "Corporate Governance and Compliance Guidelines",
    price: 20.0,
    discountPrice: 4.0,
    quantity: 30,
    format: "All Format",
    date: "04/18/2025 11:20am",
    status: "Approved",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "1144",
    name: "Intellectual Property Rights and Patent Law",
    price: 18.0,
    discountPrice: 3.5,
    quantity: 40,
    format: "PDF",
    date: "04/17/2025 09:15am",
    status: "Pending",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "1145",
    name: "Employment Law and Workplace Regulations",
    price: 14.0,
    discountPrice: 2.5,
    quantity: 60,
    format: "All Format",
    date: "04/16/2025 03:45pm",
    status: "Rejected",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "1146",
    name: "Environmental Law and Sustainability Compliance",
    price: 16.0,
    discountPrice: 3.2,
    quantity: 45,
    format: "DOC",
    date: "04/15/2025 10:30am",
    status: "Approved",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "1147",
    name: "Tax Law and Financial Regulations Overview",
    price: 22.0,
    discountPrice: 4.5,
    quantity: 25,
    format: "PDF",
    date: "04/14/2025 02:20pm",
    status: "Pending",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "1148",
    name: "International Trade Law and Import/Export Regulations",
    price: 25.0,
    discountPrice: 5.0,
    quantity: 20,
    format: "All Format",
    date: "04/13/2025 04:10pm",
    status: "Approved",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "1149",
    name: "Real Estate Law and Property Transactions",
    price: 19.0,
    discountPrice: 3.8,
    quantity: 35,
    format: "DOC",
    date: "04/12/2025 01:25pm",
    status: "Rejected",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "1150",
    name: "Family Law and Domestic Relations Procedures",
    price: 13.0,
    discountPrice: 2.6,
    quantity: 55,
    format: "PDF",
    date: "04/11/2025 11:40am",
    status: "Pending",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "1151",
    name: "Healthcare Law and Medical Compliance Standards",
    price: 21.0,
    discountPrice: 4.2,
    quantity: 28,
    format: "All Format",
    date: "04/10/2025 09:55am",
    status: "Approved",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "1152",
    name: "Banking and Financial Services Regulations",
    price: 17.0,
    discountPrice: 3.4,
    quantity: 42,
    format: "DOC",
    date: "04/09/2025 03:15pm",
    status: "Rejected",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "1153",
    name: "Insurance Law and Claims Processing Guidelines",
    price: 15.5,
    discountPrice: 3.1,
    quantity: 38,
    format: "PDF",
    date: "04/08/2025 12:30pm",
    status: "Pending",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "1154",
    name: "Constitutional Law and Civil Rights Framework",
    price: 24.0,
    discountPrice: 4.8,
    quantity: 22,
    format: "All Format",
    date: "04/07/2025 02:45pm",
    status: "Approved",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "1155",
    name: "Administrative Law and Government Procedures",
    price: 18.5,
    discountPrice: 3.7,
    quantity: 33,
    format: "DOC",
    date: "04/06/2025 10:20am",
    status: "Rejected",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "1156",
    name: "Maritime Law and Shipping Regulations",
    price: 20.5,
    discountPrice: 4.1,
    quantity: 26,
    format: "PDF",
    date: "04/05/2025 04:35pm",
    status: "Pending",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "1157",
    name: "Aviation Law and Air Transport Regulations",
    price: 23.0,
    discountPrice: 4.6,
    quantity: 24,
    format: "All Format",
    date: "04/04/2025 01:50pm",
    status: "Approved",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "1158",
    name: "Cybersecurity Law and Data Protection Compliance",
    price: 26.0,
    discountPrice: 5.2,
    quantity: 18,
    format: "DOC",
    date: "04/03/2025 11:15am",
    status: "Rejected",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "1159",
    name: "Sports Law and Entertainment Industry Regulations",
    price: 16.5,
    discountPrice: 3.3,
    quantity: 41,
    format: "PDF",
    date: "04/02/2025 03:25pm",
    status: "Pending",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "1160",
    name: "Energy Law and Renewable Resources Compliance",
    price: 19.5,
    discountPrice: 3.9,
    quantity: 31,
    format: "All Format",
    date: "04/01/2025 09:40am",
    status: "Approved",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "1161",
    name: "Immigration Law and Visa Processing Procedures",
    price: 17.5,
    discountPrice: 3.5,
    quantity: 37,
    format: "DOC",
    date: "03/31/2025 02:10pm",
    status: "Rejected",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "1162",
    name: "Antitrust Law and Competition Regulations",
    price: 21.5,
    discountPrice: 4.3,
    quantity: 27,
    format: "PDF",
    date: "03/30/2025 12:55pm",
    status: "Pending",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "1163",
    name: "Securities Law and Investment Regulations",
    price: 22.5,
    discountPrice: 4.5,
    quantity: 25,
    format: "All Format",
    date: "03/29/2025 04:20pm",
    status: "Approved",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "1164",
    name: "Telecommunications Law and Digital Communications",
    price: 18.0,
    discountPrice: 3.6,
    quantity: 36,
    format: "DOC",
    date: "03/28/2025 10:45am",
    status: "Rejected",
    image: "/placeholder.svg?height=60&width=60",
  },
]

export function ResourceStatus() {
  const [resources, setResources] = useState<Resource[]>(mockResources)
  const [loading] = useState(false)
  const [currentPage] = useState(1)
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null)
  const [messageModalOpen, setMessageModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [editingResource, setEditingResource] = useState<Resource | null>(null)
  const itemsPerPage = 10

  const handleDelete = (id: string) => {
    setResources(resources.filter((resource) => resource.id !== id))
  }

  // const handleStatusChange = (id: string, newStatus: Resource["status"]) => {
  //   setResources(resources.map((resource) => (resource.id === id ? { ...resource, status: newStatus } : resource)))
  // }

  const handleMessageClick = (resource: Resource) => {
    setSelectedResource(resource)
    setMessageModalOpen(true)
  }

  const handleEdit = (resource: Resource) => {
    setEditingResource(resource)
    setEditModalOpen(true)
  }

  const handleUpdateResource = (updatedResource: Resource) => {
    setResources(resources.map((resource) => (resource.id === updatedResource.id ? updatedResource : resource)))
    setEditModalOpen(false)
    setEditingResource(null)
  }

  const getStatusColor = (status: Resource["status"]) => {
    switch (status) {
      case "Pending":
        return "bg-orange-100 text-orange-800"
      case "Approved":
        return "bg-green-100 text-green-800"
      case "Rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const paginatedResources = resources.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // const totalPages = Math.ceil(resources.length / itemsPerPage)

  if (loading) {
    return <ResourceSkeleton />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Resource List</h1>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>Dashboard</span>
            <span>›</span>
            <span>resource List</span>
          </div>
        </div>
        <Link href="/resources/add">
          <Button className="bg-slate-700 hover:bg-slate-800">
            <Plus className="w-4 h-4 mr-2" />
            Add Resource
          </Button>
        </Link>
      </div>

      {/* Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b">
              <tr>
                <th className="text-left p-4 font-medium text-gray-900">Resource Name</th>
                <th className="text-left p-4 font-medium text-gray-900">ID</th>
                <th className="text-left p-4 font-medium text-gray-900">Price</th>
                <th className="text-left p-4 font-medium text-gray-900">Discount Price</th>
                <th className="text-left p-4 font-medium text-gray-900">Quantity</th>
                <th className="text-left p-4 font-medium text-gray-900">Format</th>
                <th className="text-left p-4 font-medium text-gray-900">Date</th>
                <th className="text-left p-4 font-medium text-gray-900">Action</th>
                <th className="text-left p-4 font-medium text-gray-900">Status</th>
              </tr>
            </thead>
            <tbody>
              {paginatedResources.map((resource) => (
                <tr key={resource.id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <Image
                        src={resource.image || "/placeholder.svg"}
                        alt="Resource"
                        width={60}
                        height={60}
                        className="rounded-lg object-cover"
                      />
                      <span className="font-medium text-gray-900 max-w-xs truncate">{resource.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-600">{resource.id}</td>
                  <td className="p-4 text-gray-600">${resource.price.toFixed(2)}</td>
                  <td className="p-4 text-gray-600">${resource.discountPrice.toFixed(2)}</td>
                  <td className="p-4 text-gray-600">{resource.quantity}</td>
                  <td className="p-4 text-gray-600">{resource.format}</td>
                  <td className="p-4 text-gray-600 text-sm">{resource.date}</td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(resource)}
                        className="text-gray-400 hover:text-blue-600"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(resource.id)}
                        className="text-gray-400 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleMessageClick(resource)}
                        className="text-gray-400 hover:text-green-600"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge className={getStatusColor(resource.status)}>{resource.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between p-4 border-t">
          <span className="text-sm text-gray-600">
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, resources.length)}{" "}
            of {resources.length} results
          </span>
          {/* <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} /> */}
        </div>
      </Card>

      {/* Message Modal */}
      <MessageModal open={messageModalOpen} onOpenChange={setMessageModalOpen} resource={selectedResource} />

      {/* Edit Resource Modal */}
      <EditResourceModal
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        resource={editingResource}
        onUpdate={handleUpdateResource}
      />
    </div>
  )
}
