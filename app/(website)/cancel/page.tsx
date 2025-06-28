import { CircleXIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md max-w-md w-full">
        <div className="text-center">
            <CircleXIcon className="mx-auto h-12 w-12 text-red-500" />
          <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">Payment Cancelled</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Your payment has been successfully cancelled. You can return to the homepage to explore other options.
          </p>
          <Link
            href="/cart"
            className="inline-flex items-center justify-center px-4 py-2 bg-[#23547b] hover:bg-[#23547b]/80 text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200 dark:focus:ring-gray-300"
            prefetch={false}
          >
            Return to cart page
          </Link>
        </div>
      </div>
    </div>
  );
}
