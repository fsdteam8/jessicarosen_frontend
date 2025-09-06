"use client";

import type React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";

// Form validation schema
const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  address: z.string().optional(),
  phoneNumber: z.string().optional(),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
});

type ContactFormData = z.infer<typeof contactSchema>;

// ✅ Define API response type
type ContactResponse = {
  message: string;
  success: boolean;
};

// ✅ API function to post contact data
const postContactData = async (
  data: ContactFormData
): Promise<ContactResponse> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

interface ContactInfoProps {
  Icon: LucideIcon;
  label: string;
  value: string;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ Icon, label, value }) => {
  return (
    <div className="flex items-start space-x-3">
      <div className="w-10 h-10 flex items-center justify-center border rounded-full bg-[#BBCAD6]">
        <Icon className="w-5 h-5 text-[#23547B]" />
      </div>
      <div>
        <h4 className="font-medium text-[#2A2A2A] mb-1">{label}</h4>
        <p className="text-gray-600 text-sm">{value}</p>
      </div>
    </div>
  );
};

const ContactPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const contactMutation = useMutation({
    mutationFn: postContactData,
    onSuccess: (data) => {
      console.log("Message sent successfully:", data);
      reset();
      toast.success("Message sent successfully!");
    },
    onError: (error: Error) => {
      console.error("Error submitting form:", error);
      toast.error(`Failed to send message: ${error.message}`);
    },
  });

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  const { isPending } = contactMutation;

  return (
    <div className="bg-gray-50">
      <div className="relative w-full h-[500px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/images/contactHero.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4 w-full">
            <div className="max-w-2xl">
              <div className="mb-4">
                <span className="text-white/90 text-sm font-medium">
                  Welcome & Shop With Us 🛒
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-6 leading-tight">
                Get In Touch With Us
                <br />
                To Know More Information
              </h1>
              <p className="text-white/90 text-lg mb-8 leading-relaxed max-w-xl">
                From everyday essentials to the latest trends, we bring you a
                seamless shopping experience with unbeatable deals, delivery,
                discover convenience, quality, and style all in one place.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {/* <Button
                  size="lg"
                  className="bg-[#4F7695] hover:bg-blue-700 text-white px-8 py-3 text-base font-semibold rounded-lg transition-colors duration-200 flex items-center gap-2"
                >
                  <MessageSquare className="w-5 h-5" />
                  Send A Message
                </Button> */}

                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-[#E0B15E] hover:bg-orange-600 text-white px-8 py-3 text-base font-semibold rounded-lg transition-colors duration-200 flex items-center gap-2"
                >
                  <Mail className="w-5 h-5" />
                  Email Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="my-[80px]">
        <h1 className="text-[40px] font-medium leading-[120%] text-[#131313] text-center mb-4">
          How Can We Help You?
        </h1>
        <p className="max-w-4xl text-center mx-auto text-[16px] leading-[150%] text-[#424242] ">
          Our team is always ready to assist you with any questions or concerns
          you might have. Fill out the form below and we&apos;ll get back to you
          as soon as possible
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="p-8">
          <div className="flex flex-col lg:flex-row justify-between gap-16 mb-10">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid w-full grid-cols-1 md:grid-cols-2 gap-6 flex-1"
            >
              <div>
                <Label
                  htmlFor="firstName"
                  className="text-[#2A2A2A] mb-2 block"
                >
                  First Name *
                </Label>
                <Input
                  id="firstName"
                  {...register("firstName")}
                  placeholder="Enter Your First Name"
                  className="w-full"
                  disabled={isPending}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="lastName" className="text-[#2A2A2A] mb-2 block">
                  Last Name *
                </Label>
                <Input
                  id="lastName"
                  {...register("lastName")}
                  placeholder="Enter Your Last Name"
                  className="w-full"
                  disabled={isPending}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.lastName.message}
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="address" className="text-[#2A2A2A] mb-2 block">
                  Address
                </Label>
                <Input
                  id="address"
                  {...register("address")}
                  placeholder="Optional"
                  className="w-full"
                  disabled={isPending}
                />
              </div>

              <div className="md:col-span-2">
                <Label
                  htmlFor="phoneNumber"
                  className="text-[#2A2A2A] mb-2 block"
                >
                  Phone Number
                </Label>
                <Input
                  id="phoneNumber"
                  {...register("phoneNumber")}
                  placeholder="000-000-0000 (Optional)"
                  className="w-full"
                  disabled={isPending}
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="subject" className="text-[#2A2A2A] mb-2 block">
                  Subject *
                </Label>
                <Input
                  id="subject"
                  {...register("subject")}
                  placeholder="Enter the subject"
                  className="w-full"
                  disabled={isPending}
                />
                {errors.subject && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.subject.message}
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="message" className="text-[#2A2A2A] mb-2 block">
                  Your Message *
                </Label>
                <Textarea
                  id="message"
                  {...register("message")}
                  placeholder="Tell us how we can help you"
                  className="w-full min-h-[120px]"
                  disabled={isPending}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isPending}
                className="bg-[#23547B] py-3 text-white hover:bg-[#016102]/90 mt-4 md:col-span-2 w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? "Sending..." : "Send Message"}
              </Button>
            </form>

            <div className="w-full lg:max-w-[360px] mt-3">
              <h3 className="text-xl font-semibold mb-6 text-[#2A2A2A]">
                Here&apos;s How to Reach Us
              </h3>
              <div className="space-y-10">
                <ContactInfo
                  Icon={Mail}
                  label="Email Address"
                  value="support@lawbie.com"
                />
                <ContactInfo
                  Icon={Phone}
                  label="Phone Number"
                  value="(406) 555-0120"
                />
                <ContactInfo
                  Icon={MapPin}
                  label="Location"
                  value="440 Collins Street, Melbourne VIC 3000"
                />
                <ContactInfo
                  Icon={Clock}
                  label="Business Hours"
                  value="Monday – Saturday, 8:00 AM – 6:00 PM"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
