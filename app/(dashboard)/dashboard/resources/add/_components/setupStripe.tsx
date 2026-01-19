"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

// Validation schema
const setupSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  country: z.string().nonempty({ message: "Please select a country" }),
});

type SetupFormData = z.infer<typeof setupSchema>;

const SetupStripePage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SetupFormData>({
    resolver: zodResolver(setupSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: SetupFormData) => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stripe/onboard`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Something went wrong");
      }

      return res.json();
    },
    onSuccess: (data) => {
      const redirectUrl = data?.data?.url;
      if (redirectUrl) {
        window.location.href = redirectUrl; // Redirect to Stripe onboarding
      } else {
        toast.error("No redirect URL found.");
      }
      reset();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data: SetupFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center">
            Setup Stripe Account
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email Field */}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Country Field */}
            <div>
              <Label htmlFor="country">Country</Label>
              <select
                id="country"
                className="w-full rounded-md border border-gray-300 bg-white p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                {...register("country")}
              >
                <option value="">Select your country</option>
                <option value="US">USA</option>
                <option value="CA">Canada</option>
              </select>
              {errors.country && (
                <p className="text-sm text-red-500 mt-1">{errors.country.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={mutation.isPending}>
              {mutation.isPending ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SetupStripePage;
