/* eslint-disable react/no-unescaped-entities */
"use client";

// import { useEffect, useState } from "react";
import { BlogCard } from "@/components/blog/blog-card";
import { BlogCardSkeleton } from "@/components/blog/blog-card-skeleton";
// import { blogPosts,  } from "@/lib/blog-data";
import Image from "next/image";
import LegalDoc from "@/components/HomePage/LegalDoc";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export interface Blog {
  _id: string;
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  slug: string;
}
export default function BlogPage() {
  // const [isLoading, setIsLoading] = useState(true);

  const { data: blogsResponse, isLoading } = useQuery({
    queryKey: ["blog"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/blog/`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch blogs");
      }
      return res.json();
    },
  });

  // console.log("blogs", blogsResponse?.data)

  // Get the actual blogs array from the response
  const allBlogs = blogsResponse?.data || [];
  const latestThreeBlogs = allBlogs.slice(0, 3);
  console.log("latestThreeBlogs", latestThreeBlogs);
  console.log("allBlogs ", allBlogs);

  

  return (
    <div className="min-h-screen flex flex-col">
      {/* <Header /> */}

      <main className="flex-1 mb-7">
        <section className="py-16 px-4 container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
              Latest Blogs
            </h2>
            <p className="text-[#424242] text-base max-w-2xl mx-auto leading-relaxed">
              Our team is always ready to assist you with any questions or
              concerns you might have. Fill out the form below and we&apos;ll
              get back to you as soon as possible
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[500px]">
            {/* Large featured blog post */}
            <Link
              href={`/blog/${latestThreeBlogs[0]?._id}`}
              className="relative rounded-lg overflow-hidden group cursor-pointer"
            >
              <Image
                src={latestThreeBlogs[0]?.thumbnail}
                alt={latestThreeBlogs[0]?.title || "Blog image"}
                width={600}
                height={500}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
            </Link>

            {/* Two smaller blog posts */}
            <div className="flex flex-col gap-6">
              <Link
                href={`/blog/${latestThreeBlogs[1]?._id}`}
                className="relative rounded-lg overflow-hidden group cursor-pointer h-[240px]"
              >
                <Image
                  src={latestThreeBlogs[1]?.thumbnail}
                  alt={latestThreeBlogs[1]?.title || "Blog image"}
                  width={400}
                  height={240}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
              </Link>

              <Link
                href={`/blog/${latestThreeBlogs[2]?._id}`}
                className="relative rounded-lg overflow-hidden group cursor-pointer h-[240px]"
              >
                <Image
                  src={latestThreeBlogs[2]?.thumbnail}
                  alt={latestThreeBlogs[2]?.title || "Blog image"}
                  width={400}
                  height={240}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
              </Link>
            </div>
          </div>
        </section>

        {/* All Blogs Section */}
        <div className="bg-light py-8 container mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-semibold leading-[120%] mb-4">
              All Blogs Post
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our team is always ready to assist you with any questions or
              concerns you might have. Fill out the form below and we&apos;ll
              get back to you as soon as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading
              ? Array(9)
                  .fill(null)
                  .map((_, index) => <BlogCardSkeleton key={index} />)
              : allBlogs.map((post: Blog) => (
                  <BlogCard
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    // excerpt={post.excerpt}
                    date={post?.createdAt}
                    image={post?.thumbnail || "/images/cartimg.png"} // fallback if no thumbnail
                    slug={post?.slug || post?._id}
                  />
                ))}
          </div>
        </div>
      </main>

      {/* <Footer /> */}
      <LegalDoc />
    </div>
  );
}
