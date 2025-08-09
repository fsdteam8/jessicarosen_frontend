"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/use-cart";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "sonner"; // Added toast import
import { formatPrice } from "@/lib/utils";
import GuestCheckoutModal from "./guestcheckout";
import { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function CartSheet() {
  const { getSubtotal, items, isOpen, setOpen, removeItem } = useCart();
  const session = useSession();
  const token = session?.data?.user?.accessToken;
  const router = useRouter();
  const [open, setOpenModal] = useState(false);

  const cartData = items;
  console.log("total Data:", getSubtotal());

  // Delete item from API
  const deleteItemMutation = useMutation({
    mutationFn: async (resourceId: string) => {
      const res = await fetch(`${API_URL}/cart/item/${resourceId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to delete item");
      return res.json();
    },
    onMutate: (resourceId) => {
      // Optimistically update UI
      removeItem(resourceId);
    },
  });

  // Handle checkout button click
  const handleCheckout = () => {
    setOpen(false); // Close the cart sheet
    if (!session?.data?.user) {
      // Show toast and redirect to sign-in if user is not logged in
      toast.error("Please sign in to proceed to checkout");
      router.push("/sign-in");
    } else {
      // Proceed to checkout if user is logged in
      router.push("/checkout");
    }
  };

  console.log("Cart Items", items);

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="mb-4">
          <SheetTitle className="text-xl">Cart</SheetTitle>
        </SheetHeader>

        {cartData.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[50vh]">
            <p className="text-muted-foreground mb-4">
              {session?.data?.user
                ? "Your cart is empty"
                : "Please sign in to add items to your cart"}
            </p>
            <Button
              onClick={() => setOpen(false)}
              className="bg-[#2c5d7c] hover:bg-[#1e4258]"
            >
              Continue Shopping
            </Button>
            <Link
              href="/cart"
              className="text-sm text-blue-500 hover:underline mt-2"
            >
              View Cart
            </Link>
            <Separator className="my-4" />
          </div>
        ) : (
          <div>
            {cartData?.map((item) => (
              <div key={item?.id} className="flex items-center gap-4 mb-2">
                <div className="relative h-16 w-16 rounded overflow-hidden flex-shrink-0">
                  <Image
                    src={item?.thumbnail || item?.image || "/placeholder.svg"}
                    alt={item?.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium truncate">
                    {item?.title}
                  </h4>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span>Price: ${item.discountPrice || item.price}</span>
                  </div>
                </div>
                <div>
                  <div className="text-sm flex items-center">
                    Qty: {item.quantity}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteItemMutation.mutate(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}

            <div className="space-y-2 text-sm pt-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Subtotal ({items.length} items):
                </span>
                <span>${formatPrice(getSubtotal())}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Total:</span>
                <span>${formatPrice(getSubtotal())}</span>
              </div>
            </div>
            <div className="mt-6 space-y-2 mb-10">
              <Button
                onClick={handleCheckout}
                className="w-full bg-[#2c5d7c] hover:bg-[#1e4258]"
              >
                Checkout
              </Button>
              <Button
                onClick={() => {
                  setOpen(false); // Close the cart sheet
                }}
                asChild
                variant="outline"
                className="w-full"
              >
                <Link href="/cart">View Cart</Link>
              </Button>
            </div>
            {!session?.data?.user &&
              <div>
                <hr className="border mb-5 " />
                <Button
                  onClick={() => {
                    setOpen(false); // Close the cart sheet
                    setOpenModal(true); // Open the guest checkout modal
                  }}
                  asChild
                  variant="outline"
                  className="w-full bg-[#2c5d7c] hover:bg-[#1e4258]"
                >
                  <span className="text-white hover:text-white">Checkout as a gust</span>
                </Button>
              </div>
            }
          </div>
        )}
      </SheetContent>
      <GuestCheckoutModal open={open} setOpen={setOpenModal}/>
    </Sheet>
  );
}