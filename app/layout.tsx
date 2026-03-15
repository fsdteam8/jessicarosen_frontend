import type { Metadata } from "next";
// import localFont from "next/font/local";
import { Manrope } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from "@/components/auth-provider";
import { Toaster } from "sonner";
import AppProvider from "@/provider/AppProvider";
import ReduxProvider from "@/redux/provider";
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Add weights as needed
  variable: "--font-manrope", // Optional for Tailwind or global use
  display: "swap",
});


export const metadata: Metadata = {
  title: "Lawbie | Lawyers and law firms",
  description: "An AI-powered legal assistant for lawyers and law firms.",
  icons: {
    icon: "/images/authImg.svg",
    // apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        className={`${manrope.variable} antialiased`}
      >
        <NextAuthProvider>
          <ReduxProvider>
            <AppProvider>{children}</AppProvider>
            <Toaster position="bottom-right" richColors />
          </ReduxProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
