import { Heart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

export default function ProductCard() {
  return (
    <div className=" bg-gray-50 p-4 flex items-center justify-center">
      <Card
        className="w-[370px] h-[368px] max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)] bg-white shadow-lg border-8 border-white overflow-hidden"
        style={{ borderRadius: "16px" }}
      >
        <CardContent className="p-0 h-full flex flex-col">
          {/* Top Image Section */}
          <div className="relative h-[180px] overflow-hidden">
            {/* Heart Icon */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-3 right-3 text-red-500 hover:text-red-600 hover:bg-white/20 h-8 w-8 z-10"
            >
              <Heart className="w-5 h-5" />
            </Button>

            {/* Book Image */}
            <div className="w-full h-full">
              <Image
                src="/assets/cimg.png"
                alt="book cover"
                width={370} // Adjust width as needed
                height={180} // Adjust height as needed
                // fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 p-4 flex flex-col">
            {/* Product Title */}
            <h2 className="text-lg font-bold text-gray-900 mb-4 leading-tight">
              Facilitating the Collaborative Relationship
            </h2>

            {/* Price and Rating Row */}
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-gray-500 text-sm">Price :</span>
                <span className="text-gray-400 line-through text-sm">$75</span>
                <span className="text-red-600 font-bold text-xl">$19.00</span>
              </div>

              <div className="flex items-center gap-1">
                <span className="text-lg font-semibold text-gray-900">4.8</span>
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-gray-500 text-sm">(1.5K Reviews)</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mt-auto">
              <Button className="flex-1 bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2.5 px-4 rounded-lg text-sm">
                Add To Cart
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-blue-700 text-blue-700 hover:bg-blue-50 font-semibold py-2.5 px-4 rounded-lg text-sm"
              >
                View Details
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
