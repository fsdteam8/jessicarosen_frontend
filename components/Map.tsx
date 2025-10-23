"use client";
import React from "react";

const Map = () => {
  return (
    <div className="bg-[#D4A0173D] pb-14">
      <div className="text-center mb-[72px] ">
        <h1 className="font-semibold text-[40px] text-[#016102] pt-[88px] ">Where We Are?</h1>
        <p className="text-[#424242] font-normal text-[16px]">Our team is always ready to assist you with any questions or concerns you might have. Fill out the form below and we&apos;ll get back to you as soon as possible</p>
      </div>
      <div>
        <iframe
          className="w-full h-[500px]"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d149670.67062988237!2d-79.50283986788675!3d43.700181393729444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4cb90d7c63ba5%3A0x323555502ab4c477!2sToronto%2C%20ON%2C%20Canada!5e0!3m2!1sen!2sbd!4v1761189707488!5m2!1sen!2sbd" width="600"
          height="450"
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default Map;
