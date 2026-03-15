/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Lock, CircleX, Loader2, Plus, Minus, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/utils";
import { useCoupon, usePayment } from "@/hooks/use-payment";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

// Constants
const TAX_PERCENT = 0.13; // 13% tax on products

export default function CheckoutPageAPI() {
  const { status } = useSession();
  const router = useRouter();
  const { items, getSubtotal, updateQuantity } = useCart();

  const couponMutation = useCoupon();
  const [discountedData, setDiscountedData] = useState<{
    code: string;
    discount: number;
    type: "percentage" | "fixed";
    isValid: boolean;
    finalPrice: string | number;
    discountAmount: string | number;
  } | null>(null);

  const [promoCode, setPromoCode] = useState("");
  const agreeTerms = true;
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discount: number;
    type: "percentage" | "fixed";
  } | null>(null);

  // Calculate price breakdown
  const subtotal = getSubtotal();
  
  // Apply discount if any
  const discountedSubtotal = discountedData?.finalPrice 
    ? Number(discountedData.finalPrice) 
    : subtotal;
  
  // Calculate tax (13% of discounted subtotal)
  const tax = discountedSubtotal * TAX_PERCENT;
  
  // Final total (subtotal + tax - discount)
  // Note: discount already applied to discountedSubtotal
  const finalTotal = discountedSubtotal + tax;

  const [paymentData, setPaymentData] = useState<any>({
    items: items.map((item) => ({
      resource: item.id,
      quantity: item.quantity,
    })),
    couponCode: appliedCoupon?.code,
  });

  // Update payment data when items or coupon changes
  useEffect(() => {
    setPaymentData({
      items: items.map((item) => ({
        resource: item.id,
        quantity: item.quantity,
      })),
      couponCode: appliedCoupon?.code,
    });
  }, [items, appliedCoupon]);

  const paymentMutation = usePayment(paymentData);

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!promoCode.trim()) {
      toast.error("Error", {
        description: "Please enter a promo code",
      });
      return;
    }

    if (appliedCoupon?.code === promoCode) {
      toast.info("Info", {
        description: "This coupon is already applied",
      });
      return;
    }

    try {
      const result = await couponMutation.mutateAsync({
        code: promoCode,
        price: String(subtotal),
      });

      if (result.status) {
        setAppliedCoupon({
          code: result.data.code,
          discount: result.data.discount,
          type: result.data.type,
        });
        setPromoCode("");

        toast.success("Coupon applied", {
          description: `${result.data.code} has been applied to your order.`,
        });

        setDiscountedData({
          ...result.data,
          isValid: true,
        });
      } else {
        toast.error("Invalid Coupon", {
          description: "The coupon code is not valid or has expired",
        });
      }
    } catch {
      toast.error("Error", {
        description: "There was an error applying the coupon. Please try again.",
      });
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setDiscountedData(null);
    toast.success("Coupon removed", {
      description: "The coupon has been removed from your order.",
    });
  };

  const handlePayment = async () => {
    if (status === "unauthenticated") {
      toast.error("Authentication Required", {
        description: "Please log in to proceed with payment.",
      });
      router.push("/sign-in");
      return;
    }

    if (!agreeTerms) {
      toast.error("Error", {
        description: "Please agree to the terms",
      });
      return;
    }

    await paymentMutation.mutateAsync();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="text-2xl font-bold text-[#2c5d7c]">
            Lawbie
          </Link>
        </div>
      </header>

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold mb-8">Checkout</h1>
          
          {!items || items.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <h3 className="text-xl font-medium mb-2">Your cart is empty</h3>
              <p className="text-gray-500 mb-6">
                Add items to your cart to proceed to checkout
              </p>
              <Button asChild className="bg-[#2c5d7c] hover:bg-[#1e4258]">
                <Link href="/products">Browse Products</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Order Items */}
              <div className="lg:col-span-2 space-y-6">
                {/* Items Card */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="p-4 border-b bg-gray-50">
                    <h3 className="font-semibold">Order Items ({items.length})</h3>
                  </div>
                  
                  {items.map((item, index) => (
                    <div
                      key={item.id}
                      className={`flex items-center gap-4 p-4 ${
                        index !== items.length - 1 ? "border-b" : ""
                      }`}
                    >
                      <div className="relative h-20 w-20 rounded-lg overflow-hidden flex-shrink-0 border">
                        <Image
                          src={
                            item.thumbnail ||
                            "/placeholder.svg?height=80&width=80"
                          }
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 truncate">
                          {item.title}
                        </h4>
                        <p className="text-sm text-gray-500 mt-1">
                          ${item.discountPrice || item.price} each
                        </p>
                        
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border rounded-md overflow-hidden">
                            <button
                              className="h-8 w-8 flex items-center justify-center hover:bg-gray-50 transition-colors"
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  Math.max(1, item.quantity - 1)
                                )
                              }
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <div className="h-8 w-12 text-center flex items-center justify-center border-x bg-gray-50">
                              {item.quantity}
                            </div>
                            <button
                              className="h-8 w-8 flex items-center justify-center hover:bg-gray-50 transition-colors"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          
                          <div className="font-medium">
                            $
                            {formatPrice(
                              (item.discountPrice || item.price) * item.quantity
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Coupon Card */}
                <div className="bg-white rounded-lg shadow-sm p-4">
                  <h3 className="font-semibold mb-3">Promo Code</h3>
                  
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2">
                        <span className="text-green-700 font-medium">
                          {appliedCoupon.code}
                        </span>
                        <span className="text-sm text-green-600">
                          (Saved ${formatPrice(Number(discountedData?.discountAmount ?? 0))})
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleRemoveCoupon}
                        className="text-red-500 hover:text-red-700 h-8 w-8 p-0"
                      >
                        <CircleX className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <Input
                        type="text"
                        placeholder="Enter coupon code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="flex-1"
                        disabled={couponMutation.isPending}
                      />
                      <Button
                        type="submit"
                        className="bg-[#2c5d7c] hover:bg-[#1e4258]"
                        disabled={couponMutation.isPending}
                      >
                        {couponMutation.isPending ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          "Apply"
                        )}
                      </Button>
                    </form>
                  )}
                </div>
              </div>

              {/* Right Column - Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                  <h2 className="text-lg font-bold mb-6">Order Summary</h2>
                  
                  {/* Price Breakdown */}
                  <div className="space-y-3 mb-6">
                    {/* Subtotal */}
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>${formatPrice(subtotal)}</span>
                    </div>

                    {/* Discount (if applied) */}
                    {discountedData && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount</span>
                        <span>-${formatPrice(Number(discountedData.discountAmount))}</span>
                      </div>
                    )}

                    {/* Tax (13%) */}
                    <div className="flex justify-between text-gray-600">
                      <span className="flex items-center gap-1">
                        Tax (13%)
                        <Info className="h-4 w-4 text-gray-400" />
                      </span>
                      <span>${formatPrice(tax)}</span>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-200 my-3"></div>

                    {/* Total */}
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-[#2c5d7c]">${formatPrice(finalTotal)}</span>
                    </div>
                    
                    {/* Tax notice */}
                    <p className="text-xs text-gray-500">
                      Includes 13% tax on all items
                    </p>
                  </div>

                  {/* Payment Button */}
                  <Button
                    onClick={handlePayment}
                    className="w-full bg-[#2c5d7c] hover:bg-[#1e4258] h-12 text-base font-medium"
                    disabled={paymentMutation.isPending || !agreeTerms}
                  >
                    {paymentMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Lock className="mr-2 h-4 w-4" />
                        Pay ${formatPrice(finalTotal)}
                      </>
                    )}
                  </Button>
                  
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-gray-500">
            © 2026 Lawbie. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}