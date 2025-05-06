import { Button } from "@/components/ui/button"

interface PromoSectionProps {
  title: string
  description: string
  discount: string
  buttonText: string
  backgroundColor?: string
}

export function PromoSection({
  title,
  description,
  discount,
  buttonText,
  backgroundColor = "bg-[#6d90a8]",
}: PromoSectionProps) {
  return (
    <section className={`${backgroundColor} text-white py-10`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="max-w-md mb-6 md:mb-0">
            <h2 className="text-2xl font-bold mb-3">{title}</h2>
            <p className="text-sm mb-6">{description}</p>
            <Button className="bg-white text-[#2c5d7c] hover:bg-gray-100">{buttonText}</Button>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-[#f0a500]">{discount}</div>
            <div className="text-sm">DISCOUNT</div>
          </div>
        </div>
      </div>
    </section>
  )
}
