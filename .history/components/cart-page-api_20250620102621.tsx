"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ShoppingCart,
  ArrowLeft,
  Minus,
  Plus,
  CircleX,
  Loader2,
  LogIn,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  useCart,
  useUpdateCartItem,
  useRemoveFromCart,
  useCartTotals,
  useClearCart,
} from "@/hooks/use-cart-api";
import { formatPrice } from "@/lib/utils";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function CartPageAPI() {
  const { status } = useSession();
  const { isLoading, error } = useCart();
  const updateCartMutation = useUpdateCartItem();
  const removeCartMutation = useRemoveFromCart();
  const clearCartMutation = useClearCart();
  const { subtotal, itemCount, shippingCost, total, items } = useCartTotals();

  const [updatingItems, setUpdatingItems] = useState<Set<string>>(new Set());

  // console.log(session, cartData);

<<<<<<< HEAD
  const handleQuantityChange = async (
    itemId: string,
    targetQuantity: number
  ) => {
    if (targetQuantity < 1) return; // Prevent invalid quantities

    // Get the current quantity from the most up-to-date cart data
    const currentItem = items.find((item) => item._id === itemId);
    if (!currentItem) return;

    // Prevent unnecessary API calls if quantity hasn't changed
    if (currentItem.quantity === targetQuantity) return;

    console.log(
      `Updating item ${itemId} from ${currentItem.quantity} to ${targetQuantity}`
    );
=======
  // Here's the fixed version:
  const handleQuantityChange = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    console.log(`Updating item ${itemId} quantity to ${newQuantity}`);
>>>>>>> 9556894 (monir done wel)

    setUpdatingItems((prev) => new Set(prev).add(itemId));

    try {
<<<<<<< HEAD
      // Pass the absolute target quantity
      await updateCartMutation.mutateAsync({
        itemId,
        quantity: targetQuantity,
=======
      await updateCartMutation.mutateAsync({
        itemId,
        quantity: newQuantity,
>>>>>>> 9556894 (monir done wel)
      });
    } finally {
      setUpdatingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(itemId);
        return newSet;
      });
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    setUpdatingItems((prev) => new Set(prev).add(itemId));

    try {
      await removeCartMutation.mutateAsync(itemId);
    } finally {
      setUpdatingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(itemId);
        return newSet;
      });
    }
  };

  const handleClearCart = async () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      await clearCartMutation.mutateAsync();
    }
  };

  // Show login prompt if not authenticated
  if (status === "unauthenticated") {
    return (
      <div className="flex flex-col">
        <main className="flex-1">
          <div className="container mx-auto px-4 py-12">
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <div className="mb-4">
                <LogIn className="h-16 w-16 mx-auto text-gray-400" />
              </div>
              <h3 className="text-xl font-medium mb-2">Please Login</h3>
              <p className="text-gray-500 mb-6">
                You need to be logged in to view your cart
              </p>
              <Button asChild className="bg-[#2c5d7c] hover:bg-[#1e4258]">
                <Link href="/sign-in">
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </Link>
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col">
        <main className="flex-1">
          <div className="container mx-auto px-4 py-12">
            <div className="text-center py-12">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
              <p>Loading your cart...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col">
        <main className="flex-1">
          <div className="container mx-auto px-4 py-12">
            <div className="text-center py-12 bg-red-50 rounded-lg">
              <p className="text-red-600 mb-4">
                {error.message.includes("Unauthorized")
                  ? "Please login again to view your cart"
                  : "Failed to load cart. Please try again."}
              </p>
              {error.message.includes("Unauthorized") ? (
                <Button asChild>
                  <Link href="/sign-in">Login</Link>
                </Button>
              ) : (
                <Button onClick={() => window.location.reload()}>Retry</Button>
              )}
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          {!items || items.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <div className="mb-4">
                <ShoppingCart className="h-16 w-16 mx-auto text-gray-400" />
              </div>
              <h3 className="text-xl font-medium mb-2">Your cart is empty</h3>
              <p className="text-gray-500 mb-6">
                Add items to your cart to proceed to checkout
              </p>
              <Button asChild className="bg-[#2c5d7c] hover:bg-[#1e4258]">
                <Link href="/products">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Browse Products
                </Link>
              </Button>
            </div>
          ) : (
            <div>
              {/* Cart Header */}
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">
                  Shopping Cart ({itemCount} items)
                </h1>
                <Button
                  variant="outline"
                  onClick={handleClearCart}
                  disabled={clearCartMutation.isPending}
                  className="text-red-600 border-red-600 hover:bg-red-50"
                >
                  {clearCartMutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : null}
                  Clear Cart
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="text-left border-b-2 border-b-gray-500">
                    <tr>
                      <th className="py-4 px-6 text-xl font-semibold">
                        Products
                      </th>
                      <th className="py-4 px-6 text-xl font-semibold">
                        Quantity
                      </th>
                      <th className="py-4 px-6 text-xl font-semibold">Price</th>
                      <th className="py-4 px-6 text-xl font-semibold">Total</th>
                      <th className="py-4 px-6 text-xl font-semibold">
                        Remove
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {items.map((item) => {
                      const isUpdating = updatingItems.has(item._id);
                      const itemPrice =
                        item.resource.discountPrice || item.resource.price;
                      const itemTotal = itemPrice * item.quantity;

<<<<<<< HEAD
                      console.log(item);
=======
                      console.log(item.resource._id);
>>>>>>> 9556894 (monir done wel)
                      return (
                        <tr
                          key={item._id}
                          className={`border-b ${
                            isUpdating ? "opacity-50" : ""
                          }`}
                        >
                          <td className="py-4 px-6">
                            <div className="flex items-center">
                              <div className="relative h-16 w-16 rounded overflow-hidden flex-shrink-0 mr-4">
                                <Image
                                  src={
                                    item.resource.thumbnail ||
                                    "/placeholder.svg?height=64&width=64"
                                  }
<<<<<<< HEAD
                                  alt={item.resource.title || "Product Image"}
=======
                                  alt={item.resource.title}
>>>>>>> 9556894 (monir done wel)
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <h4 className="font-medium">
                                  {item.resource.title}
                                </h4>
                                <div className="text-sm text-gray-500">
                                  Format: {item.resource.format}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center">
                              <button
                                className="h-8 w-8 border rounded-l-md flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
<<<<<<< HEAD
                                onClick={() => {
                                  const newQuantity = Math.max(
                                    1,
                                    item.quantity - 1
                                  );
                                  handleQuantityChange(item._id, newQuantity);
                                }}
=======
                                onClick={() =>
                                  handleQuantityChange(
                                    item.resource._id,
                                    item.quantity - 1
                                  )
                                }
>>>>>>> 9556894 (monir done wel)
                                disabled={isUpdating || item.quantity <= 1}
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <div className="h-8 w-16 text-center border-y border-x-0 flex items-center justify-center">
                                {isUpdating ? (
                                  <Loader2 className="h-3 w-3 animate-spin" />
                                ) : (
                                  item.quantity
                                )}
                              </div>
                              <button
                                className="h-8 w-8 border rounded-r-md flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
<<<<<<< HEAD
                                onClick={() => {
                                  const newQuantity = item.quantity + 1;
                                  handleQuantityChange(
                                    item.resource._id,
                                    newQuantity
                                  );
                                }}
=======
                                onClick={() =>
                                  handleQuantityChange(
                                    item.resource._id,
                                    item.quantity + 1
                                  )
                                }
>>>>>>> 9556894 (monir done wel)
                                disabled={isUpdating}
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                          </td>
<<<<<<< HEAD

=======
>>>>>>> 9556894 (monir done wel)
                          <td className="py-4 px-6 font-medium">
                            <div>
                              ${formatPrice(itemPrice)}
                              {item.resource.discountPrice && (
                                <span className="line-through text-gray-500 ml-2 text-sm">
                                  ${formatPrice(item.resource.price)}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-4 px-6 font-medium">
                            ${formatPrice(itemTotal)}
                          </td>
                          <td className="py-4 px-6">
                            <Button
                              variant="ghost"
                              size="icon"
<<<<<<< HEAD
                              onClick={() =>
                                handleRemoveItem(item.resource._id)
                              }
=======
                              onClick={() => handleRemoveItem(item._id)}
>>>>>>> 9556894 (monir done wel)
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              disabled={isUpdating}
                            >
                              {isUpdating ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                              ) : (
                                <CircleX className="h-5 w-5" />
                              )}
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="mt-8 flex flex-col md:flex-row gap-8">
                <div className="md:w-2/3">
                  <Button
                    asChild
                    variant="outline"
                    className="mr-4 bg-[#23547B] text-base leading-[120%] font-bold text-white w-[220px] h-[48px]"
                  >
                    <Link href="/products">Continue Shopping</Link>
                  </Button>
                </div>

                <div className="md:w-1/3 p-6 rounded-lg">
                  <h3 className="text-[24px] font-semibold leading-[120%] mb-4">
                    Cart Summary
                  </h3>
                  <div className="space-y-2 mb-8">
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        Subtotal ({itemCount} items):
                      </span>
                      <span>${formatPrice(subtotal)}</span>
                    </div>

                    {shippingCost > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Shipping:</span>
                        <span>${formatPrice(shippingCost)}</span>
                      </div>
                    )}

                    <div className="pt-2 border-t flex justify-between font-bold">
                      <span>Total:</span>
                      <span>${formatPrice(total)}</span>
                    </div>
                  </div>

                  <Button
                    asChild
                    className="bg-[#2c5d7c] text-base font-bold leading-[120%] hover:bg-[#1e4258] w-[220px] h-[40px]"
                    disabled={items.length === 0}
                  >
                    <Link href="/checkout">Checkout</Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
