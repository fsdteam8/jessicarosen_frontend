/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect, useState } from "react";
// import { Header } from "@/components/header"
// import { Footer } from "@/components/footer";
// import { HeroSection } from "@/components/hero-section"
// import { SectionContainer } from "@/components/ui/section-container"
import { BlogCard } from "@/components/blog/blog-card";
import { BlogCardSkeleton } from "@/components/blog/blog-card-skeleton";
import { blogPosts, getFeaturedBlogPosts } from "@/lib/blog-data";
import Image from "next/image";
import LegalDoc from "@/components/HomePage/LegalDoc";

export default function BlogPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const featuredPosts = getFeaturedBlogPosts(3);
  console.log("Featured Posts:", featuredPosts);

  

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
            <div className="relative rounded-lg overflow-hidden group cursor-pointer">
              <Image
                src="/images/cartimg.png"
                alt="Business team collaborating in modern office"
                width={600}
                height={500}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
            </div>

            {/* Two smaller blog posts */}
            <div className="flex flex-col gap-6">
              <div className="relative rounded-lg overflow-hidden group cursor-pointer h-[240px]">
                <Image
                  src="/images/cartimg.png"
                  alt="Team meeting in conference room"
                  width={400}
                  height={240}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
              </div>

              <div className="relative rounded-lg overflow-hidden group cursor-pointer h-[240px]">
                <Image
                  src="/images/cartimg.png"
                  alt="Professionals working with laptops"
                  width={400}
                  height={240}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
              </div>
            </div>
          </div>
        </section>

        {/* All Blogs Section */}
        <div className="bg-light py-8 container mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-semibold leading-[120%] mb-4">All Blogs Post</h2>
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
              : blogPosts.map((post) => (
                  <BlogCard
                    key={post.id}
                    id={post.id}
                    title={post.title}
                    // excerpt={post.excerpt}
                    date={post.date}
                    image="/images/cartimg.png"
                    slug={post.slug}
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
