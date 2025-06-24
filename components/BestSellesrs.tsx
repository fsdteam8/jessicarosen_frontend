import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function BestSellesrs() {
  return (
    <section className="w-full bg-[#EACB93] py-8 md:py-12 lg:py-20 px-4 ">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content Section */}
          <div className="space-y-6 lg:space-y-8 order-2 lg:order-1">
            <div className="space-y-4 lg:space-y-6">
              <h2 className="text-3xl md:text-4xl lg:text-[48px] font-bold text-gray-900 leading-tight">
                Our Best Sellers!
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed max-w-2xl">
                They have achieved high sales and popularity within a certain
                period. They are often featured in top charts or lists due to
                strong demand and positive customer reviews.
              </p>
            </div>
            <div>
              <Link href="/products">
                <Button className="w-[206px] h-[48px] bg-white text-[#424242] hover:bg-gray-100 px-[28px] py-[14px] text-base sm:text-lg font-bold rounded-[8px] transition-all duration-200 hover:shadow-lg">
                  Explore Resources
                </Button>
              </Link>
            </div>
          </div>

          {/* Images Section */}
          <div className="relative order-1 lg:order-2 ">
            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4 sm:gap-6 lg:gap-4 xl:gap-6 justify-center lg:justify-end">
              {/* Woman Professional Image */}
              <div className="relative group -mt-6 sm:-mt-8 lg:-mt-12">
                <div className="relative w-full max-w-[188px] sm:max-w-[240px] md:max-w-[280px] lg:max-w-[240px] xl:max-w-[188px] mx-auto sm:mx-0">
                  <Image
                    src="/images/our_best1.jpg"
                    alt="Professional woman with business attire and lanyard"
                    width={188}
                    height={336}
                    className="w-full h-auto rounded-2xl shadow-lg transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 280px"
                  />
                </div>
              </div>

              {/* Man Speaking Image */}
              <div className="relative group -mb-6 sm:-mb-8 lg:-mb-12 ">
                <div className="relative w-full max-w-[188px] sm:max-w-[240px] md:max-w-[280px] lg:max-w-[240px] xl:max-w-[188px] mx-auto sm:mx-0">
                  <Image
                    src="/images/our_best2.jpg"
                    alt="Professional man in suit speaking at podium"
                    width={188}
                    height={336}
                    className="w-full h-auto rounded-2xl shadow-lg transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 280px"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
