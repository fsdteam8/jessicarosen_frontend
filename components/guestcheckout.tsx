"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useCart } from "@/hooks/use-cart";
import Image from "next/image";

export default function GuestCheckoutModal({
    open,
    setOpen,
}: {
    open: boolean;
    setOpen: (open: boolean) => void;
}) {
    const { items } = useCart();

    // Guest info
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const [loading, setLoading] = useState(false);
    
    // Tax calculation states
    const [taxAmount, setTaxAmount] = useState(0);
    const [taxRate, setTaxRate] = useState(0);
    const [loadingTax, setLoadingTax] = useState(false);

    // Constants
    const PLATFORM_FEE_PERCENT = 0.13; // 13% platform fee

    // Calculate subtotal price (sum of item price * qty)
    const subtotal = items.reduce(
        (sum, item) => sum + (item.discountPrice || item.price) * item.quantity,
        0
    );

    // Calculate platform fee (13%)
    const platformFee = subtotal * PLATFORM_FEE_PERCENT;
    
    // Amount before tax (subtotal + platform fee)
    const amountBeforeTax = subtotal + platformFee;
    
    // Final total (with tax)
    const total = amountBeforeTax + taxAmount;

    // Fetch tax estimate when items change or amount before tax changes
    useEffect(() => {
        const fetchTaxEstimate = async () => {
            if (amountBeforeTax <= 0 || !address) return;
            
            setLoadingTax(true);
            try {
                // You can create a backend endpoint to calculate tax
                // Or use Stripe's tax calculation API directly
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/payment/calculate-tax`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            amount: amountBeforeTax,
                            country: "BD", // You can get this from address or user selection
                            postal_code: address.match(/\d{4,}/)?.[0] || "", // Extract postal code from address
                        }),
                    }
                );
                
                const data = await response.json();
                if (response.ok) {
                    setTaxAmount(data.taxAmount || 0);
                    setTaxRate(data.taxRate || 0);
                }
            } catch (error) {
                console.error("Error fetching tax:", error);
                // Default to 0 if tax calculation fails
                setTaxAmount(0);
            } finally {
                setLoadingTax(false);
            }
        };

        // Debounce tax calculation to avoid too many requests
        const timer = setTimeout(() => {
            if (address) {
                fetchTaxEstimate();
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [amountBeforeTax, address]);

    const isValidEmail = (email: string) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !email || !phone || !address) {
            toast.error("Please fill all fields");
            return;
        }
        if (!isValidEmail(email)) {
            toast.error("Please enter a valid email");
            return;
        }
        if (!items || items.length === 0) {
            toast.error("Your cart is empty");
            return;
        }

        setLoading(true);

        try {
            const body = {
                guest: { name, email, phone, address },
                items: items.map((item) => ({
                    resource: item.id,
                    quantity: item.quantity,
                })),
                // Send tax information to backend
                taxAmount: taxAmount,
                customerCountry: "BD", // You can make this dynamic based on address
            };

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/payment/create-session`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                }
            );

            const data = await res.json();

            if (res.ok && data.status) {
                toast.success("Checkout session created! Redirecting...");
                setOpen(false);
                if (data.data.url) {
                    window.location.href = data.data.url;
                }
            } else {
                toast.error(data.message || "Failed to create checkout session");
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Something went wrong";
            toast.error("Error: " + errorMessage);
        } finally {
            setLoading(false);
        }
    };

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
            onClick={() => setOpen(false)}
        >
            <div
                className="bg-white p-6 rounded-lg w-full max-w-lg max-h-[90vh] overflow-auto relative"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-xl font-semibold mb-4">Checkout as Guest</h2>

                {/* Cart Items */}
                <div className="mb-4 max-h-48 overflow-auto border rounded p-2">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center gap-4 border-b last:border-b-0 py-2"
                        >
                            <div className="relative w-12 h-12 flex-shrink-0 rounded overflow-hidden">
                                <Image
                                    src={item.thumbnail || "/placeholder.svg"}
                                    alt={item.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="font-medium truncate">{item.title}</div>
                                <div className="text-sm text-gray-600">
                                    Qty: {item.quantity} | Price: $
                                    {(item.discountPrice || item.price).toFixed(2)}
                                </div>
                            </div>
                            <div className="text-right font-semibold">
                                ${(item.quantity * (item.discountPrice || item.price)).toFixed(2)}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Detailed Pricing Summary with Tax Breakdown */}
                <div className="mb-4 p-4 border rounded bg-gray-50">
                    <h3 className="font-semibold mb-2">Price Breakdown</h3>
                    
                    <div className="space-y-2 text-sm">
                        {/* Subtotal */}
                        <div className="flex justify-between">
                            <span>Subtotal:</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        
                        {/* Platform Fee (13%) */}
                        <div className="flex justify-between text-gray-600">
                            <span>Platform Fee (13%):</span>
                            <span>+${platformFee.toFixed(2)}</span>
                        </div>
                        
                        {/* Amount before tax */}
                        <div className="flex justify-between font-medium border-t pt-2 mt-2">
                            <span>Amount before tax:</span>
                            <span>${amountBeforeTax.toFixed(2)}</span>
                        </div>
                        
                        {/* Tax (with loading state) */}
                        <div className="flex justify-between text-gray-600">
                            <span>
                                Tax {taxRate > 0 ? `(${taxRate}%)` : ''}:
                                {loadingTax && <span className="ml-2 text-xs">Calculating...</span>}
                            </span>
                            <span className={loadingTax ? "text-gray-400" : ""}>
                                {loadingTax ? "..." : `+$${taxAmount.toFixed(2)}`}
                            </span>
                        </div>
                        
                        {/* Total - Highlighted */}
                        <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                            <span>Total:</span>
                            <span className="text-green-600">
                                ${total.toFixed(2)}
                                {loadingTax && <span className="text-xs text-gray-400 ml-2">(estimating...)</span>}
                            </span>
                        </div>
                        
                        {/* Tax info note */}
                        {taxAmount > 0 && (
                            <div className="text-xs text-gray-500 mt-2">
                                *Tax is calculated based on your location. Final tax amount may vary.
                            </div>
                        )}
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        type="text"
                        placeholder="Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <Input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Input
                        type="tel"
                        placeholder="Phone Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                    <Input
                        type="text"
                        placeholder="Address (for tax calculation)"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />

                    <div className="flex justify-end space-x-2 pt-4">
                        <Button
                            variant="outline"
                            onClick={() => setOpen(false)}
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                        <Button 
                            type="submit" 
                            disabled={loading || loadingTax}
                            className="bg-green-600 hover:bg-green-700"
                        >
                            {loading ? "Processing..." : `Pay $${total.toFixed(2)}`}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}