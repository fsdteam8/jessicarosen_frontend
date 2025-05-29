"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Trash2, Plus } from "lucide-react"
import { Pagination } from "@/components/ui/pagination"
import { ResourceSkeleton } from "./resource-skeleton"
import Link from "next/link"
import Image from "next/image"

interface Resource {
  id: string
  name: string
  price: number
  discountPrice: number
  quantity: number
  format: string
  date: string
  image: string
}

const mockResources: Resource[] = Array.from({ length: 45 }, (_, i) => {
  const resourceNames = [
    "Resource Name Admissibility of evidence in civil proceedings",
    "Advanced Contract Law Principles and Applications",
    "Criminal Law Procedures and Evidence Handling",
    "Corporate Governance and Compliance Guidelines",
    "Intellectual Property Rights and Patent Law",
    "Employment Law and Workplace Regulations",
    "Environmental Law and Sustainability Compliance",
    "Tax Law and Financial Regulations Overview",
    "International Trade Law and Import/Export Regulations",
    "Real Estate Law and Property Transactions",
    "Family Law and Domestic Relations Procedures",
    "Healthcare Law and Medical Compliance Standards",
    "Banking and Financial Services Regulations",
    "Insurance Law and Claims Processing Guidelines",
    "Constitutional Law and Civil Rights Framework",
    "Administrative Law and Government Procedures",
    "Maritime Law and Shipping Regulations",
    "Aviation Law and Air Transport Regulations",
    "Cybersecurity Law and Data Protection Compliance",
    "Sports Law and Entertainment Industry Regulations",
    "Energy Law and Renewable Resources Compliance",
    "Immigration Law and Visa Processing Procedures",
    "Antitrust Law and Competition Regulations",
    "Securities Law and Investment Regulations",
    "Telecommunications Law and Digital Communications",
  ]

  const formats = ["All Format", "PDF", "DOC"]
  const prices = [8.0, 12.5, 15.0, 18.0, 20.0, 22.0, 25.0]
  const discounts = [0.25, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0]
  const quantities = [25, 50, 75, 100, 125, 150]

  return {
    id: `114${i}`,
    name: resourceNames[i % resourceNames.length],
    price: prices[i % prices.length],
    discountPrice: discounts[i % discounts.length],
    quantity: quantities[i % quantities.length],
    format: formats[i % formats.length],
    date: `04/${String(21 - (i % 20)).padStart(2, "0")}/2025 ${String(Math.floor(Math.random() * 12) + 1).padStart(2, "0")}:${String(Math.floor(Math.random() * 60)).padStart(2, "0")}pm`,
    image: "/placeholder.svg?height=60&width=60",
  }
})

export function ResourceList() {
  const [resources, setResources] = useState<Resource[]>(mockResources)
  const [loading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortField, setSortField] = useState<keyof Resource>("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const itemsPerPage = 10

  const handleSort = (field: keyof Resource) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const handleDelete = (id: string) => {
    setResources(resources.filter((resource) => resource.id !== id))
  }

  const sortedResources = [...resources].sort((a, b) => {
    const aValue = a[sortField]
    const bValue = b[sortField]

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue
    }

    return 0
  })

  const paginatedResources = sortedResources.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const totalPages = Math.ceil(sortedResources.length / itemsPerPage)

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
            <span>›</span>
            <span>List</span>
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
                <th
                  className="text-left p-4 font-medium text-gray-900 cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSort("name")}
                >
                  Resource Name
                </th>
                <th
                  className="text-left p-4 font-medium text-gray-900 cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSort("id")}
                >
                  ID
                </th>
                <th
                  className="text-left p-4 font-medium text-gray-900 cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSort("price")}
                >
                  Price
                </th>
                <th className="text-left p-4 font-medium text-gray-900">Discount Price</th>
                <th
                  className="text-left p-4 font-medium text-gray-900 cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSort("quantity")}
                >
                  Quantity
                </th>
                <th className="text-left p-4 font-medium text-gray-900">Format</th>
                <th
                  className="text-left p-4 font-medium text-gray-900 cursor-pointer hover:bg-gray-50"
                  onClick={() => handleSort("date")}
                >
                  Date
                </th>
                <th className="text-left p-4 font-medium text-gray-900">Action</th>
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
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(resource.id)}
                      className="text-gray-400 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between p-4 border-t">
          <span className="text-sm text-gray-600">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
            {Math.min(currentPage * itemsPerPage, sortedResources.length)} of {sortedResources.length} results
          </span>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
      </Card>
    </div>
  )
}
