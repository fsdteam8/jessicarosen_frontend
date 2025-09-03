"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { Star, MapPin, Users, Calendar } from "lucide-react";
import Products from "../../products/page";

interface Address {
  country: string;
  cityState: string;
  roadArea: string;
  postalCode: string;
  taxId: string;
}

interface SellerProfile {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  gender: string;
  bio: string;
  profileImage: string;
  isVerified: boolean;
  address: Address;
  createdAt: string;
}

interface Resource {
  _id: string;
  title: string;
  country: string;
  states: string[];
  divisions: string[];
  resourceType: string[];
  description: string;
  price: number;
  discountPrice: number;
  quantity: number;
  format: string;
  file: {
    url: string;
    type: string;
  };
  thumbnail: string;
  images: string[];
  status: string;
  practiceAreas: string[];
  subPracticeAreas: string[];
  productId: string;
  createdAt: string;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: Resource[];
  sellerProfile: SellerProfile;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

const Page = ({ params }: { params: { slug: string } }) => {
  const {
    data: sellerData,
    isLoading,
    error,
  } = useQuery<ApiResponse>({
    queryKey: ["seller", params.slug],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/resource/seller/${params.slug}`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch seller data");
      }

      return res.json();
    },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !sellerData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600">Failed to load seller data</p>
        </div>
      </div>
    );
  }

  const { sellerProfile, data: resources, pagination } = sellerData;
  const fullName = `${sellerProfile.firstName} ${sellerProfile.lastName}`;
  const joinDate = new Date(sellerProfile.createdAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
    }
  );


  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}

        {/* Profile Image */}
        <div className="mb-10">
          {sellerProfile.profileImage ? (
            <Image
              src={sellerProfile.profileImage}
              alt={fullName}
              width={80}
              height={80}
              className="rounded-full object-cover"
            />
          ) : (
            <div className="w-[150px] h-[150px] bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {sellerProfile.firstName.charAt(0)}
              {sellerProfile.lastName.charAt(0)}
            </div>
          )}
        </div>

        <div className="mb-8">
          <div className="flex items-start gap-6 mb-6">
            {/* Profile Info */}
            <div className="w-[40%]">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {fullName}
              </h1>

              <div className="flex items-center gap-10 mb-3">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm font-medium text-gray-700">
                    4.9 (29.5K)
                  </span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="w-4 h-4 mr-1" />
                  {pagination.totalItems} Resources
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-1" />
                  Oregon, United States
                </div>
              </div>

              {/* {sellerProfile.isVerified && (
                <div className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full mb-3">
                  ✓ Verified Seller
                </div>
              )} */}

              <button className="px-6 py-2 border border-gray-300 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors">
                Follow
              </button>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                About the store
              </h3>
              <p className="text-gray-700 leading-relaxed mb-3">
                Discover fun and engaging educational puzzle worksheets for
                learners of all ages! Copyright © 2013 - 2025 {fullName} on TPT
              </p>
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                Joined {joinDate}
              </div>
            </div>
          </div>

          {/* About Section */}
        </div>

        {/* No Resources Message */}
        {resources.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No resources found
            </h3>
            <p className="text-gray-600">
              This seller hasn&apos;t published any resources yet.
            </p>
          </div>
        )}

        {/* Pagination Info */}
        {pagination.totalPages > 1 && (
          <div className="mt-8 text-center text-sm text-gray-600">
            Showing page {pagination.currentPage} of {pagination.totalPages}(
            {pagination.totalItems} total resources)
          </div>
        )}
      </div>
      <Products />
    </div>
  );
};

export default Page;
