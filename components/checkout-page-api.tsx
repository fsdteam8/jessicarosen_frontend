"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Lock, CircleX, Loader2, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useCart, useCartTotals, useClearCart } from "@/hooks/use-cart-api";
import { formatPrice } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useCoupon, usePayment } from "@/hooks/use-payment";
import { useSession } from "next-auth/react";

export default function CheckoutPageAPI() {
  // const { isAuthenticated } = useAuth();
  const { status } = useSession();
  const { data: cartData, isLoading } = useCart();
  const { subtotal, itemCount, shippingCost, total, items } = useCartTotals();
  const clearCartMutation = useClearCart();

  console.log(cartData);

  const [promoCode, setPromoCode] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discount: number;
    type: "percentage" | "fixed";
  } | null>(null);

  const { toast } = useToast();
  const couponMutation = useCoupon();
  const paymentMutation = usePayment();

  // Calculate coupon discount
  const couponDiscount = appliedCoupon
    ? appliedCoupon.type === "percentage"
      ? (subtotal * appliedCoupon.discount) / 100
      : Math.min(appliedCoupon.discount, subtotal)
    : 0;

  const finalTotal = Math.max(0, subtotal + shippingCost - couponDiscount);

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!promoCode.trim()) {
      toast({
        title: "Error",
        description: "Please enter a promo code",
        variant: "destructive",
      });
      return;
    }

    if (appliedCoupon?.code === promoCode) {
      toast({
        title: "Info",
        description: "This coupon is already applied",
      });
      return;
    }

    try {
      const result = await couponMutation.mutateAsync({ code: promoCode });

      if (result.success && result.data.isValid) {
        setAppliedCoupon({
          code: result.data.code,
          discount: result.data.discount,
          type: result.data.type,
        });
        setPromoCode("");
        toast({
          title: "Coupon applied",
          description: `${result.data.code} has been applied to your order.`,
        });
      } else {
        toast({
          title: "Invalid Coupon",
          description: "The coupon code is not valid or has expired",
          variant: "destructive",
        });
      }
    } catch {
      // Error is handled by the mutation
      toast({
        title: "Error",
        description:
          "There was an error applying the coupon. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    toast({
      title: "Coupon removed",
      description: "The coupon has been removed from your order.",
    });
  };

  const handlePayment = async () => {
    if (!agreeTerms) {
      toast({
        title: "Error",
        description: "Please agree to the shipping & billing address terms",
        variant: "destructive",
      });
      return;
    }

    if (!items || items.length === 0) {
      toast({
        title: "Error",
        description: "Your cart is empty",
        variant: "destructive",
      });
      return;
    }

    const paymentData = {
      items: items.map((item) => ({
        id: item.resourceId,
        title: item.resource.title,
        price: item.resource.discountPrice || item.resource.price,
        quantity: item.quantity,
      })),
      total: finalTotal,
      couponCode: appliedCoupon?.code,
    };

    try {
      await paymentMutation.mutateAsync(paymentData);
      // Clear cart after successful payment initiation
      await clearCartMutation.mutateAsync();
    } catch {
      // Error is handled by the mutation
      toast({
        title: "Payment Error",
        description:
          "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Show login prompt if not authenticated
  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <LogIn className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h1 className="text-2xl font-bold mb-4">Please Login</h1>
          <p className="text-gray-600 mb-6">
            You need to be logged in to proceed with checkout
          </p>
          <Button asChild>
            <Link href="/sign-in">
              <LogIn className="mr-2 h-4 w-4" />
              Login
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Loading checkout...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <div className="text-center my-[88px]">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
            Checkout Page
          </h2>
          <p className="text-[#424242] text-base max-w-2xl mx-auto leading-relaxed">
            From everyday essentials to the latest trends, we bring you a
            seamless shopping experience with unbeatable deals, delivery.
            Discover convenience, quality, and style all in one place.
          </p>
        </div>

        <div className="container mx-auto px-4">
          {!items || items.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-medium mb-2">Your cart is empty</h3>
              <p className="text-gray-500 mb-6">
                Add items to your cart to proceed to checkout
              </p>
              <Button asChild className="bg-[#2c5d7c] hover:bg-[#1e4258]">
                <Link href="/products">Browse Products</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 max-w-6xl mx-auto">
              <div className="lg:col-span-2">
                {/* Order Summary */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
                  <div className="p-4 border-b">
                    <h3 className="text-lg font-semibold">
                      Order Items ({itemCount} items)
                    </h3>
                  </div>
                  {items.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center gap-4 p-4 border-b"
                    >
                      <div className="relative h-16 w-16 rounded overflow-hidden flex-shrink-0">
                        <Image
                          src={
                            item.resource.thumbnail ||
                            "/placeholder.svg?height=64&width=64"
                          }
                          alt={item.resource.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate">
                          {item.resource.title}
                        </h4>
                        <div className="flex justify-between items-center mt-1">
                          <div className="text-sm text-gray-500">
                            Price: $
                            {item.resource.discountPrice || item.resource.price}
                            {item.resource.discountPrice && (
                              <span className="line-through ml-1 text-red-500">
                                ${item.resource.price}
                              </span>
                            )}
                          </div>
                          <div className="text-sm">Qty: {item.quantity}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">
                          $
                          {formatPrice(
                            (item.resource.discountPrice ||
                              item.resource.price) * item.quantity
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Coupon Code */}
                <div className="mb-8">
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center">
                        <span className="text-green-700 font-medium">
                          Coupon Applied: {appliedCoupon.code}
                        </span>
                        <span className="ml-2 text-green-600">
                          (-${formatPrice(couponDiscount)})
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleRemoveCoupon}
                        className="text-red-500 hover:text-red-700"
                      >
                        <CircleX className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="flex">
                      <Input
                        type="text"
                        placeholder="Enter coupon code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="rounded-r-none"
                        disabled={couponMutation.isPending}
                      />
                      <Button
                        type="submit"
                        className="rounded-l-none bg-[#2c5d7c] hover:bg-[#1e4258]"
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

                <div className="lg:col-span-1">
                  <div className="rounded-lg overflow-hidden sticky top-24">
                    <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                    <div className="space-y-2 mb-6">
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          Subtotal ({itemCount} items):
                        </span>
                        <span>${formatPrice(subtotal)}</span>
                      </div>

                      {couponDiscount > 0 && (
                        <div className="flex justify-between text-green-600">
                          <span>Coupon Discount:</span>
                          <span>-${formatPrice(couponDiscount)}</span>
                        </div>
                      )}

                      {shippingCost > 0 && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            Shipping Charge:
                          </span>
                          <span>${formatPrice(shippingCost)}</span>
                        </div>
                      )}

                      <div className="pt-2 border-t flex justify-between font-bold">
                        <span>Total:</span>
                        <span>${total}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="max-w-6xl mx-auto space-y-5 my-8">
            <div className="flex items-center space-x-2 pt-4">
              <Checkbox
                id="terms"
                checked={agreeTerms}
                onCheckedChange={(checked) => setAgreeTerms(checked === true)}
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                Agree with shipping & billing address
              </label>
            </div>

            <Button
              onClick={handlePayment}
              className="w-full bg-[#2c5d7c] hover:bg-[#1e4258] h-12"
              disabled={
                paymentMutation.isPending || !items || items.length === 0
              }
            >
              {paymentMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing Payment...
                </>
              ) : (
                <>
                  <Lock className="mr-2 h-4 w-4" />
                  Make Your Payment (${formatPrice(finalTotal)})
                </>
              )}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
