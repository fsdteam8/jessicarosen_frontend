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
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8465615702353!2d144.95715047671018!3d-37.81706283422803!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d4c9600e1b3%3A0x2bd898c38895af9f!2s440%20Collins%20St%2C%20Melbourne%20VIC%203000%2C%20Australia!5e0!3m2!1sen!2sbd!4v1746267684130!5m2!1sen!2sbd"
          width="600"
          height="450"
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default Map;
