"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";

interface CouponRequest {
  code: string;
}

interface CouponResponse {
  success: boolean;
  message: string;
  data: {
    code: string;
    discount: number;
    type: "percentage" | "fixed";
    isValid: boolean;
  };
}

interface PaymentRequest {
  items: Array<{
    id: string;
    title: string;
    price: number;
    quantity: number;
  }>;
  total: number;
  couponCode?: string;
}

interface PaymentResponse {
  success: boolean;
  message: string;
  data: {
    sessionId: string;
    paymentUrl: string;
    orderId: string;
  };
}

const applyCoupon = async (
  couponData: CouponRequest,
  token: string
): Promise<CouponResponse> => {
  const response = await fetch(
    "http://localhost:5000/api/v1/promo-codes/apply",
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
    "http://localhost:5000/api/v1/payment/create-session",
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
  const { token, isAuthenticated } = useAuth();

  return useMutation({
    mutationFn: (couponData: CouponRequest) => {
      if (!isAuthenticated || !token) {
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

export function usePayment() {
  const router = useRouter();
  const { token, isAuthenticated } = useAuth();

  return useMutation({
    mutationFn: (paymentData: PaymentRequest) => {
      if (!isAuthenticated || !token) {
        throw new Error("Please login to make payment");
      }
      return createPaymentSession(paymentData, token);
    },
    onSuccess: (data) => {
      // Store order info for download page
      localStorage.setItem(
        "pendingOrder",
        JSON.stringify({
          orderId: data.data.orderId,
          sessionId: data.data.sessionId,
        })
      );

      // Redirect to payment URL or handle payment flow
      if (data.data.paymentUrl) {
        window.location.href = data.data.paymentUrl;
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
