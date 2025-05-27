"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, ShoppingCart, Heart, Menu, X, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/hooks/use-cart"
import { useAuth } from "@/hooks/use-auth"
import { CartSheet } from "@/components/cart-sheet"
import Image from "next/image"

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { getItemCount, setOpen } = useCart()
  const { isAuthenticated, user, logout } = useAuth()
  const itemCount = getItemCount()

  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would redirect to search results page
    console.log("Searching for:", searchQuery)
    setIsSearchOpen(false)
  }

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white">
        {/* Top Bar */}
        <div className="bg-[#2c5d7c] text-white py-2 px-4">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-sm hidden sm:inline">example@gmail.com</span>
            </div>

            {/* Desktop Search */}
            <div className="relative max-w-md w-full mx-4 hidden md:block">
              <form onSubmit={handleSearch}>
                <Input
                  type="text"
                  placeholder="Search Your Resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-8 pr-8 text-sm rounded-full bg-white border-none text-gray-800 placeholder:text-gray-500"
                />
                <Button
                  type="submit"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-8 w-8 text-gray-500"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </form>
            </div>

            {/* Mobile Search Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              {isSearchOpen ? <X className="h-4 w-4" /> : <Search className="h-4 w-4" />}
            </Button>

            <div className="flex items-center space-x-3">
              <Link href="#" className="text-white hover:text-gray-200">
                <FacebookIcon className="h-4 w-4" />
              </Link>
              <Link href="#" className="text-white hover:text-gray-200">
                <InstagramIcon className="h-4 w-4" />
              </Link>
              <Link href="#" className="text-white hover:text-gray-200 hidden sm:inline-flex">
                <LinkedinIcon className="h-4 w-4" />
              </Link>
              <Link href="#" className="text-white hover:text-gray-200 hidden sm:inline-flex">
                <TwitterIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar (conditionally rendered) */}
        {isSearchOpen && (
          <div className="bg-[#2c5d7c] text-white py-2 px-4 md:hidden">
            <form onSubmit={handleSearch} className="flex">
              <Input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-8 text-sm rounded-l-md bg-white border-none text-gray-800 placeholder:text-gray-500 w-full"
              />
              <Button type="submit" size="sm" className="rounded-l-none h-8">
                Search
              </Button>
            </form>
          </div>
        )}

        {/* Main Navigation */}
        <div className="bg-white py-4 px-4 shadow-sm">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center">
              <Link href="/" className="text-3xl font-bold mr-10">
                  <Image
                               src="/assets/logo.png"
                               alt="Lawbie Logo"
                               width={150}
                               height={50}
                               className="h-10 w-auto mb-2"/>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex space-x-8">
                <Link href="/" className="text-gray-700 hover:text-[#2c5d7c] font-medium">
                  Home
                </Link>
                <Link href="/products" className="text-gray-700 hover:text-[#2c5d7c] font-medium">
                  All Products
                </Link>
                <Link href="/contact" className="text-gray-700 hover:text-[#2c5d7c] font-medium">
                  Contact Us
                </Link>
                <Link href="/about" className="text-gray-700 hover:text-[#2c5d7c] font-medium">
                  About Us
                </Link>
                <Link href="/blog" className="text-gray-700 hover:text-[#2c5d7c] font-medium">
                  Blog
                </Link>
              </nav>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Wishlist Button */}
              <Link href="/wishlist">
                <Button variant="ghost" size="icon" className="text-gray-700 hidden sm:flex">
                  <Heart className="h-5 w-5" />
                </Button>
              </Link>

              {/* Cart Button */}
              <Button variant="ghost" size="icon" className="relative text-gray-700" onClick={() => setOpen(true)}>
                <ShoppingCart className="h-5 w-5" />
                {isMounted && itemCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-[#2c5d7c]">
                    {itemCount}
                  </Badge>
                )}
              </Button>

              {/* Auth Button */}
              {isAuthenticated ? (
                <div className="relative group">
                  <Button variant="ghost" size="icon" className="text-gray-700">
                    <User className="h-5 w-5" />
                  </Button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b">
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
                <Button asChild className="bg-[#2c5d7c] hover:bg-[#1e4258] hidden sm:flex">
                  <Link href="/auth/login">Login</Link>
                </Button>
              )}

              {/* Mobile Menu */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                  <nav className="flex flex-col gap-4 mt-8">
                    <Link href="/" className="text-lg font-medium hover:text-[#2c5d7c]">
                      Home
                    </Link>
                    <Link href="/products" className="text-lg font-medium hover:text-[#2c5d7c]">
                      All Products
                    </Link>
                    <Link href="/contact" className="text-lg font-medium hover:text-[#2c5d7c]">
                      Contact Us
                    </Link>
                    <Link href="/about" className="text-lg font-medium hover:text-[#2c5d7c]">
                      About Us
                    </Link>
                    <Link href="/blog" className="text-lg font-medium hover:text-[#2c5d7c]">
                      Blog
                    </Link>
                    <Link href="/wishlist" className="text-lg font-medium hover:text-[#2c5d7c]">
                      Wishlist
                    </Link>
                    {!isAuthenticated && (
                      <Button asChild className="bg-[#2c5d7c] hover:bg-[#1e4258] mt-4">
                        <Link href="/auth/login">Login</Link>
                      </Button>
                    )}
                    {isAuthenticated && (
                      <>
                        <div className="border-t pt-4 mt-4">
                          <p className="font-medium">{user?.name}</p>
                          <p className="text-gray-500 text-sm">{user?.email}</p>
                        </div>
                        <Link href="/account" className="text-lg font-medium hover:text-[#2c5d7c]">
                          My Account
                        </Link>
                        <Link href="/orders" className="text-lg font-medium hover:text-[#2c5d7c]">
                          My Orders
                        </Link>
                        <Button variant="destructive" onClick={logout} className="mt-4">
                          Logout
                        </Button>
                      </>
                    )}
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Cart Sheet */}
      <CartSheet />
    </>
  )
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className={className} fill="currentColor">
      <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
    </svg>
  )
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={className} fill="currentColor">
      <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
    </svg>
  )
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className={className} fill="currentColor">
      <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
    </svg>
  )
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className={className} fill="currentColor">
      <path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" />
    </svg>
  )
}
