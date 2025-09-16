"use client";
import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { Star, MapPin, Users, Calendar, Heart } from "lucide-react";
import Products from "../../products/page";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

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
  about: string;
  profileImage: string;
  isVerified: boolean;
  address: Address;
  createdAt: string;
  followers: number;
  avgRating: string;
  ratingCount: number;
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
  const [isFollowing, setIsFollowing] = useState(false); // Track follow status

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

  const session = useSession();
  const token = session?.data?.user?.accessToken;

  const followMutation = useMutation({
    mutationFn: async (sellerId: string) => {
      if (!token) {
         toast.error("No authentication token found");
      }
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/follow/${sellerId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to follow user");
      }

      return res.json();
    },
    onSuccess: (data) => {
      toast.success(data.message || "Successfully followed user");
      setIsFollowing(true); // Set to followed state
    },
    onError: (err) => {
      toast.error(err.message || "Failed to follow user");
    },
  });

  const unfollowMutation = useMutation({
    mutationFn: async (sellerId: string) => {
      if (!token) {
        throw new Error("No authentication token found");
      }
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/unfollow/${sellerId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to unfollow user");
      }

      return res.json();
    },
    onSuccess: (data) => {
      toast.success(data.message || "Successfully unfollowed user");
      setIsFollowing(false); // Reset to unfollowed state
    },
    onError: (err) => {
      toast.error(err.message || "Failed to unfollow user");
    },
  });

  const handleFollowToggle = (id: string) => {
    if (followMutation.isPending || unfollowMutation.isPending) return; // Prevent multiple clicks
    if (isFollowing) {
      unfollowMutation.mutate(id);
    } else {
      followMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="bg-white rounded-lg p-8 shadow-sm mb-8">
              <div className="flex items-start gap-6">
                <div className="w-24 h-24 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-8 bg-gray-200 rounded w-1/3 mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-10 bg-gray-200 rounded w-24"></div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !sellerData) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center bg-white rounded-lg p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-red-600 mb-2">Error</h2>
            <p className="text-gray-600">
              {(error as Error)?.message || "Failed to load seller data"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const { sellerProfile, data: resources, pagination } = sellerData;
  const fullName = `${sellerProfile?.firstName || ""} ${
    sellerProfile?.lastName || ""
  }`.trim();

  const joinDate = new Date(sellerProfile.createdAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
    }
  );

  // Format followers count (e.g., 8762 -> "8.7K")
  const formatCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  const followersCount = formatCount(sellerProfile.followers || 0);
  const rating = parseFloat(sellerProfile.avgRating || "0");
  const ratingCount = parseFloat(String(sellerProfile.ratingCount || "0"));
  const ratingDisplay = rating.toFixed(1);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Profile Section */}
        <div className="">
          <div className="mb-6 flex justify-center md:justify-start">
            {sellerProfile.profileImage ? (
              <Image
                src={sellerProfile.profileImage}
                alt={fullName}
                width={200}
                height={200}
                className="rounded-full object-cover w-[150px] h-[150px]"
              />
            ) : (
              <div className="w-[150px] h-[150px] bg-blue-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
                {sellerProfile.firstName?.charAt(0)}
                {sellerProfile.lastName?.charAt(0)}
              </div>
            )}
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Profile Info */}
            <div className="w-full md:w-[45%] min-w-0 ">
              <h1 className="text-3xl font-bold text-gray-900 mb-3  text-center md:text-left">
                {fullName}
              </h1>

              {/* Stats Row */}
              <div className="flex justify-center md:justify-start items-center gap-6 mb-4 text-gray-600">
                {/* Rating */}
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="font-medium text-gray-900">
                    {ratingDisplay}({ratingCount})
                  </span>
                  {sellerProfile.ratingCount > 0 && (
                    <span className="text-sm">
                      ({formatCount(sellerProfile.ratingCount)})
                    </span>
                  )}
                </div>

                {/* Followers */}
                <div className="flex items-center gap-1 text-sm">
                  <span className="font-medium">{followersCount}</span>
                  <span>Followers</span>
                </div>

                {/* Location */}
                <div className="flex items-center gap-1 text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>
                    {sellerProfile.address?.cityState},{" "}
                    {sellerProfile.address?.country}
                  </span>
                </div>
              </div>

              {/* Follow/Unfollow Button */}
              <div className="flex justify-center md:justify-start">
                <button
                onClick={() => handleFollowToggle(sellerProfile?._id)}
                disabled={followMutation.isPending || unfollowMutation.isPending}
                className="inline-flex items-center gap-2 px-6 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
              >
                {followMutation.isPending || unfollowMutation.isPending ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4 mr-2 text-gray-700"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    {followMutation.isPending ? "Following..." : "Unfollowing..."}
                  </>
                ) : (
                  <>
                    <Heart className="w-4 h-4" />
                    {isFollowing ? "Unfollow" : "Follow"}
                  </>
                )}
              </button>
              </div>
            </div>
            {/* About Section */}
            <div className="flex-1 pt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                About the store
              </h2>

              <div className="prose prose-gray max-w-none">
                {sellerProfile.about ? (
                  <p className="text-gray-700 leading-relaxed">
                    {sellerProfile.about}
                  </p>
                ) : (
                  <p className="text-gray-700 leading-relaxed">
                    Discover amazing resources and educational materials from{" "}
                    {fullName}. Quality content designed to help you succeed.
                  </p>
                )}
              </div>

              {/* Additional Info */}
              <div className="mt-4 flex flex-col md:flex-row items-start md:items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {joinDate}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>{pagination.totalItems} Resources</span>
                </div>

                {sellerProfile.isVerified && (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                      <svg
                        className="w-2.5 h-2.5 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-blue-600 font-medium">Verified</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* No Resources Message */}
        {resources.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No resources found
            </h3>
            <p className="text-gray-600">
              This seller hasn&apos;t published any resources yet. Check back
              soon!
            </p>
          </div>
        )}

        {/* Pagination Info */}
        {pagination.totalPages > 1 && (
          <div className="mt-8 text-center text-sm text-gray-600 bg-white rounded-lg shadow-sm p-4">
            Showing page {pagination.currentPage} of {pagination.totalPages} (
            {pagination.totalItems} total resources)
          </div>
        )}
      </div>

      {/* Product List */}
      {resources.length > 0 && <Products />}
    </div>
  );
};

export default Page;