import Link from "next/link"
import { ChevronRight, Filter, SlidersHorizontal } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ProductCard } from "@/components/product-card"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { products, categories } from "@/lib/data"

export default function ProductsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb Navigation */}
        <div className="bg-gray-50 py-3">
          <div className="container mx-auto px-4">
            <div className="flex items-center text-sm text-gray-600">
              <Link href="/" className="hover:text-[#2c5d7c]">
                Home
              </Link>
              <ChevronRight className="h-4 w-4 mx-2" />
              <span className="text-gray-900 font-medium">All Products</span>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl font-bold">All Products</h1>

              {/* Mobile Filter Button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="md:hidden">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                  <div className="py-4">
                    <h2 className="text-lg font-bold mb-4">Filter Products</h2>
                    <MobileFilters />
                  </div>
                </SheetContent>
              </Sheet>

              {/* Sort Dropdown (placeholder) */}
              <div className="hidden md:flex items-center">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                <select className="border rounded-md p-2 text-sm">
                  <option>Sort by: Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest</option>
                  <option>Best Selling</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
              {/* Desktop Sidebar Filters */}
              <div className="hidden md:block w-64 flex-shrink-0">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-lg font-bold mb-4">Filter By</h2>
                  <DesktopFilters />
                </div>
              </div>

              {/* Products Grid */}
              <div className="flex-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
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

                {/* Pagination */}
                <div className="mt-12 flex justify-center">
                  <nav className="flex items-center space-x-2">
                    <Button variant="outline" size="icon" disabled>
                      <ChevronRight className="h-4 w-4 rotate-180" />
                    </Button>
                    <Button variant="outline" size="sm" className="bg-[#2c5d7c] text-white">
                      1
                    </Button>
                    <Button variant="outline" size="sm">
                      2
                    </Button>
                    <Button variant="outline" size="sm">
                      3
                    </Button>
                    <Button variant="outline" size="icon">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </nav>
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

function DesktopFilters() {
  return (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="font-medium mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox id={`category-${category.id}`} />
              <Label htmlFor={`category-${category.id}`} className="text-sm">
                {category.name} ({category.productCount})
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-medium mb-3">Price Range</h3>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label htmlFor="min-price" className="text-xs">
              Min
            </Label>
            <Input id="min-price" type="number" placeholder="$0" className="h-8" />
          </div>
          <div>
            <Label htmlFor="max-price" className="text-xs">
              Max
            </Label>
            <Input id="max-price" type="number" placeholder="$500" className="h-8" />
          </div>
        </div>
        <Button className="w-full mt-2 bg-[#2c5d7c] hover:bg-[#1e4258] text-white">Apply Filter</Button>
      </div>

      {/* Rating */}
      <div>
        <h3 className="font-medium mb-3">Rating</h3>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox id={`rating-${rating}`} />
              <Label htmlFor={`rating-${rating}`} className="text-sm flex items-center">
                {Array(rating)
                  .fill(0)
                  .map((_, i) => (
                    <span key={i} className="text-yellow-400">
                      ★
                    </span>
                  ))}
                {Array(5 - rating)
                  .fill(0)
                  .map((_, i) => (
                    <span key={i} className="text-gray-300">
                      ★
                    </span>
                  ))}
                <span className="ml-1">& Up</span>
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Special Offers */}
      <div>
        <h3 className="font-medium mb-3">Special Offers</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="discount" />
            <Label htmlFor="discount" className="text-sm">
              On Sale
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="new-arrival" />
            <Label htmlFor="new-arrival" className="text-sm">
              New Arrivals
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="best-seller" />
            <Label htmlFor="best-seller" className="text-sm">
              Best Sellers
            </Label>
          </div>
        </div>
      </div>

      <Button variant="outline" className="w-full">
        Reset Filters
      </Button>
    </div>
  )
}

function MobileFilters() {
  return (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="font-medium mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox id={`mobile-category-${category.id}`} />
              <Label htmlFor={`mobile-category-${category.id}`} className="text-sm">
                {category.name} ({category.productCount})
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-medium mb-3">Price Range</h3>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label htmlFor="mobile-min-price" className="text-xs">
              Min
            </Label>
            <Input id="mobile-min-price" type="number" placeholder="$0" className="h-8" />
          </div>
          <div>
            <Label htmlFor="mobile-max-price" className="text-xs">
              Max
            </Label>
            <Input id="mobile-max-price" type="number" placeholder="$500" className="h-8" />
          </div>
        </div>
        <Button className="w-full mt-2 bg-[#2c5d7c] hover:bg-[#1e4258] text-white">Apply Filter</Button>
      </div>

      {/* Rating */}
      <div>
        <h3 className="font-medium mb-3">Rating</h3>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox id={`mobile-rating-${rating}`} />
              <Label htmlFor={`mobile-rating-${rating}`} className="text-sm flex items-center">
                {Array(rating)
                  .fill(0)
                  .map((_, i) => (
                    <span key={i} className="text-yellow-400">
                      ★
                    </span>
                  ))}
                {Array(5 - rating)
                  .fill(0)
                  .map((_, i) => (
                    <span key={i} className="text-gray-300">
                      ★
                    </span>
                  ))}
                <span className="ml-1">& Up</span>
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Special Offers */}
      <div>
        <h3 className="font-medium mb-3">Special Offers</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="mobile-discount" />
            <Label htmlFor="mobile-discount" className="text-sm">
              On Sale
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="mobile-new-arrival" />
            <Label htmlFor="mobile-new-arrival" className="text-sm">
              New Arrivals
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="mobile-best-seller" />
            <Label htmlFor="mobile-best-seller" className="text-sm">
              Best Sellers
            </Label>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <Button variant="outline" className="flex-1">
          Reset
        </Button>
        <Button className="flex-1 bg-[#2c5d7c] hover:bg-[#1e4258]">Apply</Button>
      </div>
    </div>
  )
}
