import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { ArrowRight, Phone } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="relative h-[400px] flex items-center">
          <div className="absolute inset-0 z-0">
            <Image
              src="/placeholder.svg?height=400&width=1200"
              alt="Legal background with scales of justice"
              fill
              className="object-cover brightness-50"
              priority
            />
          </div>
          <div className="container mx-auto px-4 z-10 text-white">
            <div className="max-w-xl">
              <h1 className="text-4xl font-bold mb-2">Find Your Perfect Product</h1>
              <h2 className="text-3xl font-bold mb-4">Delivered to</h2>
              <h2 className="text-3xl font-bold mb-6">Your Peaceful Doorstep!</h2>
              <p className="mb-8 text-sm opacity-90">
                From contract templates to legal forms, guides, and more - we have everything you need to navigate the
                legal landscape with confidence and ease, without the expensive lawyer fees.
              </p>
              <div className="flex space-x-4">
                <Button className="bg-[#2c5d7c] hover:bg-[#1e4258] text-white">Buy Now</Button>
                <Button variant="outline" className="border-white text-white hover:bg-white/10">
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
                  Grab our bestselling legal templates at a special discounted price, and receive a free gift and
                  loyalty reward points!
                </p>
                <Button className="bg-white text-[#2c5d7c] hover:bg-gray-100">Buy Now</Button>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-[#f0a500]">30%</div>
                <div className="text-sm">DISCOUNT</div>
              </div>
            </div>
          </div>
        </section>

        {/* Top Selling Products */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold mb-2">Explore Top Selling Products</h2>
              <p className="text-sm text-gray-600 max-w-2xl mx-auto">
                Tested and proven forms and documents, created by experienced researchers, understand and apply legal
                principles.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topSellingProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  title={product.title}
                  image={product.image}
                  price={product.price}
                  discountPrice={product.discountPrice}
                  rating={product.rating}
                  reviews={product.reviews}
                />
              ))}
            </div>

            <div className="text-center mt-8">
              <Button variant="link" className="text-[#2c5d7c] flex items-center mx-auto">
                See More <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Best Sellers */}
        <section className="py-16 bg-[#f8e3a3]">
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
        </section>

        {/* Popular Products */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold mb-2">Explore Most Popular Products</h2>
              <p className="text-sm text-gray-600 max-w-2xl mx-auto">
                From everyday essentials to the latest trends, we bring you a seamless shopping experience with a
                reliable stock, service & support.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularProducts.map((product) => (
                <ProductCard
                  key={product.id}
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
              <Button variant="link" className="text-[#2c5d7c] flex items-center mx-auto">
                See More <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-10 bg-[#2c5d7c] text-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold mb-2">Looking For Legal Documents?</h2>
                <p className="text-sm">Thousands of templates to choose from, professionally crafted.</p>
              </div>
              <div className="mt-4 md:mt-0 flex items-center space-x-4">
                <Button className="bg-white text-[#2c5d7c] hover:bg-gray-100">Buy Now</Button>
                <div className="flex flex-col">
                  <span className="font-bold">EMAIL US</span>
                  <span className="text-xs">SUPPORT@LAWFIRM.COM</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

// Mock data for products
const topSellingProducts = [
  {
    id: "1",
    title: "Starting the Professional Engagement",
    image: "/placeholder.svg?height=200&width=300",
    price: 95,
    discountPrice: 10,
    rating: 4.8,
    reviews: 176,
  },
  {
    id: "2",
    title: "Facilitating the Collaborative Relationship",
    image: "/placeholder.svg?height=200&width=300",
    price: 75,
    discountPrice: 10,
    rating: 4.6,
    reviews: 93,
  },
  {
    id: "3",
    title: "Terminating the Professional Engagement",
    image: "/placeholder.svg?height=200&width=300",
    price: 120,
    discountPrice: 10,
    rating: 4.9,
    reviews: 128,
  },
  {
    id: "4",
    title: "Securing Organizational Objectives",
    image: "/placeholder.svg?height=200&width=300",
    price: 165,
    discountPrice: 10,
    rating: 4.7,
    reviews: 156,
  },
  {
    id: "5",
    title: "Commercial Transactions Objective",
    image: "/placeholder.svg?height=200&width=300",
    price: 118,
    discountPrice: 10,
    rating: 4.8,
    reviews: 201,
  },
  {
    id: "6",
    title: "Admissibility of evidence in civil proceedings",
    image: "/placeholder.svg?height=200&width=300",
    price: 135,
    discountPrice: 10,
    rating: 4.9,
    reviews: 184,
  },
]

const popularProducts = [
  {
    id: "7",
    title: "Innovation Financing Action",
    image: "/placeholder.svg?height=200&width=300",
    price: 85,
    discountPrice: 10,
    rating: 4.7,
    reviews: 1500,
    description: "Breaking an NDA can result in legal consequences, including financial penalties or lawsuits",
  },
  {
    id: "8",
    title: "Non-Governmental Organization (NGO)",
    image: "/placeholder.svg?height=200&width=300",
    price: 128,
    discountPrice: 10,
    rating: 4.7,
    reviews: 1500,
    description: "Breaking an NDA can result in legal consequences, including financial penalties or lawsuits",
  },
  {
    id: "9",
    title: "Corporate Restructuring",
    image: "/placeholder.svg?height=200&width=300",
    price: 167,
    discountPrice: 10,
    rating: 4.7,
    reviews: 1500,
    description: "Breaking an NDA can result in legal consequences, including financial penalties or lawsuits",
  },
  {
    id: "10",
    title: "Requests for Relief & In-Chambers Hearings",
    image: "/placeholder.svg?height=200&width=300",
    price: 142,
    discountPrice: 10,
    rating: 4.7,
    reviews: 1500,
    description: "Breaking an NDA can result in legal consequences, including financial penalties or lawsuits",
  },
  {
    id: "11",
    title: "Community Benefit Organization",
    image: "/placeholder.svg?height=200&width=300",
    price: 148,
    discountPrice: 10,
    rating: 4.7,
    reviews: 1500,
    description: "Breaking an NDA can result in legal consequences, including financial penalties or lawsuits",
  },
  {
    id: "12",
    title: "Non-Disclosure Agreement",
    image: "/placeholder.svg?height=200&width=300",
    price: 96,
    discountPrice: 10,
    rating: 4.7,
    reviews: 1500,
    description: "Breaking an NDA can result in legal consequences, including financial penalties or lawsuits",
  },
]
