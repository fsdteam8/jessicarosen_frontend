"use client";

import Loading from "@/app/loading";
import { useQuery } from "@tanstack/react-query";
import { Download } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// Types
export type OrderFile = {
  url: string;
  type: string;
};

export type Order = {
  orderId: string;
  resourceName: string;
  file: OrderFile;
  thumbnail: string;
  price: string;
  date: string;
  status: "processing" | string;
};

export type Pagination = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
};

export type OrdersResponse = {
  success: boolean;
  message: string;
  data: Order[];
  pagination: Pagination;
};

export type OrderDetailsResponse = {
  status: string;
  message: string;
  data: OrderDetails;
};

export type OrderDetails = {
  _id: string;
  user: {
    _id: string;
    email: string;
  };
  items: OrderItem[];
  totalAmount: number;
  paymentMethod: string | null;
  paymentStatus: "paid" | "unpaid" | string;
  orderStatus: "processing" | "shipped" | "delivered" | string;
  stripeSessionId: string;
  stripePaymentIntentId: string | null;
  transferGroup: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type OrderItem = {
  resource: {
    _id: string;
    title: string;
    description: string;
    thumbnail?: string;
    file?: {
      url: string;
      type: string;
    };
  };
  seller: {
    _id: string;
    email: string;
  };
  quantity: number;
  price: number;
  status: "processing" | "completed" | string;
};

const OtherHistory = () => {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  const {
    data: orderListData,
    isLoading: isOrderListLoading,
    // error: orderListError,
  } = useQuery<OrdersResponse>({
    queryKey: ["order-history"],
    queryFn: async () =>
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json()),
    enabled: !!token,
  });

  const orderId = orderListData?.data?.[0]?.orderId;

  const {
    data: singleOrderData,
    isLoading: isSingleOrderLoading,
    error: singleOrderError,
    isError,
  } = useQuery<OrderDetailsResponse>({
    queryKey: ["single-order-history", orderId],
    queryFn: async () =>
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/orders/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ).then((res) => res.json()),
    enabled: !!token && !!orderId,
  });

  // Loading state
  if (!token || isOrderListLoading || (orderId && isSingleOrderLoading)) {
    return (
      <div className="h-full w-full flex items-center justify-center gap-4">
        <Loading /> Loading...
      </div>
    );
  }

  // Error state
  if (isError || !singleOrderData?.data) {
    return (
      <div className="container mx-auto my-10 h-[300px] w-full bg-gray-300 rounded-lg flex items-center justify-center">
        Error:{" "}
        {singleOrderError instanceof Error
          ? singleOrderError.message
          : String(singleOrderError)}
      </div>
    );
  }

  // No orders found
  if (orderListData?.data?.length === 0) {
    return (
      <div className="container mx-auto my-10 h-[300px] w-full bg-gray-300 rounded-lg flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold text-black text-center pb-4">
          No data found
        </h2>
        <Link href="/products">
          <button className="py-3 px-10 text-base font-bold text-white bg-[#23547B] rounded-[8px]">
            Continue Shopping
          </button>
        </Link>
      </div>
    );
  }




  return (
    <div className="container mx-auto">
      <div className="pt-10 md:pt-14 lg:pt-[88px]">
        <h2 className="text-3xl md:text-[39px] lg:text-[48px] font-semibold text-[#131313] text-center font-manrope">
          Download Page
        </h2>
        <p className="text-base text-[#616161] text-center font-manrope pt-4">
          From everyday essentials to the latest trends, we bring you a seamless
          shopping experience <br /> with unbeatable deals. Discover
          convenience, quality, and style all in one place.
        </p>
      </div>

      <div className="pt-10 md:pt-14 lg:pt-[88px]">
        <table className="w-full">
          <tbody>
            {singleOrderData?.data?.items?.map((item, index) => (
              <tr key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-8 md:gap-10 lg:gap-12">
                  <td className="px-4 py-2">
                    <Image
                      src={item?.resource?.thumbnail || "/images/no-image.jpg"}
                      width={80}
                      height={80}
                      alt="order image"
                      className="w-[80px] h-[80px] object-cover rounded-[16px]"
                    />
                  </td>
                  <td className="text-xl font-medium text-[#2A2A2A] font-manrope">
                    {item?.resource?.title}
                  </td>
                </div>
                <td className="px-4 py-2">
                  <a
                    target="_blank"
                    href={item?.resource?.file?.url}
                    download={item?.resource?.file?.url.split("/").pop()} // filename
                    className="flex items-center gap-2 bg-[#23547B] py-2 px-4 rounded text-white font-bold"
                  >
                    <Download /> Download
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pt-5 md:pt-7 lg:pt-10 pb-10 md:pb-14 lg:pb-[88px]">
        <Link href="/products">
          <button className="text-base font-bold text-white font-manrope py-[14px] bg-[#23547B] w-full rounded-[8px]">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default OtherHistory;
