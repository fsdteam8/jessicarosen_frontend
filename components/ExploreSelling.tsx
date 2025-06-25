"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { useAppSelector } from "@/redux/hooks";
import { useQuery } from "@tanstack/react-query";
import { AllProductDataTypeResponse } from "@/types/all-product-dataType";
import TableSkeletonWrapper from "./shared/TableSkeletonWrapper/TableSkeletonWrapper";
import ErrorContainer from "./shared/ErrorContainer/ErrorContainer";
import NotFound from "./shared/NotFound/NotFound";

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
          `${process.env.NEXT_PUBLIC_API_URL}/resource/get-all-resources?country=${countryName}&status=approved`
        ).then((res) => res.json()),
      enabled: !!countryName,
    });

  let content;

  if (isLoading) {
    content = (
      <div className="w-full p-5">
        <TableSkeletonWrapper
          count={6}
          width="100%"
          height="320px"
          className="bg-[#E6EEF6]"
        />
      </div>
    );
  } else if (isError) {
    content = (
      <div>
        <ErrorContainer message={error?.message || "Something went wrong"} />
      </div>
    );
  } else if (data && data?.data && data?.data?.length === 0) {
    content = (
      <div>
        <NotFound message="Oops! No data available. Modify your filters or check your internet connection." />
      </div>
    );
  } else if (data && data?.data && data?.data?.length > 0) {
    content = (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {data?.data?.slice(0, 6)?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#E9EEF2] py-12 px-4">
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-[40px] font-semibold text-gray-900 mb-4">
            Explore Top Selling Resources in{" "}
            {currentRegion === "canada" ? "Canada" : "US"}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Widely used materials that help students, legal professionals, and
            researchers understand and apply legal principles.
          </p>
        </div>

        {/* Products Grid */}
        {data && data?.data && data?.data?.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-[#23547B] text-lg font-semibold">
              No resources available for{" "}
              {currentRegion === "canada" ? "Canada" : "United States"}
            </p>
          </div>
        ) : (
          <>
            <div>{content}</div>

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
