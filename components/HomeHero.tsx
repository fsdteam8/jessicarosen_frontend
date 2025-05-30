import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function HomeHero() {
  return (
    <div className="w-full mb-[48px]">
      {/* Blue divider line */}

      {/* Hero Section */}
      <section className="relative w-full container mx-auto">
        <div className="relative h-[300px] sm:h-[350px] md:h-[400px] lg:h-[550px] w-full rounded-lg overflow-hidden">
          {/* Background Image */}
          <Image
            src="/images/heroImage.svg"
            alt="Hero Image"
            // fill
            height={650}
            width={1200}
            className="object-cover w-full h-full rounded-lg"
            priority
          />

          {/* Optional Overlay for better text readability */}
          <div className="absolute inset-0 bg-black/30 rounded-lg" />

          {/* Text Content */}
          <div className="absolute inset-0 flex lg:px-16 px-5 mt-[7%]">
            <div className="text-white">
              <div className="flex items-center gap-2">
                <Image
                  src="/images/flage.png"
                  alt="Flage"
                  width={100}
                  height={100}
                />
                <p className="text-sm font-semibold">Canadian Laws</p>
              </div>
              <h1 className="lg:text-[48px] text-4xl font-bold leading-[120%] lg:my-7 my-3 text-start">
                Deal Of The Day!
              </h1>
              <p className="text-base font-normal leading-[150%] text-[#E7E7E7] max-w-xl text-start">
                Widely used materials that help students, legal professionals,
                and researchers understand and apply legal principles.
              </p>

              {/* Left-aligned button and discount info */}
              <div className="lg:mt-6 text-start flex justify-between items-center">
                <div className="lg:h-[54px] lg:w-[242px] ">
                  <Button className="w-full h-full bg-[#E0B15E]">Explore Resources</Button>
                </div>

                <div className="lg:mt-4">
                  <p className="text-[32px] font-bold text-[#E0B15E]">30%</p>
                  <p className="text-base font-medium leading-[120%]">
                    Purchase discount.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
