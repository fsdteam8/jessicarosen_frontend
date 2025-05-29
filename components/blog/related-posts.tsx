import { BlogCard } from "@/components/blog/blog-card"
import { BlogCardSkeleton } from "@/components/blog/blog-card-skeleton"
import type { BlogPost } from "@/lib/blog-data"

interface RelatedPostsProps {
  posts: BlogPost[]
  isLoading?: boolean
}

export function RelatedPosts({ posts, isLoading = false }: RelatedPostsProps) {
  return (
    <div className="mt-12 pt-8 border-t">
      <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {isLoading
          ? Array(3)
              .fill(null)
              .map((_, index) => <BlogCardSkeleton key={index} />)
          : posts.map((post) => (
              <BlogCard
                key={post.id}
                id={post.id}
                title={post.title}
                // excerpt={post.excerpt}
                date={post.date}
                image={post.image}
                slug={post.slug}
              />
            ))}
      </div>
    </div>
  )
}
