"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import { AccountLayout } from "@/components/account/account-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { SquareArrowOutUpRight } from "lucide-react";
import LegalDoc from "@/components/HomePage/LegalDoc";

export default function ProfilePage() {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "Bessie",
    lastName: "Edwards",
    email: "alma.lawson@example.com",
    phone: "(307) 555-0133",
    country: "USA",
    cityState: "California",
    roadArea: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    postalCode: "15268959",
    taxId: "SDPHNBYS286-0133",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    // In a real app, this would send the data to an API
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully.",
    });
    setIsEditing(false);
  };

  return (
    <div>
      <AccountLayout activeTab="profile">
        <div className=" rounded-lg mb-10">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8 bg-[#6459490D] px-6 py-8 rounded-[12px]">
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden border">
                <Image
                  src="/diverse-person-smiling.png"
                  alt="Profile"
                  width={128}
                  height={128}
                  className="object-cover"
                />
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold">Bessie Edwards</h3>
              <p className="text-gray-500 mb-2">@bessieedwards</p>
              <p className="text-gray-700">
                3891 Ranchview Dr. Richardson, California 62639
              </p>
              <Button
                className="mt-4 bg-[#2c5d7c] hover:bg-[#1e4258]"
                onClick={() => (window.location.href = "/account/dashboard")}
              >
                <span>
                  <SquareArrowOutUpRight />
                </span>
                Go To Dashboard
              </Button>
            </div>
          </div>

          <div className="bg-[#6459490D] p-6 rounded-[12px]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Personal Information</h3>
              {!isEditing ? (
                <Button
                  className="bg-[#2c5d7c] hover:bg-[#1e4258]"
                  onClick={() => setIsEditing(true)}
                >
                  <span>
                    <SquareArrowOutUpRight />
                  </span>
                  Update
                </Button>
              ) : (
                <Button
                  className="bg-[#2c5d7c] hover:bg-[#1e4258]"
                  onClick={handleUpdate}
                >
                  <span>
                    <SquareArrowOutUpRight />
                  </span>
                  Save
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                {isEditing ? (
                  <Input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full"
                  />
                ) : (
                  <div className="p-2.5 border rounded-md bg-gray-50">
                    {formData.firstName}
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                {isEditing ? (
                  <Input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full"
                  />
                ) : (
                  <div className="p-2.5 border rounded-md bg-gray-50">
                    {formData.lastName}
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                {isEditing ? (
                  <Input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full"
                    type="email"
                  />
                ) : (
                  <div className="p-2.5 border rounded-md bg-gray-50">
                    {formData.email}
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                {isEditing ? (
                  <Input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full"
                  />
                ) : (
                  <div className="p-2.5 border rounded-md bg-gray-50">
                    {formData.phone}
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country
                </label>
                {isEditing ? (
                  <Input
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full"
                  />
                ) : (
                  <div className="p-2.5 border rounded-md bg-gray-50">
                    {formData.country}
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City/State
                </label>
                {isEditing ? (
                  <Input
                    name="cityState"
                    value={formData.cityState}
                    onChange={handleChange}
                    className="w-full"
                  />
                ) : (
                  <div className="p-2.5 border rounded-md bg-gray-50">
                    {formData.cityState}
                  </div>
                )}
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Road/Area
                </label>
                {isEditing ? (
                  <Input
                    name="roadArea"
                    value={formData.roadArea}
                    onChange={handleChange}
                    className="w-full"
                  />
                ) : (
                  <div className="p-2.5 border rounded-md bg-gray-50">
                    {formData.roadArea}
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Postal Code
                </label>
                {isEditing ? (
                  <Input
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    className="w-full"
                  />
                ) : (
                  <div className="p-2.5 border rounded-md bg-gray-50">
                    {formData.postalCode}
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  TAX ID
                </label>
                {isEditing ? (
                  <Input
                    name="taxId"
                    value={formData.taxId}
                    onChange={handleChange}
                    className="w-full"
                  />
                ) : (
                  <div className="p-2.5 border rounded-md bg-gray-50">
                    {formData.taxId}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </AccountLayout>
      <LegalDoc />
    </div>
  );
}
