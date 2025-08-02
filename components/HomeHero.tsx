// "use client";
// import Image from "next/image";
// import { useAppSelector } from "@/redux/hooks";
// import { useQuery } from "@tanstack/react-query";

// import { Button } from "./ui/button";
// import Link from "next/link";
// import { useSession } from "next-auth/react";

// interface PromoCode {
//   _id: string;
//   code: string;
//   discountValue: number;
//   special: boolean;
//   active: boolean;
// }

// interface ApiResponse {
//   status: boolean;
//   data: {
//     data: PromoCode[];
//   };
// }
// interface Hero {
//   _id: string;
//   image: string;
//   name: string;
//   country: string;
//   text: string;
// }

// export default function HomeHero() {
//   const token = useSession()?.data?.user?.accessToken
//   console.log(token)
//   const currentRegion = useAppSelector((state) => state.region.currentRegion);
//   const countryName =
//     currentRegion === "canada"
//       ? "Canada"
//       : currentRegion === "us"
//         ? "USA"
//         : "Canada";

//   // Fetch promo codes for hero section
//   const { isLoading, error } = useQuery<ApiResponse>({
//     queryKey: ["hero-promo"],
//     queryFn: async () => {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/promo-codes`);
//       if (!res.ok) {
//         throw new Error("Failed to fetch promo codes");
//       }
//       return res.json();
//     },
//     staleTime: 5 * 60 * 1000, // 5 minutes
//     refetchInterval: 10 * 60 * 1000, // 10 minutes
//   });

//   const {
//     data: heroes,
//     isLoading: heroLoading,
//     isError,
//   } = useQuery({
//     queryKey: ["heroes"],
//     queryFn: async (): Promise<Hero[]> => {


//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_API_URL}/admin/custom/hero`,
//       );

//       if (!res.ok) {
//         throw new Error("Failed to fetch heroes");
//       }

//       const json = await res.json();
//       return json.data as Hero[];
//     },
//   });

//   if (heroLoading) return <p>Loading…</p>;
//   if (isError) return <p>Error: {(error as Error).message}</p>;


//   console.log(heroes)
//   if (isLoading) {
//     return (
//       <div className="w-full lg:my-[48px] my-5 bg-none ">
//         <section className="relative w-full container mx-auto bg-gray-400 rounded-lg">
//           <div className="relative h-[300px] sm:h-[350px] md:h-[400px] lg:h-[600px] w-full rounded-lg overflow-hidden animate-pulse flex items-center justify-center border">
//             {/* <p className="text-gray-500">Loading...</p> */}
//             <Image
//               src="/images/no-image.jpg"
//               alt="no-image"
//               fill
//               className="object-cover transition-transform duration-300 group-hover:scale-105"
//             />
//           </div>
//         </section>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="w-full lg:my-[48px] my-5 bg-none">
//         <section className="relative w-full container mx-auto">
//           <div className="relative h-[300px] sm:h-[350px] md:h-[400px] lg:h-[600px] w-full rounded-lg overflow-hidden bg-red-100 flex items-center justify-center">
//             <p className="text-red-600">Error loading promo codes</p>
//           </div>
//         </section>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full my-5 bg-none">
//       {/* Hero Section */}
//       <section className="relative w-full container mx-auto">
//         <div className="relative h-[300px] sm:h-[350px] md:h-[370px] lg:h-[400px] w-full rounded-lg overflow-hidden">
//           {/* Background Image */}
//           <Image
//             src={
//               countryName === "Canada"
//                 ? "/images/canadaImg.png"
//                 : "/images/canadaImage.svg"
//             }
//             alt="Hero Image"
//             height={650}
//             width={1200}
//             className="object-cover w-full h-full rounded-lg"
//             priority
//           />

//           {/* Overlay for better text readability */}
//           <div className="absolute inset-0 bg-black/30 rounded-lg" />

//           {/* Text Content */}
//           <div className="absolute inset-0 flex lg:px-16 px-5 mt-[3%]">
//             <div className="text-white">
//               {countryName === "USA" && (
//                 <div className="flex items-center gap-2">
//                   <Image
//                     src="/images/flage.png"
//                     alt="Flag"
//                     width={100}
//                     height={100}
//                   />
//                   <p className="text-sm font-semibold">US Laws</p>
//                 </div>
//               )}

//               <h1 className="lg:text-[48px] text-4xl font-bold leading-[120%] lg:my-7 my-3 text-start">
//                 {/* Deal Of The <span className="text-[#E0B15E]">Day</span>! */}
//               </h1>
//               <p className=" lg:text-3xl my-10 lg:my-0   text-xl font-normal leading-[150%] text-[#E7E7E7] max-w-xl text-start">
//                 Real lawyers. Real documents. Real money. Access proven legal
//                 materials. Upload your own. Get paid
//               </p>
//               <div className="flex items-center justify-center w-[95%] mz"></div>

//               <div className="lg:mt-6 text-start flex justify-arround items-center">
//                 <div className="lg:h-[54px] lg:w-[222px] ">
//                   <Link href="/products">
//                     <Button className="w-full h-full text-lg font-bold text-white  bg-[#E0B15E]">
//                       Explore Resources
//                     </Button>
//                   </Link>
//                 </div>
//                 <div className="ml-5 lg:h-[54px] lg:w-[212px] ">
//                   <Link href="/account">
//                     <Button className="w-full h-full text-lg font-bold text-white  bg-[#E0B15E]">
//                       sell your work
//                     </Button>
//                   </Link>
//                 </div>
//                 {/* <div className="lg:mt-4">
//                   <p className="text-[32px] font-bold text-[#E0B15E]">
//                     <HeroPromoCarousel specialPromos={specialPromoCodes} />
//                   </p>
//                   <p className="text-base font-medium leading-[120%] text-white tracking-[0%]">
//                     Purchase discount.
//                   </p>
//                 </div> */}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }
"use client";

import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useAppSelector } from "@/redux/hooks";
import { Button } from "./ui/button";

interface Hero {
  _id: string;
  image: string;
  text: string;
  country: string;
  createdAt: string;
  updatedAt: string;
}

export default function HomeHero() {
  const token = useSession()?.data?.user?.accessToken;
  const currentRegion = useAppSelector((state) => state.region.currentRegion);

  const countryName =
    currentRegion === "canada" ? "Canada" : currentRegion === "us" ? "USA" : "Canada";

  const {
    data: heroes,
    isLoading,
    isError,
    error,
  } = useQuery<Hero[]>({
    queryKey: ["heroes"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/custom/hero`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      });

      if (!res.ok) throw new Error("Failed to fetch heroes");
      const json = await res.json();
      return json.data as Hero[];
    },
  });

  if (isLoading) {
    return (
      <div className="w-full my-5 bg-none">
        <section className="relative w-full container mx-auto bg-gray-400 rounded-lg">
          <div className="relative h-[400px] w-full rounded-lg overflow-hidden animate-pulse flex items-center justify-center border">
            <Image
              src="/images/no-image.jpg"
              alt="loading"
              fill
              className="object-cover"
            />
          </div>
        </section>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full my-5 bg-none">
        <section className="relative w-full container mx-auto">
          <div className="relative h-[400px] w-full rounded-lg overflow-hidden bg-red-100 flex items-center justify-center">
            <p className="text-red-600">Error: {(error as Error).message}</p>
          </div>
        </section>
      </div>
    );
  }

  // Filter by country
  const filteredHero = heroes?.find(
    (hero) => hero.country.toLowerCase().includes(countryName.toLowerCase())
  );

  return (
    <div className="w-full my-5 bg-none">
      <section className="relative w-full container mx-auto">
        <div className="relative h-[400px] w-full rounded-lg overflow-hidden">
          <Image
            src={filteredHero?.image || "/images/no-image.jpg"}
            alt="Hero"
            fill
            className="object-cover w-full h-full rounded-lg"
            priority
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30 rounded-lg" />

          {/* Content */}
          <div className="absolute inset-0 flex lg:px-16 px-5 mt-[3%]">
            <div className="text-white">
              {/* {countryName === "USA" && (
                <div className="flex items-center gap-2 mb-4">
                  <Image
                    src="/images/flage.png"
                    alt="Flag"
                    width={40}
                    height={40}
                  />
                  <p className="text-sm font-semibold">US Laws</p>
                </div>
              )} */}

              {/* <h1 className="lg:text-[48px] text-4xl font-bold leading-[120%] my-3 text-start">
                
              </h1> */}

              <p className="lg:text-3xl my-6 text-xl font-normal leading-[150%] text-[#E7E7E7] max-w-xl text-start">
                {filteredHero?.text || "No hero content available"}

              </p>

              <div className="flex flex-wrap gap-4 mt-6">
                <Link href="/products">
                  <Button className="text-lg font-bold text-white bg-[#E0B15E]">
                    Explore Resources
                  </Button>
                </Link>
                <Link href="/account">
                  <Button className="text-lg font-bold text-white bg-[#E0B15E]">
                    Sell your work
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}



