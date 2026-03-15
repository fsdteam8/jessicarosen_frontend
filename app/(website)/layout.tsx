import type React from "react";
import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Lawbie | Lawyers and law firms",
  description: "An AI-powered legal assistant for lawyers and law firms.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="">
      <Header />
      {children}
      <Footer />
    </main>
  );
}
