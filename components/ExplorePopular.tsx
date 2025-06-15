"use client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { useAppSelector } from "@/redux/hooks";
import { AllProductDataTypeResponse } from "@/types/all-product-dataType";
import { useQuery } from "@tanstack/react-query";

const ExplorePopular = () => {
  const currentRegion = useAppSelector((state) => state.region.currentRegion);
  const countryName =
    currentRegion === "canada"
      ? "Canada"
      : currentRegion === "us"
      ? "USA"
      : null;

  const { data, isLoading, error, isError } =
    useQuery<AllProductDataTypeResponse>({
      queryKey: ["all-products", countryName],
      queryFn: () =>
        fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/resource/most-popular?country=${countryName}`
        ).then((res) => res.json()),
      enabled: !!countryName,
    });

  const products = data?.data;

  if (isLoading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">Error: {error.message}</div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-[40px] font-semibold text-gray-900 mb-4">
            Explore Most Popular Resources
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From everyday essentials to the latest trends, we bring you a
            seamless shopping experience with unbeatable deals,
            delivery.discover
          </p>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {products?.slice(0, 6)?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        {/* See More Button */}
        <div className="text-center">
          <Link href="/products">
            <button className="px-8 py-3 font-bold text-[#23547B] text-lg border-b-2 border-[#23547B]">
              See More <ArrowRight className="inline-block ml-2" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ExplorePopular;
