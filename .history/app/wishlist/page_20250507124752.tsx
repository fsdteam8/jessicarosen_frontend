"use client"

import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Heart, ShoppingCart, Trash2 } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { useWishlist } from "@/hooks/use-wishlist"
import { useCart } from "@/hooks/use-cart"

export default function WishlistPage() {
  const { items, removeItem, clearWishlist } = useWishlist()
  const { addItem } = useCart()

  const handleAddToCart = (id: string) => {
    const item = items.find((item) => item.id === id)
    if (item) {
      addItem({
        id: item.id,
        title: item.title,
        image: item.image,
        price: item.price,
        discountPrice: item.discountPrice,
        quantity: 1,
      })
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <div className="relative h-[300px] flex items-center">
          <div className="absolute inset-0 z-0">
            <Image
              src="/placeholder.svg?height=300&width=1200"
              alt="Resource details background"
              fill
              className="object-cover brightness-50"
              priority
            />
          </div>
          <div className="container mx-auto px-4 z-10 text-white">
            <div className="flex items-center text-sm mb-4">
              <Link href="/" className="hover:text-[#f0a500]">
                Welcome & Shop With Us
              </Link>
              <ChevronRight className="h-3 w-3 mx-2" />
              <span>Resource Details</span>
            </div>
            <h1 className="text-4xl font-bold mb-2">Recently added to your list of favourites.</h1>
            <p className="text-sm opacity-90 max-w-2xl">
              Widely used materials that help students, legal professionals, and researchers understand and apply legal
              principles.
            </p>
          </div>
        </div>

        <div className="bg-[#e8f3e8] py-12">
          <div className="container mx-auto px-4">
            {items.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <div className="mb-4">
                  <Heart className="h-16 w-16 mx-auto text-gray-400" />
                </div>
                <h3 className="text-xl font-medium mb-2">Your wishlist is empty</h3>
                <p className="text-gray-500 mb-6">Add items to your wishlist to save them for later</p>
                <Button asChild className="bg-[#2c5d7c] hover:bg-[#1e4258]">
                  <Link href="/products">Browse Products</Link>
                </Button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((item) => (
                    <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden relative group">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="absolute top-2 right-2 z-10 h-8 w-8 rounded-full bg-white/80 flex items-center justify-center text-red-500 hover:bg-white"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>

                      <div className="relative h-48">
                        <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                      </div>

                      <div className="p-4">
                        <h3 className="font-medium text-lg mb-2">{item.title}</h3>

                        <div className="flex justify-between items-center mb-3">
                          <div className="font-bold">
                            Price: ${item.discountPrice || item.price}
                            {item.discountPrice && (
                              <span className="text-red-500 ml-1 text-sm font-normal line-through">${item.price}</span>
                            )}
                          </div>
                          <div className="flex items-center">
                            <span className="text-yellow-500 mr-1">★</span>
                            <span className="mr-1">{item.rating.toFixed(1)}</span>
                            <span className="text-gray-500 text-sm">({item.reviews?.toLocaleString()} Reviews)</span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            className="flex-1 bg-[#2c5d7c] hover:bg-[#1e4258]"
                            onClick={() => handleAddToCart(item.id)}
                          >
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            Add to Cart
                          </Button>
                          <Button asChild variant="outline" className="flex-1 border-[#2c5d7c] text-[#2c5d7c]">
                            <Link href={`/products/${item.id}`}>View Details</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {items.length > 0 && (
                  <div className="mt-8 flex justify-center">
                    <Button
                      variant="outline"
                      className="text-red-500 border-red-500 hover:bg-red-50 hover:text-red-600"
                      onClick={() => clearWishlist()}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Clear Wishlist
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
