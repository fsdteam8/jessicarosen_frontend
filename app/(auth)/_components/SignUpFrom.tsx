"use client"

import Image from "next/image"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import authImg from "@/public/images/authImg.svg"
import { registerUser } from "@/app/actions/auth"

type FormData = {
  firstName: string
  lastName: string
  // phoneNumber: string
  email: string
  password: string
  confirmPassword: string
  terms: boolean
}

// Validation functions
const validateName = (value: string) => {
  if (!value) return "This field is required"
  if (value.length < 2) return "Must be at least 2 characters long"
  return true
}

const validateEmail = (value: string) => {
  if (!value) return "Email is required"
  const emailPattern = /^\S+@\S+$/i
  if (!emailPattern.test(value)) return "Invalid email address"
  return true
}

const validatePassword = (value: string) => {
  if (!value) return "Password is required"
  if (value.length < 6) return "Password must be at least 6 characters long"
  return true
}

const validateConfirmPassword = (value: string, password: string) => {
  if (!value) return "Please confirm your password"
  if (value !== password) return "Passwords do not match"
  return true
}

const validateTerms = (value: boolean) => {
  if (!value) return "You must agree to the terms"
  return true
}

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>()

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const password = watch("password")
  const router = useRouter()

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    try {
      // Register the user
      const result = await registerUser({
        firstName: data.firstName,
        lastName: data.lastName,
        // phoneNumber: data.phoneNumber,
        email: data.email,
        password: data.password,
      })

      if (!result.success) {
        toast.error(result.message || "Registration failed")
        return
      }

      // Show success message and redirect to sign-in
      toast.success("Account created successfully! Please sign in to continue.")
      router.push(`/verify-account?email=${encodeURIComponent(data.email)}`)
    } catch (error) {
      console.error("Registration error:", error)
      toast.error("An error occurred during registration")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col md:flex-row justify-center items-center lg:gap-[100px] gap-10 min-h-screen bg-gray-100 px-4 py-8">
      <div className="w-full max-w-md">
        <Image
          src={authImg || "/placeholder.svg"}
          width={600}
          height={700}
          alt="Signup Image"
          className="w-full h-auto object-contain"
        />
      </div>

      <div className="w-full max-w-lg bg-white rounded-xl p-6 sm:p-8 shadow-[0px_0px_56px_0px_#00000029]">
        <p className="text-[#787878] text-base mb-4 text-center">Welcome to Website</p>
        <h3 className="text-center lg:text-[40px] text-lg font-bold mb-10">Create an account</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="w-full">
            <div className="mb-4">
              <label htmlFor="firstName" className="block mb-1 font-medium">
                First Name<span className="text-red-500 ml-1">*</span>
              </label>
              <input
                id="firstName"
                {...register("firstName", { validate: validateName })}
                className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.firstName ? "border-red-500" : "border-gray-300"
                  }`}
                placeholder="First name"
              />
              {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName?.message?.toString()}</p>}
            </div>

            <div className="">
              <label htmlFor="lastName" className="block mb-1 font-medium">
                Last Name<span className="text-red-500 ml-1">*</span>
              </label>
              <input
                id="lastName"
                {...register("lastName", { validate: validateName })}
                className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.lastName ? "border-red-500" : "border-gray-300"
                  }`}
                placeholder="Last name"
              />
              {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName?.message?.toString()}</p>}
            </div>
          </div>

          {/* <div>
            <label htmlFor="phoneNumber" className="block mb-1 font-medium">
              Phone Number<span className="text-red-500 ml-1">*</span>
            </label>
            <input
              id="phoneNumber"
              type="tel"
              {...register("phoneNumber", { required: "Phone number is required" })}
              className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.phoneNumber ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your phone number"
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message?.toString()}</p>
            )}
          </div> */}

          <div>
            <label htmlFor="email" className="block mb-1 font-medium">
              Email<span className="text-red-500 ml-1">*</span>
            </label>
            <input
              id="email"
              type="email"
              {...register("email", { validate: validateEmail })}
              className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? "border-red-500" : "border-gray-300"
                }`}
              placeholder="Enter your email..."
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message?.toString()}</p>}
          </div>

          <div className="relative">
            <label htmlFor="password" className="block mb-1 font-medium">
              Password<span className="text-red-500 ml-1">*</span>
            </label>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("password", { validate: validatePassword })}
              className={`w-full border rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.password ? "border-red-500" : "border-gray-300"
                }`}
              placeholder="Enter your password..."
            />
            <div
              className="absolute top-[38px] right-3 text-gray-500 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message?.toString()}</p>}
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
              className={`w-full border rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.confirmPassword ? "border-red-500" : "border-gray-300"
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
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message?.toString()}</p>
            )}
          </div>

          <div className="flex items-start gap-2 text-sm">
            <input type="checkbox" id="terms" {...register("terms", { validate: validateTerms })} className="mt-1" />
            <label htmlFor="terms" className="font-medium">
              I agree to the <span className="text-[#8C311E]">terms & conditions</span>
            </label>
          </div>
          {errors.terms && <p className="text-red-500 text-sm mt-1">{errors.terms.message?.toString()}</p>}

          {/* General Error Message */}
          {errors.root && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600 text-sm">{errors.root.message}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#23547B] hover:bg-[#143857] text-white font-semibold py-2 px-4 rounded-lg transition duration-200 disabled:opacity-70"
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-[#23547B] hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}
