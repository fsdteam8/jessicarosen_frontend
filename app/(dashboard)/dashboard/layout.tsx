import type React from "react";
import type { Metadata } from "next";
import { DashboardLayout } from "@/components/dashboard-layout";

export const metadata: Metadata = {
  title: "Lawbie Dashboard",
  description: "Multi-role ecommerce dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <DashboardLayout>{children} </DashboardLayout>
    </main>
  );
}
