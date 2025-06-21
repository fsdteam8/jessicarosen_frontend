"use client"

import Image from "next/image"
import Link from "next/link"
import { X } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/hooks/use-cart"
import { formatPrice } from "@/lib/utils"

export function CartSheet() {
  const { items, isOpen, setOpen, removeItem, getSubtotal, getTotal} = useCart()

  if (!items) {
    return null // or a loading state
  }



  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="mb-4">
          <SheetTitle className="text-xl">Cart</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[50vh]">
            <p className="text-muted-foreground mb-4">Your cart is empty</p>
            <Button onClick={() => setOpen(false)} className="bg-[#2c5d7c] hover:bg-[#1e4258]">
              Continue Shopping
            </Button>
            
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="relative h-16 w-16 rounded overflow-hidden flex-shrink-0">
                    <Image src={item?.thumbnail || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium truncate">{item.title}</h4>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span>Price: ${item.discountPrice || item.price}</span>
                      {item.discountPrice && <span className="line-through ml-1 text-xs">${item.price}</span>}
                    </div>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            <Separator className="my-4" />

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal ({items.length} items):</span>
                <span>${formatPrice(getSubtotal())}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Total:</span>
                <span>${formatPrice(getTotal())}</span>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <Button asChild className="w-full bg-[#2c5d7c] hover:bg-[#1e4258]">
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
  )
}
