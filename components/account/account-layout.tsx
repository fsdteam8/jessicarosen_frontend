import type React from "react"
import Link from "next/link"
import { LogOut } from "lucide-react"
import { HeroSection } from "@/components/hero-section"
import { cn } from "@/lib/utils"

interface AccountLayoutProps {
  children: React.ReactNode
  activeTab?: "profile" | "settings" | "orders" | "privacy" | "terms"
}

export function AccountLayout({ children, activeTab = "profile" }: AccountLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          title="Accounts"
          description="Need assistance? We are here to help. To inquire about the products and services found on our website, please contact us by phone or e-mail, and we'll gladly assist you."
          backgroundImage="/scales-of-justice.png"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Accounts", href: "/account" },
            { label: "My Profile", href: "/account/profile" },
          ]}
        />

        <div className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-center mb-8">Accounts</h2>

          {/* Account Navigation */}
          <div className="border-b mb-8">
            <nav className="flex flex-wrap -mb-px">
              <Link
                href="/account/profile"
                className={cn(
                  "inline-block py-4 px-4 border-b-2 font-medium text-sm",
                  activeTab === "profile"
                    ? "border-[#2c5d7c] text-[#2c5d7c]"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                )}
              >
                My Profile
              </Link>
              <Link
                href="/account/settings"
                className={cn(
                  "inline-block py-4 px-4 border-b-2 font-medium text-sm",
                  activeTab === "settings"
                    ? "border-[#2c5d7c] text-[#2c5d7c]"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                )}
              >
                Setting
              </Link>
              <Link
                href="/account/orders"
                className={cn(
                  "inline-block py-4 px-4 border-b-2 font-medium text-sm",
                  activeTab === "orders"
                    ? "border-[#2c5d7c] text-[#2c5d7c]"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                )}
              >
                Order History
              </Link>
              <Link
                href="/account/privacy"
                className={cn(
                  "inline-block py-4 px-4 border-b-2 font-medium text-sm",
                  activeTab === "privacy"
                    ? "border-[#2c5d7c] text-[#2c5d7c]"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                )}
              >
                Privacy Policy
              </Link>
              <Link
                href="/account/terms"
                className={cn(
                  "inline-block py-4 px-4 border-b-2 font-medium text-sm",
                  activeTab === "terms"
                    ? "border-[#2c5d7c] text-[#2c5d7c]"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                )}
              >
                Terms & Conditions
              </Link>
              <div className="ml-auto">
                <Link
                  href="/auth/logout"
                  className="inline-flex items-center py-4 px-4 text-sm font-medium text-red-600 hover:text-red-800"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Log out
                </Link>
              </div>
            </nav>
          </div>

          {/* Main Content */}
          {children}
        </div>
      </main>

    </div>
  )
}
