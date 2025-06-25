"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ChevronLeft, Heart, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useWishlist } from "@/hooks/use-wishlist";
import { useCart } from "@/hooks/use-cart";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { addToCartAPI } from "@/lib/cart";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function WishlistPage() {
  const { items, removeItem, clearWishlist } = useWishlist();
  const { addItem } = useCart();
  const session = useSession();
  const token = session?.data?.user?.accessToken;
  const queryClient = useQueryClient();

  const [loadingItemId, setLoadingItemId] = useState<string | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const paginatedItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const { mutate: mutateAddToCart } = useMutation({
    mutationFn: (item: (typeof items)[number]) =>
      addToCartAPI({
        resourceId: item.id,
        quantity: 1,
        token,
      }),
    onSuccess: (data, item) => {
      toast.success(data.message || "Item added to cart");
      queryClient.invalidateQueries({ queryKey: ["cart"] });

      addItem({
        id: item.id,
        title: item.title,
        price: item.price,
        discountPrice: item.discountPrice,
        image: item.image,
        thumbnail: item.image,
        quantity: 1,
      });
    },
    onError: () => {
      toast.error("Login to add items to cart");
    },
    onSettled: () => {
      setLoadingItemId(null);
    },
  });

  const handleAddToCart = (id: string) => {
    const item = items.find((item) => item.id === id);
    if (item) {
      setLoadingItemId(id);
      mutateAddToCart(item);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 sm:py-10 lg:py-12">
          <div className="text-center mb-10 sm:mb-12">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Wish List Details
            </h1>
            <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
              Here are specific information about recommended suppliers, cost,
              or programmes. These resources cannot handle financial, medical,
              or international
            </p>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-medium mb-2">
                Your wishlist is empty
              </h3>
              <p className="text-gray-500 mb-6 text-sm sm:text-base">
                Add items to your wishlist to save them for later
              </p>
              <Button asChild className="bg-[#2c5d7c] hover:bg-[#1e4258]">
                <Link href="/products">Browse Products</Link>
              </Button>
            </div>
          ) : (
            <>
              <div className="space-y-6">
                {paginatedItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-6 relative group hover:shadow-md transition-shadow border rounded-lg"
                  >
                    <button
                      onClick={() => removeItem(item.id)}
                      className="absolute top-4 left-4 z-10 h-8 w-8 rounded-full bg-gray-100 hover:bg-red-100 flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </button>

                    <div className="w-full sm:w-32 h-32 relative rounded-lg overflow-hidden bg-gray-100 mx-auto sm:mx-0">
                      <Image
                        src={item.image || "/images/no-image.jpg"}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3">
                        <div className="flex-1 min-w-0 pr-0 sm:pr-4">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
                            {item.title}
                          </h3>
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-6 h-6 rounded-full bg-gray-300 overflow-hidden">
                              <Image
                                src="/placeholder.svg?height=24&width=24"
                                alt="Author"
                                width={24}
                                height={24}
                                className="object-cover"
                              />
                            </div>
                            <span className="text-sm text-gray-600 truncate">
                              Cameron Williamson
                            </span>
                          </div>
                        </div>

                        <div className="text-right mt-2 sm:mt-0">
                          <div className="text-red-500 font-bold text-lg">
                            ${item.discountPrice || item.price}
                          </div>
                          {item.discountPrice && (
                            <div className="text-gray-400 line-through text-sm">
                              ${item.price}
                            </div>
                          )}
                          <div className="text-xs text-gray-500 mt-1">
                            Price: Sale
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 mb-4 flex-wrap">
                        <div className="flex text-yellow-400 text-sm">
                          {[...Array(5)].map((_, i) => (
                            <span key={i}>
                              {i < Math.floor(item.rating) ? "★" : "☆"}
                            </span>
                          ))}
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          {item?.rating?.toFixed(1)} (
                          {item.reviews?.toLocaleString() || "1,991"})
                        </span>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4">
                        <div className="flex flex-col sm:flex-row gap-3">
                          <Button
                            className="bg-[#23547B] hover:bg-[#143753] text-white"
                            onClick={() => handleAddToCart(item.id)}
                            disabled={loadingItemId === item.id}
                          >
                            {loadingItemId === item.id
                              ? "Adding..."
                              : "Add To Cart"}
                          </Button>
                          <Button className="bg-[#23547B] hover:bg-[#143753] text-white">
                            <Link href={`/products/${item.id}`}>
                              View Details
                            </Link>
                          </Button>
                        </div>
                        <div className="text-xs text-gray-500">
                          English Language, Practical law
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination Controls */}
              <div className="flex items-center justify-center gap-4 mt-12 flex-wrap">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                {[...Array(totalPages)].map((_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-10 h-10 rounded-full ${
                        page === currentPage
                          ? "bg-blue-600 text-white"
                          : "border border-gray-300 hover:bg-gray-50"
                      } flex items-center justify-center text-sm font-medium`}
                    >
                      {page}
                    </button>
                  );
                })}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 disabled:opacity-50"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-10 flex justify-center">
                <Button
                  variant="outline"
                  className="text-red-500 border-red-500 hover:bg-red-50 hover:text-red-600"
                  onClick={() => clearWishlist()}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear Wishlist
                </Button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
