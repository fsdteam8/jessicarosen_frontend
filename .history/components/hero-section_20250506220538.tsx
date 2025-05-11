import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Phone } from "lucide-react"

interface HeroSectionProps {
  title: string
  subtitle: string
  description: string
  primaryButtonText: string
  secondaryButtonText: string
  backgroundImage: string
}

export function HeroSection({
  title,
  subtitle,
  description,
  primaryButtonText,
  secondaryButtonText,
  backgroundImage,
}: HeroSectionProps) {
  return (
    <section className="relative h-[500px] flex items-center">
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage || "/placeholder.svg?height=500&width=1200"}
          alt="Hero background"
          fill
          className="object-cover brightness-50"
          priority
        />
      </div>
      <div className="container mx-auto px-4 z-10 text-white">
        <div className="max-w-xl">
          <div className="inline-block px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm mb-4">
            Welcome & Shop With Us 👋
          </div>
          <h1 className="text-5xl font-bold mb-2">{title}</h1>
          <h2 className="text-4xl font-bold mb-4">{subtitle}</h2>
          <p className="mb-8 text-white/80">{description}</p>
          <div className="flex flex-wrap gap-4">
            <Button className="bg-[#2c5d7c] hover:bg-[#1e4258] text-white px-8">{primaryButtonText}</Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8">
              <Phone className="mr-2 h-4 w-4" /> {secondaryButtonText}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
