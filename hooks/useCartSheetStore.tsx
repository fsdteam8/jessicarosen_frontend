// hooks/use-cart-sheet-store.ts
import { create } from "zustand";

interface CartSheetStore {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}

export const useCartSheetStore = create<CartSheetStore>((set) => ({
  isOpen: false,
  setOpen: (isOpen) => set({ isOpen }),
}));
