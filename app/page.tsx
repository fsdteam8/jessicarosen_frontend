<<<<<<< HEAD
// import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/product-card";
import { ArrowRight, Phone } from "lucide-react";
import { getNewArrivalProducts } from "@/lib/data";
import ExploreTopCart from "@/components/HomePage/ExploreTopCart";
import BestSellers from "@/components/HomePage/BestSellers";
import LegalDoc from "@/components/HomePage/LegalDoc";

export default function Home() {
  // const featuredProducts = getFeaturedProducts().slice(0, 6)
  // const bestSellerProducts = getBestSellerProducts().slice(0, 6)
  const popularProducts = getNewArrivalProducts().slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col">
      <main>
        {/* Hero Section */}
        <section className="relative flex items-center border">
          <div className="relative w-full rounded-lg">
            {/* Blue background with gold border */}
            <div className="absolute inset-0 z-0 w-full border">
              <div className="absolute inset-0 w-[1000px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 753 400"
                  className="w-full h-full"
                  fill="none"
                >
                  <path
                    d="M8 4H522.43C524.913 4 527.166 6.32831 527.038 9.14453L527.018 9.41895C523.983 39.7983 524.816 131.695 629.638 201.698L632.134 203.348C737.78 272.465 747.593 363.943 748.039 391.499L748.054 392.763C748.065 394.474 746.677 396 744.536 396H8C5.79085 396 4 394.209 4 392V8C4 5.79087 5.79086 4 8 4Z"
                    fill="#23547B"
                    stroke="#E0B15E"
                    strokeWidth="8"
                  />
                </svg>
              </div>

              {/* Red/white wavy shape on the right (simplified representation) */}
              <div className="absolute right-0 top-0 bottom-0 w-1/4 bg-gradient-to-r from-transparent to-red-500 opacity-50"></div>
            </div>

            {/* Content overlay */}
            <div className="relative z-10 flex flex-col justify-center h-full p-8 text-white">
              <h1 className="text-4xl font-bold mb-1">
                Deal Of The <span className="text-yellow-400">Day!</span>
              </h1>

              <p className="text-sm mb-6 max-w-md text-gray-200">
                Widely used materials that help students, legal professionals,
                and researchers understand and apply legal principles.
              </p>

              <div className="flex justify-between items-center max-w-lg">
                <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-medium py-2 px-4 rounded">
                  Explore Resources
                </button>

                <div className="text-right">
                  <span className="text-3xl font-bold text-yellow-400">
                    30%
                  </span>
                  <p className="text-sm">Purchase discount</p>
                </div>
              </div>
            </div>
          </div>

          <div className="container mx-auto px-4 z-10 text-white">
            <div className="max-w-xl">
              <h1 className="text-4xl font-bold mb-2">
                Find Your Perfect Product
              </h1>
              <h2 className="text-3xl font-bold mb-4">Delivered to</h2>
              <h2 className="text-3xl font-bold mb-6">
                Your Peaceful Doorstep!
              </h2>
              <p className="mb-8 text-sm opacity-90">
                From contract templates to legal forms, guides, and more - we
                have everything you need to navigate the legal landscape with
                confidence and ease, without the expensive lawyer fees.
              </p>
              <div className="flex space-x-4">
                <Button className="bg-[#2c5d7c] hover:bg-[#1e4258] text-white">
                  Buy Now
                </Button>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white/10"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Call Now
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Deal of the Day */}
        <section className="bg-[#6d90a8] text-white py-10">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="max-w-md mb-6 md:mb-0">
                <h2 className="text-2xl font-bold mb-3">Deal Of The Day!</h2>
                <p className="text-sm mb-6">
                  Grab our bestselling legal templates at a special discounted
                  price, and receive a free gift and loyalty reward points!
                </p>
                <Button className="bg-white text-[#2c5d7c] hover:bg-gray-100">
                  Buy Now
                </Button>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-[#f0a500]">30%</div>
                <div className="text-sm">DISCOUNT</div>
              </div>
            </div>
          </div>
        </section>

        <ExploreTopCart />

        {/* Best Sellers */}
        {/* <section className="py-16 bg-[#f8e3a3]">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="max-w-md mb-8 md:mb-0">
                <h2 className="text-2xl font-bold mb-3">Our Best Sellers!</h2>
                <p className="text-sm mb-6">
                  These have achieved high sales and popularity within a certain period. They are professionally
                  handcrafted to add to a strong agreement and help businesses grow.
                </p>
                <Button className="bg-[#2c5d7c] hover:bg-[#1e4258] text-white">Buy Now</Button>
              </div>
              <div className="flex">
                <div className="relative w-[180px] h-[240px] -mr-10 z-10">
                  <Image
                    src="/placeholder.svg?height=240&width=180"
                    alt="Professional woman"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="relative w-[180px] h-[240px] mt-10">
                  <Image
                    src="/placeholder.svg?height=240&width=180"
                    alt="Professional man"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section> */}
        <BestSellers />

        {/* Popular Products */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold mb-2">
                Explore Most Popular Products
              </h2>
              <p className="text-sm text-gray-600 max-w-2xl mx-auto">
                From everyday essentials to the latest trends, we bring you a
                seamless shopping experience with a reliable stock, service &
                support.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  image={product.image}
                  price={product.price}
                  discountPrice={product.discountPrice}
                  rating={product.rating}
                  reviews={product.reviews}
                  description={product.description}
                  variant="detailed"
                />
              ))}
            </div>

            <div className="text-center mt-8">
              <Button
                variant="link"
                className="text-[#2c5d7c] flex items-center mx-auto"
              >
                See More <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <LegalDoc />
      </main>
=======


import HomeHero from "@/components/HomeHero"
import ExploreSelling from "@/components/ExploreSelling"
import BestSellesrs from "@/components/BestSellesrs"

export default function Home() {

  return (
    <div className="min-h-screen flex flex-col">

     <HomeHero/>
     <ExploreSelling/>
<BestSellesrs/>
>>>>>>> a0c8382b917cca835038364234caaad74eaf10a3
    </div>
  );
}
