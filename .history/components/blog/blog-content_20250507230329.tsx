"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import type { BlogPost } from "@/lib/blog-data"
import { BlogContentSkeleton } from "@/components/blog/blog-content-skeleton"

interface BlogContentProps {
  post: BlogPost
}

export function BlogContent({ post }: BlogContentProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <BlogContentSkeleton />
  }

  return (
    <article className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg mb-6">
          <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority />
        </div>

        <div className="flex items-center text-sm text-gray-500 mb-4">
          <span>{post.date}</span>
          <span className="mx-2">•</span>
          <span className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            {post.commentsCount} comments
          </span>
        </div>

        <h1 className="text-3xl font-bold mb-6">{post.title}</h1>
      </div>

      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />

      <div className="mt-8 pt-6 border-t">
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/blog/tag/${tag}`}
              className="inline-block px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full hover:bg-gray-200"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </div>
    </article>
  )
}
