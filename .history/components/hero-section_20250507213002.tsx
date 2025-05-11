import React from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface HeroSectionProps {
  title: string
  subtitle?: string
  description?: string
  backgroundImage: string
  height?: string
  breadcrumbs?: BreadcrumbItem[]
  children?: React.ReactNode
  className?: string
  contentClassName?: string
}

export function HeroSection({
  title,
  subtitle,
  description,
  backgroundImage,
  height = "h-[300px]",
  breadcrumbs,
  children,
  className,
  contentClassName,
}: HeroSectionProps) {
  return (
    <section className={cn("relative flex items-center", height, className)}>
      <div className="absolute inset-0 z-0">
        <Image
          src={backgroundImage || "/placeholder.svg?height=300&width=1200"}
          alt={title}
          fill
          className="object-cover brightness-50"
          priority
        />
      </div>
      <div className={cn("container mx-auto px-4 z-10 text-white", contentClassName)}>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="flex items-center text-sm mb-4">
            {breadcrumbs.map((item, index) => (
              <React.Fragment key={index}>
                {index > 0 && <ChevronRight className="h-3 w-3 mx-2" />}
                {item.href ? (
                  <Link href={item.href} className="hover:text-[#f0a500]">
                    {item.label}
                  </Link>
                ) : (
                  <span>{item.label}</span>
                )}
              </React.Fragment>
            ))}
          </div>
        )}

        <h1 className="text-4xl font-bold mb-2">{title}</h1>
        {subtitle && <h2 className="text-3xl font-bold mb-4">{subtitle}</h2>}
        {description && <p className="text-sm opacity-90 max-w-2xl mb-6">{description}</p>}

        {children}
      </div>
    </section>
  )
}
