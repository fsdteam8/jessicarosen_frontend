"use client";

import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import authImg from "@/public/images/authImg.svg";
import googleIcon from "@/public/images/googleIcon.png";

type FormData = {
  email: string;
  password: string;
  rememberMe: boolean;
};

const validateLogin = {
  email: {
    required: "Email is required",
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      message: "Please enter a valid email address",
    },
  },
  password: {
    required: "Password is required",
    minLength: {
      value: 8,
      message: "Password must be at least 8 characters long",
    },
  },
};

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data: FormData) => {
    console.log("Login Data:", data);
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center lg:gap-[100px] gap-10 min-h-screen bg-gray-100 px-4 py-8">
      <div className="w-full max-w-md">
        <Image
          src={authImg}
          width={600}
          height={700}
          alt="Login Illustration"
          className="w-full h-auto object-contain"
        />
      </div>

      <div className="w-full max-w-lg bg-white rounded-xl p-6 sm:p-8 shadow-[0px_0px_56px_0px_#00000029]">
        <h2 className="text-center text-2xl font-semibold mb-2">Welcome Back!</h2>
        <h3 className="text-center text-[#787878] text-base font-medium mb-10">
          Enter to get unlimited data & information
        </h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 max-w-lg">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-1 font-medium">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              {...register("email", validateLogin.email)}
              className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your email..."
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block mb-1 font-medium">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password", validateLogin.password)}
                className={`w-full border rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your password..."
              />
              <button
                type="button"
                className="absolute top-2.5 right-3 text-gray-500"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register("rememberMe")}
                className="accent-blue-600"
              />
              Remember me
            </label>
            <Link href="/forgetPassword" className="text-red-900 hover:underline">
              Forgot password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-[#23547B] hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            Login
          </button>
        </form>

        {/* Divider */}
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
          <span className="text-sm font-medium text-gray-700">Login with Google</span>
        </button>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link href="/sign-up" className="text-[#23547B] hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
