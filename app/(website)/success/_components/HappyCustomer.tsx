import Image from "next/image";
import React from "react";

const HappyCustomer = () => {
  const happyCustomerData = [
    {
      id: 1,
      img: "/images/happyCustomer1.jpg",
    },
    {
      id: 2,
      img: "/images/happyCustomer2.jpg",
    },
    {
      id: 3,
      img: "/images/happyCustomer3.jpg",
    },
    {
      id: 4,
      img: "/images/happyCustomer4.jpg",
    },
  ];
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {happyCustomerData?.map((item) => {
            return (
              <div key={item.id}>
                <Image
                  src={item.img}
                  alt="happy customer"
                  width={275}
                  height={245}
                  className="w-[275px] h-[245px] object-cover rounded-[8px]"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HappyCustomer;
