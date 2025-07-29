import React from "react";
import OtherHistory from "./_components/OtherHistory";
import HappyCustomer from "./_components/HappyCustomer";
import LegalDoc from "@/components/HomePage/LegalDoc";

export default function page() {
  return (
    <div className="">
      <OtherHistory />
      
      <HappyCustomer />
      <LegalDoc />
    </div>
  );
}
