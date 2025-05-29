"use client"

import Image from "next/image"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useSearchParams, useRouter } from "next/navigation"
import { Eye, EyeOff } from "lucide-react"
import { toast } from "sonner"

interface FormData {
  newPassword: string
  confirmPassword: string
}

const NewPasswordPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const email = searchParams.get("email") || ""
  const decodedEmail = decodeURIComponent(email)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>()

  const newPassword = watch("newPassword", "")

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: decodedEmail,
          newPassword: data.newPassword,
        }),
      })

      if (response.ok) {
        toast.success("Password reset successfully! You can now login with your new password.")
        router.push("/sign-in")
      } else {
        const errorData = await response.json()
        toast.error(errorData.message || "Failed to reset password. Please try again.")
      }
    } catch (error) {
      console.error("Error resetting password:", error)
      toast.error("Network error. Please check your connection and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col md:flex-row justify-center items-center lg:gap-[100px] gap-10 min-h-screen bg-gray-100 px-4 py-8">
      {/* Image Section */}
      <div className="w-full max-w-md">
        <Image
          src="/placeholder.svg?height=700&width=600"
          width={600}
          height={700}
          alt="New Password Illustration"
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Form Section */}
      <div className="w-full max-w-md bg-white rounded-xl p-8 shadow-[0px_0px_56px_0px_#00000029]">
        <h2 className="text-center text-xl mb-2 text-[40px] font-semibold">New Password</h2>
        <h3 className="text-center mb-[40px] text-[#9E9E9E] font-medium">Please create your new password</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* New Password */}
          <div className="relative">
            <label htmlFor="newPassword" className="block mb-1 font-medium">
              New Password <span className="text-red-500">*</span>
            </label>
            <input
              id="newPassword"
              type={showNewPassword ? "text" : "password"}
              {...register("newPassword", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              disabled={isLoading}
              className={`w-full border rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 disabled:opacity-50 ${
                errors.newPassword
                  ? "border-red-500 ring-red-400 placeholder-red-500"
                  : "border-gray-300 focus:ring-green-500"
              }`}
              placeholder="Enter new password..."
              aria-invalid={errors.newPassword ? "true" : "false"}
            />
            <button
              type="button"
              onClick={() => setShowNewPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] text-gray-500"
              tabIndex={-1}
            >
              {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {errors.newPassword && (
              <p className="mt-1 text-sm text-red-500">{errors.newPassword.message as string}</p>
            )}
          </div>

          {/* Re-enter Password */}
          <div className="relative">
            <label htmlFor="confirmPassword" className="block mb-1 font-medium">
              Re-enter Password <span className="text-red-500">*</span>
            </label>
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              {...register("confirmPassword", {
                required: "Please re-enter your password",
                validate: (value) => value === newPassword || "Passwords do not match",
              })}
              disabled={isLoading}
              className={`w-full border rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 disabled:opacity-50 ${
                errors.confirmPassword
                  ? "border-red-500 ring-red-400 placeholder-red-500"
                  : "border-gray-300 focus:ring-green-500"
              }`}
              placeholder="Re-enter new password..."
              aria-invalid={errors.confirmPassword ? "true" : "false"}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] text-gray-500"
              tabIndex={-1}
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message as string}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#23547B] hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            {isLoading ? "Resetting Password..." : "Continue"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default NewPasswordPage