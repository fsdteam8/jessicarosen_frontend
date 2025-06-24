"use client";
import { useQuery } from "@tanstack/react-query";
import { Download } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

export type OrderFile = {
  url: string;
  type: string; // e.g., "application/pdf"
};

export type OrderItem = {
  orderId: string;
  resourceName: string;
  file: OrderFile;
  price: string; // e.g., "$85.00"
  date: string; // e.g., "Jun 24, 2025"
  status: string; // e.g., "processing"
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
  data: OrderItem[];
  pagination: Pagination;
};

const OtherHistory = () => {
  const { data: session } = useSession();
  const token = session?.user?.accessToken;
  console.log({token})
  const { data, isLoading, error, isError } = useQuery<OrdersResponse>({
    queryKey: ["order-history"],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json()),
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError)
    return (
      <div>Error: {error instanceof Error ? error.message : String(error)}</div>
    );
  console.log(data);

  return (
    <div className="container mx-auto">
      <div className="pt-10 md:pt-14 lg:pt-[88px]">
        <h2 className="text-3xl md:text-[39px] lg:text-[48px] font-semibold text-[#131313] leading-[120%] tracking-[0%] font-manrope text-center">
          Download Page
        </h2>
        <p className="text-base font-normal text-[#616161] leading-[150%] tracking-[0%] text-center font-manrope pt-4">
          From everyday essentials to the latest trends, we bring you a seamless
          shopping experience <br /> with unbeatable deals, delivery.discover
          convenience, quality, and style all in one place.
        </p>
      </div>
      <div className="pt-10 md:pt-14 lg:pt-[88px]">
        <table className="w-full ">
          {/* <thead className="">
            <tr>
              <th className="px-4 py-2 border-b">Image</th>
              <th className="px-4 py-2 border-b">Resource Name</th>
              <th className="px-4 py-2 border-b">Download</th>
            </tr>
          </thead> */}
          <tbody>
            {data?.data?.map((item) => (
              <tr key={item.orderId} className="border-t flex items-center justify-between">
                <td className="px-4 py-2">
                  <Image
                    src={item?.file?.url}
                    width={100}
                    height={100}
                    alt="order image"
                    className="object-cover rounded"
                  />
                </td>
                <td className="text-xl font-medium text-[#2A2A2A] leading-[120%] font-manrope">{item?.resourceName}</td>
                <td className="px-4 py-2">
                  <button
                    className="flex items-center gap-2 bg-[#23547B] py-2 px-4 rounded text-white font-bold"
                    onClick={() => window.open(item?.file?.url, "_blank")}
                  >
                    <Download /> Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pt-5 md:pt-7 lg:pt-10 pb-10 md:pb-14 lg:pb-[88px]">
        <button className="text-base font-bold text-[#F2F2F2] leading-[120%] tracking-[0%] font-manrope py-[14px] bg-[#23547B] w-full rounded-[8px]">Continue Shopping</button>
      </div>

      
    </div>
  );
};

export default OtherHistory;
