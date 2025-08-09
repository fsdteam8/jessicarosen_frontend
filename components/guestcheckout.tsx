"use client";

import React, { useState } from "react";
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

    // Calculate subtotal price (sum of item price * qty)
    const subtotal = items.reduce(
        (sum, item) => sum + (item.discountPrice || item.price) * item.quantity,
        0
    );

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
            };

            const res = await fetch(
                "http://localhost:5000/api/v1/payment/create-session",
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

                {/* Pricing Summary */}
                <div className="mb-4 p-4 border rounded">
                    <div className="flex justify-between font-bold text-lg">
                        <span>Total:</span>
                        <span>${subtotal.toFixed(2)}</span>
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
                        placeholder="Address"
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
                        <Button type="submit" disabled={loading}>
                            {loading ? "Processing..." : "Confirm & Pay"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
