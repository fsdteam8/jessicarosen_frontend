
"use client";

import React, { useState } from "react";
import { Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/hooks/use-cart";
import { useWishlist } from "@/hooks/use-wishlist";

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

  const {
    addItem: addToWish,
    removeItem: removeFromWish,
    items: wishlistItems,
  } = useWishlist();

  const [open, setOpen] = useState(false);
  const [pendingProduct, setPendingProduct] =
    useState<ProductDataType | null>(null);

  const fullName = `${product?.createdBy?.firstName} ${product?.createdBy?.lastName}`;

  const isInWishlist = wishlistItems.some(
    (item) => item.id === product?._id
  );

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
    <>
      <div>
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
                className={`absolute top-3 right-3 h-8 w-8 z-10 transition-all duration-200 ${
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

              <div className="w-full">
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
                    product?.createdBy?.profileImage ||
                    "/assets/no-users.jpeg"
                  }
                  alt="Profile"
                  width={30}
                  height={30}
                  className="w-7 h-7 rounded-full"
                />
                <Link href={`/store/${product?.createdBy?._id}`}>
                  <p className="hover:underline text-sm font-normal cursor-pointer">
                    {fullName}
                  </p>
                </Link>
              </div>

              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 text-base">Price :</span>
                  <span className="text-black font-bold text-xl">
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

              <div className="flex justify-between  items-center gap-2 mt-auto w-full">
                <Button
                  onClick={() => {
                    if (!product) return;
                    setPendingProduct(product);
                    setOpen(true);
                  }}
                  className="bg-[#23547B] hover:bg-[#133958] text-white font-bold py-2.5 px-4 rounded-lg text-sm transition-colors duration-200"
                  // className="!w-[107px] !h-[33px] flex-1 bg-[#23547B] hover:bg-[#133958] text-white font-bold py-2.5 px-4 rounded-lg text-sm transition-colors duration-200"
                >
                  Add To Cart
                </Button>

                <Link href={`/products/${product?._id}`}>
                  <Button
                    variant="outline"
                    className="!w-[107px] !h-[33px] border-[#23547B] text-[#23547B] hover:bg-blue-50 font-bold rounded-lg text-sm transition-colors duration-200"
                  >
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* CONFIRMATION POPUP */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">
              Added to cart
            </DialogTitle>
          </DialogHeader>

          <p className="text-center text-gray-600">
            Do you want to add this product to your cart?
          </p>

          <DialogFooter className="flex justify-center gap-3">
            <Button
              onClick={() => setOpen(false)}
              className="!w-[107px] !h-[33px] border border-[#23547B] text-[#23547B] bg-transparent hover:bg-blue-50 font-bold rounded-lg text-sm transition-colors duration-200"
            >
              No
            </Button>

            <Button
              onClick={() => {
                if (!pendingProduct) return;

                addItem({
                  id: pendingProduct._id,
                  title: pendingProduct.title,
                  price: pendingProduct.price,
                  discountPrice: pendingProduct.discountPrice,
                  image: Array.isArray(pendingProduct.thumbnail)
                    ? pendingProduct.thumbnail[0]
                    : pendingProduct.thumbnail,
                  thumbnail: Array.isArray(pendingProduct.thumbnail)
                    ? pendingProduct.thumbnail[0]
                    : pendingProduct.thumbnail,
                  quantity: 1,
                });

                setOpen(false);
                setPendingProduct(null);
              }}
              className="!w-[107px] !h-[33px] bg-[#23547B] hover:bg-[#133958] text-white font-bold rounded-lg text-sm transition-colors duration-200"
            >
              Yes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
