import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function HomeHero() {
  return (
    <section className="w-full py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-700 to-slate-800 border-4 border-amber-400">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center p-8 md:p-12 lg:p-16">
            {/* Left side - Text content */}
            <div className="space-y-6 lg:space-y-8">
              {/* Canadian Flag and Label */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-6 bg-red-600 relative overflow-hidden rounded-sm">
                  <div className="absolute inset-0 bg-white"></div>
                  <div className="absolute left-0 top-0 w-1/3 h-full bg-red-600"></div>
                  <div className="absolute right-0 top-0 w-1/3 h-full bg-red-600"></div>
                  <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-600 text-xs">
                    🍁
                  </div>
                </div>
                <span className="text-white font-medium text-sm md:text-base">Canadian Laws</span>
              </div>

              {/* Main heading */}
              <div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
                  Deal Of The <span className="text-amber-400">Day!</span>
                </h1>
              </div>

              {/* Description */}
              <p className="text-slate-200 text-base md:text-lg lg:text-xl leading-relaxed max-w-lg">
                Widely used materials that help students, legal professionals, and researchers understand and apply
                legal principles.
              </p>

              {/* Button and Discount */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
                <Button
                  size="lg"
                  className="bg-amber-400 hover:bg-amber-500 text-slate-900 font-semibold px-8 py-3 rounded-lg text-base md:text-lg"
                >
                  Explore Resources
                </Button>

                <div className="text-center sm:text-left">
                  <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-amber-400">30%</div>
                  <div className="text-slate-200 text-sm md:text-base">Purchase discount</div>
                </div>
              </div>
            </div>

            {/* Right side - Image */}
            <div className="relative order-first lg:order-last">
              <div className="relative aspect-[4/3] w-full max-w-lg mx-auto lg:max-w-none">
                <Image
                  src="/assets/hh.png"
                  alt="Professional meeting with legal team discussing Canadian law"
                  fill
                  className="object-cover rounded-xl shadow-2xl"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                  priority
                />
              </div>

              {/* Decorative curved border overlay */}
              <div className="absolute -top-4 -left-4 -right-4 -bottom-4 border-2 border-amber-400 rounded-2xl opacity-30 hidden lg:block"></div>
            </div>
          </div>

          {/* Decorative curved element */}
          <div className="absolute top-0 right-0 w-32 h-32 lg:w-48 lg:h-48">
            <div className="absolute inset-0 bg-amber-400 rounded-full transform translate-x-1/2 -translate-y-1/2 opacity-10"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
