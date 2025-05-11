/* eslint-disable react/no-unescaped-entities */
"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
// import { SectionContainer } from "@/components/ui/section-container"
import { BlogCard } from "@/components/blog/blog-card"
import { BlogCardSkeleton } from "@/components/blog/blog-card-skeleton"
import { blogPosts, getFeaturedBlogPosts } from "@/lib/blog-data"

export default function BlogPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const featuredPosts = getFeaturedBlogPosts(2)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          title="Blog Page"
          description="Need assistance? We are here to help. To inquire about the products and services found on our website, please contact us by phone or e-mail, and we'll gladly assist you."
          backgroundImage="/scales-of-justice.png"
          breadcrumbs={[{ label: "Welcome & Shop With Us", href: "/" }, { label: "Blog Page" }]}
        />

        {/* Latest Blogs Section */}
        <div>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Latest Blogs</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our team is always ready to assist you with any questions or concerns you might have. Fill out the form
              below and we'll get back to you as soon as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {isLoading
              ? Array(2)
                  .fill(null)
                  .map((_, index) => <BlogCardSkeleton key={index} featured />)
              : featuredPosts.map((post) => (
                  <BlogCard
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    excerpt={post.excerpt}
                    date={post.date}
                    image={post.image}
                    slug={post.slug}
                    featured
                  />
                ))}
          </div>
        </div>

        {/* All Blogs Section */}
        <div className="bg-light py-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">All Blogs Post</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our team is always ready to assist you with any questions or concerns you might have. Fill out the form
              below and we&apos;ll get back to you as soon as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading
              ? Array(9)
                  .fill(null)
                  .map((_, index) => <BlogCardSkeleton key={index} />)
              : blogPosts.map((post) => (
                  <BlogCard
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    excerpt={post.excerpt}
                    date={post.date}
                    image={post.image}
                    slug={post.slug}
                  />
                ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
