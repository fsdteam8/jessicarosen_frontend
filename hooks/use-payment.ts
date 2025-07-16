"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
// import { useAuth } from "@/hooks/use-auth";
import { useSession } from "next-auth/react";

interface CouponRequest {
  code: string;
  price: string;
}

interface CouponResponse {
  status: boolean;
  success: boolean;
  message: string;
  data: {
    code: string;
    discount: number;
    type: "percentage" | "fixed";
    discountType: string;
    finalPrice: string | number;
    discountAmount: string | number;
  };
}

// interface PaymentRequest {
//   items: Array<{
//     id: string;
//     title: string;
//     price: number;
//     quantity: number;
//   }>;
//   total: number;
//   couponCode?: string;
// }

interface PaymentResponse {
  success: boolean;
  message: string;
  data: {
    sessionId: string;
    url: string;
    orderId: string;
  };
}

const applyCoupon = async (
  couponData: CouponRequest,
  token: string
): Promise<CouponResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/promo-codes/apply`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(couponData),
    }
  );

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Unauthorized - Please login again");
    }
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to apply coupon");
  }

  return response.json();
};

const createPaymentSession = async (
  paymentData: PaymentRequest,
  token: string
): Promise<PaymentResponse> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/payment/create-session`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(paymentData),
    }
  );

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("Unauthorized - Please login again");
    }
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to create payment session");
  }

  return response.json();
};

export function useCoupon() {
  const { data: session, status } = useSession();
  const token = session?.user?.accessToken || null;
  return useMutation({
    mutationFn: (couponData: CouponRequest) => {
      if (status === "unauthenticated" || !token) {
        throw new Error("Please login to apply coupon");
      }
      return applyCoupon(couponData, token);
    },
    onError: (error: Error) => {
      if (error.message.includes("Unauthorized")) {
        toast({
          title: "Authentication Required",
          description: "Please login to apply coupon",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: error.message || "Failed to apply coupon",
          variant: "destructive",
        });
      }
    },
  });
}

export function usePayment(paymentData: PaymentRequest) {
  const { data: session, status } = useSession();
  const token = session?.user?.accessToken || null;
  const router = useRouter();
  // console.log(token)

  return useMutation({
    mutationFn: () => {
      if (status === "unauthenticated" || !token) {
        throw new Error("Please login to make payment");
      }
      return createPaymentSession(paymentData, token);
    },

    onSuccess: (data) => {
      // Store order info for download page
      // localStorage.setItem(
      //   "pendingOrder",
      //   JSON.stringify({
      //     orderId: data.data.orderId,
      //     sessionId: data.data.sessionId,
      //   })
      // );

      // Redirect to payment URL or handle payment flow
      if (data.data.url) {
        window.location.href = data.data.url;
      } else {
        // For demo purposes, simulate successful payment
        setTimeout(() => {
          router.push(`/download?orderId=${data.data.orderId}`);
        }, 2000);
      }
    },
    onError: (error: Error) => {
      if (error.message.includes("Unauthorized")) {
        toast({
          title: "Authentication Required",
          description: "Please login to make payment",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Payment Error",
          description: error.message || "Failed to process payment",
          variant: "destructive",
        });
      }
    },
  });
}
