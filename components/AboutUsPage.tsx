
"use client";

import React from "react";
import Image from "next/image";
import LegalDoc from "./HomePage/LegalDoc";
import { useQuery } from "@tanstack/react-query";

export default function AboutUsPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["about"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/custom/about`);
      if (!res.ok) {
        throw new Error("Failed to fetch about data");
      }
      const json = await res.json();
      return json.data;
    },
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-700 text-lg">Loading About information...</p>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-600 text-lg">Failed to load About information.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="space-y-8 sm:space-y-12 lg:space-y-16">
          {/* About Section */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 xl:gap-24">
            {/* Left Content */}
            <div className="flex-1 space-y-8 sm:space-y-10 lg:space-y-12">
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                  {data.title}
                </h1>
                
                <div
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: data.description }}
                />
              </div>

              {/* Statistics Section */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 py-6 sm:py-8">
                <div className="text-center bg-gray-50 p-4 sm:p-6 rounded-lg">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                    30K+
                  </div>
                  <div className="text-gray-600 text-sm sm:text-base">Our Users</div>
                </div>
                <div className="text-center bg-gray-50 p-4 sm:p-6 rounded-lg">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                    12K+
                  </div>
                  <div className="text-gray-600 text-sm sm:text-base">
                    Satisfied Lawyers
                  </div>
                </div>
                <div className="text-center bg-gray-50 p-4 sm:p-6 rounded-lg">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                    2K+
                  </div>
                  <div className="text-gray-600 text-sm sm:text-base">Mentor List</div>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="flex-shrink-0 w-full lg:w-auto order-first lg:order-last">
              <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] w-full lg:w-[400px] xl:w-[516px] rounded-lg overflow-hidden mx-auto">
                <Image
                  src={data.image}
                  alt={data.title || "About image"}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 516px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <LegalDoc />
    </div>
  );
}
