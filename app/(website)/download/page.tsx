"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Download, CheckCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";

interface PurchasedItem {
  id: string;
  title: string;
  image: string;
  downloadUrl: string;
  format: string;
}

export default function DownloadPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const { items, clearCart } = useCart();
  const [purchasedItems, setPurchasedItems] = useState<PurchasedItem[]>([]);

  useEffect(() => {
    // In a real app, you would fetch the purchased items from your API using the orderId
    // For demo purposes, we'll use the cart items and simulate download URLs
    if (orderId && items.length > 0) {
      const simulatedPurchasedItems: PurchasedItem[] = items.map((item) => ({
        id: item.id,
        title: item.title,
        image: item.image,
        downloadUrl: `/api/download/${item.id}`, // This would be a real download endpoint
        format: "PDF", // This would come from your API
      }));

      setPurchasedItems(simulatedPurchasedItems);

      // Clear the cart after successful purchase
      clearCart();

      // Clear pending order from localStorage
      localStorage.removeItem("pendingOrder");
    }
  }, [orderId, items, clearCart]);

  const handleDownload = (item: PurchasedItem) => {
    // In a real app, this would trigger the actual download
    // For demo purposes, we'll just show a toast
    console.log(`Downloading ${item.title}`);

    // Create a temporary link to simulate download
    const link = document.createElement("a");
    link.href = item.downloadUrl;
    link.download = `${item.title}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!orderId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Invalid Order</h1>
          <p className="text-gray-600 mb-6">
            No order ID found. Please check your payment confirmation.
          </p>
          <Button asChild>
            <Link href="/products">Browse Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Payment Successful!
          </h1>
          <p className="text-gray-600">Order ID: {orderId}</p>
          <p className="text-gray-600">
            Thank you for your purchase. Your items are ready for download.
          </p>
        </div>

        {/* Download Items */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6">Your Downloads</h2>

          {purchasedItems.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <p className="text-gray-500 mb-4">
                Loading your purchased items...
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {purchasedItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-sm p-6 flex items-center justify-between"
                >
                  <div className="flex items-center space-x-4">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{item.title}</h3>
                      <p className="text-gray-500">Format: {item.format}</p>
                    </div>
                  </div>

                  <Button
                    onClick={() => handleDownload(item)}
                    className="bg-[#2c5d7c] hover:bg-[#1e4258]"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-12 justify-center">
            <Button asChild variant="outline">
              <Link href="/products">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Continue Shopping
              </Link>
            </Button>
            <Button asChild>
              <Link href="/orders">View Order History</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
