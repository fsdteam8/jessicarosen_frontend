"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { toast } from "@/hooks/use-toast"

export type CartItem = {
  id: string
  title: string
  image: string
  price: number
  discountPrice?: number
  salePrice?: number
  quantity: number
}

type CartState = {
  items: CartItem[]
  isOpen: boolean

  // Actions
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  setOpen: (open: boolean) => void

  // Calculations
  getSubtotal: () => number
  getItemCount: () => number
  getItemPrice: (id: string) => number
  getShippingCost: () => number
  getDiscount: () => number
  getTotal: () => number
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item) => {
        const currentItems = get().items
        const existingItem = currentItems.find((i) => i.id === item.id)

        if (existingItem) {
          // If item exists, update quantity
          set({
            items: currentItems.map((i) =>
              i.id === item.id ? { ...i, quantity: i.quantity + (item.quantity || 1) } : i,
            ),
          })
          toast({
            title: "Item quantity updated",
            description: `${item.title} quantity has been updated in your cart.`,
          })
        } else {
          // Add new item
          set({ items: [...currentItems, { ...item, quantity: item.quantity || 1 }] })
          toast({
            title: "Item added to cart",
            description: `${item.title} has been added to your cart.`,
          })
        }
      },

      removeItem: (id) => {
        const itemToRemove = get().items.find((item) => item.id === id)
        set({ items: get().items.filter((item) => item.id !== id) })

        if (itemToRemove) {
          toast({
            title: "Item removed",
            description: `${itemToRemove.title} has been removed from your cart.`,
          })
        }
      },

      updateQuantity: (id, quantity) => {
        if (quantity < 1) return

        set({
          items: get().items.map((item) => (item.id === id ? { ...item, quantity } : item)),
        })
      },

      clearCart: () => {
        set({ items: [] })
        toast({
          title: "Cart cleared",
          description: "All items have been removed from your cart.",
        })
      },

      setOpen: (open) => {
        set({ isOpen: open })
      },

      getSubtotal: () => {
        return get().items.reduce((total, item) => {
          const price = item.discountPrice || item.price
          return total + price * item.quantity
        }, 0)
      },

      getItemPrice: (id) => {
        const item = get().items.find((item) => item.id === id)
        console.log("item", item)
        if (!item) return 0

        const price = item.discountPrice || item.price
        console.log("price", price)
        return price * item.quantity
      },

      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0)
      },

      getShippingCost: () => {
        // Fixed shipping cost of $5 if cart has items, otherwise 0
        return get().items.length > 0 ? 5 : 0
      },

      getDiscount: () => {
        // Example discount calculation - could be more complex in a real app
        return get().getSubtotal() > 50 ? 5 : 0
      },

      getTotal: () => {
        return get().getSubtotal() + get().getShippingCost() - get().getDiscount()
      },
    }),
    {
      name: "cart-storage",
    },
  ),
)
