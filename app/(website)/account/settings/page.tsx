
// @typescript-eslint/no-explicit-any
"use client";

import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { AccountLayout } from "@/components/account/account-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";

async function updatePassword(
  payload: { oldPassword: string; newPassword: string },
  token: string
) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/change-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to update password");
  }
  return response.json();
}

// Loading Component for the whole page
const SettingsLoadingSkeleton = () => (
  <div className="bg-[#6459491A] rounded-lg p-8 mb-10">
    <div className="mb-6">
      <div className="h-6 bg-gray-200 rounded animate-pulse w-40"></div>
    </div>

    <div className="space-y-6">
      {/* Current Password Skeleton */}
      <div>
        <div className="h-4 bg-gray-200 rounded animate-pulse mb-1 w-32"></div>
        <div className="h-[49px] bg-gray-200 rounded animate-pulse"></div>
      </div>

      {/* New & Confirm Password Skeletons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="h-4 bg-gray-200 rounded animate-pulse mb-1 w-24"></div>
          <div className="h-[49px] bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div>
          <div className="h-4 bg-gray-200 rounded animate-pulse mb-1 w-32"></div>
          <div className="h-[49px] bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>

      {/* Save Button Skeleton */}
      <div className="flex justify-end">
        <div className="h-10 bg-gray-200 rounded animate-pulse w-20"></div>
      </div>
    </div>
  </div>
);

// Loading Overlay Component
const LoadingOverlay = () => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 flex items-center space-x-3">
      <Loader2 className="h-6 w-6 animate-spin text-[#2c5d7c]" />
      <span className="text-gray-700 font-medium">Updating password...</span>
    </div>
  </div>
);

export default function SettingsPage() {
  const { data: session, status } = useSession();

  const token = session?.user?.accessToken || "";

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Password visibility toggles
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const mutation = useMutation({
    mutationFn: (payload: { oldPassword: string; newPassword: string }) =>
      updatePassword(payload, token),
    onSuccess: (success) => {
      toast.success(success.message || "Password updated successfully");
      
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setShowCurrentPassword(false);
      setShowNewPassword(false);
      setShowConfirmPassword(false);
      setErrors({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update password");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!passwordData.currentPassword) {
      newErrors.currentPassword = "Current password is required";
      isValid = false;
    }

    if (!passwordData.newPassword) {
      newErrors.newPassword = "New password is required";
      isValid = false;
    } else if (passwordData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
      isValid = false;
    }

    if (!passwordData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your new password";
      isValid = false;
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSave = () => {
    if (validateForm()) {
      mutation.mutate({
        oldPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
    }
  };

  // Submit form on Enter key
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  // Show loading skeleton while session is loading
  if (status === "loading") {
    return (
      <AccountLayout activeTab="settings">
        <SettingsLoadingSkeleton />
      </AccountLayout>
    );
  }

  return (
    <>
      <AccountLayout activeTab="settings">
        <div className="bg-[#6459491A] rounded-lg p-8 mb-10">
          <div className="mb-6">
            <h3 className="text-xl font-bold mb-4">Change password</h3>
          </div>

          <div className="space-y-6">
            {/* Current Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Password
              </label>
              <div className="relative">
                <Input
                  type={showCurrentPassword ? "text" : "password"}
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  placeholder="••••••••••••"
                  className={`h-[49px] border border-[#645949] outline-none pr-10 bg-gray-50 ${
                    errors.currentPassword ? "border-red-500" : ""
                  }`}
                  disabled={mutation.isPending}
                />
                <span
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </span>
              </div>
              {errors.currentPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.currentPassword}</p>
              )}
            </div>

            {/* New & Confirm Password Side-by-Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <div className="relative">
                  <Input
                    type={showNewPassword ? "text" : "password"}
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    placeholder="••••••••••••"
                    className={`h-[49px] border border-[#645949] outline-none pr-10 bg-gray-50 ${
                      errors.newPassword ? "border-red-500" : ""
                    }`}
                    disabled={mutation.isPending}
                  />
                  <span
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </span>
                </div>
                {errors.newPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.newPassword}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    placeholder="••••••••••••"
                    className={`h-[49px] border border-[#645949] outline-none pr-10 bg-gray-50 ${
                      errors.confirmPassword ? "border-red-500" : ""
                    }`}
                    disabled={mutation.isPending}
                  />
                  <span
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-600"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </span>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
              <Button
                className="bg-[#2c5d7c] hover:bg-[#1e4258] disabled:opacity-50"
                onClick={handleSave}
                disabled={mutation.isPending}
              >
                {mutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save"
                )}
              </Button>
            </div>
          </div>
        </div>
      </AccountLayout>

      {/* Loading Overlay */}
      {mutation.isPending && <LoadingOverlay />}
    </>
  );
}