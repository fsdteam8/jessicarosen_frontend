"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "@/hooks/use-toast";

export type CartItem = {
  thumbnail: string;
  id: string;
  title: string;
  image: string;
  price: number;
  discountPrice?: number;
  salePrice?: number;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  appliedCoupon: {
    code: string;
    discount: number;
    type: "percentage" | "fixed";
  } | null;
  // Actions
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  setOpen: (open: boolean) => void;
  applyCoupon: (coupon: {
    code: string;
    discount: number;
    type: "percentage" | "fixed";
  }) => void;
  removeCoupon: () => void;
  // Calculations
  getSubtotal: () => number;
  getItemCount: () => number;
  getItemPrice: (id: string) => number;
  getShippingCost: () => number;
  getCouponDiscount: () => number;
  getTotal: () => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      appliedCoupon: null,

      addItem: (item) => {
        const currentItems = get().items;
        const existingItemIndex = currentItems.findIndex(
          (i) => i.id === item.id
        );

        console.log("Adding item to cart:", item);

        if (existingItemIndex >= 0) {
          // If item exists, update quantity
          const updatedItems = [...currentItems];
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantity:
              updatedItems[existingItemIndex].quantity + (item.quantity || 1),
          };

          set({ items: updatedItems });

          toast({
            title: "Item quantity updated",
            description: `${item.title} quantity has been updated in your cart.`,
          });
        } else {
          // Add new item
          set({
            items: [...currentItems, { ...item, quantity: item.quantity || 1 }],
          });

          toast({
            title: "Item added to cart",
            description: `${item.title} has been added to your cart.`,
          });
        }
      },

      removeItem: (id) => {
        const itemToRemove = get().items.find((item) => item.id === id);
        set({ items: get().items.filter((item) => item.id !== id) });

        if (itemToRemove) {
          toast({
            title: "Item removed",
            description: `${itemToRemove.title} has been removed from your cart.`,
          });
        }
      },

      updateQuantity: (id, quantity) => {
        if (quantity < 1) return;

        set({
          items: get().items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        });
      },

      clearCart: () => {
        set({ items: [], appliedCoupon: null });
        toast({
          title: "Cart cleared",
          description: "All items have been removed from your cart.",
        });
      },

      setOpen: (open) => {
        set({ isOpen: open });
      },

      applyCoupon: (coupon) => {
        set({ appliedCoupon: coupon });
        toast({
          title: "Coupon applied",
          description: `${coupon.code} has been applied to your order.`,
        });
      },

      removeCoupon: () => {
        const currentCoupon = get().appliedCoupon;
        set({ appliedCoupon: null });

        if (currentCoupon) {
          toast({
            title: "Coupon removed",
            description: `${currentCoupon.code} has been removed from your order.`,
          });
        }
      },

      getSubtotal: () => {
        return get().items.reduce((total, item) => {
          const price = item.discountPrice || item.price;
          return total + price * item.quantity;
        }, 0);
      },

      getItemPrice: (id) => {
        const item = get().items.find((item) => item.id === id);
        if (!item) return 0;

        const price = item.discountPrice || item.price;
        return price * item.quantity;
      },

      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },

      getShippingCost: () => {
        // Fixed shipping cost of $5 if cart has items, otherwise 0
        return get().items.length > 0 ? 5 : 0;
      },

      getCouponDiscount: () => {
        const coupon = get().appliedCoupon;
        if (!coupon) return 0;

        const subtotal = get().getSubtotal();

        if (coupon.type === "percentage") {
          return (subtotal * coupon.discount) / 100;
        } else {
          return Math.min(coupon.discount, subtotal);
        }
      },

      getTotal: () => {
        const subtotal = get().getSubtotal();
        // const shipping = get().getShippingCost();
        const couponDiscount = get().getCouponDiscount();

        return Math.max(0, subtotal - couponDiscount);
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
