import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface BlogCardProps {
  id: string
  title: string
  // excerpt: string
  date: string
  image: string
  slug: string
  className?: string
  featured?: boolean
}

export function BlogCard({  title, date, image, slug, className, featured = false }: BlogCardProps) {
  return (
    <div className={cn("group", className)}>
      <Link href={`/blog/${slug}`} className="block">
        <div className="relative overflow-hidden rounded-lg mb-4">
          <div
            className={cn("relative w-full overflow-hidden bg-gray-100", featured ? "aspect-[16/9]" : "aspect-[4/3]")}
          >
            <Image
              src={image || "/placeholder.svg"}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-2">{date}</div>
          <h3 className={cn("font-bold mb-2 group-hover:text-[#2c5d7c]", featured ? "text-xl" : "text-lg")}>{title}</h3>
          {/* {excerpt && <p className="text-gray-600 text-sm line-clamp-2">{excerpt}</p>} */}
          <div className="mt-3">
            <span className="text-[#008000] text-sm font-medium border border-[#008000] py-[5px] px-[10px] rounded-md">View Details</span>
          </div>
        </div>
      </Link>
    </div>
  )
}
