
"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

export default function BestSellers() {
  const { data, isLoading } = useQuery({
    queryKey: ["bestseller"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/custom/bestseller`
      );
      if (!res.ok) throw new Error("Failed to fetch best sellers");
      const json = await res.json();
      return json?.data || null;
    },
    retry: false,
  });


  const { title, description, image = [] } = data || {};

  return (
    <section className="w-full bg-[#EACB93] pb-6 pt-12 md:py-12 lg:py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content Section */}
          <div className="space-y-6 lg:space-y-8 order-2 lg:order-1">
            <div className="space-y-2 md:space-y-4 lg:space-y-6">
              {isLoading ? (
                <>
                  <div className="h-10 md:h-12 lg:h-[60px] bg-gray-300 rounded w-3/4 animate-pulse"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-300 rounded w-full animate-pulse"></div>
                    <div className="h-4 bg-gray-300 rounded w-5/6 animate-pulse"></div>
                    <div className="h-4 bg-gray-300 rounded w-2/3 animate-pulse"></div>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-[26px] md:text-4xl lg:text-[48px] font-bold text-gray-900 leading-tight">
                    {title}
                  </h2>
                  <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed max-w-2xl">
                    {description}
                  </p>
                </>
              )}
            </div>
            <div>
              {isLoading ? (
                <div className="h-12 w-[206px] bg-gray-300 rounded animate-pulse"></div>
              ) : (
                <Link href="/products">
                  <Button className="w-[206px] h-[48px] bg-white text-[#424242] hover:bg-gray-100 px-[28px] py-[14px] text-base sm:text-lg font-bold rounded-[8px] transition-all duration-200 hover:shadow-lg">
                    Explore Resources
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Images Section */}
          <div className="relative order-1 lg:order-2">
            <div className="flex gap-4 sm:gap-6 lg:gap-4 xl:gap-6 justify-center lg:justify-end">
              {[0, 1].map((i) => (
                <div
                  key={i}
                  className={`relative group ${i === 0
                    ? "-mt-6 sm:-mt-8 lg:-mt-12"
                    : "-mb-6 sm:-mb-8 lg:-mb-12"
                    }`}
                >
                  <div className="relative w-full max-w-[188px]   sm:max-w-[240px] md:max-w-[280px] lg:max-w-[240px] xl:max-w-[188px] mx-auto sm:mx-0">
                    {isLoading ? (
                      <div className="h-[336px] bg-gray-300 rounded-2xl animate-pulse"></div>
                    ) : image[i] ? (
                      <Image
                        src={image[i]}
                        alt={`Best Seller ${i + 1}`}
                        width={188}
                        height={336}
                        className="w-full h-[250px] md:h-auto rounded-2xl shadow-lg transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 280px"
                        unoptimized
                      />
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
