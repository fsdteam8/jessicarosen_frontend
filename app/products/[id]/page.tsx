import Link from "next/link"
import Image from "next/image"
import { Heart, Share2, Star, ChevronRight, ShoppingCart, Truck, Clock, Check } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductCard } from "@/components/product-card"
import { getProductById, getRelatedProducts } from "@/lib/data"

export default async function ProductPage({ params }: { params: { id: string } }) {
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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb Navigation */}
        <div className="bg-gray-50 py-3">
          <div className="container mx-auto px-4">
            <div className="flex items-center text-sm text-gray-600 overflow-x-auto whitespace-nowrap">
              <Link href="/" className="hover:text-[#2c5d7c]">
                Home
              </Link>
              <ChevronRight className="h-4 w-4 mx-2 flex-shrink-0" />
              <Link href="/products" className="hover:text-[#2c5d7c]">
                Products
              </Link>
              <ChevronRight className="h-4 w-4 mx-2 flex-shrink-0" />
              <span className="text-gray-900 font-medium truncate">{product.title}</span>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Product Image */}
              <div className="relative">
                <div className="bg-white rounded-lg overflow-hidden shadow-md p-4">
                  <div className="relative aspect-square">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="absolute top-6 right-6 flex space-x-2">
                    <Button variant="ghost" size="icon" className="rounded-full bg-white shadow-sm h-10 w-10">
                      <Heart className="h-5 w-5 text-gray-600" />
                    </Button>
                    <Button variant="ghost" size="icon" className="rounded-full bg-white shadow-sm h-10 w-10">
                      <Share2 className="h-5 w-5 text-gray-600" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div>
                <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
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
                  <span className="mx-2 text-gray-300">|</span>
                  <span className="text-sm text-green-500 font-medium">In Stock</span>
                </div>

                <p className="text-gray-700 mb-6">{product.longDescription}</p>

                <div className="mb-6">
                  <div className="flex items-center">
                    <div className="text-2xl font-bold text-[#2c5d7c]">${product.discountPrice?.toFixed(2)}</div>
                    {product.discountPrice && (
                      <div className="ml-2 text-lg text-gray-500 line-through">${product.price.toFixed(2)}</div>
                    )}
                    {product.discountPrice && (
                      <div className="ml-2 px-2 py-1 bg-red-100 text-red-600 text-xs font-medium rounded">
                        {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-8">
                  <div className="flex flex-col space-y-3">
                    <div className="flex items-center">
                      <Truck className="h-5 w-5 text-[#2c5d7c] mr-2" />
                      <span className="text-sm">Instant download after purchase</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-[#2c5d7c] mr-2" />
                      <span className="text-sm">Updates for 1 year</span>
                    </div>
                    <div className="flex items-center">
                      <Check className="h-5 w-5 text-[#2c5d7c] mr-2" />
                      <span className="text-sm">Satisfaction guaranteed</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="bg-[#2c5d7c] hover:bg-[#1e4258] text-white flex-1">
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Add to Cart
                  </Button>
                  <Button size="lg" variant="outline" className="border-[#2c5d7c] text-[#2c5d7c] flex-1">
                    Buy Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Tabs */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-white mb-8">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="p-6 bg-white rounded-lg">
                <h3 className="text-xl font-bold mb-4">Product Description</h3>
                <p className="text-gray-700">{product.longDescription}</p>
              </TabsContent>
              <TabsContent value="features" className="p-6 bg-white rounded-lg">
                <h3 className="text-xl font-bold mb-4">Key Features</h3>
                <ul className="space-y-2">
                  {product.features?.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-[#2c5d7c] mr-2 mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </TabsContent>
              <TabsContent value="specifications" className="p-6 bg-white rounded-lg">
                <h3 className="text-xl font-bold mb-4">Specifications</h3>
                <div className="divide-y">
                  {product.specifications &&
                    Object.entries(product.specifications).map(([key, value], index) => (
                      <div key={index} className="grid grid-cols-1 md:grid-cols-3 py-3">
                        <div className="font-medium text-gray-900">{key}</div>
                        <div className="col-span-2 text-gray-700">{value}</div>
                      </div>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-8">Related Products</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
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
      </main>

      <Footer />
    </div>
  )
}
