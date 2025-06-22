"use client";
import { Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/hooks/use-cart";
import { useWishlist } from "@/hooks/use-wishlist";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner"; // or use your own toast library
import { ProductDataType } from "@/types/all-product-dataType";
// import { addToCartAPI } from "@/lib/api/cart";
import { useAuth } from "@/hooks/use-auth"; // adjust if your auth is different
import { addToCartAPI } from "@/lib/cart";
import { useSession } from "next-auth/react";

export default function ProductCard({
  product,
}: {
  product?: ProductDataType;
}) {
  const { addItem } = useCart();
  const {
    addItem: addToWish,
    removeItem: removeFromWish,
    items: wishlistItems,
  } = useWishlist();


    const session = useSession()
    const token = session?.data?.user?.accessToken
  // const { token } = useAuth(); // replace with your actual way to get token

  const isInWishlist = wishlistItems.some((item) => item.id === product?._id);

  const mutation = useMutation({
    mutationFn: () =>
      addToCartAPI({
        resourceId: product?._id || "",
        quantity: 1,
        token,
      }),
    onSuccess: (data) => {
      toast.success(data.message || "Item added to cart");
      addItem({ ...product, quantity: 1 }); // Sync local cart
    },
    onError: (error: unknown) => {
      toast.error("Failed to add to cart");
      console.error(error);
    },
  });

  const toggleWishlist = () => {
    if (!product) return;
    if (isInWishlist) {
      removeFromWish(product._id);
    } else {
      addToWish({ ...product, quantity: 1 });
    }
  };

  return (
    <div className="bg-gray-50 p-4 flex items-center ">
      <Card
        className="h-auto w-full bg-white shadow-lg border-8 border-white overflow-hidden "
        style={{ borderRadius: "16px" }}
      >
        <CardContent className="p-0 h-full flex flex-col ">
          {/* Top Image Section */}
          <div className="relative h-[180px] overflow-hidden">
            {/* Heart Icon */}
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
                className={`w-5 h-5 transition-all duration-200 ${
                  isInWishlist ? "fill-red-500" : "fill-none"
                }`}
              />
            </Button>

            {/* Book Image */}
            <div className="w-full">
              <Image
                src={
                  Array.isArray(product?.thumbnail)
                    ? product?.thumbnail[0] || "/placeholder.svg"
                    : product?.thumbnail || "/images/no-image.jpg"
                }
                alt={product?.title || "Product Image"}
                width={370}
                height={180}
                className="object-cover h-[200px] w-full"
                priority
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 p-4 flex flex-col">
            {/* Product Title */}
            <h2 className="text-[20px] font-medium text-gray-900 leading-[120%] mb-3 line-clamp-2">
              {product?.title}
            </h2>

            <p
              dangerouslySetInnerHTML={{
                __html: product?.description?.slice(0, 100) || "",
              }}
              className="text-base font-normal text-[#6C6C6C] mb-3 line-clamp-3 h-[30px]"
            />

            {/* Price and Rating Row */}
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-gray-500 text-base">Price :</span>
                <span className="text-gray-400 text-base line-through">
                  ${product?.price}
                </span>
                <span className="text-red-600 font-bold text-xl">
                  ${product?.discountPrice}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <span className="text-lg font-semibold text-gray-900">
                  {product?.averageRating}
                </span>
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-gray-500 text-sm">
                  ({product?.totalReviews} Reviews)
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 mt-auto w-full">
              <Button
                onClick={() => mutation.mutate()}
                disabled={mutation.isPending}
                className="flex-1 bg-[#23547B] hover:bg-blue-800 text-white font-semibold py-2.5 px-4 rounded-lg text-sm transition-colors duration-200"
              >
                {mutation.isPending ? "Adding..." : "Add To Cart"}
              </Button>

              <Link href={`/products/${product?._id}`} className="flex-1">
                <Button
                  variant="outline"
                  className="w-full border-[#23547B] text-[#23547B] hover:bg-blue-50 font-semibold py-2.5 px-4 rounded-lg text-sm transition-colors duration-200"
                >
                  View Details
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
