"use client";

import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";


const setupSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  country: z.string().nonempty({ message: "Please select a country" }),
});

type SetupFormData = z.infer<typeof setupSchema>;

interface SetupPopupProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SetupPopup: React.FC<SetupPopupProps> = ({ open, onOpenChange }) => {
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
      onOpenChange(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data: SetupFormData) => {
    console.log("Form Data:", data);
    mutation.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogTitle className="text-lg font-semibold mb-2">
          Enter your details to setup Stripe
        </DialogTitle>

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
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Country Select Field */}
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
              <p className="text-sm text-red-500 mt-1">
                {errors.country.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button type="submit" disabled={mutation.isPending} className="w-full">
            {mutation.isPending ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SetupPopup;
