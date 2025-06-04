"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Search, ShoppingCart, Heart, Menu, ChevronRight, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/hooks/use-cart"
import { useAuth } from "@/hooks/use-auth"
import { CartSheet } from "@/components/cart-sheet"
import Image from "next/image"
import { useWishlist } from "@/hooks/use-wishlist"

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isMounted, setIsMounted] = useState(false)
  const [activeTab, setActiveTab] = useState<"canada" | "us">("canada")
  const pathname = usePathname()
  const { getItemCount, setOpen } = useCart()
  const { isAuthenticated, user, logout } = useAuth()
  const { items } = useWishlist()

  // Prevent hydration mismatch by only showing dynamic content after mount
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const itemCount = isMounted ? getItemCount() : 0
  const wishlistCount = isMounted ? items.length : 0

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Searching for:", searchQuery)
    setIsSearchOpen(false)
  }

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white">
        {/* Top Blue Bar */}
        <div className="bg-[#23547B] text-white font-medium leading-[120%] text-sm py-2">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <span className="mr-2 border p-2 rounded-full">
                  <Mail size={25} />
                </span>
                <span className="">support@lawbie.com</span>
              </span>
            </div>

            <div className="flex-1 text-center hidden lg:block">
              <span className="text-sm font-medium leading-[120%]">
                Special Offers: Save up to 30% Using Promo Code
              </span>
            </div>

            <div className="hidden lg:flex items-center space-x-2">
              <Button
                variant="outline"
                onClick={() => setActiveTab("canada")}
                className={`text-base px-3 py-5 rounded-[8px] transition-all duration-200 ${
                  activeTab === "canada"
                    ? "bg-white text-blue-600 border-white hover:bg-gray-100"
                    : "bg-transparent text-white border-white hover:bg-white/10"
                }`}
              >
                <span className="w-[48px] h-[24px]">
                  <Image src="/images/flage.png" alt="Canada Flag" width={48} height={24} />
                </span>
                Lawbie Canada
              </Button>
              <Button
                variant="outline"
                onClick={() => setActiveTab("us")}
                className={`text-base px-3 py-5 rounded-[8px] flex items-center space-x-2 transition-all duration-200 ${
                  activeTab === "us"
                    ? "bg-white text-blue-600 border-white hover:bg-gray-100"
                    : "bg-transparent text-white border-[2px] border-white hover:bg-white/10"
                }`}
              >
                <span className="w-[48px] h-[24px] relative">
                  <Image src="/images/flage1.png" alt="US Flag" fill className="object-contain" />
                </span>
                <span>Lawbie US</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="bg-white border-gray-200 py-4 px-4">
          <div className="container mx-auto flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <div className="text-blue-600">
                <Link href="/" className="text-2xl font-bold">
                  <Image
                    src="/images/authImg.svg"
                    alt="Lawbie Logo"
                    width={150}
                    height={60}
                    className="lg:h-[60px] lg:w-auto w-[80%] mb-2"
                  />
                </Link>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-8 hidden md:block">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-[52px] pl-4 pr-12 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white rounded-full bg-[#23547B] p-2">
                  <Search className="text-xl text-white" />
                </button>
              </div>
            </div>

            {/* Mobile Search Button */}
            <button className="md:hidden text-gray-600 mr-3" onClick={() => setIsSearchOpen(!isSearchOpen)}>
              <Search className="text-2xl" />
            </button>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-4">
              <Link href="/wishlist" className="relative p-2 flex">
                <Heart className="text-2xl text-gray-600" />
                {isMounted && (
                  <span className="absolute -top-1 -right-1 bg-[#23547B] text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <button className="p-2 relative" onClick={() => setOpen(true)}>
                <ShoppingCart className="text-2xl text-gray-600" />
                {isMounted && (
                  <Badge className="absolute -top-1 -right-1 bg-[#23547B] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center p-0">
                    {itemCount}
                  </Badge>
                )}
              </button>

              {isMounted && isAuthenticated ? (
                <div className="relative group hidden sm:block">
                  <Button variant="ghost" size="sm" className="text-gray-700">
                    <span className="text-sm">{user?.name}</span>
                  </Button>
                  <div className="absolute right-0 mt-2 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                    <div className="py-2 text-sm text-gray-700">
                      <p className="font-medium">{user?.name}</p>
                      <p className="text-gray-500 text-xs">{user?.email}</p>
                    </div>
                    <Link href="/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      My Account
                    </Link>
                    <Link href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      My Orders
                    </Link>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <Link
                  href="/sign-in"
                  className="bg-[#23547B] hover:bg-blue-700 text-white px-6 py-2 rounded-md hidden sm:flex"
                >
                  Login
                </Link>
              )}

              {/* Mobile Menu */}
              <Sheet>
                <SheetTrigger asChild>
                  <button className="md:hidden">
                    <Menu className="text-2xl" />
                  </button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                  <nav className="flex flex-col gap-4 mt-8">
                    <Link
                      href="/"
                      className={`text-lg font-medium ${pathname === "/" ? "text-blue-600" : "hover:text-blue-600"}`}
                    >
                      Home
                    </Link>
                    <Link
                      href="/products"
                      className={`text-lg font-medium ${
                        pathname === "/products" ? "text-blue-600" : "hover:text-blue-600"
                      }`}
                    >
                      Resources Type
                    </Link>
                    <Link
                      href="/blog"
                      className={`text-lg font-medium ${
                        pathname === "/blog" ? "text-blue-600" : "hover:text-blue-600"
                      }`}
                    >
                      Blog
                    </Link>
                    <Link
                      href="/employment"
                      className={`text-lg font-medium ${
                        pathname === "/employment" ? "text-blue-600" : "hover:text-blue-600"
                      }`}
                    >
                      Employment
                    </Link>
                    <Link
                      href="/corporate"
                      className={`text-lg font-medium ${
                        pathname === "/corporate" ? "text-blue-600" : "hover:text-blue-600"
                      }`}
                    >
                      Corporate and M&A
                    </Link>
                    <Link
                      href="/legal-operations"
                      className={`text-lg font-medium ${
                        pathname === "/legal-operations" ? "text-blue-600" : "hover:text-blue-600"
                      }`}
                    >
                      Legal Operations
                    </Link>
                    <Link
                      href="/commercial"
                      className={`text-lg font-medium ${
                        pathname === "/commercial" ? "text-blue-600" : "hover:text-blue-600"
                      }`}
                    >
                      Commercial Transactions
                    </Link>
                    <Link
                      href="/wishlist"
                      className={`text-lg font-medium ${
                        pathname === "/wishlist" ? "text-blue-600" : "hover:text-blue-600"
                      }`}
                    >
                      Wishlist
                    </Link>
                    {isMounted && !isAuthenticated && (
                      <Button asChild className="bg-blue-600 hover:bg-blue-700 mt-4">
                        <Link href="/auth/login">Login</Link>
                      </Button>
                    )}
                    {isMounted && isAuthenticated && (
                      <>
                        <div className="border-t pt-4 mt-4">
                          <p className="font-medium">{user?.name}</p>
                          <p className="text-gray-500 text-sm">{user?.email}</p>
                        </div>
                        <Link href="/account" className="text-lg font-medium hover:text-blue-600">
                          My Account
                        </Link>
                        <Link href="/orders" className="text-lg font-medium hover:text-blue-600">
                          My Orders
                        </Link>
                        <Button variant="destructive" onClick={logout} className="mt-4">
                          Logout
                        </Button>
                      </>
                    )}

                    <div className="block lg:hidden space-y-2">
                      <Button
                        variant="outline"
                        onClick={() => setActiveTab("canada")}
                        className={`w-full text-sm px-3 py-3 rounded-[8px] flex items-center space-x-2 transition-all duration-200 ${
                          activeTab === "canada"
                            ? "bg-white text-[#23547b] border-[#23547b] hover:bg-gray-100"
                            : "bg-transparent text-white border-[#23547b] hover:bg-[#23547b]/10"
                        }`}
                      >
                        <span className="w-[32px] h-[20px] relative">
                          <Image
                            src="/placeholder.svg?height=20&width=32"
                            alt="Canada Flag"
                            fill
                            className="object-contain"
                          />
                        </span>
                        <span>Lawbie Canada</span>
                      </Button>

                      <Button
                        variant="outline"
                        onClick={() => setActiveTab("us")}
                        className={`w-full text-sm px-3 py-3 rounded-[8px] flex items-center space-x-2 transition-all duration-200 ${
                          activeTab === "us"
                            ? "bg-white text-[#23547b] border-[#23547b] hover:bg-gray-100"
                            : "bg-[#23547b] text-white border-[2px] border-white hover:bg-[#112a3f]"
                        }`}
                      >
                        <span className="w-[32px] h-[20px] relative">
                          <Image
                            src="/placeholder.svg?height=20&width=32"
                            alt="US Flag"
                            fill
                            className="object-contain"
                          />
                        </span>
                        <span className="text-white">Lawbie US</span>
                      </Button>
                    </div>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar (conditionally rendered) */}
        {isSearchOpen && (
          <div className="bg-white py-2 px-4 md:hidden">
            <form onSubmit={handleSearch} className="flex">
              <Input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 text-sm rounded-r-none border border-gray-300 h-10"
              />
              <Button type="submit" size="sm" className="rounded-l-none bg-[#23547b] hover:bg-[#153a58] h-10 px-3">
                <Search className="h-4 w-4 text-white" />
              </Button>
            </form>
          </div>
        )}

        {/* Navigation Menu */}
        <div className="bg-white pb-4 px-4 hidden md:block border-b-[1.5px] border-[#23547B]">
          <div className="container mx-auto px-7">
            <nav className="flex items-center text-base space-x-8 justify-center">
              <Link
                href="/"
                className={`font-medium transition-colors ${
                  pathname === "/" ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                }`}
              >
                Home
              </Link>
              <Link
                href="/products"
                className={`font-medium transition-colors ${
                  pathname === "/products" ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                }`}
              >
                Resources Type
              </Link>
              <Link
                href="/blog"
                className={`font-medium transition-colors ${
                  pathname === "/blog" ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                }`}
              >
                Blog
              </Link>
              <Link
                href="/employment"
                className={`font-medium transition-colors ${
                  pathname === "/employment" ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                }`}
              >
                Employment
              </Link>
              <Link
                href="/corporate"
                className={`font-medium transition-colors ${
                  pathname === "/corporate" ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                }`}
              >
                Corporate and M&A
              </Link>
              <Link
                href="/legal-operations"
                className={`font-medium transition-colors ${
                  pathname === "/legal-operations" ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                }`}
              >
                Legal Operations
              </Link>
              <Link
                href="/commercial"
                className={`font-medium transition-colors ${
                  pathname === "/commercial" ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
                }`}
              >
                Commercial Transactions
              </Link>
              <button className="ml-2 p-2 rounded-full border border-[#23547B] bg-gray-100 hover:bg-gray-200">
                <ChevronRight className="w-6 h-6" />
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Cart Sheet */}
      <CartSheet />
    </>
  )
}
