"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2 } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

interface SearchResult {
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
  images: string[];
  createdBy: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    profileImage: string;
  };
  status: string;
  practiceAreas: string[];
  productId: string;
  createdAt: string;
  averageRating: number;
  totalReviews: number;
}

interface SearchResponse {
  success: boolean;
  message: string;
  data: SearchResult[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

const fetchSearchResults = async (query: string): Promise<SearchResponse> => {
  if (!query.trim()) {
    return {
      success: true,
      message: "No query provided",
      data: [],
      pagination: {
        currentPage: 1,
        totalPages: 0,
        totalItems: 0,
        itemsPerPage: 10,
      },
    };
  }

  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_API_URL
    }/resource/get-all-resources?status=approved&search=${encodeURIComponent(
      query
    )}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch search results");
  }

  return response.json();
};

export function SearchModal({
  isOpen,
  onClose,
  initialQuery = "",
}: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
  const router = useRouter();

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Reset search when modal opens
  useEffect(() => {
    if (isOpen) {
      setSearchQuery(initialQuery);
      setDebouncedQuery(initialQuery);
    }
  }, [isOpen, initialQuery]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["search", debouncedQuery],
    queryFn: () => fetchSearchResults(debouncedQuery),
    enabled: debouncedQuery.length > 0,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const handleProductClick = (productId: string) => {
    router.push(`/products/${productId}`);
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setDebouncedQuery(searchQuery);
    }
  };

  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>/g, "");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center justify-between">
            <span>Search Products</span>
          </DialogTitle>
        </DialogHeader>

        {/* Search Input */}
        <form onSubmit={handleSubmit} className="flex-shrink-0 mb-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-4 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              autoFocus
            />
            <Button
              type="submit"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#23547B] hover:bg-[#1a3f5c] rounded-md"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </form>

        {/* Search Results */}
        <div className="flex-1 overflow-y-auto">
          {isLoading && debouncedQuery && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin mr-2" />
              <span>Searching...</span>
            </div>
          )}

          {error && (
            <div className="text-center py-8 text-red-600">
              <p>Error searching products. Please try again.</p>
            </div>
          )}

          {!isLoading &&
            !error &&
            debouncedQuery &&
            data?.data.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No products found for &apos;{debouncedQuery}&apos;</p>
                <p className="text-sm">
                  Try different keywords or check your spelling
                </p>
              </div>
            )}

          {!debouncedQuery && (
            <div className="text-center py-8 text-gray-500">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Start typing to search for products</p>
            </div>
          )}

          {data?.data && data.data.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-600">
                  Found {data.pagination.totalItems} result
                  {data.pagination.totalItems !== 1 ? "s" : ""} for &apos;
                  {debouncedQuery}&apos;
                </p>
              </div>

              <div className="grid gap-4">
                {data?.data?.map((product) => (
                  <div
                    key={product._id}
                    onClick={() => handleProductClick(product?._id)}
                    className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group"
                  >
                    {/* Product Image */}
                    <div className="flex-shrink-0 ">
                      <div className="w-16 h-16 md:w-20 md:h-20 relative rounded-lg overflow-hidden bg-gray-100">
                        <Image
                          src={product?.thumbnail || "/images/no-image.jpg"}
                          alt={product?.title || "No Image"}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                            {product.title}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                            {stripHtml(product.description)}
                          </p>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-1 mt-2">
                            <Badge variant="secondary" className="text-xs">
                              {product.format}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {product.country}
                            </Badge>
                            {product.practiceAreas
                              .slice(0, 1)
                              .map((area, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {area}
                                </Badge>
                              ))}
                          </div>
                        </div>

                        {/* Price */}
                        <div className="flex-shrink-0 text-right ml-4">
                          <div className="flex items-center space-x-2">
                            {product.discountPrice < product.price && (
                              <span className="text-sm text-gray-500 line-through">
                                ${product.price}
                              </span>
                            )}
                            <span className="font-semibold text-lg text-green-600">
                              ${product.discountPrice}
                            </span>
                          </div>
                          {product.averageRating > 0 && (
                            <div className="text-xs text-gray-500 mt-1">
                              ⭐ {product.averageRating.toFixed(1)} (
                              {product.totalReviews})
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination Info */}
              {data.pagination.totalPages > 1 && (
                <div className="text-center text-sm text-gray-500 mt-4 pt-4 border-t">
                  Showing page {data.pagination.currentPage} of{" "}
                  {data.pagination.totalPages}
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
