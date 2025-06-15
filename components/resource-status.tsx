"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Trash2, Edit, MessageCircle, Plus } from "lucide-react";
// import { Pagination } from "@/components/ui/pagination"
import { MessageModal } from "./message-modal";
import { ResourceSkeleton } from "./resource-skeleton";
import Link from "next/link";
import Image from "next/image";
import { EditResourceModal } from "./edit-resource-modal";

interface Resource {
  id: string;
  name: string;
  price: number;
  discountPrice: number;
  quantity: number;
  format: string;
  date: string;
  status: "Pending" | "Approved" | "Rejected";
  image: string;
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
 
];

export function ResourceStatus() {
  const [resources, setResources] = useState<Resource[]>(mockResources);
  const [loading] = useState(false);
  const [currentPage] = useState(1);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(
    null
  );
  const [messageModalOpen, setMessageModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);
  const itemsPerPage = 10;

  const handleDelete = (id: string) => {
    setResources(resources.filter((resource) => resource.id !== id));
  };

  // const handleStatusChange = (id: string, newStatus: Resource["status"]) => {
  //   setResources(resources.map((resource) => (resource.id === id ? { ...resource, status: newStatus } : resource)))
  // }

  const handleMessageClick = (resource: Resource) => {
    setSelectedResource(resource);
    setMessageModalOpen(true);
  };

  const handleEdit = (resource: Resource) => {
    setEditingResource(resource);
    setEditModalOpen(true);
  };

  const handleUpdateResource = (updatedResource: Resource) => {
    setResources(
      resources.map((resource) =>
        resource.id === updatedResource.id ? updatedResource : resource
      )
    );
    setEditModalOpen(false);
    setEditingResource(null);
  };

  const getStatusColor = (status: Resource["status"]) => {
    switch (status) {
      case "Pending":
        return "bg-[#FFA300] text-white";
      case "Approved":
        return "bg-[#008000] text-white";
      case "Rejected":
        return "bg-[#CE0003] text-white";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const paginatedResources = resources.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // const totalPages = Math.ceil(resources.length / itemsPerPage)

  if (loading) {
    return <ResourceSkeleton />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col mt-[56px] mx-[50px] mb-[32px] sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Resource List</h1>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>Dashboard</span>
            <span>›</span>
            <span>resource List</span>
          </div>
        </div>
        <Link href="/dashboard/resources/add">
          <Button className="bg-slate-700 hover:bg-slate-800">
            <Plus className="w-4 h-4 mr-2" />
            Add Resource
          </Button>
        </Link>
      </div>

      {/* Table */}
      <Card className="border-none shadow-none">
        <div className="overflow-x-auto bg-[#EDEEF1]">
          <table className="w-full">
            <thead className="border-b">
              <tr className="hover:bg-gray-50">
                <th  className="text-left px-[50px] py-[15px] font-medium text-gray-900 cursor-pointer ">
                  Resource Name
                </th>
                <th className="text-left p-4 py-[15px] font-medium text-gray-900 cursor-pointer ">ID</th>
                <th  className="text-left p-4 py-[15px] font-medium text-gray-900 cursor-pointer ">
                  Price
                </th>
                <th  className="text-left p-4 py-[15px] font-medium text-gray-900 cursor-pointer ">
                  Discount Price
                </th>
                <th  className="text-left p-4 py-[15px] font-medium text-gray-900 cursor-pointer ">
                  Quantity
                </th>
                <th  className="text-left p-4 py-[15px] font-medium text-gray-900 cursor-pointer ">
                  Format
                </th>
                <th  className="text-left p-4 py-[15px] font-medium text-gray-900 cursor-pointer ">
                  Date
                </th>
                <th  className="text-left p-4 py-[15px] font-medium text-gray-900 cursor-pointer ">
                  Action
                </th>
                <th className="text-left p-4 py-[15px] font-medium text-gray-900 cursor-pointer ">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedResources.map((resource) => (
                <tr key={resource.id} className="border-b-[#B6B6B6] border hover:bg-gray-50">
                  <td className="px-[50px]">
                    <div className="flex items-center space-x-3">
                      <Image
                        src={"/images/image.png"}
                        alt="Resource"
                        width={60}
                        height={60}
                        className="rounded-lg object-cover"
                      />
                      <span className="font-medium text-[#424242] text-[16px] max-w-xs truncate">
                        {resource.name}
                      </span>
                    </div>
                  </td>
                  <td className="font-medium text-[#424242] text-[16px]">{resource.id}</td>
                  <td className="font-medium text-[#424242] text-[16px]">
                    ${resource.price.toFixed(2)}
                  </td>
                  <td className="font-medium text-[#424242] text-[16px]">
                    ${resource.discountPrice.toFixed(2)}
                  </td>
                  <td className="font-medium text-[#424242] text-[16px]">{resource.quantity}</td>
                  <td className="font-medium text-[#424242] text-[16px]">{resource.format}</td>
                  <td className="font-medium text-[#424242] text-[16px]">{resource.date}</td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(resource)}
                        className="text-[#424242] hover:text-blue-600"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(resource.id)}
                        className="text-[#424242] hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleMessageClick(resource)}
                        className="text-[#424242] hover:text-green-600"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge className={getStatusColor(resource.status)}>
                      {resource.status}
                    </Badge>
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
            {Math.min(currentPage * itemsPerPage, resources.length)} of{" "}
            {resources.length} results
          </span>
          {/* <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} /> */}
        </div>
      </Card>

      {/* Message Modal */}
      <MessageModal
        open={messageModalOpen}
        onOpenChange={setMessageModalOpen}
        resource={selectedResource}
      />

      {/* Edit Resource Modal */}
      <EditResourceModal
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
        resource={editingResource}
        onUpdate={handleUpdateResource}
      />
    </div>
  );
}
