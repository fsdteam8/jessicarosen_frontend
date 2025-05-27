import React from 'react'
import ProductCard from './ProductCard'
import { ArrowRight } from 'lucide-react'

const ExploreSelling = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
    <div className="max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-[40px] font-semibold text-gray-900 mb-4">Explore Top Selling Resources in Canada</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Widely used materials that help students, legal professionals, and researchers understand and apply legal principles.
        </p>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
    <ProductCard/>
    <ProductCard/>
    <ProductCard/>
    <ProductCard/>
    <ProductCard/>
    <ProductCard/>
      </div>

      {/* See More Button */}
      <div className="text-center ">
        <button  className="px-8 py-3 font-bold text-[#23547B] text-lg border-b-2 border-[#23547B]">
          See More   <ArrowRight  className='inline-block'/>
        </button>
      </div>
    </div>
  </div>
  )
}

export default ExploreSelling
