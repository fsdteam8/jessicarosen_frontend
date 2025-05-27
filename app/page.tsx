import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { ArrowRight, Phone } from "lucide-react"
import { getFeaturedProducts, getNewArrivalProducts } from "@/lib/data"
import HomeHero from "@/components/HomeHero"

export default function Home() {
  const featuredProducts = getFeaturedProducts().slice(0, 6)
  // const bestSellerProducts = getBestSellerProducts().slice(0, 6)
  const popularProducts = getNewArrivalProducts().slice(0, 6)

  return (
    <div className="min-h-screen flex flex-col">

     <HomeHero/>

    </div>
  )
}
