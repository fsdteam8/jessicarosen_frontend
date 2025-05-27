"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { Eye, EyeOff, Check, X } from "lucide-react"
import { toast } from "sonner"
import otpAuth from "@/public/images/authImg.svg";

// Password requirements
const passwordRequirements = [
  { id: "length", label: "At least 8 characters", regex: /.{8,}/ },
  { id: "uppercase", label: "At least one uppercase letter", regex: /[A-Z]/ },
  { id: "lowercase", label: "At least one lowercase letter", regex: /[a-z]/ },
  { id: "number", label: "At least one number", regex: /\d/ },
  { id: "special", label: "At least one special character", regex: /[!@#$%^&*(),.?":{}|<>]/ },
]

// Validation functions
const getPasswordValidation = () => ({
  required: "New password is required",
  minLength: {
    value: 8,
    message: "Password must be at least 8 characters",
  },
  validate: {
    hasUppercase: (value: string) => /[A-Z]/.test(value) || "Must include at least one uppercase letter",
    hasLowercase: (value: string) => /[a-z]/.test(value) || "Must include at least one lowercase letter",
    hasNumber: (value: string) => /\d/.test(value) || "Must include at least one number",
    hasSpecialChar: (value: string) => /[!@#$%^&*(),.?":{}|<>]/.test(value) || "Must include one special character",
  },
})

const getConfirmPasswordValidation = (newPassword: string) => ({
  required: "Please re-enter your password",
  validate: (value: string) => value === newPassword || "Passwords do not match",
})

const NewPasswordFrom = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>()

  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  
  

  const newPassword = watch("newPassword", "")

  // Calculate password strength and check requirements
  useEffect(() => {
    if (!newPassword) {
      setPasswordStrength(0)
      return
    }

    let strength = 0
    passwordRequirements.forEach((req) => {
      if (req.regex.test(newPassword)) {
        strength += 20 // 5 requirements, each worth 20% of the strength
      }
    })

    setPasswordStrength(strength)
  }, [newPassword])

  interface FormData {
    newPassword: string
    confirmPassword: string
  }

  const onSubmit = (data: FormData) => {
    // Handle the form submission, for example, call API for password reset
    toast.success("Password reset successfully")
    console.log("Password reset data:", data);

  }

  return (
    <div className="flex flex-col md:flex-row justify-center items-center lg:gap-[100px] gap-10 min-h-screen bg-gray-100 px-4 py-8">
      {/* Image Section */}
      <div className="w-full max-w-md">
        <Image
          src={otpAuth}
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
              {...register("newPassword", getPasswordValidation())}
              className={`w-full border rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 ${
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
          </div>

          {/* Password Strength Meter */}
          {newPassword && (
            <div className="space-y-2">
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    passwordStrength <= 20
                      ? "bg-red-500"
                      : passwordStrength <= 40
                      ? "bg-orange-500"
                      : passwordStrength <= 60
                      ? "bg-yellow-500"
                      : passwordStrength <= 80
                      ? "bg-blue-500"
                      : "bg-green-500"
                  }`}
                  style={{ width: `${passwordStrength}%` }}
                ></div>
              </div>

              {/* Password Requirements Checklist */}
              <div className="space-y-1 mt-2">
                {passwordRequirements.map((req) => (
                  <div key={req.id} className="flex items-center text-sm">
                    {req.regex.test(newPassword) ? (
                      <Check size={16} className="text-green-500 mr-2" />
                    ) : (
                      <X size={16} className="text-red-500 mr-2" />
                    )}
                    <span className={req.regex.test(newPassword) ? "text-green-700" : "text-gray-600"}>
                      {req.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Re-enter Password */}
          <div className="relative">
            <label htmlFor="confirmPassword" className="block mb-1 font-medium">
              Re-enter Password <span className="text-red-500">*</span>
            </label>
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              {...register("confirmPassword", getConfirmPasswordValidation(newPassword))}
              className={`w-full border rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 ${
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
            className="w-full bg-[#23547B] hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            Continue
          </button>
        </form>

        {/* Footer */}
        {/* <p className="mt-6 text-center text-base text-[#787878]">
          Back to?{" "}
          <a href="/sign-in" className="text-[#23547B] hover:underline">
            Login
          </a>
        </p> */}
      </div>
    </div>
  )
}

export default NewPasswordFrom
