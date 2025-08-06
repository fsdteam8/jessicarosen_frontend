"use client";

import { notFound } from "next/navigation";
import { BlogContent } from "@/components/blog/blog-content";
import { useQuery } from "@tanstack/react-query";

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const { data: blogsResponse, isLoading } = useQuery({
    queryKey: ["blog-single", params.slug], // add slug to queryKey for caching
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/blog/${params.slug}`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch blogs");
      }
      return res.json();
    },
  });

  const post = blogsResponse?.data;

  console.log("singleData", post);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-semibold">Loading blog post...</p>
      </div>
    );
  }

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col  px-4 md:px-0">
      <main className="flex-1 container">
        {/* Hero Section */}
        <div className="text-center my-[22px] md:my-[40px] lg:my-[88px]">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
            Blog Page
          </h2>
          <p className="text-[#424242] text-base max-w-2xl mx-auto leading-relaxed">
            Need assistance? We are here to help. To inquire about the products
            and services found on our website, please contact us by phone or
            e-mail, and we&apos;ll gladly assist you.
          </p>
        </div>


      </main>
      <div>
        <BlogContent post={post} />
        {/* <RelatedPosts posts={relatedPosts} isLoading={isLoading} /> */}
      </div>
    </div>
  );
}
