"use client";
import Image from "next/image";
import { useAppSelector } from "@/redux/hooks";
import { useQuery } from "@tanstack/react-query";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
// } from "@/components/ui/carousel";
// import { useRef } from "react";
// import Autoplay from "embla-carousel-autoplay";
import { Button } from "./ui/button";
import Link from "next/link";

interface PromoCode {
  _id: string;
  code: string;
  discountValue: number;
  special: boolean;
  active: boolean;
}

interface ApiResponse {
  status: boolean;
  data: {
    data: PromoCode[];
  };
}

// interface HeroPromoCarouselProps {
//   specialPromos: PromoCode[];
// }

// function HeroPromoCarousel({ specialPromos }: HeroPromoCarouselProps) {
//   const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));

//   if (specialPromos.length === 0) {
//     return (
//       <div className="lg:mt-4">
//         <p className="text-[32px] font-bold text-[#E0B15E]">30%</p>
//         <p className="text-base font-medium leading-[120%]">
//           Purchase discount.
//         </p>
//         <p className="text-sm text-[#E0B15E] mt-1">Code: SAVE30</p>
//       </div>
//     );
//   }

//   if (specialPromos.length === 1) {
//     return (
//       <div className="lg:mt-4">
//         <p className="text-[32px] font-bold text-[#E0B15E]">
//           {specialPromos[0].discountValue}%
//         </p>
//         <p className="text-base font-medium leading-[120%]">
//           Purchase discount.
//         </p>
//         <p className="text-sm text-[#E0B15E] mt-1">
//           Code: {specialPromos[0].code}
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="lg:mt-4">
//       <Carousel
//         className="w-full max-w-xs"
//         plugins={[plugin.current]}
//         onMouseEnter={plugin.current.stop}
//         onMouseLeave={plugin.current.reset}
//         opts={{
//           align: "center",
//           loop: true,
//         }}
//       >
//         <CarouselContent>
//           {specialPromos.map((promo) => (
//             <CarouselItem key={promo._id}>
//               <div className="text-center">
//                 <p className="text-[32px] font-bold text-[#E0B15E]">
//                   {promo.discountValue}%
//                 </p>
//               </div>
//             </CarouselItem>
//           ))}
//         </CarouselContent>
//       </Carousel>
//     </div>
//   );
// }

export default function HomeHero() {
  const currentRegion = useAppSelector((state) => state.region.currentRegion);
  const countryName =
    currentRegion === "canada"
      ? "Canada"
      : currentRegion === "us"
      ? "USA"
      : "Canada";

  // Fetch promo codes for hero section
  const { isLoading, error } = useQuery<ApiResponse>({
    queryKey: ["hero-promo"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/promo-codes`);
      if (!res.ok) {
        throw new Error("Failed to fetch promo codes");
      }
      return res.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 10 * 60 * 1000, // 10 minutes
  });

  // Filter special promo codes
  // const specialPromoCodes =
  //   data?.data.data.filter((promo) => promo.special && promo.active) || [];

  if (isLoading) {
    return (
      <div className="w-full lg:my-[48px] my-5 bg-none ">
        <section className="relative w-full container mx-auto bg-gray-400 rounded-lg">
          <div className="relative h-[300px] sm:h-[350px] md:h-[400px] lg:h-[600px] w-full rounded-lg overflow-hidden animate-pulse flex items-center justify-center border">
            {/* <p className="text-gray-500">Loading...</p> */}
            <Image
              src="/images/no-image.jpg"
              alt="no-image"
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full lg:my-[48px] my-5 bg-none">
        <section className="relative w-full container mx-auto">
          <div className="relative h-[300px] sm:h-[350px] md:h-[400px] lg:h-[600px] w-full rounded-lg overflow-hidden bg-red-100 flex items-center justify-center">
            <p className="text-red-600">Error loading promo codes</p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="w-full my-5 bg-none">
      {/* Hero Section */}
      <section className="relative w-full container mx-auto">
        <div className="relative h-[300px] sm:h-[350px] md:h-[370px] lg:h-[400px] w-full rounded-lg overflow-hidden">
          {/* Background Image */}
          <Image
            src={
              countryName === "Canada"
                ? "/images/canadaImg.png"
                : "/images/canadaImage.svg"
            }
            alt="Hero Image"
            height={650}
            width={1200}
            className="object-cover w-full h-full rounded-lg"
            priority
          />

          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/30 rounded-lg" />

          {/* Text Content */}
          <div className="absolute inset-0 flex lg:px-16 px-5 mt-[3%]">
            <div className="text-white">
              {countryName === "USA" && (
                <div className="flex items-center gap-2">
                  <Image
                    src="/images/flage.png"
                    alt="Flag"
                    width={100}
                    height={100}
                  />
                  <p className="text-sm font-semibold">US Laws</p>
                </div>
              )}

              <h1 className="lg:text-[48px] text-4xl font-bold leading-[120%] lg:my-7 my-3 text-start">
                {/* Deal Of The <span className="text-[#E0B15E]">Day</span>! */}
              </h1>
              <p className=" text-3xl font-normal leading-[150%] text-[#E7E7E7] max-w-xl text-start">
                Real lawyers. Real documents. Real money. Access proven legal
                materials. Upload your own. Get paid
              </p>
              <div className="flex items-center justify-center w-[95%] mz"></div>

              <div className="lg:mt-6 text-start flex justify-arround items-center">
                <div className="lg:h-[54px] lg:w-[222px] ">
                  <Link href="/products">
                    <Button className="w-full h-full text-lg font-bold text-white  bg-[#E0B15E]">
                      Explore Resources
                    </Button>
                  </Link>
                </div>
                <div className="ml-5 lg:h-[54px] lg:w-[212px] ">
                  <Link href="/account">
                    <Button className="w-full h-full text-lg font-bold text-white  bg-[#E0B15E]">
                      sell your work
                    </Button>
                  </Link>
                </div>
                {/* <div className="lg:mt-4">
                  <p className="text-[32px] font-bold text-[#E0B15E]">
                    <HeroPromoCarousel specialPromos={specialPromoCodes} />
                  </p>
                  <p className="text-base font-medium leading-[120%] text-white tracking-[0%]">
                    Purchase discount.
                  </p>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
