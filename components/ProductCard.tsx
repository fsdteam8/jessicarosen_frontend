"use client"
import { Heart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { useCart } from "@/hooks/use-cart"
import { useWishlist } from "@/hooks/use-wishlist"
import Link from "next/link"

interface Product {
  id: number | string
  title: string
  author: string
  price: string
  salePrice: string
  rating: number
  reviews: number
  description: string
  image: string
  language: string
  category: string
  userImage: string
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  // console.log("ProductCard product:", product)

  const { addItem } = useCart()
  const { addItem: addToWish, removeItem: removeFromWish, items: wishlistItems } = useWishlist()

  // Check if the product is already in the wishlist
  const isInWishlist = wishlistItems.some((item) => item.id === product.id)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addToCart = (item: any) => {
    addItem({ ...item, quantity: 1 })
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const toggleWishlist = (item: any) => {
    if (isInWishlist) {
      removeFromWish(item.id)
    } else {
      addToWish({ ...item, quantity: 1 })
    }
  }

  return (
    <div className="bg-gray-50 p-4 flex items-center ">
      <Card
        className="h-auto max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)] bg-white shadow-lg border-8 border-white overflow-hidden"
        style={{ borderRadius: "16px" }}
      >
        <CardContent className="p-0 h-full flex flex-col">
          {/* Top Image Section */}
          <div className="relative h-[180px] overflow-hidden">
            {/* Heart Icon */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => toggleWishlist(product)}
              className={`absolute top-3 right-3 h-8 w-8 z-10 transition-all duration-200 ${
                isInWishlist
                  ? "text-red-500 bg-white/90 hover:bg-white shadow-md"
                  : "text-gray-400 hover:text-red-500 hover:bg-white/20"
              }`}
            >
              <Heart className={`w-5 h-5 transition-all duration-200 ${isInWishlist ? "fill-red-500" : "fill-none"}`} />
            </Button>

            {/* Book Image */}
            <div className="w-full">
              <Image
                src={product?.image || "/placeholder.svg"}
                alt={product?.title}
                width={370}
                height={180}
                className="object-cover h-[200px] w-full"
                priority
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 p-4 flex flex-col">
            {/* Product Title */}
            <h2 className="text-[20px] font-medium text-gray-900 leading-[120%] mb-3 line-clamp-2">{product?.title}</h2>

            <p className="text-base font-normal text-[#6C6C6C] mb-3 line-clamp-3">{product?.description}</p>

            {/* Price and Rating Row */}
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-gray-500 text-base">Price :</span>
                <span className="text-gray-400 text-base line-through">${product?.price}</span>
                <span className="text-red-600 font-bold text-xl">${product?.salePrice}</span>
              </div>

              <div className="flex items-center gap-1">
                <span className="text-lg font-semibold text-gray-900">{product?.rating}</span>
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-gray-500 text-sm">({product?.reviews} Reviews)</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 mt-auto w-full">
              <Button
                onClick={() => addToCart(product)}
                className="flex-1 bg-[#23547B] hover:bg-blue-800 text-white font-semibold py-2.5 px-4 rounded-lg text-sm transition-colors duration-200"
              >
                Add To Cart
              </Button>

              <Link href={`/products/${product?.id}`} className="flex-1">
                <Button
                  variant="outline"
                  className="w-full border-[#23547B] text-[#23547B] hover:bg-blue-50 font-semibold py-2.5 px-4 rounded-lg text-sm transition-colors duration-200"
                >
                  View Details
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
