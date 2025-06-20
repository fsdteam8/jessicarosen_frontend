"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
// import { useAuth } from "@/hooks/use-auth";

import { useSession } from "next-auth/react";

export interface CartItem {
  _id: string;
  resourceId: string;
  quantity: number;
  resource: {
    _id: string;
    title: string;
    thumbnail: string;
    price: number;
    discountPrice?: number;
    format: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface CartResponse {
  success: boolean;
  message: string;
  data: {
    items: CartItem[];
    subtotal: number;
    total: number;
    itemCount: number;
  };
  itemCount: number;
  subtotal: number;
  total: number;
}

interface AddToCartRequest {
  resourceId: string;
  quantity: number;
}

interface UpdateCartRequest {
  quantity: number;
}

// API Functions
const fetchCart = async (token: string): Promise<CartResponse> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Unauthorized - Please login again");
    }
    throw new Error("Failed to fetch cart");
  }

  return response.json();
};

const addToCart = async (
  data: AddToCartRequest,
  token: string
): Promise<CartResponse> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Unauthorized - Please login again");
    }
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to add item to cart");
  }

  return response.json();
};

const updateCartItem = async (
  itemId: string,
  data: UpdateCartRequest,
  token: string
): Promise<CartResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/cart/item/${itemId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Unauthorized - Please login again");
    }
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update cart item");
  }

  return response.json();
};

const removeFromCart = async (
  itemId: string,
  token: string
): Promise<CartResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/cart/item/${itemId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Unauthorized - Please login again");
    }
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to remove item from cart");
  }

  return response.json();
};

const clearCart = async (token: string): Promise<CartResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/cart/clear`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Unauthorized - Please login again");
    }
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to clear cart");
  }

  return response.json();
};

// Custom Hooks
export function useCart() {
  const { data: session, status } = useSession();
  const token = session?.user?.accessToken || null;

  return useQuery({
    queryKey: ["cart"],
    queryFn: () => fetchCart(token!),
    enabled: status === "authenticated" && !!token,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: (failureCount, error) => {
      // Don't retry on auth errors
      if (error.message.includes("Unauthorized")) {
        return false;
      }
      return failureCount < 2;
    },
  });
}

export function useAddToCart() {
  const queryClient = useQueryClient();
  // const { token, isAuthenticated } = useAuth();
  const { data: session, status } = useSession();
  const token = session?.user?.accessToken || null;

  return useMutation({
    mutationFn: (data: AddToCartRequest) => {
      if (status === "unauthenticated" || !token) {
        throw new Error("Please login to add items to cart");
      }
      return addToCart(data, token);
    },
    onSuccess: (data) => {
      // Update the cart cache
      queryClient.setQueryData(["cart"], data);

      // Invalidate and refetch cart to ensure consistency
      queryClient.invalidateQueries({ queryKey: ["cart"] });

      toast({
        title: "Item added to cart",
        description: "The item has been successfully added to your cart.",
      });
    },
    onError: (error: Error) => {
      if (error.message.includes("Unauthorized")) {
        toast({
          title: "Authentication Required",
          description: "Please login to add items to cart",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: error.message || "Failed to add item to cart",
          variant: "destructive",
        });
      }
    },
  });
}

export function useUpdateCartItem() {
  const queryClient = useQueryClient();
  const { data: session, status } = useSession();
  const token = session?.user?.accessToken || null;

  return useMutation({
    mutationFn: async ({
      itemId,
      quantity,
    }: {
      itemId: string;
      quantity: number;
    }) => {
      if (status === "unauthenticated" || !token) {
        throw new Error("Please login to update cart");
      }
<<<<<<< HEAD
      return updateCartItem(itemId, { quantity }, token);
    },
    // Add optimistic update
    onMutate: async ({ itemId, quantity }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["cart"] });

      // Snapshot the previous value
      const previousCart = queryClient.getQueryData(["cart"]);

      // Optimistically update the cache
      queryClient.setQueryData(["cart"], (old: CartResponse | undefined) => {
        if (!old?.data?.items) return old;

        const updatedItems = old.data.items.map((item) =>
          item._id === itemId ? { ...item, quantity } : item
        );

        // Recalculate totals
        const subtotal = updatedItems.reduce((sum, item) => {
          const price = item.resource.discountPrice || item.resource.price;
          return sum + price * item.quantity;
        }, 0);

        const itemCount = updatedItems.reduce(
          (sum, item) => sum + item.quantity,
          0
        );

        return {
          ...old,
          data: {
            ...old.data,
            items: updatedItems,
            subtotal,
            itemCount,
            total: subtotal,
          },
          subtotal,
          itemCount,
          total: subtotal,
        };
      });

      // Return a context object with the snapshotted value
      return { previousCart };
    },
    onError: (error, variables, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousCart) {
        queryClient.setQueryData(["cart"], context.previousCart);
      }

      if (error.message.includes("Unauthorized")) {
        toast({
          title: "Authentication Required",
          description: "Please login to update cart",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: error.message || "Failed to update cart item",
          variant: "destructive",
        });
      }
    },
    // Always refetch after error or success
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onSuccess: (data) => {
      // Update with server response
      queryClient.setQueryData(["cart"], data);

=======

      console.log("Updating cart item:", { itemId, quantity }); // Debug log

      const response = await updateCartItem(itemId, { quantity }, token);
      return response;
    },
    onSuccess: (data) => {
      // Update the cart data in the cache
      queryClient.setQueryData(["cart"], data);

      // Invalidate and refetch to ensure consistency
      queryClient.invalidateQueries({ queryKey: ["cart"] });

>>>>>>> 9556894 (monir done wel)
      toast({
        title: "Cart updated",
        description: "Item quantity has been updated.",
      });
    },
<<<<<<< HEAD
  });
}
=======
    onError: (error: Error) => {
      console.error("Cart update error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to update cart item",
        variant: "destructive",
      });
    },
  });
}

>>>>>>> 9556894 (monir done wel)
export function useRemoveFromCart() {
  const queryClient = useQueryClient();

  const { data: session, status } = useSession();
  const token = session?.user?.accessToken || null;

  return useMutation({
    mutationFn: (itemId: string) => {
      if (status === "unauthenticated" || !token) {
        throw new Error("Please login to remove items from cart");
      }
      return removeFromCart(itemId, token);
    },
    onSuccess: (data) => {
      // Update the cart cache
      queryClient.setQueryData(["cart"], data);

      toast({
        title: "Item removed",
        description: "The item has been removed from your cart.",
      });
    },
    onError: (error: Error) => {
      if (error.message.includes("Unauthorized")) {
        toast({
          title: "Authentication Required",
          description: "Please login to manage cart",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: error.message || "Failed to remove item from cart",
          variant: "destructive",
        });
      }
    },
  });
}

export function useClearCart() {
  const queryClient = useQueryClient();
  const { data: session, status } = useSession();
  const token = session?.user?.accessToken || null;

  return useMutation({
    mutationFn: () => {
      if (status === "unauthenticated" || !token) {
        throw new Error("Please login to clear cart");
      }
      return clearCart(token);
    },
    onSuccess: (data) => {
      // Update the cart cache
      queryClient.setQueryData(["cart"], data);

      toast({
        title: "Cart cleared",
        description: "All items have been removed from your cart.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to clear cart",
        variant: "destructive",
      });
    },
  });
}

// Helper function to get cart totals
export function useCartTotals() {
  const { data: cartData } = useCart();

  const subtotal = cartData?.data?.subtotal || 0;
  const itemCount = cartData?.data?.itemCount || 0;
  const shippingCost = itemCount > 0 ? 5 : 0; // $5 shipping if cart has items

  return {
    subtotal,
    itemCount,
    shippingCost,
    total: subtotal + shippingCost,
    items: cartData?.data?.items || [],
  };
}
