"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { useAppSelector } from "@/redux/hooks";
import { useQuery } from "@tanstack/react-query";
import { AllProductDataTypeResponse } from "@/types/all-product-dataType";

const ExploreSelling = () => {
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
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/resource/get-all-resources?country=${countryName}`
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
            Explore Top Selling Resources in Canada
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Widely used materials that help students, legal professionals, and
            researchers understand and apply legal principles.
          </p>
        </div>

        {/* Products Grid */}
        {products?.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-[#23547B] text-lg font-semibold">
              No resources available for{" "}
              {currentRegion === "canada" ? "Canada" : "United States"}
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {products?.map((product) => (
                <ProductCard key={product?._id} product={product} />
              ))}
            </div>

            {/* See More Button */}
            <div className="text-center">
              <Link
                href="/products"
                className="px-8 py-3 font-bold text-[#23547B] text-lg border-b-2 border-[#23547B] inline-flex items-center gap-2 hover:bg-[#23547B] hover:text-white transition-colors duration-200"
              >
                See More <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ExploreSelling;
