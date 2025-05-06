import Image from "next/image"
import { Button } from "@/components/ui/button"

interface BestSellersSectionProps {
  title: string
  description: string
  buttonText: string
  image1: string
  image2: string
  backgroundColor?: string
}

export function BestSellersSection({
  title,
  description,
  buttonText,
  image1,
  image2,
  backgroundColor = "bg-[#f8e3a3]",
}: BestSellersSectionProps) {
  return (
    <section className={`py-16 ${backgroundColor}`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="max-w-md mb-8 md:mb-0">
            <h2 className="text-2xl font-bold mb-3">{title}</h2>
            <p className="text-sm mb-6">{description}</p>
            <Button className="bg-[#2c5d7c] hover:bg-[#1e4258] text-white">{buttonText}</Button>
          </div>
          <div className="flex">
            <div className="relative w-[180px] h-[240px] -mr-10 z-10">
              <Image
                src={image1 || "/placeholder.svg?height=240&width=180"}
                alt="Professional woman"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="relative w-[180px] h-[240px] mt-10">
              <Image
                src={image2 || "/placeholder.svg?height=240&width=180"}
                alt="Professional man"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
