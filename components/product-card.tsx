import Image from "next/image"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ProductCardProps {
  title: string
  image: string
  price: number
  discountPrice?: number
  rating: number
  reviews: number
  description?: string
  className?: string
  variant?: "simple" | "detailed"
}

export function ProductCard({
  title,
  image,
  price,
  discountPrice,
  rating,
  reviews,
  description,
  className,
  variant = "simple",
}: ProductCardProps) {
  return (
    <div className={cn("bg-white rounded-lg overflow-hidden shadow-md", className)}>
      <div className="relative">
        <div className="relative h-48 w-full">
          <Image src={image || "/placeholder.svg?height=200&width=300"} alt={title} fill className="object-cover" />
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/80 hover:bg-white/90"
        >
          <Heart className="h-5 w-5 text-red-500" />
        </Button>
      </div>

      <div className="p-4">
        <h3 className="font-medium text-base mb-2 line-clamp-2">{title}</h3>

        {variant === "detailed" && description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{description}</p>
        )}

        <div className="flex justify-between items-center mb-3">
          <div className="font-bold">
            Price : ${price.toFixed(2)}{" "}
            {discountPrice && (
              <span className="text-red-500 ml-1 text-sm font-normal">${discountPrice.toFixed(2)}</span>
            )}
          </div>
          <div className="flex items-center">
            <span className="text-yellow-500 mr-1">★</span>
            <span className="mr-1">{rating.toFixed(1)}</span>
            <span className="text-gray-500 text-sm">({reviews.toLocaleString()} Reviews)</span>
          </div>
        </div>

        <div className="flex justify-between gap-2">
          <Button className="text-xs py-1 px-2 h-auto bg-[#2c5d7c] hover:bg-[#1e4258] flex-1">Add To Cart</Button>
          <Button variant="outline" className="text-xs py-1 px-2 h-auto border-[#2c5d7c] text-[#2c5d7c] flex-1">
            View Details
          </Button>
        </div>
      </div>
    </div>
  )
}
