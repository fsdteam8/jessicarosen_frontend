
import { getFeaturedProducts, getNewArrivalProducts } from "@/lib/data"
import HomeHero from "@/components/HomeHero"
import ProductCard from "@/components/ProductCard"
import ExploreSelling from "@/components/ExploreSelling"

export default function Home() {
  const featuredProducts = getFeaturedProducts().slice(0, 6)
  // const bestSellerProducts = getBestSellerProducts().slice(0, 6)
  const popularProducts = getNewArrivalProducts().slice(0, 6)

  return (
    <div className="min-h-screen flex flex-col">

     <HomeHero/>
     <ExploreSelling/>

    </div>
  )
}
