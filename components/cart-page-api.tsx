"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ShoppingCart,
  ArrowLeft,
  Minus,
  Plus,
  CircleX,
  // LogIn,
} from "lucide-react";
import { Button } from "@/components/ui/button";
// import {
//   useUpdateCartItem,
//   useRemoveFromCart,
//   useCartTotals,
//   useClearCart,
// } from "@/hooks/use-cart-api";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/hooks/use-cart";
// import { useSession } from "next-auth/react";

export default function CartPageAPI() {
  // const { status } = useSession();
  const { getSubtotal, getItemCount, getTotal, items, removeItem, updateQuantity } = useCart();
  // const updateCartMutation = useUpdateCartItem();
  // const removeCartMutation = useRemoveFromCart();
  // const clearCartMutation = useClearCart();
  // const { subtotal, itemCount, shippingCost, total, items } = useCartTotals();

  console.log(items);

  return (
    <div className="flex flex-col">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          {!items || items.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <ShoppingCart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
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
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">
                  Shopping Cart ({getItemCount()} items)
                </h1>
                {/* <Button
                  variant="outline"
                  onClick={handleClearCart}
                  className="text-red-600 border-red-600 hover:bg-red-50"
                >
                  Clear Cart
                </Button> */}
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
                    {items
                      .filter((item) => {
                        const itemPrice = item.discountPrice || item.price;
                        return itemPrice && itemPrice > 0 && !isNaN(itemPrice);
                      })
                      .map((item) => {
                        const itemPrice = item.discountPrice || item.price;
                        const itemTotal = itemPrice * item.quantity;

                        return (
                          <tr key={item.id}>
                            <td className="py-4 px-6">
                              <div className="flex items-center">
                                <div className="relative h-16 w-16 rounded overflow-hidden flex-shrink-0 mr-4">
                                  <Image
                                    src={
                                      item.thumbnail && item.thumbnail !== ""
                                        ? item.thumbnail
                                        : "/images/not-imge.png"
                                    }
                                    alt={item.title || "Product Image"}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div>
                                  <h4 className="font-medium">{item.title}</h4>
                                  <div className="text-sm text-gray-500">
                                    Price: {item?.discountPrice}{" "}
                                    {/* <span className="text-red-500 line-through">
                                      ${item?.price}
                                    </span> */}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-6">
                              <div className="flex items-center">
                                <button
                                  className="h-8 w-8 border rounded-l-md flex items-center justify-center hover:bg-gray-50"
                                  onClick={() =>
                                    updateQuantity(
                                      item.id,
                                      Math.max(1, item.quantity - 1)
                                    )
                                  }
                                >
                                  <Minus className="h-3 w-3" />
                                </button>
                                <div className="h-8 w-16 text-center border-y flex items-center justify-center">
                                  {item.quantity}
                                </div>
                                <button
                                  className="h-8 w-8 border rounded-r-md flex items-center justify-center hover:bg-gray-50"
                                  onClick={() =>
                                    updateQuantity(
                                      item.id,
                                      item.quantity + 1
                                    )
                                  }
                                >
                                  <Plus className="h-3 w-3" />
                                </button>
                              </div>
                            </td>
                            <td className="py-4 px-6 font-medium">
                              ${formatPrice(itemPrice)}
                              {/* {item.discountPrice && (
                                <span className="line-through text-gray-500 ml-2 text-sm">
                                  ${formatPrice(item.price)}
                                </span>
                              )} */}
                            </td>
                            <td className="py-4 px-6 font-medium">
                              ${formatPrice(itemTotal)}
                            </td>
                            <td className="py-4 px-6">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeItem(item.id)}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              >
                                <CircleX className="h-5 w-5" />
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
                    className="mr-4 bg-[#23547B] text-white hover:text-white font-bold w-[220px] h-[48px] hover:bg-[#1e4258]"
                  >
                    <Link href="/products">Continue Shopping</Link>
                  </Button>
                </div>

                <div className="md:w-1/3 p-6 rounded-lg">
                  <h3 className="text-[24px] font-semibold mb-4">
                    Cart Summary
                  </h3>
                  <div className="space-y-2 mb-8">
                    <div className="flex justify-between">
                      <span className="text-gray-600">
                        Subtotal ({getItemCount()} items):
                      </span>
                      <span>${formatPrice(getSubtotal())}</span>
                    </div>
                    {/* {shippingCost > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Shipping:</span>
                        <span>${formatPrice(getShippingCost())}</span>
                      </div>
                    )} */}
                    <div className="pt-2 border-t flex justify-between font-bold">
                      <span>Total:</span>
                      <span>${formatPrice(getTotal())}</span>
                    </div>
                  </div>
                  <Button
                    asChild
                    className="bg-[#2c5d7c] text-white font-bold w-[220px] h-[40px] hover:bg-[#1e4258]"
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
