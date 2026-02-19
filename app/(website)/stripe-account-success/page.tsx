"use client"

import React from "react"
import Link from "next/link"
import { CheckCircle } from "lucide-react"

const StripeAccountSuccessFull = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Stripe Account Connected
        </h1>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-6">
          Your Stripe account has been successfully connected.  
          You can now receive payments and manage your earnings.
        </p>

        {/* Dashboard Button */}
        <Link
          href="/dashboard"
          className="inline-flex items-center justify-center w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white transition hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          Go to Dashboard 
        </Link>
      </div>
    </div>
  )
}

export default StripeAccountSuccessFull
