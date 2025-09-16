"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { Edit, Plus, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Types
interface ResourceFile {
  url: string;
  type: string;
}

interface Resource {
  _id: string;
  title: string;
  country: string;
  states: string[];
  resourceType: string[];
  description: string;
  price: number;
  discountPrice: number;
  quantity: number;
  format: string;
  thumbnail: string;
  createdBy: string;
  status: string;
  practiceAreas: string[];
  productId: string;
  file: ResourceFile;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ApiResponse {
  status: boolean;
  message: string;
  data: Resource[];
}

export default function ResourcesTable() {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const router = useRouter();

  const session = useSession();
  console.log("session", session);

  const token = session?.data?.user?.accessToken;

  const queryClient = useQueryClient();

  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleEdit = (id: string) => {
  router.push(`/dashboard/resources/edit/${id}`);
};

  // Fetch resources
  const { data, isLoading, error } = useQuery({
    queryKey: ["resources"],
    queryFn: async () => {
      const response = await fetch(`${baseUrl}/resource/my-resource`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch resources");
      }

      return response.json() as Promise<ApiResponse>;
    },
    enabled: true,
  });

  // console.log("Resources Data:", data);
  // Delete resource mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`${baseUrl}/resource/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete resource");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resources"] });
      setDeleteId(null);
    },
  });

  // Handle delete confirmation
  const handleDelete = (id: string) => {
    setDeleteId(id);
  };

  const confirmDelete = () => {
    if (deleteId) {
      deleteMutation.mutate(deleteId);
    }
  };

  // Pagination
  const resources = data?.data || [];
  const totalPages = Math.ceil(resources.length / itemsPerPage);
  const paginatedResources = resources.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading resources...</div>;
  }

  if (error) {
    return (
      <div className="flex justify-center p-8 text-red-500">
        Error loading resources: {error.message}
      </div>
    );
  }

  return (
    <div className=" mx-auto py-8">
      {/* Header */}
      <div className="flex flex-col mb-[32px] sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-[8px] text-[#131313]">
            Resource List
          </h1>
          <div className="flex items-center space-x-2 text-[16px] font-medium text-[#929292]">
            <span>Dashboard</span>
            <span>›</span>
            <span>resource List</span>
            <span>›</span>
            <span>List</span>
          </div>
        </div>
        <Link href="/dashboard/resources/add">
          <Button className="bg-[#525773] py-[15px] hover:bg-slate-800">
            <Plus className="w-4 h-4 mr-2" />
            Add Resource
          </Button>
        </Link>
      </div>

      <div className="   rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className=" ">Resource Name</TableHead>
              <TableHead className=" ">ID</TableHead>
              <TableHead className=" ">Price</TableHead>
              <TableHead className=" ">Discount Price</TableHead>
              <TableHead className=" ">Quantity</TableHead>
              <TableHead className=" ">Format</TableHead>
              <TableHead className=" ">Date</TableHead>
              <TableHead className=" ">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedResources.map((resource) => (
              <TableRow
                key={resource._id}
                className="border-t border-gray-800 border-b-[#B6B6B6] hover:bg-gray-50"
              >
                <TableCell className="flex items-center gap-3">
                  <div className="w-16 h-16 relative">
                    <Image
                      src={
                        resource.thumbnail ||
                        "/placeholder.svg?height=64&width=64"
                      }
                      alt={resource.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className=" ">{resource.title}</span>
                </TableCell>
                <TableCell className=" ">{resource.productId}</TableCell>
                <TableCell className=" ">
                  ${resource?.price?.toFixed(2)}
                </TableCell>
                <TableCell className=" ">
                  ${resource.discountPrice.toFixed(2)}
                </TableCell>
                <TableCell className=" ">{resource.quantity}</TableCell>
                <TableCell className=" ">{resource.format}</TableCell>
                <TableCell className=" ">
                  {format(new Date(resource.createdAt), "MM/dd/yyyy hh:mma")}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(resource._id)}
                    title="Edit"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(resource._id)}
                    className="  hover:text-red-400"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, resources.length)} of{" "}
          {resources.length} results
        </div>

        <div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className={
                    currentPage === 1 ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => {
                  // Show first page, current page, last page, and pages around current
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <PaginationItem key={page}>
                        <PaginationLink
                          isActive={page === currentPage}
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  }

                  // Show ellipsis for gaps
                  if (page === 2 && currentPage > 3) {
                    return (
                      <PaginationItem key="ellipsis-start">
                        <PaginationEllipsis />
                      </PaginationItem>
                    );
                  }

                  if (page === totalPages - 1 && currentPage < totalPages - 2) {
                    return (
                      <PaginationItem key="ellipsis-end">
                        <PaginationEllipsis />
                      </PaginationItem>
                    );
                  }

                  return null;
                }
              )}

              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!deleteId}
        onOpenChange={(open) => !open && setDeleteId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              resource.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No, Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Yes, Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
