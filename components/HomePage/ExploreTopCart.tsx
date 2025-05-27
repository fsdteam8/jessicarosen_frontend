import { getFeaturedProducts } from '@/lib/data'
import React from 'react'
import { ProductCard } from '../product-card'
// import { Button } from 'react-day-picker'
import { ArrowRight } from 'lucide-react'

const ExploreTopCart = () => {
      const featuredProducts = getFeaturedProducts().slice(0, 6)
    
  return (
    <div>
        <section className="py-16 bg-[#E9EEF2] mt-[88px]">
          <div className="container mx-auto px-4 mt-[92px] ">
            <div className="text-center mb-[72px]">
              <h2 className="text-[40px] font-semibold leading-[120%] mb-2">Explore Top Selling Products</h2>
              <p className="text-base text-[#424242] font-normal text-center max-w-xl mx-auto">
                Tested and proven forms and documents, created by experienced researchers, understand and apply legal
                principles.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  image={product.image}
                  price={product.price}
                  discountPrice={product.discountPrice}
                  rating={product.rating}
                  reviews={product.reviews}
                  className='bg-[#F8F5F2] border-[8px_solid_#FAF9F6] box-shadow-[0px_0px_60px_0px_#0000003D] rounded-[16px] font-normal text-[#2A2A2A]'
                />
              ))}
            </div>

            <div className="text-center mt-8">
              <button className="text-[#2c5d7c] flex items-center mx-auto">
                See More <ArrowRight className="ml-1 h-4 w-4" />
              </button>
            </div>
          </div>
        </section>
    </div>
  )
}

export default ExploreTopCart