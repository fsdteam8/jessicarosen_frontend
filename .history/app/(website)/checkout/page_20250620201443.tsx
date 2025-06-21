import CheckoutPageAPI from "@/components/checkout-page-api";

<<<<<<< HEAD
export default function Page() {
  return <CheckoutPageAPI />;
=======
import type React from "react";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Lock, CircleX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import LegalDoc from "@/components/HomePage/LegalDoc";
import HappyCoustomer from "@/components/HappyCoustomer";

type PaymentMethod = "credit" | "paypal";

export default function CheckoutPage() {
  const {
    items,
    getSubtotal,
    getShippingCost,
    getDiscount,
    getTotal,
    clearCart,
  } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("credit");
  const [promoCode, setPromoCode] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const { toast } = useToast();

  const subtotal = getSubtotal();
  const shipping = getShippingCost();
  const discount = getDiscount();
  const total = getTotal();
  console.log(items, "items in cart");

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();

    if (!promoCode) {
      toast({
        title: "Error",
        description: "Please enter a promo code",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would validate the promo code against an API
    toast({
      title: "Processing",
      description: "Checking promo code...",
    });
  };

  const handlePayment = () => {
    if (!agreeTerms) {
      toast({
        title: "Error",
        description: "Please agree to the shipping & billing address terms",
        variant: "destructive",
      });
      return;
    }

    if (paymentMethod === "paypal") {
      // In a real app, this would redirect to PayPal
      window.open("https://www.paypal.com", "_blank");
    } else {
      // Process credit card payment
      toast({
        title: "Payment Successful",
        description: "Your order has been placed successfully!",
      });

      // Clear cart after successful payment
      clearCart();

      // Redirect to success page
      // In a real app, this would redirect to a success page
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <div className="text-center my-[88px]">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
            Checkout Page
          </h2>
          <p className="text-[#424242] text-base max-w-2xl mx-auto leading-relaxed">
            From everyday essentials to the latest trends, we bring you a
            seamless shopping experience with unbeatable deals,
            delivery.discover convenience, quality, and style all in one place.
          </p>
        </div>

        <div className="container mx-auto px-4">
          {items.length === 0 ? (
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
                <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8 ">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 p-4 border-b"
                    >
                      <div className="relative h-16 w-16 rounded overflow-hidden flex-shrink-0">
                        <Image
                          src={item.thumbnail || "/placeholder.svg"}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate">{item.title}</h4>
                        <div className="flex justify-between items-center mt-1">
                          <div className="text-sm text-gray-500">
                            Price: ${item.price}
                            {item.discountPrice || (
                              <span className="line-through ml-1 text-red-500">
                                ${item.salePrice}
                              </span>
                            )}
                          </div>
                          {/* <div className="text-sm">Qty: {item.quantity}</div> */}
                        </div>
                      </div>
                      <button className="text-red-500 hover:text-red-700">
                        <CircleX className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Coupon Code */}
                <div className="mb-8">
                  <form onSubmit={handleApplyCoupon} className="flex">
                    <Input
                      type="text"
                      placeholder="Coupon Code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="rounded-r-none"
                    />
                    <Button
                      type="submit"
                      className="rounded-l-none bg-[#2c5d7c] hover:bg-[#1e4258]"
                    >
                      Apply
                    </Button>
                  </form>
                </div>

                <div className="lg:col-span-1">
                  <div className="rounded-lg overflow-hidden sticky top-24">
                    <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                    <div className="space-y-2 mb-6">
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          Subtotal ({items.length} items):
                        </span>
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
                          <span className="text-gray-600">
                            Shipping Charge:
                          </span>
                          <span>${formatPrice(shipping)}</span>
                        </div>
                      )}

                      <div className="pt-2 border-t flex justify-between font-bold">
                        <span>Total:</span>
                        <span>${formatPrice(total)}</span>
                      </div>
                    </div>

                    {/* <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Lock className="h-4 w-4 mr-2" />
                        <span>Secure Checkout</span>
                      </div>
                    </div> */}

                    {/* <div className="text-sm text-gray-500">
                      <p>
                        By completing your purchase, you agree to our{" "}
                        <Link href="/terms" className="text-[#2c5d7c]">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="text-[#2c5d7c]">
                          Privacy Policy
                        </Link>
                        .
                      </p>
                    </div> */}
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-[#D5D5D5] p-6">
                  <h2 className="text-[32px] font-semibold text-[#424242]">
                    Payment Method
                  </h2>
                  <p className="text-gray-500 mb-6">
                    Choose how you would complete your payment
                  </p>

                  <div className="space-y-6">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="credit-card"
                        name="payment-method"
                        checked={paymentMethod === "credit"}
                        onChange={() => setPaymentMethod("credit")}
                        className="h-4 w-4 text-[#2c5d7c] focus:ring-[#2c5d7c]"
                      />
                      <label
                        htmlFor="credit-card"
                        className="ml-2 flex items-center"
                      >
                        <span className="mr-4">Credit/Debit Card</span>
                        <div className="flex space-x-2">
                          {/* <div className="h-6 w-10 bg-blue-500 rounded text-white flex items-center justify-center text-xs">
                            VISA
                          </div>
                          <div className="h-6 w-10 bg-red-500 rounded text-white flex items-center justify-center text-xs">
                            MC
                          </div> */}
                        </div>
                      </label>
                    </div>

                    {paymentMethod === "credit" && (
                      <div className="pl-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="country">Country</Label>
                            <select
                              id="country"
                              className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md"
                            >
                              <option>United States, Canada</option>
                              <option>United Kingdom</option>
                              <option>Australia</option>
                            </select>
                          </div>
                          <div>
                            <Label htmlFor="zip-code">Zip Code</Label>
                            <Input
                              id="zip-code"
                              type="text"
                              placeholder="00000"
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="card-name">Name on card</Label>
                          <Input
                            id="card-name"
                            type="text"
                            placeholder="Full name"
                          />
                        </div>

                        <div>
                          <Label htmlFor="card-number">
                            Credit card number
                          </Label>
                          <Input
                            id="card-number"
                            type="text"
                            placeholder="0000-0000-0000-0000"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiry">Expire date</Label>
                            <Input
                              id="expiry"
                              type="text"
                              placeholder="MM/YY"
                            />
                          </div>
                          <div>
                            <Label htmlFor="cvv">CVV</Label>
                            <Input id="cvv" type="text" placeholder="000" />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="address">Address</Label>
                          <Input
                            id="address"
                            type="text"
                            placeholder="Enter your address"
                          />
                        </div>
                      </div>
                    )}

                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="paypal"
                        name="payment-method"
                        checked={paymentMethod === "paypal"}
                        onChange={() => setPaymentMethod("paypal")}
                        className="h-4 w-4 text-[#2c5d7c] focus:ring-[#2c5d7c]"
                      />
                      <label
                        htmlFor="paypal"
                        className="ml-2 flex items-center"
                      >
                        <span className="mr-4 text-xl font-semibold text-[#2A2A2A]">
                          Pay Pal
                        </span>
                        {/* <div className="h-6 w-10 bg-blue-600 rounded text-white flex items-center justify-center text-xs">
                          <span className="text-blue-300">P</span>
                          <span className="text-blue-100">P</span>
                        </div> */}
                      </label>
                    </div>

                    {paymentMethod === "paypal" && (
                      <div className="pl-6">
                        <p className="text-sm text-gray-600">
                          Connect your PayPal account and use it to pay your
                          bills. You will be redirected to PayPal to add your
                          billing informations.
                        </p>
                      </div>
                    )}
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
            >
              <Lock className="mr-2 h-4 w-4" />
              Make Your Payment
            </Button>
          </div>
        </div>
      </main>
      <HappyCoustomer />
      <LegalDoc />
      
    </div>
  );
>>>>>>> 0724e45 (all problem fix up)
}
