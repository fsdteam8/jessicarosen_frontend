"use client";

import Image from "next/image";
import Link from "next/link";
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
// import { formatPrice } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "sonner"; // ✅ Ensure you have this

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Move interfaces outside the component
interface CartResource {
  _id: string;
  title: string;
  thumbnail?: string;
  price: number;
  discountPrice?: number;
}

interface CartItem {
  id: string;
  resource: CartResource;
}

export function CartSheet() {
  const { items, isOpen, setOpen, removeItem,  } = useCart();
  const queryClient = useQueryClient();
  const session = useSession();
  const token = session?.data?.user?.accessToken;

  // ✅ Fetch cart from API
  const { data } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await fetch(`${API_URL}/cart/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch cart");
      return res.json();
    },
    enabled: !!token,
  });

  const cart = data?.data;
  const cartData = cart?.items || [];
console.log("Cart Data:", cartData);
  // ✅ Delete item from API
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Item removed from cart");
    },
    onError: () => {
      toast.error("Failed to remove item");
    },
  });

  if (!items) return null;

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="mb-4">
          <SheetTitle className="text-xl">Cart</SheetTitle>
        </SheetHeader>

        {cartData.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[50vh]">
            <p className="text-muted-foreground mb-4">Your cart is empty</p>
            <Button
              onClick={() => setOpen(false)}
              className="bg-[#2c5d7c] hover:bg-[#1e4258]"
            >
              Continue Shopping
            </Button>
            <Link
              href="/products"
              className="text-sm text-blue-500 hover:underline mt-2"
            >
              Go to cart page
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              {cartData.map((item: CartItem) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="relative h-16 w-16 rounded overflow-hidden flex-shrink-0">
                    <Image
                      src={item?.resource?.thumbnail || "/placeholder.svg"}
                      alt={item?.resource?.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium truncate">
                      {item?.resource?.title}
                    </h4>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span>
                        Price: ${item?.resource?.discountPrice || item?.resource?.price}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteItemMutation.mutate(item?.resource?._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            <Separator className="my-4" />

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Subtotal ({items.length} items):
                </span>
                {/* <span>${formatPrice(getSubtotal())}</span> */}
                <span>${cart?.subtotal}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Total:</span>
                <span>${cart?.subtotal}</span>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <Button
                asChild
                className="w-full bg-[#2c5d7c] hover:bg-[#1e4258]"
              >
                <Link href="/checkout">Checkout</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/cart">View Cart</Link>
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
