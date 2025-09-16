"use client";

import { Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/hooks/use-cart";
import { useWishlist } from "@/hooks/use-wishlist";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { toast } from "sonner";
// import { addToCartAPI } from "@/lib/cart";
// import { useSession } from "next-auth/react";

export interface ProductDataType {
  _id: string;
  title: string;
  description: string;
  price: number;
  discountPrice: number;
  averageRating: number;
  totalReviews: number;
  thumbnail: string | string[];
  quantity?: number;
  category?: string;
  categoryId?: string;
  createdBy: User;
}
interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImage: string;
}

interface ProductCardProps {
  product?: ProductDataType;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  console.log(addItem);

  const fullName = `${product?.createdBy?.firstName} ${product?.createdBy?.lastName}`;

  const {
    addItem: addToWish,
    removeItem: removeFromWish,
    items: wishlistItems,
  } = useWishlist();

  // const session = useSession();
  // const token = session?.data?.user?.accessToken;

  const isInWishlist = wishlistItems.some((item) => item.id === product?._id);

  // const queryClient = useQueryClient();

  // const mutation = useMutation({
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
  //   onError: (error) => {
  //     toast.error("Login in to add items to cart");
  //     console.error("Add to cart error:", error);
  //   },
  // });

  const toggleWishlist = () => {
    if (!product) return;
    if (isInWishlist) {
      removeFromWish(product._id);
    } else {
      addToWish({
        id: product._id,
        slug: product.title.toLowerCase().replace(/\s+/g, "-"),
        image: Array.isArray(product.thumbnail)
          ? product.thumbnail[0] || "/lawImage.jpg"
          : product.thumbnail || "/lawImage.jpg",
        rating: product.averageRating,
        price: product.price,
        discountPrice: product.discountPrice,
        title: product.title,
        description: product.description,
        reviews: product.totalReviews ?? 0,
        category: product.category || "",
        categoryId: product.categoryId || "",
      });
    }
  };

  return (
    <div className=" ">
      <Card
        className="h-auto w-full bg-[#F8F5F2] border-8 border-[#F8F5F2]/90 overflow-hidden shadow-[0px_0px_60px_0px_#0000003D]"
        style={{ borderRadius: "16px" }}
      >
        <CardContent className="p-0 h-full flex flex-col">
          {/* Top Image Section */}
          <div className="relative h-[220px] overflow-hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleWishlist}
              className={`absolute top-3 right-3 h-8 w-8 z-10 transition-all duration-200  ${
                isInWishlist
                  ? "text-red-500 bg-white/90 hover:bg-white shadow-md"
                  : "text-gray-400 hover:text-red-500 hover:bg-white/20"
              }`}
            >
              <Heart
                className={`w-6 h-6 transition-all duration-200 text-[#FF0000] ${
                  isInWishlist ? "fill-red-500" : "fill-none"
                }`}
              />
            </Button>

            {/* Product Image */}
            <div className="w-full ">
              <Link href={`/products/${product?._id}`}>
                <Image
                  src={
                    Array.isArray(product?.thumbnail)
                      ? product?.thumbnail[0] || "/lawImage.jpg"
                      : product?.thumbnail || "/lawImage.jpg"
                  }
                  alt={product?.title || "Product Image"}
                  width={370}
                  height={200}
                  className="object-cover h-[200px] w-full"
                  priority
                />
              </Link>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 p-4 flex flex-col">
            <h2 className="text-[20px] font-medium text-gray-900 leading-[120%] mb-2 line-clamp-2">
              {product?.title}
            </h2>
            <div className="flex items-center gap-3 pb-1">
              <Image
                src={
                  product?.createdBy?.profileImage || "/assets/no-users.jpeg"
                }
                alt="Profile"
                width={30}
                height={30}
                className="w-7 h-7 rounded-full"
              />
              <Link href={`/store/${product?.createdBy?._id}`}>
                <p className="hover:underline text-sm font-normal hover:cursor-pointer">{`${fullName}`}</p>
              </Link>
            </div>

            {/* <p
              dangerouslySetInnerHTML={{
                __html: product?.description?.slice(0, 100) || "",
              }}
              className="text-base font-normal text-[#6C6C6C] mb-3 line-clamp-3 h-[30px]"
            /> */}

            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-gray-500 text-base">Price :</span>
                {/* <span className="text-gray-400 text-base line-through">
                  ${product?.price}
                </span> */}
                <span className="text-red-600 font-bold text-xl">
                  ${product?.discountPrice}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <span className="text-lg font-semibold text-gray-900">
                  {product?.averageRating?.toFixed(1)}
                </span>
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-gray-500 text-sm">
                  ({product?.totalReviews} Reviews)
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center gap-2 mt-auto w-full">
              <div>
                <Button
                  onClick={() =>
                    addItem({
                      id: product?._id || "",
                      title: product?.title || "",
                      price: product?.price || 0,
                      discountPrice: product?.discountPrice || 0,
                      image: Array.isArray(product?.thumbnail)
                        ? product?.thumbnail[0] || "/placeholder.svg"
                        : product?.thumbnail || "/images/no-image.jpg",
                      thumbnail: Array.isArray(product?.thumbnail)
                        ? product?.thumbnail[0] || "/placeholder.svg"
                        : product?.thumbnail || "/images/no-image.jpg",
                      quantity: 1,
                    })
                  }
                  // disabled={mutation.isPending}
                  className="!w-[107px] !h-[33px] flex-1 bg-[#23547B] hover:bg-[#133958] text-white font-bold py-2.5 px-4 rounded-lg text-sm transition-colors duration-200"
                >
                  Add To Cart
                  {/* {mutation.isPending ? "Adding..." : "Add To Cart"} */}
                </Button>
              </div>

              <div>
                <Link href={`/products/${product?._id}`} className="">
                  <Button
                    variant="outline"
                    className="!w-[107px] !h-[33px] border-[#23547B] text-[#23547B] hover:bg-blue-50 font-bold  rounded-lg text-sm transition-colors duration-200"
                  >
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
