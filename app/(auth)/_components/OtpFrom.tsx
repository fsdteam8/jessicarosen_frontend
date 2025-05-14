"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import authOtp from "@/public/images/authImg.svg";

const OtpFrom = () => {

  const searchParams = useSearchParams();

  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const email = searchParams.get("email") || "";
  const decodedEmail = decodeURIComponent(email);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const otpString = otp.join("");
    if (otpString.length !== 6) {
      toast.error("Please enter all 6 digits of the OTP");
      return;
    }

    console.log("OTP submitted:", otpString);

    // Call your OTP verification API here
    // Example placeholder:
    toast.success("OTP verified successfully");
  };

  const handleResendOtp = () => {
    if (!decodedEmail) {
      toast.error("Email address is missing");
      return;
    }

    // Call your resend OTP API here
    // Example placeholder:
    toast.success("OTP resent successfully");
    setOtp(Array(6).fill(""));
    inputRefs.current[0]?.focus();
  };
  return (
    <div className="flex flex-col md:flex-row justify-center items-center lg:gap-[100px] gap-10 min-h-screen bg-gray-100 px-4 py-8">
      {/* Image Section */}
      <div className="w-full max-w-md">
        <Image
          src={authOtp}
          width={600}
          height={700}
          alt="OTP Verification Illustration"
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Form Section */}
      <div className="w-full max-w-md bg-white rounded-xl p-8 shadow-[0px_0px_56px_0px_#00000029]">
        <h2 className="text-center text-[40px] font-semibold mb-2">
          Enter OTP
        </h2>
        <h3 className="text-center mb-[40px] w-[90%] mx-auto text-[#9E9E9E] font-medium">
          An OTP has been sent to your email address please verify it below
        </h3>

        <form onSubmit={handleSubmit} className="space-y-6 w-full">
          {/* OTP Inputs */}
          <div className="flex justify-center gap-2 sm:gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-center text-lg sm:text-xl font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                aria-label={`Digit ${index + 1}`}
              />
            ))}
          </div>

          {/* Resend OTP */}
          <div className="text-center text-sm sm:text-base">
            <span className="text-gray-700">Didn&apos;t receive OTP? </span>
            <button
              type="button"
              onClick={handleResendOtp}
              className="text-[#23547B] font-semibold hover:underline focus:outline-none"
            >
              Resend OTP
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#23547B] hover:bg-green-700 text-white font-semibold py-2 sm:py-3 px-4 rounded-lg transition duration-200"
          >
            Verify
          </button>
        </form>

        <p className="mt-6 text-center text-base text-[#787878]">
          Back to?{" "}
          <a href="/sign-in" className="text-[#23547B] hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default OtpFrom;
