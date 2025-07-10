"use client"
import React from "react";
import { Button } from "../ui/button";
import { Mail } from "lucide-react";
import { FaArrowRightLong } from "react-icons/fa6";
import Image from "next/image";
import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";

const LegalDoc = () => {

  const currentRegion = useAppSelector((state) => state.region.currentRegion);
    const countryName =
      currentRegion === "canada"
        ? "Canada"
        : currentRegion === "us"
        ? "USA"
        : null;
  
    console.log(countryName)
  return (
    <div>
      <section className="py-10 bg-[#4F7695] text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex gap-3 items-center">
              <div className="w-[146px] lg:w-[176px] h-[66px] lg:h-[88px]">
                <Image
                  src={countryName === 'Canada' ? "/images/flage.png" : "/images/flage1.png"}
                  alt="Hero Image"
                  // fill
                  width={200}
                  height={200}
                  className="object-cover w-full h-full rounded-lg"
                  priority
                />
              </div>
              <div>
                <h2 className="text-xl md:text-3xl lg:text-[40px] font-semibold leading-[120%] mb-2">
                  Looking For Legal Documents?
                </h2>
                <p className="text-sm">
                  Thousands of templates to choose from, professionally crafted.
                </p>
              </div>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-8">
              <Link href="/products">
              <Button className="bg-white h-[46px] lg:h-[56px] text-[#2c5d7c] hover:bg-gray-100">
                <p>Buy Now</p>
                <span className=" h-[30px] lg:h-[35px] w-10 rounded-[8px] bg-[#23547B] flex items-center justify-center">
                  <FaArrowRightLong size={30} className="text-white text-xl" />
                </span>
              </Button>
              </Link>
              <div className="flex gap-2">
                <span className="bg-white h-12 w-12 rounded-full flex items-center justify-center">
                  <Mail className="text-xl text-[#23547B]" />
                </span>
                <div>
                  <p className="font-bold">EMAIL US</p>
                  <p className="text-xs inline-block">support@lawbie.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LegalDoc;
