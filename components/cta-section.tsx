import { Button } from "@/components/ui/button"

interface CTASectionProps {
  title: string
  description: string
  buttonText: string
  emailLabel: string
  emailAddress: string
}

export function CTASection({ title, description, buttonText, emailLabel, emailAddress }: CTASectionProps) {
  return (
    <section className="py-10 bg-[#2c5d7c] text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold mb-2">{title}</h2>
            <p className="text-sm">{description}</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <Button className="bg-white text-[#2c5d7c] hover:bg-gray-100">{buttonText}</Button>
            <div className="flex flex-col">
              <span className="font-bold">{emailLabel}</span>
              <span className="text-xs">{emailAddress}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
