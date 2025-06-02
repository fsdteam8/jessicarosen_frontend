"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {  ShoppingCart, ArrowLeft, Minus, Plus, CircleX } from "lucide-react"
import { Button } from "@/components/ui/button"
// import { useToast } from "@/hooks/use-toast"
import { useCart } from "@/hooks/use-cart"
import { formatPrice } from "@/lib/utils"

export default function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    // clearCart,
    getSubtotal,
    getItemPrice,
    getShippingCost,
    getDiscount,
    // getTotal,
  } = useCart()
  console.log("Cart items:", items)

  
const handleTotalPrice = (id: string) => {
 const price   =  getItemPrice(id)
  console.log("price", price)
}
  // const [promoCode, setPromoCode] = useState("")
  const [promoApplied] = useState(false)
  // const { toast } = useToast()

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return
    updateQuantity(id, newQuantity)
  }

  const handleRemoveItem = (id: string) => {
    removeItem(id)
  }

  const subtotal = getSubtotal()
  const shipping = getShippingCost()
  const discount = getDiscount() + (promoApplied ? subtotal * 0.1 : 0)
  const total = subtotal + shipping - discount
 

  return (
    <div className="flex flex-col">

      <main className="flex-1">
        {/* Hero Section */}
        

        <div className="container mx-auto px-4 py-12">
          {items.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <div className="mb-4">
                <ShoppingCart className="h-16 w-16 mx-auto text-gray-400" />
              </div>
              <h3 className="text-xl font-medium mb-2">Your cart is empty</h3>
              <p className="text-gray-500 mb-6">Add items to your cart to proceed to checkout</p>
              <Button asChild className="bg-[#2c5d7c] hover:bg-[#1e4258]">
                <Link href="/products">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Browse Products
                </Link>
              </Button>
            </div>
          ) : (
            <div>
              {/* <h2 className="text-2xl font-bold mb-8">Products</h2> */}

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="text-left border-b-2 border-b-gray-500">
                    
                    <tr>
                      <th className="py-4 px-6 text-xl font-semibold">Products</th>
                      <th className="py-4 px-6 text-xl font-semibold">Quantity</th>
                      <th className="py-4 px-6 text-xl  font-semibold">Price</th>
                      <th className="py-4 px-6 text-xl font-semibold">Remove</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {items.map((item) => (
                      <tr key={item.id} className="border-b">
                        <td className="py-4 px-6">
                          <div className="flex items-center">
                            <div className="relative h-16 w-16 rounded overflow-hidden flex-shrink-0 mr-4">
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div>
                              <h4 className="font-medium">{item.title}</h4>
                              <div className="text-sm text-gray-500">
                                Price: ${item.discountPrice || item.price}
                                {item.discountPrice && <span className="line-through ml-1">${item.price}</span>}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center">
                            <button
                              className="h-8 w-8 border rounded-l-md flex items-center justify-center"
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            > 
                              <Minus className="h-3 w-3" />
                            </button>
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => handleQuantityChange(item.id, Number.parseInt(e.target.value) || 1)}
                              className="h-8 w-16 text-center rounded-none border-y border-x-0"
                            />
                            <button
                              className="h-8 w-8 border rounded-r-md flex items-center justify-center"
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                        </td>
                        <td className="py-4 px-6 font-medium" onClick={() => handleTotalPrice(item.id)}>${formatPrice(getItemPrice(item.id))}</td>
                        <td className="py-4 px-6">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <CircleX  className="h-5 w-5" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-8 flex flex-col md:flex-row gap-8">
                <div className="md:w-2/3">
                  <Button asChild variant="outline" className="mr-4 bg-[#23547B] text-base leading-[120%] font-bold text-white w-[220px] h-[48px]">
                    <Link href="/products">
                      {/* <ArrowLeft className="mr-2 h-4 w-4" /> */}
                      Continue Shopping
                    </Link>
                  </Button>

                  {/* <Button
                    variant="outline"
                    className="text-red-500 border-red-500 hover:bg-red-50 hover:text-red-600"
                    onClick={() => clearCart()}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Clear Cart
                  </Button> */}
                </div>

                <div className="md:w-1/3 p-6 rounded-lg">
                  <h3 className="text-[24px] font-semibold leading-[120%] mb-4">Card details</h3>

                  <div className="space-y-2 mb-8">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal ({items.length} items):</span>
                      <span>${formatPrice(subtotal)}</span>
                    </div>

                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount:</span>
                        <span>-${formatPrice(discount)}</span>
                      </div>
                    )}

                    {shipping > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Shipping:</span>
                        <span>${formatPrice(shipping)}</span>
                      </div>
                    )}

                    <div className="pt-2 border-t flex justify-between font-bold">
                      <span>Total:</span>
                      <span>${formatPrice(total)}</span>
                    </div>
                  </div>

                  <Button asChild className="bg-[#2c5d7c] text-base font-bold leading-[120%] hover:bg-[#1e4258] w-[220px] h-[40px]">
                    <Link href="/checkout">Checkout</Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

    </div>
  )
}
