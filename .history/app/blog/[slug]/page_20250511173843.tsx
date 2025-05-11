"use client"

import { useEffect, useState } from "react"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
// import { SectionContainer } from "@/components/ui/section-container"
import { BlogContent } from "@/components/blog/blog-content"
import { RelatedPosts } from "@/components/blog/related-posts"
import { getBlogPostBySlug, getRelatedBlogPosts } from "@/lib/blog-data"

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const post = getBlogPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedBlogPosts(post.id, 3)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          title="Blog Page"
          description="Need assistance? We are here to help. To inquire about the products and services found on our website, please contact us by phone or e-mail, and we'll gladly assist you."
          backgroundImage="/scales-of-justice.png"
          breadcrumbs={[
            { label: "Welcome & Shop With Us", href: "/" },
            { label: "Blog Page", href: "/blog" },
            { label: post.title },
          ]}
        />

        <SectionContainer>
          <BlogContent post={post} />
          <RelatedPosts posts={relatedPosts} isLoading={isLoading} />
        </SectionContainer>
      </main>

      <Footer />
    </div>
  )
}
