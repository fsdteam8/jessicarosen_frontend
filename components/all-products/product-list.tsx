"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import { Bookmark, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FaStar } from "react-icons/fa";
import { useCart } from "@/hooks/use-cart";
import { useWishlist } from "@/hooks/use-wishlist";
import Link from "next/link";
import { AllProductDataTypeResponse } from "@/types/all-product-dataType";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { JessicaPagination } from "../ui/JessicaPagination";

interface ProductListProps {
  viewMode?: "grid" | "list";
}

export default function ProductList({ viewMode = "list" }: ProductListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const { addItem } = useCart();
  const {
    addItem: addToWish,
    removeItem: removeFromWish,
    items: wishlistItems,
  } = useWishlist();

  // Check if the product is already in the wishlist
  const isInWishlist = (productId: number | string) => {
    return wishlistItems.some((item) => item.id === productId);
  };

  const addToCart = (item: any) => {
    addItem({ ...item, quantity: 1 });
  };

  const toggleWishlist = (item: any) => {
    if (isInWishlist(item.id)) {
      removeFromWish(item.id);
    } else {
      addToWish({ ...item, quantity: 1 });
    }
  };

  // Fetching all products data

  const { data, isLoading, error, isError } =
    useQuery<AllProductDataTypeResponse>({
      queryKey: ["all-products", currentPage],
      queryFn: () =>
        fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/resource/get-all-resources?page=${currentPage}&limit=7`
        ).then((res) => res.json()),
    });

  console.log(data);
  const products = data?.data || [];
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-semibold">Loading products...</p>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-semibold text-red-500">
          {error?.message || "Something went wrong"}
        </p>
      </div>
    );
  }

  return (
    <div>
      <div
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
            : "space-y-6"
        }
      >
        {products?.map((product) => (
          <Card
            key={product._id}
            className="overflow-hidden border-0 shadow-none rounded-[15px] bg-none"
          >
            {viewMode === "grid" ? (
              // Grid View Layout
              <div className="flex flex-col h-full">
                <div className="w-full">
                  <Image
                    src={
                      (Array.isArray(product?.thumbnail)
                        ? product?.thumbnail[0]
                        : product?.thumbnail) || "/placeholder.svg"
                    }
                    alt={product?.title}
                    width={324}
                    height={240}
                    className="object-cover w-full h-[200px] sm:h-[240px] rounded-[8px]"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between p-4">
                  <div className="space-y-3">
                    <h3 className="text-base sm:text-lg font-medium leading-[120%] text-[#2A2A2A] line-clamp-2">
                      {product.title}
                    </h3>

                    <div className="flex items-center gap-2">
                      <Image
                        src={
                          product?.createdBy?.profileImage || "/placeholder.svg"
                        }
                        alt={product?.createdBy?.firstName}
                        width={40}
                        height={40}
                        className="w-[40px] h-[40px] rounded-full flex-shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-normal text-[#2A2A2A] leading-[150%]">
                          Created by
                        </p>
                        <h4 className="text-sm text-[#23547B] font-bold leading-[120%] truncate">
                          {product?.createdBy?.firstName}{" "}
                          {product?.createdBy?.lastName}
                        </h4>
                      </div>
                    </div>

                    <p
                      dangerouslySetInnerHTML={{
                        __html: product?.description ?? "",
                      }}
                      className="text-sm text-[#424242] font-normal leading-[150%] line-clamp-3"
                    />

                    <div className="text-sm font-medium text-[#131313] leading-[120%]">
                      {product?.practiceAreas.join(", ")}
                    </div>
                  </div>

                  <div className="mt-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-[#FF0000] font-medium leading-[120%] line-through">
                          ${product?.price}
                        </div>
                        <div className="text-base font-medium text-[#424242] leading-[120%]">
                          Price: ${product?.discountPrice}
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        <span className="text-sm font-medium text-[#131313] leading-[120%]">
                          {product?.averageRating}
                        </span>
                        <FaStar size={16} color="#FFD700" />
                        <span className="text-sm font-medium text-[#616161] leading-[120%]">
                          ({product?.totalReviews}K)
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Button
                        size="sm"
                        className="bg-[#23547B] text-sm font-bold text-white leading-[120%] py-2 rounded-[8px] w-full"
                        onClick={() => addToCart(product)}
                      >
                        Add To Cart
                      </Button>

                      <Button
                        size="sm"
                        onClick={() => toggleWishlist(product)}
                        className={`text-sm font-bold leading-[120%] py-2 w-full transition-all duration-200 ${
                          isInWishlist(product._id)
                            ? "bg-green-50 border-[2px] border-green-600 text-green-600 hover:bg-green-100"
                            : "bg-transparent border-[2px] border-[#23547B] text-[#23547B] hover:bg-blue-50"
                        }`}
                      >
                        {isInWishlist(product._id) ? (
                          <>
                            <Check className="w-4 h-4 mr-1" />
                            In Wishlist
                          </>
                        ) : (
                          <>
                            <Bookmark className="w-4 h-4 text-[#23547B] mr-1" />
                            Wish List
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // List View Layout

              <div className="flex flex-col md:flex-row gap-6 md:gap-7 lg:gap-8 p-8">
                <div className="flex-shrink-0">
                  <Link className="" href={`/products/${product._id}`}>
                    <Image
                      src={
                        Array.isArray(product?.thumbnail)
                          ? product?.thumbnail[0]
                          : product?.thumbnail || "/placeholder.svg"
                      }
                      alt={product?.title}
                      width={324}
                      height={324}
                      className="object-cover w-full md:w-[324px] h-[324px] rounded-[8px]"
                    />
                  </Link>
                </div>

                <div className="flex-1">
                  <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 h-full">
                    <div className="flex-1">
                      <h3 className="text-lg md:text-[19px] lg:text-xl text-[#2A2A2A] font-medium leading-[120%] tracking-normal mb-2">
                        {product.title}
                      </h3>

                      <div className="flex items-center gap-2 mb-2">
                        <Image
                          src={
                            product?.createdBy?.profileImage ||
                            "/placeholder.svg"
                          }
                          alt={product?.createdBy?.firstName}
                          width={49}
                          height={49}
                          className="w-[49px] h-[49px] rounded-full"
                        />
                        <div>
                          <p className="text-xs font-normal text-[#2A2A2A] leading-[150%] pb-1">
                            Created by
                          </p>
                          <h4 className="text-base text-[#23547B] font-bold leading-[120%] tracking-normal">
                            {product?.createdBy?.firstName}{" "}
                            {product?.createdBy?.lastName}
                          </h4>
                        </div>
                      </div>

                      <p
                        dangerouslySetInnerHTML={{
                          __html: product?.description ?? "",
                        }}
                        className="text-base text-[#424242] font-normal leading-[150%] tracking-normal mb-4"
                      />

                      <div className="text-base font-medium text-[#131313] leading-[120%] tracking-normal">
                        {product?.practiceAreas.join(", ")}
                      </div>
                    </div>

                    <div className="flex-shrink-0 lg:w-[250px]">
                      <div className="h-full flex flex-col justify-center">
                        <div className="text-sm text-[#FF0000] font-medium leading-[120%] tracking-normal line-through pb-2">
                          ${product?.price}
                        </div>
                        <div className="text-base font-medium text-[#424242] leading-[120%] tracking-normal mb-4 md:mb-6 lg:mb-8">
                          Price: ${product?.discountPrice}
                        </div>

                        <div className="flex items-center gap-1 mb-4 md:mb-5 lg:mb-6">
                          <span className="text-base font-medium text-[#131313] leading-[120%] tracking-normal">
                            {product?.averageRating}
                          </span>
                          <FaStar size={20} color="#FFD700" />
                          <span className="text-base font-medium text-[#616161] leading-[120%] tracking-normal">
                            ({product?.totalReviews}K)
                          </span>
                        </div>

                        <div className="space-y-3 md:space-y-4 lg:space-y-6">
                          <Button
                            size="lg"
                            className="bg-[#23547B] text-base font-bold text-white leading-[120%] tracking-normal py-[14px] rounded-[8px] w-full max-w-[250px]"
                            onClick={() => addToCart(product)}
                          >
                            Add To Cart
                          </Button>

                          <Button
                            size="lg"
                            onClick={() => toggleWishlist(product)}
                            className={`text-base md:text-[17px] lg:text-lg font-bold leading-[120%] tracking-normal py-[13px] w-full max-w-[250px] transition-all duration-200 ${
                              isInWishlist(product._id)
                                ? "bg-green-50 border-[2px] border-green-600 text-green-600 hover:bg-green-100"
                                : "bg-transparent border-[2px] border-[#23547B] text-[#23547B] hover:bg-blue-50"
                            }`}
                          >
                            {isInWishlist(product._id) ? (
                              <>
                                <Check className="w-6 h-6 mr-2" />
                                In Wishlist
                              </>
                            ) : (
                              <>
                                <Bookmark className="w-6 h-6 text-[#23547B] mr-2" />
                                Wish List
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
      <div className="pb-[88px] pt-4">
        {data && data?.pagination && data?.pagination?.totalPages > 1 && (
          <JessicaPagination
            currentPage={data.pagination.currentPage}
            totalPages={data.pagination.totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        )}
      </div>
    </div>
  );
}
