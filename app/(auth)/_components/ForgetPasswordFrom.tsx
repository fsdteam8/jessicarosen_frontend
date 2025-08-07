"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

type FormData = {
  email: string
}

const ForgetPasswordPage = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/forget-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: data.email }),
      })

      if (response.ok) {
        toast.success("OTP sent to your email successfully!")
        // Navigate to OTP verification page with email as query parameter
        router.push(`/verify-otp?email=${encodeURIComponent(data.email)}`)
      } else {
        const errorData = await response.json()
        toast.error(errorData.message || "Failed to send OTP. Please try again.")
      }
    } catch (error) {
      console.error("Error sending OTP:", error)
      toast.error("Network error. Please check your connection and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col md:flex-row justify-center items-center lg:gap-[100px] gap-10 min-h-screen bg-gray-100 px-4 py-8">
      <div className="w-full max-w-md">
        <Image
          src="/images/authImg.svg"
          width={600}
          height={700}
          alt="Forget Password Illustration"
          className="w-full h-auto object-contain"
        />
      </div>
      <div className="w-full max-w-md bg-white rounded-xl p-8 shadow-[0px_0px_56px_0px_#00000029]">
        <h2 className="text-center text-[40px] font-semibold">Forget Password</h2>
        <p className="text-center text-base text-[#9E9E9E] w-[70%] mx-auto mb-8">
          Please enter the email address linked to your account. We&apos;ll send a one-time password (OTP) to your email
          for verification.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="email" className="block mb-1 font-medium">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid email address",
                },
              })}
              className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 ${errors.email
                  ? "border-red-500 ring-red-400 placeholder-red-500"
                  : "border-gray-300 focus:ring-green-500"
                }`}
              placeholder="Enter your email..."
              aria-invalid={errors.email ? "true" : "false"}
              disabled={isLoading}
            />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#23547B] hover:bg-[#2b699c] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            {isLoading ? "Sending OTP..." : "Send OTP"}
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
  )
}

export default ForgetPasswordPage
