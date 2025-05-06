"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Trash2, ShoppingCart, ChevronRight, ArrowLeft, CreditCard } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { useCart } from "@/hooks/use-cart"

export default function CartPage() {
  const { items, removeItem, updateQuantity, getSubtotal, clearCart } = useCart()
  const [promoCode, setPromoCode] = useState("")
  const [promoApplied, setPromoApplied] = useState(false)
  const { toast } = useToast()

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return
    updateQuantity(id, newQuantity)
  }

  const handleRemoveItem = (id: string) => {
    removeItem(id)
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart",
    })
  }

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault()

    if (!promoCode) {
      toast({
        title: "Error",
        description: "Please enter a promo code",
        variant: "destructive",
      })
      return
    }

    // In a real app, this would validate the promo code against an API
    if (promoCode.toUpperCase() === "LEGAL10") {
      setPromoApplied(true)
      toast({
        title: "Promo applied",
        description: "10% discount has been applied to your order",
      })
    } else {
      toast({
        title: "Invalid promo code",
        description: "The promo code you entered is invalid or expired",
        variant: "destructive",
      })
    }
  }

  // Calculate totals
  const subtotal = getSubtotal()
  const discount = promoApplied ? subtotal * 0.1 : 0
  const total = subtotal - discount

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb Navigation */}
        <div className="bg-gray-50 py-3">
          <div className="container mx-auto px-4">
            <div className="flex items-center text-sm text-gray-600">
              <Link href="/" className="hover:text-[#2c5d7c]">
                Home
              </Link>
              <ChevronRight className="h-4 w-4 mx-2" />
              <span className="text-gray-900 font-medium">Shopping Cart</span>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-8 flex items-center">
            <ShoppingCart className="mr-3 h-7 w-7" /> Your Shopping Cart
          </h1>

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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="p-6 border-b">
                    <h2 className="text-xl font-bold">{items.length} Items in Cart</h2>
                  </div>

                  <div className="divide-y">
                    {items.map((item) => (
                      <div key={item.id} className="p-6 flex flex-col sm:flex-row items-start gap-4">
                        <div className="relative h-24 w-24 bg-gray-50 rounded-md flex-shrink-0">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            fill
                            className="object-cover rounded-md"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <Link
                            href={`/products/${item.id}`}
                            className="text-lg font-medium text-gray-900 hover:text-[#2c5d7c]"
                          >
                            {item.title}
                          </Link>
                          <p className="text-gray-500 text-sm mt-1">Digital Document</p>

                          <div className="flex flex-wrap justify-between items-center mt-4 gap-4">
                            <div className="flex items-center">
                              <button
                                className="h-8 w-8 border rounded-l-md flex items-center justify-center"
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              >
                                −
                              </button>
                              <Input
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
                                +
                              </button>
                            </div>

                            <div className="flex items-center space-x-3">
                              <span className="font-bold text-[#2c5d7c]">
                                ${((item.discountPrice || item.price) * item.quantity).toFixed(2)}
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemoveItem(item.id)}
                                className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-4">
                  <Button asChild variant="outline" className="text-[#2c5d7c] border-[#2c5d7c]">
                    <Link href="/products">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Continue Shopping
                    </Link>
                  </Button>

                  <Button
                    variant="outline"
                    className="text-red-500 border-red-500 hover:bg-red-50 hover:text-red-600"
                    onClick={() => {
                      clearCart()
                      toast({
                        title: "Cart cleared",
                        description: "All items have been removed from your cart",
                      })
                    }}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Clear Cart
                  </Button>
                </div>
              </div>

              {/* Order Summary */}
              <div>
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="p-6 border-b">
                    <h2 className="text-xl font-bold">Order Summary</h2>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">${subtotal.toFixed(2)}</span>
                    </div>

                    {promoApplied && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount (10%)</span>
                        <span>-${discount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="pt-4 border-t flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-[#2c5d7c]">${total.toFixed(2)}</span>
                    </div>

                    <form onSubmit={handleApplyCoupon} className="pt-4">
                      <Label htmlFor="promo-code" className="text-sm font-medium">
                        Promo Code
                      </Label>
                      <div className="flex mt-1 gap-2">
                        <Input
                          id="promo-code"
                          type="text"
                          placeholder="Enter code"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          className="flex-1"
                        />
                        <Button type="submit" variant="outline" className="border-[#2c5d7c] text-[#2c5d7c]">
                          Apply
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">Try code: LEGAL10</p>
                    </form>

                    <Button className="w-full bg-[#2c5d7c] hover:bg-[#1e4258] mt-6 h-12" asChild>
                      <Link href="/checkout">
                        <CreditCard className="mr-2 h-4 w-4" />
                        Proceed to Checkout
                      </Link>
                    </Button>
                  </div>
                </div>

                <div className="mt-6 bg-white rounded-lg shadow-sm p-6">
                  <h3 className="font-medium mb-3">We Accept</h3>
                  <div className="flex flex-wrap gap-2">
                    <div className="border rounded-md p-2 h-8 w-12 flex items-center justify-center text-gray-600">
                      VISA
                    </div>
                    <div className="border rounded-md p-2 h-8 w-12 flex items-center justify-center text-gray-600">
                      MC
                    </div>
                    <div className="border rounded-md p-2 h-8 w-12 flex items-center justify-center text-gray-600">
                      AMEX
                    </div>
                    <div className="border rounded-md p-2 h-8 w-12 flex items-center justify-center text-gray-600">
                      DISC
                    </div>
                    <div className="border rounded-md p-2 h-8 w-12 flex items-center justify-center text-gray-600">
                      PP
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
