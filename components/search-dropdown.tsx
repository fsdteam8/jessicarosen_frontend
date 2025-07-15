
"use client";

import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Loader2, Search } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { AllProductDataTypeResponse } from "@/types/all-product-dataType";

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

interface Props {
  query: string;
  onClose: () => void;
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

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/resource/get-all-resources?status=approved&search=${encodeURIComponent(query)}`
  );

  if (!res.ok) throw new Error("Failed to fetch search results");
  return res.json();
};

export const SearchDropdown = ({ query, onClose }: Props) => {
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["search", debouncedQuery],
    queryFn: () => fetchSearchResults(debouncedQuery),
    enabled: debouncedQuery.length > 0,
  });

  const stripHtml = (html: string) => html.replace(/<[^>]*>/g, "");
  const handleClick = (textOrId: string) => {
    router.push(`/products/${encodeURIComponent(textOrId)}`);
    onClose();
  };

    const { data: allProductData } = useQuery<AllProductDataTypeResponse>({
      queryKey: ["all-products"],
      queryFn: () =>
        fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/resource/get-all-resources`
        ).then((res) => res.json()),
    });

    console.log(allProductData?.data)

  return (
    <div
      ref={dropdownRef}
      className="absolute z-50 top-full mt-2 w-full max-h-96 bg-white border border-gray-200 rounded-xl shadow-lg overflow-auto"
    >
      {/* Tip Section */}
      {/* <div className="px-4 py-2 text-sm text-gray-500 border-b">
        Tip: Use quotes to only see results with that exact phrase (e.g., “Provident ”)
      </div> */}

      {/* Static Suggestions */}
      {!debouncedQuery && (
        <>
          <div className="px-4 pt-2 pb-1 text-sm font-semibold text-gray-700">
            Popular Now
          </div>
          <ul className="divide-y divide-gray-100">
            {allProductData?.data.map((item, idx) => (
              <li
                key={idx}
                onClick={() => handleClick(item._id)}
                className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-sm text-gray-700"
              >
                {item.title}
              </li>
            ))}
          </ul>
        </>
      )}

      {/* API Suggestions */}
      {debouncedQuery && isLoading && (
        <div className="flex items-center justify-center py-6 text-gray-600">
          <Loader2 className="animate-spin mr-2 h-5 w-5" />
          Searching...
        </div>
      )}

      {debouncedQuery && error && (
        <div className="p-4 text-red-600 text-center">Error searching. Try again.</div>
      )}

      {debouncedQuery && !isLoading && data?.data?.length === 0 && (
        <div className="p-4 text-gray-500 text-center">
          <Search className="mx-auto mb-2 h-6 w-6" />
          No results found.
        </div>
      )}

      {debouncedQuery && data?.data && (
        <ul className="divide-y divide-gray-100">
          {data.data.map((product) => (
            <li
              key={product._id}
              onClick={() => handleClick(product._id)}
              className="flex items-start gap-4 px-4 py-3 hover:bg-gray-100 cursor-pointer transition-all"
            >
              <div className="w-14 h-14 relative flex-shrink-0">
                <Image
                  src={product.thumbnail || "/images/no-image.jpg"}
                  alt={product.title}
                  fill
                  className="rounded object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-800 line-clamp-1">{product.title}</h4>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {stripHtml(product.description)}
                </p>
                <div className="mt-1 flex flex-wrap gap-1 text-xs">
                  <Badge variant="secondary">{product.format}</Badge>
                  <Badge variant="outline">{product.country}</Badge>
                  {product.practiceAreas.slice(0, 1).map((area, idx) => (
                    <Badge key={idx} variant="outline">{area}</Badge>
                  ))}
                </div>
              </div>
              <div className="text-right whitespace-nowrap">
                {product.discountPrice < product.price && (
                  <div className="line-through text-xs text-gray-400">${product.price}</div>
                )}
                <div className="font-semibold text-green-600 text-sm">${product.discountPrice}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

