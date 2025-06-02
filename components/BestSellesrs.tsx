import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function BestSellesrs() {
  return (
    <section className="w-full bg-[#E8D5B7] py-8 px-4 sm:py-12 md:py-16 lg:py-20">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content Section */}
          <div className="space-y-6 lg:space-y-8 order-2 lg:order-1">
            <div className="space-y-4 lg:space-y-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
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
                <Button className="bg-white text-gray-800 hover:bg-gray-100 px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-medium rounded-lg shadow-md transition-all duration-200 hover:shadow-lg">
                  Explore Resources
                </Button>
              </Link>
            </div>
          </div>

          {/* Images Section */}
          <div className="relative order-1 lg:order-2">
            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4 sm:gap-6 lg:gap-4 xl:gap-6 justify-center lg:justify-end">
              {/* Woman Professional Image */}
              <div className="relative group -mt-4 sm:-mt-6 lg:-mt-8">
                <div className="relative w-full max-w-[280px] sm:max-w-[240px] md:max-w-[280px] lg:max-w-[240px] xl:max-w-[280px] mx-auto sm:mx-0">
                  <Image
                    src="/assets/bs1.png"
                    alt="Professional woman with business attire and lanyard"
                    width={280}
                    height={400}
                    className="w-full h-auto rounded-2xl shadow-lg transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 280px"
                  />
                </div>
              </div>

              {/* Man Speaking Image */}
              <div className="relative group mt-8 sm:mt-12 lg:mt-16 xl:mt-12">
                <div className="relative w-full max-w-[280px] sm:max-w-[240px] md:max-w-[280px] lg:max-w-[240px] xl:max-w-[280px] mx-auto sm:mx-0">
                  <Image
                    src="/assets/bs2.png"
                    alt="Professional man in suit speaking at podium"
                    width={280}
                    height={400}
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
