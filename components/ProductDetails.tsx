"use client";

import Image from "next/image";
import {
  Star,
  Heart,
  Linkedin,
  Instagram,
  Facebook,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useParams } from "next/navigation";
import type { AllProductDataTypeResponse } from "@/types/all-product-dataType";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import ProductCard from "@/components/ProductCard"; // Adjust the path based on your file structure
import Reviews from "./productDetails/reviews";
import QuestionsAnswers from "./productDetails/questions-answers";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function ProductDetails() {
  const params = useParams();
  const session = useSession();
  // Replace this line:
  // const userId = session?.data?.user?.id;

  // With this more robust approach:
  const userId = session?.data?.user.id;
  // Add this after the session declaration:
  console.log("Full session data:", session?.data);
  console.log("User data:", session?.data?.user);
  console.log("Extracted userId:", userId);
  const resourceId = params?.id;
  console.log("user", session?.data?.user.id);
  // console.log("ProductDetails id:",resourceId);
  // console.log("userId", userId)

  // State to track the currently selected main image
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const { data, isLoading, error, isError } =
    useQuery<AllProductDataTypeResponse>({
      queryKey: ["single-products"],
      queryFn: () =>
        fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/resource/${params?.id}`
        ).then((res) => res.json()),
    });

  console.log("ProductDetails data: single", data?.data);
  const product = Array.isArray(data?.data) ? data?.data[0] : data?.data;

  const { data: categoryData } = useQuery({
    queryKey: ["category-filter"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/resource/get-all-resources`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) {
        throw new Error("Failed to fetch categories");
      }
      return res.json();
    },
  });

  // Filter products based on matching practiceAreas
  const filteredProducts = useMemo(() => {
    if (!product?.practiceAreas || !categoryData?.data) {
      return [];
    }

    const currentProductPracticeAreas = Array.isArray(product.practiceAreas)
      ? product.practiceAreas
      : [product.practiceAreas];

    return categoryData.data
      .filter((item: AllProductDataTypeResponse["data"][number]) => {
        // Skip the current product
        if (item._id === product._id) {
          return false;
        }

        // Only show approved products
        if (item.status !== "approved") {
          return false;
        }

        // Check if practice areas match
        const itemPracticeAreas = Array.isArray(item.practiceAreas)
          ? item.practiceAreas
          : [item.practiceAreas];

        // Find products with matching practice areas
        return currentProductPracticeAreas.some((practiceArea: string) =>
          itemPracticeAreas.includes(practiceArea)
        );
      })
      .slice(0, 3); // Limit to 3 products for the "You May Also Like" section
  }, [product, categoryData]);

  console.log("Filtered products:", filteredProducts);

  if (isLoading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">Error: {error.message}</div>
    );
  }

  const thumbnail =
    Array.isArray(product?.thumbnail) && product.thumbnail.length > 0
      ? product.thumbnail[0]
      : product?.thumbnail;

  const images = Array.isArray(product?.images)
    ? [
        thumbnail,
        ...product.images.filter((img) => img !== thumbnail && Boolean(img)),
      ]
    : [thumbnail].filter(Boolean);

  console.log("ProductDetails images: 11", images);

  return (
    <div className="container mx-auto p-6 space-y-12">
      {/* Main Product Section */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left side - Product Images */}
        <div className="space-y-4">
          <div className="gap-4 flex ">
            <div className="w-[328px] h-[328px] relative">
              <Image
                src={
                  Array.isArray(images[selectedImageIndex])
                    ? "/placeholder.svg"
                    : images[selectedImageIndex] || "/placeholder.svg"
                }
                alt={product?.title || "Product image"}
                fill
                className="object-cover rounded-lg"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {images.slice(1, 5).map((image, index) => (
                <div
                  key={index + 1}
                  className={`w-[150px] h-[155px] relative cursor-pointer transition-all duration-200 rounded-lg overflow-hidden ${
                    selectedImageIndex === index + 1
                      ? "ring-2 ring-blue-500 ring-offset-2"
                      : "hover:ring-2 hover:ring-gray-300 hover:ring-offset-1"
                  }`}
                  onClick={() => setSelectedImageIndex(index + 1)}
                >
                  <Image
                    src={
                      typeof image === "string" ? image : "/images/no-image.jpg"
                    }
                    alt={product?.title || "Product image"}
                    fill
                    className="object-cover"
                  />
                  <div
                    className={`absolute inset-0 transition-opacity duration-200 ${
                      selectedImageIndex === index + 1
                        ? "bg-blue-500/10"
                        : "hover:bg-black/5"
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 pt-4">
            <span className="text-base font-medium leading-[120%] tracking-[0%] text-[#616161]">Share:</span>
            <div className="flex gap-2">
              <span>
                <Linkedin className="w-6 h-6 text-[#616161]"/>
              </span>
              <span>
                <Facebook className="w-6 h-6 text-[#616161]"/>
              </span>
              <span>
                <Instagram className="w-6 h-6 text-[#616161]"/>
              </span>
            </div>
          </div>
        </div>

        {/* Right side - Product Details */}
        <div className="">
          <div>
            <h1 className="text-2xl font-medium text-[#2A2A2A] leading-[120%] mb-3 md:mb-4">
              {product?.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center">
                <span className="text-base font-medium leading-[120%] text-[#131313] mr-1">
                  {product?.averageRating?.toFixed(1)}
                </span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= Math.round(product?.averageRating || 0)
                          ? "fill-[#F3CE00] text-[#F3CE00]"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-base font-medium leading-[120%] text-[#616161] ml-1">
                  ({product?.totalReviews} Ratings)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex flex-col items-start justify-center gap-1 mb-2">
              <span className="text-sm text-[#FF0000] font-medium leading-[120%] line-through">
                {product?.price}
              </span>
              <span className="text-xl font-medium text-[#424242] leading-[120%]">
                Price: ${product?.discountPrice}
              </span>
            </div>

            {/* Author */}
            <div className="flex items-center gap-3 mb-4">
              <Avatar className="w-[49px] h-[49px]">
                <AvatarImage
                  src={product?.createdBy?.profileImage || "/placeholder.svg"}
                />
                <AvatarFallback>{`${product?.createdBy?.firstName?.[0] ?? ""}${
                  product?.createdBy?.lastName?.[0] ?? ""
                }`}</AvatarFallback>
              </Avatar>
              <div className="flex items-center gap-10 md:gap-12 lg:gap-[54px]">
                <div>
                  <p className="text-xs font-normal leading-[150%] text-[#2A2A2A]">
                    Created by
                  </p>
                  <p className="text-base font-bold text-[#23547B] leading-normal">
                    {product?.createdBy?.firstName}{" "}
                    {product?.createdBy?.lastName}
                  </p>
                </div>
              </div>
            </div>

            {/* Sale Badge */}
            <div className="mb-4 md:mb-5 lg:mb-6">
              <span className="text-[#FF0000] text-base font-medium leading-[120%] tracking-[0%]">
                SAVE ${(product?.price ?? 0) - (product?.discountPrice ?? 0)}.00
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-6">
              <Button className="bg-[#23547B] w-[142px] h-[48px] text-base font-bold leading-[120%] text-white rounded-[8px] px-[26px] py-[14px]">
                Add To Cart
              </Button>
              <Button
                variant="outline"
                className="border-[2px] border-[#23547B] text-[#23547B] text-lg font-bold leading-[120%] hover:bg-blue-50 p-[13px] h-[48px] w-[156px] rounded-[8px]"
              >
                Download Now
              </Button>
              <Button
                variant="outline"
                className="border-[2px] border-[#23547B] text-[#23547B] text-lg font-bold leading-[120%] hover:bg-blue-50 p-[13px] h-[48px] w-[142px] rounded-[8px]"
              >
                <Heart className="w-4 h-4 mr-2" />
                Wish List
              </Button>
            </div>
          </div>

          {/* Bottom Info */}
          <div className="border-t pt-4">
            <div className="flex flex-wrap gap-4  mb-2">
              <span className="text-lg text-[#424242] font-medium leading-[120%]">
                Details Info :
              </span>
              <span className="text-base text-[#616161] font-medium leading-[120%]">
                Area
              </span>
              <span className="text-lg text-[#424242] font-medium leading-[120%]">
                {product?.practiceAreas}
              </span>
              <span className="text-base text-[#616161] font-medium leading-[120%]">
                Formats
              </span>
              <span className="text-lg text-[#424242] font-medium leading-[120%]">
                {product?.format}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* You May Also Like Section - Now using ProductCard component */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">You May Also Like</h2>
          <Link href="/products">
            <Button variant="link" className="text-blue-600 p-0">
              View all →
            </Button>
          </Link>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6">
            {filteredProducts.map(
              (relatedProduct: AllProductDataTypeResponse["data"][number]) => (
                <ProductCard
                  key={relatedProduct._id}
                  product={relatedProduct}
                />
              )
            )}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No related products found based on practice areas.</p>
          </div>
        )}
      </div>

      {/* What others say section */}
      <div>
        <h2 className="text-xl font-semibold mb-6 border-b pb-2">
          What others say
        </h2>

        <div className="space-y-6">
          {/* Wanderer 14 */}
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Wanderer 14</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              Thank you so much for this wonderful, inspiring, and educational,
              and informative learning and teaching tool. I appreciate all of
              that and you very much for sharing this with us.
            </p>
          </div>

          {/* Peter Jenkins */}
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Peter Jenkins</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              This program provided excellent learning. The language was
              accessible to the layman. I had fun! They were engaged in honest
              and real topics that were relevant and applicable to the
              marketplace.
            </p>
          </div>

          {/* JessG */}
          <div>
            <h3 className="font-medium text-gray-900 mb-2">JessG</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              I found this course to be well, informative, challenging yet, and
              educational/business oriented! All forms of business legal advice
              of the important issues that we face in business today. I would
              highly recommend this to someone who is looking for the business
              education. The delivery was excellent and well-paced and
              informative.
            </p>
          </div>
        </div>
      </div>

      <Separator />

      {/* Descriptions section */}
      <div>
        <h2 className="text-xl font-semibold mb-6">Descriptions</h2>

        <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
          <p>
            This course will provide you with a foundational understanding, and
            will give you the tools to navigate a significant amount of
            business-related legal matters, and I will help you understand and
            learn how to use a range of commercial concepts. We will also teach
            in a comprehensive and inclusive manner, and will provide you with
            the tools to navigate a significant amount of business-related legal
            matters. Our goal is to help you understand and learn how to use a
            range of commercial concepts in a comprehensive and inclusive
            manner.
          </p>

          <p>
            Let&apos;s start at the beginning. You know I have been teaching
            business law for 15 years at the commercial, corporate, and business
            law level. Our business law is a very important part of business
            law, and it is important to understand the legal framework that
            governs business transactions and relationships and is an integral
            element in business law and the law. Consequently, understanding it,
            and its associated business concepts, is crucial.
          </p>

          <p>
            Business law is a very important part of business law, and it is
            important to understand the legal framework that governs business
            transactions and relationships. Business law is an integral element
            in business law and the law. Consequently, understanding it, and its
            associated business concepts, is crucial. And it requires an ethical
            approach that is both client-focused and professional and ethical,
            understanding it, and its associated business concepts is crucial
            and it requires an ethical approach that is both client-focused and
            professional and ethical.
          </p>
        </div>
      </div>

      <Separator />

      {/* This resource is great for section */}
      <div>
        <h2 className="text-xl font-semibold mb-6">
          This resource is great for:
        </h2>

        <div className="grid md:grid-cols-2 gap-x-8 gap-y-2">
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>Business Professionals</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>Small Business Owners</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>Entrepreneurs</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>Independent Business</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>Freelancers</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>
                The guidance here can be relevant both your academic reading and
                learning activities
              </span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>Variety of market</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>Legal Professionals</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>Consulting Working Businesses</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>Program Comprehensive Summary and Content</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>Managers</span>
            </li>
          </ul>

          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>Supervisors</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>New Attorneys</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>Contracts and Commercial</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>Commercial Law</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>Strategic Challenges for Standards</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>Entrepreneurship/New Lawyer Pages</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>Commercial Law</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>In-Business School, or New Attorneys</span>
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>and EDUCATORS</span>
            </li>
          </ul>
        </div>
      </div>
      {/* reviews section */}
      {/* Replace the Reviews component call with: */}
      {userId ? (
        <Reviews
          resourceId={
            Array.isArray(resourceId) ? resourceId[0] ?? "" : resourceId ?? ""
          }
          userId={userId}
        />
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-600">Please log in to write a review.</p>
        </div>
      )}
      {/* question and ans section */}
      <QuestionsAnswers />
    </div>
  );
}
