"use client";

import { useState } from "react";
import { ShoppingCart, Loader2, Plus, Minus, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAddToCart } from "@/hooks/use-cart-api";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface AddToCartButtonProps {
  resourceId: string;
  title: string;
  className?: string;
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "default" | "lg";
}

export function AddToCartButton({
  resourceId,
  className = "",
  variant = "default",
  size = "default",
}: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const addToCartMutation = useAddToCart();
  // const { isAuthenticated } = useAuth();

  const {  status } = useSession();
  const isAuthenticated = status === "authenticated";

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      return;
    }

    try {
      await addToCartMutation.mutateAsync({
        resourceId,
        quantity,
      });
      // Reset quantity after successful add
      setQuantity(1);
    } catch (error) {
      // Error is handled by the mutation
      console.error("Failed to add to cart:", error);
      if (error instanceof Error) {
        // Show error toast or message
        console.error("Error adding to cart:", error.message);
      }
    }
  };

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  // Show login button if not authenticated
  if (!isAuthenticated) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <Button asChild variant={variant} size={size} className="flex-1">
          <Link href="/sign-in">
            <LogIn className="mr-2 h-4 w-4" />
            Login to Add to Cart
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Quantity Selector */}
      <div className="flex items-center border rounded-md">
        <button
          onClick={decrementQuantity}
          className="p-2 hover:bg-gray-100 disabled:opacity-50"
          disabled={quantity <= 1 || addToCartMutation.isPending}
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="px-3 py-2 min-w-[3rem] text-center">{quantity}</span>
        <button
          onClick={incrementQuantity}
          className="p-2 hover:bg-gray-100 disabled:opacity-50"
          disabled={addToCartMutation.isPending}
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>

      {/* Add to Cart Button */}
      <Button
        onClick={handleAddToCart}
        disabled={addToCartMutation.isPending}
        variant={variant}
        size={size}
        className="flex-1"
      >
        {addToCartMutation.isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Adding...
          </>
        ) : (
          <>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </>
        )}
      </Button>
    </div>
  );
}
