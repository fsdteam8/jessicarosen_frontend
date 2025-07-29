"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
// import Link from "next/link"
// import type { BlogPost } from "@/lib/blog-data";
import { BlogContentSkeleton } from "@/components/blog/blog-content-skeleton";
import { ArrowRight } from "lucide-react";
import LegalDoc from "../HomePage/LegalDoc";

// interface BlogContentProps {
//   post: BlogPost;
// }
export interface Blog {
  _id: string;
  title: string;
  description: string;
  thumbnail: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}

interface BlogContentProps {
  post: Blog;
}

export function BlogContent({ post }: BlogContentProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <BlogContentSkeleton />;
  }

  return (
    <div>
      <article className="container mx-auto">
        <div className="mb-4 md:mb-6 lg:mb-8">
          <div className="relative h-[350px] md:h-[420px] lg:h-[500px] w-full overflow-hidden rounded-lg mb-4 md:mb-5 lg:mb-6">
            <Image
              src={post?.thumbnail}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="flex gap-10 items-center text-base font-medium leading-[120%] text-[#8A8AC5] mb-5">
            {/* Left side - post date */}
            <div className="flex items-center gap-1">
              <div className="w-[50px] h-[2.5px] bg-[#008000]"></div>
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>

            {/* Right side - posted by */}
            <div className="flex items-center gap-1">
              <div className="w-[50px] h-[2.5px] bg-[#008000]"></div>
              <p>Posted by</p>
              <div className="w-5 h-5 rounded-full bg-gray-400"></div>
              <p>Lawbie</p>
            </div>
          </div>

          <h1 className="text-3xl font-bold mb-8">{post.title}</h1>
        </div>

        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: post?.description }}
        />

        <div className="mt-2 md:mt-4 lg:mt-8 pt-2 md:pt-4 lg:pt-6">
         
          <div className="flex justify-center items-center gap-4 mb-6">
            <button className="border-b-2 border-[#23547B] pb-1">
              <div className="flex items-center">
                <span className="text-base font-bold leading-[120%] mr-2 text-[#23547B]">
                  All Resources
                </span>
                <ArrowRight className="text-xl mt-1.5 text-[#23547B]" />
              </div>
            </button>
          </div>
        </div>
      </article>
      <LegalDoc />
    </div>
  );
}
