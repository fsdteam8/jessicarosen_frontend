"use client";

import Image from "next/image";
import { Star, Heart, Linkedin, Instagram, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useParams } from "next/navigation";
import type { AllProductDataTypeResponse } from "@/types/all-product-dataType";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import ProductCard from "@/components/ProductCard";
import Reviews from "./productDetails/reviews";
import QuestionsAnswers from "./productDetails/questions-answers";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { toast } from "sonner";
import { useCart } from "@/hooks/use-cart";
import { useWishlist } from "@/hooks/use-wishlist";
// import { addToCartAPI } from "@/lib/cart";

export default function ProductDetails() {
  const params = useParams();
  const session = useSession();
  const userId = session?.data?.user?.id;
  // const token = session?.data?.user?.accessToken;
  const resourceId =
    typeof params?.id === "string" ? params.id : params?.id?.[0];
  const shareUrl = encodeURIComponent(
    typeof window !== "undefined" ? window.location.href : ""
  );

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  // const queryClient = useQueryClient();
  const { addItem } = useCart();

  const {
    addItem: addToWish,
    removeItem: removeFromWish,
    items: wishlistItems,
  } = useWishlist();

  const { data, isLoading, error, isError } =
    useQuery<AllProductDataTypeResponse>({
      queryKey: ["single-products"],
      queryFn: () =>
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/resource/${resourceId}`).then(
          (res) => res.json()
        ),
      enabled: !!resourceId,
    });

  const product = useMemo(() => {
    if (!data?.data) return undefined;
    return Array.isArray(data.data) ? data.data[0] : data.data;
  }, [data]);

  const isInWishlist = useMemo(() => {
    if (!product) return false;
    return wishlistItems.some((item) => item.id === product._id);
  }, [wishlistItems, product]);

  const toggleWishlist = () => {
    if (!product) return;
    if (isInWishlist) {
      removeFromWish(product._id);
      toast.success("Removed from wishlist");
    } else {
      addToWish({
        id: product._id,
        slug: product.title.toLowerCase().replace(/\s+/g, "-"),
        image: Array.isArray(product.thumbnail)
          ? product.thumbnail[0] || "/placeholder.svg"
          : product.thumbnail || "/images/no-image.jpg",
        rating: product.averageRating,
        price: product.price,
        discountPrice: product.discountPrice,
        title: product.title,
        description: product.description,
        reviews: product.totalReviews ?? 0,
        category: product.category || "",
        categoryId: product.categoryId || "",
      });
      toast.success("Added to wishlist");
    }
  };

  const { data: categoryData } = useQuery({
    queryKey: ["category-filter"],
    queryFn: async () => {
      const res = await fetch(
        ` ${process.env.NEXT_PUBLIC_API_URL}/resource/get-all-resources`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!res.ok) throw new Error("Failed to fetch categories");
      return res.json();
    },
  });

  // const addToCartMutation = useMutation({
  //   mutationFn: () =>
  //     addToCartAPI({
  //       resourceId: product?._id ?? "",
  //       quantity: 1,
  //       token,
  //     }),
  //   onSuccess: (data) => {
  //     toast.success(data.message || "Item added to cart");
  //     queryClient.invalidateQueries({ queryKey: ["cart"] });

  //     if (product) {
  //       addItem({
  //         id: product._id,
  //         title: product.title,
  //         price: product.price,
  //         discountPrice: product.discountPrice,
  //         image: Array.isArray(product.thumbnail)
  //           ? product.thumbnail[0] || "/placeholder.svg"
  //           : product.thumbnail || "/images/no-image.jpg",
  //         thumbnail: Array.isArray(product.thumbnail)
  //           ? product.thumbnail[0] || "/placeholder.svg"
  //           : product.thumbnail || "/images/no-image.jpg",
  //         quantity: 1,
  //       });
  //     }
  //   },
  //   onError: () => {
  //     toast.error("Please log in to add items to cart");
  //   },
  // });


  const addToCartMutation = (
    product: AllProductDataTypeResponse["data"][number] | undefined
  ) => {
    if (product) {
        addItem({
          id: product._id,
          title: product.title,
          price: product.price,
          discountPrice: product.discountPrice,
          image: Array.isArray(product.thumbnail)
            ? product.thumbnail[0] || "/placeholder.svg"
            : product.thumbnail || "/images/no-image.jpg",
          thumbnail: Array.isArray(product.thumbnail)
            ? product.thumbnail[0] || "/placeholder.svg"
            : product.thumbnail || "/images/no-image.jpg",
          quantity: 1,
        });
      }
  }

  const filteredProducts = useMemo(() => {
    if (!product?.practiceAreas || !categoryData?.data) return [];

    const currentPracticeAreas = Array.isArray(product.practiceAreas)
      ? product.practiceAreas
      : [product.practiceAreas];

    return categoryData.data
      .filter((item: AllProductDataTypeResponse["data"][number]) => {
        if (item._id === product._id || item.status !== "approved")
          return false;

        const itemPracticeAreas = Array.isArray(item.practiceAreas)
          ? item.practiceAreas
          : [item.practiceAreas];

        return currentPracticeAreas.some((area) =>
          itemPracticeAreas.includes(area)
        );
      })
      .slice(0, 3);
  }, [product, categoryData]);

  const images: string[] = useMemo(() => {
    const thumb = Array.isArray(product?.thumbnail)
      ? product.thumbnail[0]
      : product?.thumbnail;

    const gallery = Array.isArray(product?.images) ? product.images : [];

    const uniqueImages = [thumb, ...gallery].filter(
      (img, index, arr) => img && arr.indexOf(img) === index
    );

    return uniqueImages as string[];
  }, [product]);

  if (isLoading)
    return <div className="text-center text-gray-500">Loading...</div>;

  if (isError && error instanceof Error)
    return (
      <div className="text-center text-red-500">Error: {error.message}</div>
    );

  if (!product) {
    return <div className="text-center text-gray-500">No product found</div>;
  }

  return (
    <div className="container mx-auto p-6 space-y-12">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
     
     
       <div className="flex flex-col md:flex-row gap-4 md:gap-6">
  {/* Main Image */}
  <div className="w-full md:w-[728px] aspect-square relative">
    <Image
      src={
        typeof images[selectedImageIndex] === "string"
          ? images[selectedImageIndex]
          : "/placeholder.svg"
      }
      alt={product?.title || "Product image"}
      fill
      className="object-cover rounded-lg"
    />
  </div>

  {/* Thumbnail Grid */}
  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-2 gap-3 w-full">
    {images.slice(1, 5).map((image, index) => (
      <div
        key={index + 1}
        className={`aspect-square relative cursor-pointer transition-all duration-200 rounded-lg overflow-hidden ${
          selectedImageIndex === index + 1
            ? "ring-2 ring-blue-500 ring-offset-2"
            : "hover:ring-2 hover:ring-gray-300 hover:ring-offset-1"
        }`}
        onClick={() => setSelectedImageIndex(index + 1)}
      >
        <Image
          src={typeof image === "string" ? image : "/images/no-image.jpg"}
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
            <span className="text-base font-medium text-[#616161]">Share:</span>
            <div className="flex gap-2">
              {/* LinkedIn Share */}
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="w-6 h-6 text-[#616161] hover:text-blue-700 transition-colors" />
              </a>

              {/* Facebook Share */}
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="w-6 h-6 text-[#616161] hover:text-blue-600 transition-colors" />
              </a>

              {/* Instagram (Note: Instagram doesn't support direct link sharing) */}
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="w-6 h-6 text-[#616161] hover:text-pink-500 transition-colors" />
              </a>
            </div>
          </div>

        </div>

        <div>
          <h1 className="text-2xl font-medium text-[#2A2A2A] mb-3">
            {product?.title}
          </h1>

          <div className="flex items-center gap-2 mb-2">
            <span className="text-base font-medium text-[#131313] mr-1">
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
            <span className="text-base text-[#616161] ml-1">
              ({product?.totalReviews} Ratings)
            </span>
          </div>

          <div className="flex flex-col items-start gap-1 mb-2">
            <span className="text-sm text-[#FF0000] line-through">
              ${product?.price}
            </span>
            <span className="text-xl text-[#424242]">
              Price: ${product?.discountPrice}
            </span>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <Avatar className="w-[49px] h-[49px]">
              <AvatarImage
                src={product?.createdBy?.profileImage || "/placeholder.svg"}
              />
              <AvatarFallback>
                {(product?.createdBy?.firstName?.[0] ?? "") +
                  (product?.createdBy?.lastName?.[0] ?? "")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-xs text-[#2A2A2A]">Created by</p>
              <p className="text-base font-bold text-[#23547B]">
                {product?.createdBy?.firstName} {product?.createdBy?.lastName}
              </p>
            </div>
          </div>

          <div className="mb-6">
            <span className="text-[#FF0000] text-base font-medium">
              SAVE ${(product?.price ?? 0) - (product?.discountPrice ?? 0)}.00
            </span>
          </div>

          <div className="flex gap-4 mb-6 flex-wrap">
            <Button
              onClick={() => addToCartMutation(product)}
              // disabled={addToCartMutation.}
              className="bg-[#23547B] w-[142px] h-[48px] text-white font-bold rounded-[8px]"
            >
             Add To Cart
              {/* {addToCartMutation.isPending ? "Adding..." : "Add To Cart"} */}
            </Button>

            {/* <Button
              variant="outline"
              className="border-2 border-[#23547B] text-[#23547B] font-bold hover:bg-blue-50 h-[48px] w-[156px] rounded-[8px]"
            >
              Download Now
            </Button> */}

            <Button
              onClick={toggleWishlist}
              variant="outline"
              className={`border-2 font-bold h-[48px] w-[142px] rounded-[8px] transition-all ${
                isInWishlist
                  ? "border-red-500 text-red-500 hover:bg-red-50"
                  : "border-[#23547B] text-[#23547B] hover:bg-blue-50"
              }`}
            >
              <Heart
                className={`w-4 h-4 mr-2 ${
                  isInWishlist ? "fill-red-500 text-red-500" : ""
                }`}
              />
              {isInWishlist ? "Wishlisted" : "Wish List"}
            </Button>
          </div>

          <div className="border-t pt-4">
            <div className="flex flex-wrap gap-4 mb-2">
              <span className="text-lg text-[#424242] font-medium">
                Details Info :
              </span>
              <span className="text-base text-[#616161]">Area</span>
              <span className="text-lg text-[#424242]">
                {product?.practiceAreas}
              </span>
              <span className="text-base text-[#616161]">Formats</span>
              <span className="text-lg text-[#424242]">{product?.format}</span>
            </div>
          </div>
        </div>
      </div>

      {/* You May Also Like Section */}
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

      <div>
        <h2>Description</h2>

        <p dangerouslySetInnerHTML={{ __html: product?.description || "" }} />
      </div>

      <Separator />

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
      <QuestionsAnswers
        resourceId={
          Array.isArray(resourceId) ? resourceId[0] ?? "" : resourceId ?? ""
        }
        userId={userId ?? ""}
      />
    </div>
  );
}
