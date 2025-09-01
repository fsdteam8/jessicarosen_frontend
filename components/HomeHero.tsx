
"use client";

import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useAppSelector } from "@/redux/hooks";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";


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
  const session = useSession();
  const router = useRouter();
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
        <section className="relative w-full container mx-auto  rounded-lg">
          <div className="relative h-[400px] w-full rounded-lg overflow-hidden animate-pulse flex items-center justify-center">
            {/* <Image
              src="/images/no-image.jpg"
              alt="loading"
              fill
              className="object-cover"
            /> */}
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
  const filteredHero = Array.isArray(heroes)
    ? heroes.find(hero => hero.country.toLowerCase().includes(countryName.toLowerCase()))
    : undefined;


  const handleClick = () => {
    if (!session.data?.user?.role) {
      router.push("/account");
      return;
    }

    if (session.data.user.role === "SELLER") {
      console.log("User is a seller, redirecting to dashboard");
      router.push("/dashboard");
    } else {
      router.push("/account");
    }
  };

  return (
    <div className="w-full my-5 bg-none">
      <section className="relative w-full container mx-auto">
        <div className="relative h-[400px] w-[90%] mx-auto rounded-lg overflow-hidden">
          <div className="h-full">
            <Image
              src={filteredHero?.image || "/images/no-image.jpg"}
              alt="Hero"
              fill
              className="object-cover w-full h-full rounded-lg"
              priority
            />
          </div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30 rounded-lg" />

          {/* Content */}
          <div className="absolute inset-0 flex  lg:px-16 px-5 mt-[3%]">
            <div className="text-white flex flex-col justify-center items-start">

              <p className="lg:text-3xl my-6 text-xl font-normal leading-[150%] text-[#E7E7E7] max-w-xl text-start">
                {filteredHero?.text || "No hero content available"}
              </p>

              <div className="flex md:flex-row flex-col gap-4 mt-6">
                <Link href="/products" >
                  <Button className="w-full text-lg font-bold text-white bg-[#E0B15E]">
                    Explore Resources
                  </Button>
                </Link>
                
                  <Button onClick={handleClick} className="w-full text-lg font-bold text-white bg-[#E0B15E]">
                    Sell Your Work
                  </Button>
                {/* </Link> */}
              </div>
            </div>
          </div>
        </div>

      </section>
    </div>
  );
}



