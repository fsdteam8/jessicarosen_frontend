"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Heart, Star, ChevronRight, ShoppingCart, Check, Minus, Plus } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductCard } from "@/components/product-card"
import { getProductById, getRelatedProducts } from "@/lib/data"
import { useCart } from "@/hooks/use-cart"
import { useWishlist } from "@/hooks/use-wishlist"

export default function ProductPage({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState(1)
  const [format, setFormat] = useState("PDF")
  const { addItem } = useCart()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist()

  const product = getProductById(params.id)

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product not found</h1>
            <p className="mb-6">The product you are looking for does not exist or has been removed.</p>
            <Button asChild>
              <Link href="/products">Browse other products</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // Fetch related products if any
  const relatedProducts = product.relatedProducts ? getRelatedProducts(product.relatedProducts) : []

  const inWishlist = isInWishlist(product.id)

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return
    setQuantity(newQuantity)
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      title: product.title,
      image: product.image,
      price: product.price,
      discountPrice: product.discountPrice,
      quantity,
    })
  }

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product)
    }
  }

  const handleBuyNow = () => {
    addItem({
      id: product.id,
      title: product.title,
      image: product.image,
      price: product.price,
      discountPrice: product.discountPrice,
      quantity,
    })

    // Navigate to checkout
    window.location.href = "/checkout"
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
              <Link href="/products" className="hover:text-[#f0a500]">
                All Products
              </Link>
              <ChevronRight className="h-3 w-3 mx-2" />
              <span>Resource Details</span>
            </div>
            <h1 className="text-4xl font-bold mb-2">Resource Details</h1>
            <p className="text-sm opacity-90 max-w-2xl">
              Refer to specific information about resources used in a project, task, or organization. These resources
              can be human, financial, material, or time-based.
            </p>
          </div>
        </div>

        {/* Product Details */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
                {/* Product Image */}
                <div className="relative">
                  <div className="bg-white rounded-lg overflow-hidden border">
                    <div className="relative aspect-[3/4] w-full">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "absolute top-4 right-4 h-10 w-10 rounded-full bg-white shadow-sm",
                      inWishlist ? "text-red-500" : "text-gray-400",
                    )}
                    onClick={handleWishlistToggle}
                  >
                    <Heart className={cn("h-5 w-5", inWishlist ? "fill-current" : "")} />
                  </Button>
                </div>

                {/* Product Info */}
                <div>
                  <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
                  <div className="flex items-center mb-4">
                    <div className="flex mr-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">({product.reviews} Reviews)</span>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center">
                      <div className="text-lg font-bold">
                        Price: ${product.discountPrice?.toFixed(2) || product.price.toFixed(2)}
                      </div>
                      {product.discountPrice && (
                        <div className="ml-2 text-sm text-gray-500 line-through">${product.price.toFixed(2)}</div>
                      )}
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-gray-700">{product.longDescription}</p>
                  </div>

                  {/* Quantity Selector */}
                  <div className="mb-6">
                    <div className="flex flex-col space-y-4">
                      <div>
                        <h3 className="text-sm font-medium mb-2">Quantity:</h3>
                        <div className="flex items-center">
                          <button
                            className="h-8 w-8 border rounded-l-md flex items-center justify-center"
                            onClick={() => handleQuantityChange(quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <input
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={(e) => handleQuantityChange(Number(e.target.value))}
                            className="h-8 w-16 text-center rounded-none border-y border-x-0"
                          />
                          <button
                            className="h-8 w-8 border rounded-r-md flex items-center justify-center"
                            onClick={() => handleQuantityChange(quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>

                      {/* Format Options */}
                      <div>
                        <h3 className="text-sm font-medium mb-2">Format:</h3>
                        <div className="flex space-x-2">
                          <Button
                            variant={format === "PDF" ? "default" : "outline"}
                            size="sm"
                            className={format === "PDF" ? "bg-[#2c5d7c]" : ""}
                            onClick={() => setFormat("PDF")}
                          >
                            PDF
                          </Button>
                          <Button
                            variant={format === "Text" ? "default" : "outline"}
                            size="sm"
                            className={format === "Text" ? "bg-[#2c5d7c]" : ""}
                            onClick={() => setFormat("Text")}
                          >
                            Text
                          </Button>
                          <Button
                            variant={format === "DOC" ? "default" : "outline"}
                            size="sm"
                            className={format === "DOC" ? "bg-[#2c5d7c]" : ""}
                            onClick={() => setFormat("DOC")}
                          >
                            DOC
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <Button
                      size="lg"
                      className="bg-[#2c5d7c] hover:bg-[#1e4258] text-white flex-1"
                      onClick={handleAddToCart}
                    >
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Add to Cart
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-[#2c5d7c] text-[#2c5d7c] flex-1"
                      onClick={handleBuyNow}
                    >
                      Buy It Now
                    </Button>
                  </div>

                  <div className="mt-6 text-sm text-gray-600">
                    <div className="flex items-center mb-2">
                      <Check className="h-4 w-4 text-green-500 mr-2" />
                      <span>Safe and Secure Checkout</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="border rounded-md p-1 h-6 w-10 flex items-center justify-center text-gray-600 text-xs">
                        VISA
                      </div>
                      <div className="border rounded-md p-1 h-6 w-10 flex items-center justify-center text-gray-600 text-xs">
                        MC
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Description */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <Tabs defaultValue="description" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-gray-50 p-2">
                  <TabsTrigger value="description">Description</TabsTrigger>
                  <TabsTrigger value="features">Features</TabsTrigger>
                  <TabsTrigger value="specifications">Specifications</TabsTrigger>
                </TabsList>
                <TabsContent value="description" className="p-6">
                  <h3 className="text-lg font-bold mb-2">Overview:</h3>
                  <p className="text-gray-700">
                    {product.longDescription ||
                      "This comprehensive legal document provides a framework for understanding and applying legal principles related to this specific area of law. It has been drafted by experienced legal professionals and is regularly updated to comply with current laws and regulations."}
                  </p>
                </TabsContent>
                <TabsContent value="features" className="p-6">
                  <h3 className="text-lg font-bold mb-4">Key Features:</h3>
                  <div className="space-y-4">
                    {product.features?.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-[#2c5d7c] mr-2 mt-0.5 shrink-0" />
                        <span>{feature}</span>
                      </div>
                    )) || (
                      <>
                        <div className="flex items-start">
                          <Check className="h-5 w-5 text-[#2c5d7c] mr-2 mt-0.5 shrink-0" />
                          <span>
                            Comprehensive Assessment: Systematically evaluates legal standards and jurisdiction-specific
                            rules to determine applicability.
                          </span>
                        </div>
                        <div className="flex items-start">
                          <Check className="h-5 w-5 text-[#2c5d7c] mr-2 mt-0.5 shrink-0" />
                          <span>
                            Precedent Legal Repository: Access a comprehensive database of precedents, statutes, and
                            case law.
                          </span>
                        </div>
                        <div className="flex items-start">
                          <Check className="h-5 w-5 text-[#2c5d7c] mr-2 mt-0.5 shrink-0" />
                          <span>
                            Regular Updates: The content is updated regularly to reflect the latest legal developments.
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="specifications" className="p-6">
                  <h3 className="text-lg font-bold mb-4">Specifications:</h3>
                  <div className="divide-y">
                    {(product.specifications &&
                      Object.entries(product.specifications).map(([key, value], index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-3 py-3">
                          <div className="font-medium text-gray-900">{key}</div>
                          <div className="col-span-2 text-gray-700">{value}</div>
                        </div>
                      ))) || (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-3 py-3">
                          <div className="font-medium text-gray-900">Format</div>
                          <div className="col-span-2 text-gray-700">PDF & Word Document</div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 py-3">
                          <div className="font-medium text-gray-900">Pages</div>
                          <div className="col-span-2 text-gray-700">24</div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 py-3">
                          <div className="font-medium text-gray-900">Last Updated</div>
                          <div className="col-span-2 text-gray-700">January 2023</div>
                        </div>
                      </>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-8">Related Resources You May Also Like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    image={product.image}
                    price={product.price}
                    discountPrice={product.discountPrice}
                    rating={product.rating}
                    reviews={product.reviews}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Call to Action */}
        <section className="py-10 bg-[#2c5d7c] text-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold mb-2">Looking For Legal Documents?</h2>
                <p className="text-sm">Find answers to common questions about our services and features.</p>
              </div>
              <div className="mt-4 md:mt-0 flex items-center space-x-4">
                <Button className="bg-white text-[#2c5d7c] hover:bg-gray-100">Buy Now</Button>
                <div className="flex flex-col">
                  <span className="font-bold">EMAIL US</span>
                  <span className="text-xs">SUPPORT@LAWBIE.COM</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}
