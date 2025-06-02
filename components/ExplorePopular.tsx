// import ProductCard from "./product-card"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import ProductCard from "./ProductCard"

const products = [
  {
    id: 7,
    title: "Short Cause Matters",
    author: "Mr.Jason Bostian",
    price: "59.00",
    salePrice: "28",
    rating: 4.8,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.",
    reviews: 15,
    image: "/images/aboutUs.jpg",
    language: "English Language",
    category: "Practical law",
    userImage: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 8,
    title: "Securing Organizational Objectives",
    author: "Jane Shepherd",
    price: "69.00",
    salePrice: "28",
    rating: 4.8,
    reviews: 14,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.",
    image: "/images/aboutUs.jpg",
    language: "English Language",
    category: "Practical law",
    userImage: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 9,
    title: "Starting the Professional Engagement",
    author: "Arlene McCoy",
    price: "59.00",
    salePrice: "28",
    rating: 4.8,
    reviews: 12,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.",
    image: "/images/aboutUs.jpg",
    language: "English Language",
    category: "Practical law",
    userImage: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 10,
    title: "Community Benefit Organization",
    author: "Guy Hawkins",
    price: "69.00",
    salePrice: "28",
    rating: 4.8,
    reviews: 14,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.",
    image: "/images/aboutUs.jpg",
    language: "English Language",
    category: "Practical law",
    userImage: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 11,
    title: "Commercial Transactions Objective",
    author: "Cameron Williamson",
    price: "59.00",
    salePrice: "28",
    rating: 4.8,
    reviews: 15,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.",
    image: "/images/aboutUs.jpg",
    language: "English Language",
    category: "Practical law",
    userImage: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 12,
    title: "Community Benefit Organization",
    author: "Guy Hawkins",
    price: "69.00",
    salePrice: "28",
    rating: 4.8,
    reviews: 14,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.",
    image: "/images/aboutUs.jpg",
    language: "English Language",
    category: "Practical law",
    userImage: "/placeholder.svg?height=40&width=40",
  },
]

const ExplorePopular = () => {


  
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-[40px] font-semibold text-gray-900 mb-4">Explore Most Popular Resources</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From everyday essentials to the latest trends, we bring you a seamless shopping experience with unbeatable
            deals, delivery.discover
          </p>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* See More Button */}
        <div className="text-center">
          <Link href="/products">
            <button className="px-8 py-3 font-bold text-[#23547B] text-lg border-b-2 border-[#23547B]">
              See More <ArrowRight className="inline-block ml-2" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ExplorePopular
