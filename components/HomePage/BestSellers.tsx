import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import bannnerImg from "../../public/images/cartSubImg.png";
import Link from "next/link";


const BestSellers = () => {
  return (
    <div>
      <section className="py-16 bg-[#f8e3a3]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="max-w-md mb-8 md:mb-0">
              <h2 className="text-[48px] font-semibold leading-[120%] mb-4">Our Best Sellers!</h2>
              <p className="text-base text-[#424242] mb-[32px]">
                These have achieved high sales and popularity within a certain
                period. They are professionally handcrafted to add to a strong
                agreement and help businesses grow.
              </p>
              <Link href="#">
              <Button variant={"outline"} className="bg-[#FFFFFF] hover:bg-[#1e4258] text-black">
                Exploer Resources
              </Button>
              </Link>
            </div>
            <div className="flex gap-4">
              <div className="relative w-[180px] h-[240px]   z-10">
                <Image
                  src={bannnerImg}
                  alt="Professional woman"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="relative w-[180px] h-[240px] mt-10">
                <Image
                  src={bannnerImg}
                  alt="Professional man"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* best Sellers */}
    </div>
  );
};

export default BestSellers;
