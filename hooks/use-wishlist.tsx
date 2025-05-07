"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { toast } from "@/hooks/use-toast"
import type { Product } from "@/lib/data"

type WishlistState = {
  items: Product[]

  // Actions
  addItem: (item: Product) => void
  removeItem: (id: string) => void
  clearWishlist: () => void
  isInWishlist: (id: string) => boolean
}

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const currentItems = get().items
        const existingItem = currentItems.find((i) => i.id === item.id)

        if (!existingItem) {
          set({ items: [...currentItems, item] })
          toast({
            title: "Added to wishlist",
            description: `${item.title} has been added to your wishlist.`,
          })
        }
      },

      removeItem: (id) => {
        const itemToRemove = get().items.find((item) => item.id === id)
        set({ items: get().items.filter((item) => item.id !== id) })

        if (itemToRemove) {
          toast({
            title: "Removed from wishlist",
            description: `${itemToRemove.title} has been removed from your wishlist.`,
          })
        }
      },

      clearWishlist: () => {
        set({ items: [] })
        toast({
          title: "Wishlist cleared",
          description: "All items have been removed from your wishlist.",
        })
      },

      isInWishlist: (id) => {
        return get().items.some((item) => item.id === id)
      },
    }),
    {
      name: "wishlist-storage",
    },
  ),
)
