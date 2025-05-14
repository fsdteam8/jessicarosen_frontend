/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import authImg from "@/public/images/authImg.svg";
import googleIcon from "@/public/images/googleIcon.png";

// Validation functions
const validateName = (value: string) => {
  if (!value) return "This field is required";
  if (value.length < 2) return "Must be at least 2 characters long";
  return true;
};

const validateEmail = (value: string) => {
  if (!value) return "Email is required";
  const emailPattern = /^\S+@\S+$/i;
  if (!emailPattern.test(value)) return "Invalid email address";
  return true;
};

const validatePassword = (value: string) => {
  if (!value) return "Password is required";
  if (value.length < 6) return "Password must be at least 6 characters long";
  if (!/[A-Z]/.test(value)) return "Must contain at least one uppercase letter";
  if (!/[a-z]/.test(value)) return "Must contain at least one lowercase letter";
  if (!/\d/.test(value)) return "Must contain at least one number";
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(value))
    return "Must contain at least one special character";
  return true;
};

const validateConfirmPassword = (value: string, password: string) => {
  if (!value) return "Please confirm your password";
  if (value !== password) return "Passwords do not match";
  return true;
};

const validateTerms = (value: boolean) => {
  if (!value) return "You must agree to the terms";
  return true;
};

export default function CreateAccountForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const password = watch("password");

  const onSubmit = (data: any) => {
    console.log("Form submitted:", data);
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center lg:gap-[100px] gap-10 min-h-screen bg-gray-100 px-4 py-8">
      <div className="w-full max-w-md">
        <Image
          src={authImg}
          width={600}
          height={700}
          alt="Signup Image"
          className="w-full h-auto object-contain"
        />
      </div>

      <div className="w-full max-w-lg bg-white rounded-xl p-6 sm:p-8 shadow-[0px_0px_56px_0px_#00000029]">
        <p className="text-[#787878] text-base mb-4 text-center">Welcome to Website</p>
        <h3 className="text-center lg:text-[40px] text-lg font-bold mb-10">
          Create an account
        </h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="w-full">
            <div className="mb-4">
              <label htmlFor="firstname" className="block mb-1 font-medium">
                First Name<span className="text-red-500 ml-1">*</span>
              </label>
              <input
                id="firstname"
                {...register("firstname", { validate: validateName })}
                className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.firstname ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="First name"
              />
              {errors.firstname && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.firstname?.message?.toString()}
                </p>
              )}
            </div>

            <div className="">
              <label htmlFor="lastname" className="block mb-1 font-medium">
                Last Name<span className="text-red-500 ml-1">*</span>
              </label>
              <input
                id="lastname"
                {...register("lastname", { validate: validateName })}
                className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.lastname ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Last name"
              />
              {errors.lastname && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.lastname?.message?.toString()}
                </p>
              )}
            </div>
          </div>

          {/* <div>
            <label htmlFor="phoneNumber" className="block mb-1 font-medium">
              Phone Number<span className="text-red-500 ml-1">*</span>
            </label>
            <input
              id="phoneNumber"
              type="tel"
              {...register("phoneNumber")}
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
              placeholder="Enter your phone number"
            />
          </div> */}

          <div>
            <label htmlFor="email" className="block mb-1 font-medium">
              Email<span className="text-red-500 ml-1">*</span>
            </label>
            <input
              id="email"
              type="email"
              {...register("email", { validate: validateEmail })}
              className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your email..."
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message?.toString()}
              </p>
            )}
          </div>

          <div className="relative">
            <label htmlFor="password" className="block mb-1 font-medium">
              Password<span className="text-red-500 ml-1">*</span>
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("password", { validate: validatePassword })}
              className={`w-full border rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your password..."
            />
            <div
              className="absolute top-[38px] right-3 text-gray-500 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message?.toString()}
              </p>
            )}
          </div>

          <div className="relative">
            <label htmlFor="confirmPassword" className="block mb-1 font-medium">
              Confirm Password<span className="text-red-500 ml-1">*</span>
            </label>
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              {...register("confirmPassword", {
                validate: (value) => validateConfirmPassword(value, password),
              })}
              className={`w-full border rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Confirm your password..."
            />
            <div
              className="absolute top-[38px] right-3 text-gray-500 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message?.toString()}
              </p>
            )}
          </div>

          <div className="flex items-start gap-2 text-sm">
            <input
              type="checkbox"
              id="terms"
              {...register("terms", { validate: validateTerms })}
              className="mt-1"
            />
            <label htmlFor="terms" className="font-medium">
              I agree to the{" "}
              <span className="text-[#8C311E]">terms & conditions</span>
            </label>
          </div>
          {errors.terms && (
            <p className="text-red-500 text-sm mt-1">
              {errors.terms.message?.toString()}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-[#23547B] hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            Create Account
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300" />
          <span className="mx-4 text-gray-500 text-sm">or login with</span>
          <div className="flex-grow border-t border-gray-300" />
        </div>

        {/* Google Login */}
        <button
          type="button"
          onClick={() => console.log("Login with Google")}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 hover:border-gray-400 rounded-lg py-2 transition duration-200"
        >
          <Image
            src={googleIcon}
            alt="Google"
            width={20}
            height={20}
            className="w-5 h-5"
          />
          <span className="text-sm font-medium text-gray-700">
            Login with Google
          </span>
        </button>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-blue-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
