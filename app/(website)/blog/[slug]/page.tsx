"use client";

// import { useEffect } from "react";
import { notFound } from "next/navigation";
// import { HeroSection } from "@/components/hero-section";
// import { SectionContainer } from "@/components/ui/section-container"
import { BlogContent } from "@/components/blog/blog-content";
// import { RelatedPosts } from "@/components/blog/related-posts";
import { getBlogPostBySlug } from "@/lib/blog-data";

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   // Simulate loading delay
  //   // const timer = setTimeout(() => {
  //   //   setIsLoading(false);
  //   // }, 1000);

  //   return () => clearTimeout(timer);
  // }, []);

  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  // const relatedPosts = getRelatedBlogPosts(post.id, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        {/* <HeroSection
          title="Blog Page"
          description="Need assistance? We are here to help. To inquire about the products and services found on our website, please contact us by phone or e-mail, and we'll gladly assist you."
          backgroundImage="/scales-of-justice.png"
          breadcrumbs={[
            { label: "Welcome & Shop With Us", href: "/" },
            { label: "Blog Page", href: "/blog" },
            { label: post.title },
          ]}
        /> */}
        <div className="text-center my-[88px]">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
            Blog Page
          </h2>
          <p className="text-[#424242] text-base max-w-2xl mx-auto leading-relaxed">
            Need assistance? We are here to help. To inquire about the products and services found on our website, please contact us by phone or e-mail, and we&apos;ll gladly assist you.
          </p>
        </div>
        <div>
          <BlogContent post={post} />
          {/* <RelatedPosts posts={relatedPosts} isLoading={isLoading} /> */}
        </div>
      </main>
    </div>
  );
}
