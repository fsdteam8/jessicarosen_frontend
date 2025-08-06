// "use client"

// import type React from "react"

// import { useEffect, useState, useRef } from "react"
// import { useSearchParams, useRouter } from "next/navigation"
// import Image from "next/image"
// import { toast } from "sonner"

// const VerifyOtpFrom = () => {
//     const router = useRouter()
//     const searchParams = useSearchParams()
//     const [otp, setOtp] = useState<string[]>(Array(6).fill(""))
//     const [isLoading, setIsLoading] = useState(false)
//     const [isResending, setIsResending] = useState(false)
//     const inputRefs = useRef<(HTMLInputElement | null)[]>([])
//     const [resendDisabled, setResendDisabled] = useState(false)
//     const [countdown, setCountdown] = useState(60)

//     const email = searchParams.get("email") || ""
//     const decodedEmail = decodeURIComponent(email)

//     useEffect(() => {
//         if (!decodedEmail) {
//             toast.error("Email address is missing. Please start from the beginning.")
//             router.push("/login")
//             return
//         }
//         inputRefs.current[0]?.focus()
//     }, [decodedEmail, router])

//     useEffect(() => {
//         let timer: NodeJS.Timeout
//         if (resendDisabled && countdown > 0) {
//             timer = setTimeout(() => {
//                 setCountdown(countdown - 1)
//             }, 1000)
//         } else if (countdown === 0) {
//             setResendDisabled(false)
//         }

//         return () => {
//             if (timer) clearTimeout(timer)
//         }
//     }, [resendDisabled, countdown])

//     const handleChange = (index: number, value: string) => {
//         if (!/^\d?$/.test(value)) return

//         const newOtp = [...otp]
//         newOtp[index] = value
//         setOtp(newOtp)

//         if (value && index < 5) {
//             inputRefs.current[index + 1]?.focus()
//         }
//     }

//     const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
//         if (e.key === "Backspace" && !otp[index] && index > 0) {
//             inputRefs.current[index - 1]?.focus()
//         }
//     }

//     const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
//         e.preventDefault()
//         const pastedData = e.clipboardData.getData("text/plain").trim()

//         // Check if pasted content is a 6-digit number
//         if (/^\d{6}$/.test(pastedData)) {
//             const digits = pastedData.split("")
//             setOtp(digits)

//             // Focus on the last input
//             if (inputRefs.current[5]) {
//                 inputRefs.current[5].focus()
//             }
//         } else {
//             toast.error("Please paste a valid 6-digit OTP")
//         }
//     }

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault()
//         const otpString = otp.join("")
//         if (otpString.length !== 6) {
//             toast.error("Please enter all 6 digits of the OTP")
//             return
//         }

//         setIsLoading(true)

//         try {
//             const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-email`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     otp: otpString,
//                     email: decodedEmail,
//                 }),
//             })

//             if (response.ok) {
//                 toast.success("OTP verified successfully!")
//                 router.push(`/login`)
//             } else {
//                 const errorData = await response.json()
//                 toast.error(errorData.message || "Invalid OTP. Please try again.")
//                 setOtp(Array(6).fill(""))
//                 inputRefs.current[0]?.focus()
//             }
//         } catch (error) {
//             console.error("Error verifying OTP:", error)
//             toast.error("Network error. Please check your connection and try again.")
//         } finally {
//             setIsLoading(false)
//         }
//     }

//     const handleResendOtp = async () => {
//         if (!decodedEmail) {
//             toast.error("Email address is missing")
//             return
//         }

//         setResendDisabled(true)
//         setCountdown(60)
//         setIsResending(true)

//         try {
//             const response = await fetch(`=${process.env.NEXT_PUBLIC_API_URL}/auth/forget-password`, {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ email: decodedEmail }),
//             })

//             if (response.ok) {
//                 toast.success("OTP resent successfully!")
//                 setOtp(Array(6).fill(""))
//                 inputRefs.current[0]?.focus()
//             } else {
//                 const errorData = await response.json()
//                 toast.error(errorData.message || "Failed to resend OTP. Please try again.")
//                 setResendDisabled(false)
//             }
//         } catch (error) {
//             console.error("Error resending OTP:", error)
//             toast.error("Network error. Please check your connection and try again.")
//             setResendDisabled(false)
//         } finally {
//             setIsResending(false)
//         }
//     }

//     return (
//         <div className="flex flex-col md:flex-row justify-center items-center lg:gap-[100px] gap-10 min-h-screen bg-gray-100 px-4 py-8">
//             {/* Image Section */}
//             <div className="w-full max-w-md">
//                 <Image
//                     src="/authImg.svg"
//                     width={600}
//                     height={700}
//                     alt="OTP Verification Illustration"
//                     className="w-full h-auto object-contain"
//                 />
//             </div>

//             {/* Form Section */}
//             <div className="w-full max-w-md bg-white rounded-xl p-8 shadow-[0px_0px_56px_0px_#00000029]">
//                 <h2 className="text-center text-[40px] font-semibold mb-2">Enter OTP</h2>
//                 <h3 className="text-center mb-[40px] w-[90%] mx-auto text-[#9E9E9E] font-medium">
//                     An OTP has been sent to {decodedEmail}. Please verify it below.
//                 </h3>

//                 <form onSubmit={handleSubmit} className="space-y-6 w-full">
//                     {/* OTP Inputs */}
//                     <div className="flex justify-center gap-2 sm:gap-3">
//                         {otp.map((digit, index) => (
//                             <input
//                                 key={index}
//                                 ref={(el) => {
//                                     inputRefs.current[index] = el
//                                 }}
//                                 type="text"
//                                 inputMode="numeric"
//                                 pattern="[0-9]*"
//                                 maxLength={1}
//                                 value={digit}
//                                 onChange={(e) => handleChange(index, e.target.value)}
//                                 onKeyDown={(e) => handleKeyDown(index, e)}
//                                 onPaste={index === 0 ? handlePaste : undefined}
//                                 disabled={isLoading}
//                                 className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-center text-lg sm:text-xl font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
//                                 aria-label={`Digit ${index + 1}`}
//                             />
//                         ))}
//                     </div>

//                     {/* Resend OTP */}
//                     <div className="text-center text-sm sm:text-base">
//                         <span className="text-gray-700">Didn&apos;t receive OTP? </span>
//                         <button
//                             type="button"
//                             onClick={handleResendOtp}
//                             disabled={isResending || isLoading || resendDisabled}
//                             className="text-[#23547B] font-semibold hover:underline focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:no-underline"
//                         >
//                             {isResending ? "Resending..." : resendDisabled ? `Resend OTP in ${countdown}s` : "Resend OTP"}
//                         </button>
//                     </div>

//                     {/* Submit Button */}
//                     <button
//                         type="submit"
//                         disabled={isLoading}
//                         className="w-full bg-[#23547B] hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2 sm:py-3 px-4 rounded-lg transition duration-200"
//                     >
//                         {isLoading ? "Verifying..." : "Verify"}
//                     </button>
//                 </form>

//                 <p className="mt-6 text-center text-base text-[#787878]">
//                     Back to?{" "}
//                     <a href="/sign-in" className="text-[#23547B] hover:underline">
//                         Login
//                     </a>
//                 </p>
//             </div>
//         </div>
//     )
// }

// export default VerifyOtpFrom

"use client"

import type React from "react"
import { useEffect, useState, useRef } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Image from "next/image"
import { toast } from "sonner"

const VerifyOtpForm = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [otp, setOtp] = useState<string[]>(Array(6).fill(""))
    const [isLoading, setIsLoading] = useState(false)
    const [isResending, setIsResending] = useState(false)
    const inputRefs = useRef<(HTMLInputElement | null)[]>([])
    const [resendDisabled, setResendDisabled] = useState(false)
    const [countdown, setCountdown] = useState(60)
    const [decodedEmail, setDecodedEmail] = useState("")

    // Extract email from query params
    useEffect(() => {
        const emailParam = searchParams.get("email")
        if (!emailParam) return

        const decoded = decodeURIComponent(emailParam)

        if (!decoded) {
            toast.error("Email address is missing. Please start from the beginning.")
            router.push("/login")
        } else {
            setDecodedEmail(decoded)
            inputRefs.current[0]?.focus()
        }
    }, [searchParams, router])

    // Countdown timer for resend
    useEffect(() => {
        let timer: NodeJS.Timeout
        if (resendDisabled && countdown > 0) {
            timer = setTimeout(() => setCountdown(countdown - 1), 1000)
        } else if (countdown === 0) {
            setResendDisabled(false)
        }

        return () => {
            if (timer) clearTimeout(timer)
        }
    }, [resendDisabled, countdown])

    const handleChange = (index: number, value: string) => {
        if (!/^\d?$/.test(value)) return

        const newOtp = [...otp]
        newOtp[index] = value
        setOtp(newOtp)

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus()
        }
    }

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus()
        }
    }

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        e.preventDefault()
        const pastedData = e.clipboardData.getData("text/plain").trim()

        if (/^\d{6}$/.test(pastedData)) {
            const digits = pastedData.split("")
            setOtp(digits)
            inputRefs.current[5]?.focus()
        } else {
            toast.error("Please paste a valid 6-digit OTP")
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const otpString = otp.join("")
        if (otpString.length !== 6) {
            toast.error("Please enter all 6 digits of the OTP")
            return
        }

        setIsLoading(true)

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-email`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    otp: otpString,
                    email: decodedEmail,
                }),
            })

            if (response.ok) {
                toast.success("OTP verified successfully!")
                router.push(`/sign-in`)
            } else {
                const errorData = await response.json()
                toast.error(errorData.message || "Invalid OTP. Please try again.")
                setOtp(Array(6).fill(""))
                inputRefs.current[0]?.focus()
            }
        } catch (error) {
            console.error("Error verifying OTP:", error)
            toast.error("Network error. Please check your connection and try again.")
        } finally {
            setIsLoading(false)
        }
    }

    const handleResendOtp = async () => {
        if (!decodedEmail) {
            toast.error("Email address is missing")
            return
        }

        setResendDisabled(true)
        setCountdown(60)
        setIsResending(true)

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/forget-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: decodedEmail }),
            })

            if (response.ok) {
                toast.success("OTP resent successfully!")
                setOtp(Array(6).fill(""))
                inputRefs.current[0]?.focus()
            } else {
                const errorData = await response.json()
                toast.error(errorData.message || "Failed to resend OTP. Please try again.")
                setResendDisabled(false)
            }
        } catch (error) {
            console.error("Error resending OTP:", error)
            toast.error("Network error. Please check your connection and try again.")
            setResendDisabled(false)
        } finally {
            setIsResending(false)
        }
    }

    return (
        <div className="flex flex-col md:flex-row justify-center items-center lg:gap-[100px] gap-10 min-h-screen bg-gray-100 px-4 py-8">
            {/* Image Section */}
            <div className="w-full max-w-md">
                <Image
                    src="/images/authImg.svg"
                    width={600}
                    height={700}
                    alt="OTP Verification Illustration"
                    className="w-full h-auto object-contain"
                />
            </div>

            {/* Form Section */}
            <div className="w-full max-w-md bg-white rounded-xl p-8 shadow-[0px_0px_56px_0px_#00000029]">
                <h2 className="text-center text-[40px] font-semibold mb-2">Enter OTP</h2>
                <h3 className="text-center mb-[40px] w-[90%] mx-auto text-[#9E9E9E] font-medium">
                    An OTP has been sent to {decodedEmail}. Please verify it below.
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6 w-full">
                    {/* OTP Inputs */}
                    <div className="flex justify-center gap-2 sm:gap-3">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={(el) => {
                                    inputRefs.current[index] = el
                                }}
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                onPaste={index === 0 ? handlePaste : undefined}
                                disabled={isLoading}
                                className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-center text-lg sm:text-xl font-semibold border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
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
                            disabled={isResending || isLoading || resendDisabled}
                            className="text-[#23547B] font-semibold hover:underline focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:no-underline"
                        >
                            {isResending
                                ? "Resending..."
                                : resendDisabled
                                    ? `Resend OTP in ${countdown}s`
                                    : "Resend OTP"}
                        </button>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-[#23547B] hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2 sm:py-3 px-4 rounded-lg transition duration-200"
                    >
                        {isLoading ? "Verifying..." : "Verify"}
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

export default VerifyOtpForm
