// import React from "react";
// import ProductCard from "./ProductCard";
// import { ArrowRight } from "lucide-react";
// import Link from "next/link";

// const ExploreSelling = () => {
//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-4">
//       <div className="max-w-7xl mx-auto">
//         {/* Header Section */}
//         <div className="text-center mb-12">
//           <h1 className="text-[40px] font-semibold text-gray-900 mb-4">
//             Explore Top Selling Resources in Canada
//           </h1>
//           <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//             Widely used materials that help students, legal professionals, and
//             researchers understand and apply legal principles.
//           </p>
//         </div>

//         {/* Books Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-12">
//           <ProductCard />
//           <ProductCard />
//           <ProductCard />
//           <ProductCard />
//           <ProductCard />
//           <ProductCard />
//         </div>

//         {/* See More Button */}
//         <div className="text-center ">
//           <Link
//             href="/products"
//             className="px-8 py-3 font-bold text-[#23547B] text-lg border-b-2 border-[#23547B]"
//           >
//             See More <ArrowRight className="inline-block" />
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ExploreSelling;




import { ArrowRight } from "lucide-react"
import Link from "next/link"
import ProductCard from "./ProductCard"

const products = [
  {
    id: 1,
    title: "Short Cause Matters",
    author: "Mr.Jason Bostian",
    price: "59.00",
    salePrice: "28",
    rating: 4.8,
    reviews: 15,
    image: "/images/aboutUs.jpg",
    language: "English Language",
    category: "Practical law",
    userImage: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    title: "Securing Organizational Objectives",
    author: "Jane Shepherd",
    price: "69.00",
    salePrice: "28",
    rating: 4.8,
    reviews: 14,
    image: "/images/aboutUs.jpg",
    language: "English Language",
    category: "Practical law",
    userImage: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    title: "Starting the Professional Engagement",
    author: "Arlene McCoy",
    price: "59.00",
    salePrice: "28",
    rating: 4.8,
    reviews: 12,
    image: "/images/aboutUs.jpg",
    language: "English Language",
    category: "Practical law",
    userImage: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    title: "Community Benefit Organization",
    author: "Guy Hawkins",
    price: "69.00",
    salePrice: "28",
    rating: 4.8,
    reviews: 14,
    image: "/images/aboutUs.jpg",
    language: "English Language",
    category: "Practical law",
    userImage: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    title: "Commercial Transactions Objective",
    author: "Cameron Williamson",
    price: "59.00",
    salePrice: "28",
    rating: 4.8,
    reviews: 15,
    image: "/images/aboutUs.jpg",
    language: "English Language",
    category: "Practical law",
    userImage: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 6,
    title: "Community Benefit Organization",
    author: "Guy Hawkins",
    price: "69.00",
    salePrice: "28",
    rating: 4.8,
    reviews: 14,
    image: "/images/aboutUs.jpg",
    language: "English Language",
    category: "Practical law",
    userImage: "/placeholder.svg?height=40&width=40",
  },
]

const ExploreSelling = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-[40px] font-semibold text-gray-900 mb-4">Explore Top Selling Resources in Canada</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Widely used materials that help students, legal professionals, and researchers understand and apply legal
            principles.
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
          <Link
            href="/products"
            className="px-8 py-3 font-bold text-[#23547B] text-lg border-b-2 border-[#23547B] inline-flex items-center gap-2"
          >
            See More <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ExploreSelling

