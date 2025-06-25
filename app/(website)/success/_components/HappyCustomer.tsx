"use client";
import ErrorContainer from "@/components/shared/ErrorContainer/ErrorContainer";
import NotFound from "@/components/shared/NotFound/NotFound";
import TableSkeletonWrapper from "@/components/shared/TableSkeletonWrapper/TableSkeletonWrapper";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import React from "react";

export type HappyCustomer = {
  _id: string;
  profileImage: string;
};

export type HappyCustomersResponse = {
  status: boolean;
  message: string;
  data: HappyCustomer[];
};

const HappyCustomer = () => {
  const { data, isLoading, error, isError } = useQuery<HappyCustomersResponse>({
    queryKey: ["happy-customers"],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/happy-customers`).then(
        (res) => res.json()
      ),
  });

  let content;

  if (isLoading) {
    content = (
      <div className="w-full p-5" >
        <TableSkeletonWrapper
          count={3}
          width="100%"
          height="320px"
          className="bg-white"
        />
      </div>
    );
  } else if (isError) {
    content = (
      <div className="mt-5">
        <ErrorContainer message={error?.message || "Something went wrong"} />
      </div>
    );
  } else if (data && data?.data && data?.data?.length === 0) {
    content = (
      <div className="mt-5">
        <NotFound message="Oops! No data available. Modify your filters or check your internet connection." />
      </div>
    );
  } else if (data && data?.data && data?.data?.length > 0) {
    content = (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 md:mt-10 lg:mt-12">
        {data?.data?.map((item) => {
          return (
            <div key={item._id}>
              <Image
                src={item?.profileImage || "/images/no-image.jpg"}
                alt="happy customer"
                width={275}
                height={245}
                className="w-[275px] h-[245px] object-cover rounded-[8px]"
              />
            </div>
          );
        })}
      </div>
    );
  }


  return (
    <div className="bg-[#E9EEF2] ">
      <div className="py-10 md:py-14 lg:py-[88px] container mx-auto">
        <div>
          <h2 className="text-3xl md:text-[35px] lg:text-[40px] font-semibold font-manrope leading-[120%] ">
            Happy Customers
          </h2>
          <p className="text-base font-normal font-manrope leading-[150%] text-[#424242] pt-4">
            Find answers to common questions about our services and features.
          </p>
        </div>
        <div>{content}</div>
      </div>
    </div>
  );
};

export default HappyCustomer;
