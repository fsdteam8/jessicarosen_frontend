import { ProductCard } from ""
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface Product {
  id: string
  title: string
  image: string
  price: number
  discountPrice?: number
  rating: number
  reviews: number
  description?: string
}

interface ProductGridProps {
  title: string
  description?: string
  products: Product[]
  variant?: "simple" | "detailed"
}

export function ProductGrid({ title, description, products, variant = "simple" }: ProductGridProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">{title}</h2>
          {description && <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              title={product.title}
              image={product.image}
              price={product.price}
              discountPrice={product.discountPrice}
              rating={product.rating}
              reviews={product.reviews}
              description={product.description}
              variant={variant}
            />
          ))}
        </div>

        <div className="text-center mt-8">
          <Button variant="link" className="text-[#2c5d7c] flex items-center mx-auto">
            See More <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
