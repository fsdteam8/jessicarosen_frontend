
"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Search, ShoppingCart, Heart, Menu, ChevronRight, Mail, UserRound } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  // CarouselNext,
  // CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import { useCart } from "@/hooks/use-cart"
import { CartSheet } from "@/components/cart-sheet"
import Image from "next/image"
import { useWishlist } from "@/hooks/use-wishlist"
import { useSession, signOut } from "next-auth/react"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { type Region, setRegion } from "@/redux/features/regionSlice"
import { useQuery } from "@tanstack/react-query"

interface PromoCode {
  _id: string
  code: string
  discountValue: number
  special: boolean
  active: boolean
}

interface ApiResponse {
  status: boolean
  data: {
    data: PromoCode[]
  }
}

interface HeaderPromoCarouselProps {
  specialPromos: PromoCode[]
}

function HeaderPromoCarousel({ specialPromos }: HeaderPromoCarouselProps) {
  const [api, setApi] = useState<CarouselApi>()

  useEffect(() => {
    if (!api) return

    api.on("select", () => {
      api.selectedScrollSnap()
    })

    // Auto-rotate carousel every 4 seconds
    const interval = setInterval(() => {
      if (api) {
        api.scrollNext()
      }
    }, 4000)

    return () => clearInterval(interval)
  }, [api])

  if (specialPromos.length === 0) {
    return <span className="text-sm font-medium leading-[120%]">Special Offers: Save up to 30% Using Promo Code</span>
  }

  if (specialPromos.length === 1) {
    return (
      <span className="text-sm font-medium leading-[120%]">
        Special Offers: Save up to {specialPromos[0].discountValue}% Using Promo Code {specialPromos[0].code}
      </span>
    )
  }

  return (
    <Carousel
      setApi={setApi}
      className="w-full max-w-lg mx-auto"
      opts={{
        align: "center",
        loop: true,
      }}
    >
      <CarouselContent>
        {specialPromos.map((promo) => (
          <CarouselItem key={promo._id}>
            <div className="text-sm font-medium leading-[120%] px-4 text-center">
              Special Offers: Save up to {promo.discountValue}% Using Promo Code <span className="text-[#e0b15e]">{promo.code}</span>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious className="hidden lg:flex -left-12 bg-white/20 border-white/30 hover:bg-white/30 text-white h-8 w-8" />
      <CarouselNext className="hidden lg:flex -right-12 bg-white/20 border-white/30 hover:bg-white/30 text-white h-8 w-8" /> */}
    </Carousel>
  )
}

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isMounted, setIsMounted] = useState(false)

  const pathname = usePathname()
  const { getItemCount, setOpen } = useCart()
  const { items } = useWishlist()
  const dispatch = useAppDispatch()
  const currentRegion = useAppSelector((state) => state.region.currentRegion)
  const { data: session } = useSession()
  const user = session?.user
  Search,
  ShoppingCart,
  Heart,
  Menu,
  Mail,
  UserRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/hooks/use-cart";
import { useAuth } from "@/hooks/use-auth";
import { CartSheet } from "@/components/cart-sheet";
import Image from "next/image";
import { useWishlist } from "@/hooks/use-wishlist";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { type Region, setRegion } from "@/redux/features/regionSlice";
import { SearchModal } from "@/components/search-modal";
import { usePracticeAreas } from "@/hooks/use-practice-areas";
import { PracticeAreasDropdown } from "@/components/practice-areas-dropdown";
import { useRouter } from "next/navigation";

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { getItemCount, setOpen } = useCart();
  const { isAuthenticated, logout } = useAuth();
  const { items } = useWishlist();
  const dispatch = useAppDispatch();
  const currentRegion = useAppSelector((state) => state.region.currentRegion);
  const { data: practiceAreasData, isLoading: practiceAreasLoading } =
    usePracticeAreas();

  const handleRegionChange = (region: Region) => {
    dispatch(setRegion(region))
  }

<<<<<<< HEAD
  // Fetch promo codes for header
  const { data, isLoading, error } = useQuery<ApiResponse>({
    queryKey: ["header-promo"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/promo-codes`)
      if (!res.ok) {
        throw new Error("Failed to fetch promo codes")
      }
      return res.json()
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 10 * 60 * 1000, // 10 minutes
  })

  // Filter special promos from the API response
  const specialPromoCodes: PromoCode[] =
    data?.data?.data?.filter((promo: PromoCode) => promo.special && promo.active) || []
=======
  const session = useSession();
  const user = session?.data?.user;
>>>>>>> 707db86 (refactor)

  // Prevent hydration mismatch by only showing dynamic content after mount
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const itemCount = isMounted ? getItemCount() : 0
  const wishlistCount = isMounted ? items.length : 0

  const handleSearch = (e: React.FormEvent) => {
<<<<<<< HEAD
    e.preventDefault()
    console.log("Searching for:", searchQuery)
    setIsSearchOpen(false)
  }

  const logout = () => {
    signOut()
  }
=======
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchModalOpen(true);
      setIsSearchOpen(false);
    }
  };
>>>>>>> 707db86 (refactor)

  const handleSearchButtonClick = () => {
    if (searchQuery.trim()) {
      setIsSearchModalOpen(true);
    }
  };

  const handleMobileSearchClick = () => {
    if (isSearchOpen && searchQuery.trim()) {
      setIsSearchModalOpen(true);
      setIsSearchOpen(false);
    } else {
      setIsSearchOpen(!isSearchOpen);
    }
  };

  const handlePracticeAreaClick = (
    practiceAreaId: string,
    practiceAreaName: string
  ) => {
    router.push(
      `/products?practiceArea=${encodeURIComponent(
        practiceAreaId
      )}&name=${encodeURIComponent(practiceAreaName)}`
    );
  };

  // Get first 5 practice areas for main navigation
  const visiblePracticeAreas = practiceAreasData?.data?.slice(0, 5) || [];
  const hasMoreAreas = (practiceAreasData?.data?.length || 0) > 5;

  return (
    <header className="sticky top-0 z-40 w-full bg-white">
      {/* Top Blue Bar */}
      <div className="bg-[#23547B] text-white font-medium leading-[120%] text-sm py-2">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <span className="mr-2 border p-2 rounded-full">
                <Mail size={25} />
              </span>
<<<<<<< HEAD
              <span>support@lawbie.com</span>
            </span>
          </div>

          <div className="flex-1 text-center hidden lg:block">
            {!isLoading && !error && <HeaderPromoCarousel specialPromos={specialPromoCodes} />}
            {isLoading && <span className="text-sm font-medium leading-[120%]">Loading special offers...</span>}
            {error && (
              <span className="text-sm font-medium leading-[120%]">
                Special Offers: Save up to 30% Using Promo Code
              </span>
            )}
=======
            </div>
            <div className="flex-1 text-center hidden lg:block">
              <span className="text-sm font-medium leading-[120%]">
                Special Offers: Save up to 30% Using Promo Code
              </span>
            </div>
            <div className="hidden lg:flex items-center space-x-2">
              <Button
                variant="outline"
                onClick={() => handleRegionChange("canada")}
                className={`text-base px-3 py-5 rounded-[8px] transition-all duration-200 ${
                  currentRegion === "canada"
                    ? "bg-white text-blue-600 border-white hover:bg-gray-100"
                    : "bg-transparent text-white border-white hover:bg-white/10"
                }`}
              >
                <span className="w-[48px] h-[24px]">
                  <Image
                    src="/images/flage.png"
                    alt="Canada Flag"
                    width={48}
                    height={24}
                  />
                </span>
                Lawbie Canada
              </Button>
              <Button
                variant="outline"
                onClick={() => handleRegionChange("us")}
                className={`text-base px-3 py-5 rounded-[8px] flex items-center space-x-2 transition-all duration-200 ${
                  currentRegion === "us"
                    ? "bg-white text-blue-600 border-white hover:bg-gray-100"
                    : "bg-transparent text-white  border-white hover:bg-white/10"
                }`}
              >
                <span className="w-[48px] h-[24px] relative">
                  <Image
                    src="/images/flage1.png"
                    alt="US Flag"
                    fill
                    className="object-contain"
                  />
                </span>
                <span>Lawbie US</span>
              </Button>
            </div>
>>>>>>> 707db86 (refactor)
          </div>

<<<<<<< HEAD
          <div className="hidden lg:flex items-center space-x-2">
            <Button
              variant="outline"
              onClick={() => handleRegionChange("canada")}
              className={`text-base px-3 py-5 rounded-[8px] transition-all duration-200 ${
                currentRegion === "canada"
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
              onClick={() => handleRegionChange("us")}
              className={`text-base px-3 py-5 rounded-[8px] flex items-center space-x-2 transition-all duration-200 ${
                currentRegion === "us"
                  ? "bg-white text-blue-600 border-white hover:bg-gray-100"
                  : "bg-transparent text-white border-[2px] border-white hover:bg-white/10"
              }`}
            >
              <span className="w-[48px] h-[24px] relative">
                <Image src="/images/flage1.png" alt="US Flag" fill className="object-contain" />
              </span>
              <span>Lawbie US</span>
            </Button>
=======
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
              <form onSubmit={handleSearch} className="relative">
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-[52px] pl-4 pr-12 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={handleSearchButtonClick}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white rounded-full bg-[#23547B] p-2 hover:bg-[#1a3f5c] transition-colors"
                >
                  <Search className="text-xl text-white" />
                </button>
              </form>
            </div>

            {/* Mobile Search Button */}
            <button
              className="md:hidden text-gray-600 mr-3"
              onClick={handleMobileSearchClick}
            >
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
              {session && user ? (
                <div className="relative group hidden sm:block ">
                  <button className="text-gray-700">
                    <span>
                      <UserRound className="text-2xl" />
                    </span>
                  </button>
                  <div className="absolute right-0 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block min-w-[200px]">
                    <div className="py-2 text-sm text-gray-700">
                      <p className="font-medium text-center">{user?.name}</p>
                      <p className="text-gray-500 text-xs text-center border-b">
                        {user?.email}
                      </p>
                    </div>
                    <Link
                      href="/account/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      My Account
                    </Link>
                    <Link
                      href="/orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
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
                      className={`text-lg font-medium ${
                        pathname === "/"
                          ? "text-blue-600"
                          : "hover:text-blue-600"
                      }`}
                    >
                      Home
                    </Link>
                    <Link
                      href="/products"
                      className={`text-lg font-medium ${
                        pathname === "/products"
                          ? "text-blue-600"
                          : "hover:text-blue-600"
                      }`}
                    >
                      All Resources
                    </Link>
                    <Link
                      href="/blog"
                      className={`text-lg font-medium ${
                        pathname === "/blog"
                          ? "text-blue-600"
                          : "hover:text-blue-600"
                      }`}
                    >
                      Blog
                    </Link>

                    {/* Mobile Practice Areas */}
                    <div className="border-t pt-4 mt-4">
                      <h3 className="text-sm font-semibold text-gray-500 mb-3">
                        Practice Areas
                      </h3>
                      {practiceAreasLoading ? (
                        <div className="space-y-2">
                          {[...Array(3)].map((_, i) => (
                            <div
                              key={i}
                              className="h-8 bg-gray-200 rounded animate-pulse"
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {practiceAreasData?.data?.map((area) => (
                            <button
                              key={area._id}
                              onClick={() =>
                                handlePracticeAreaClick(area._id, area.name)
                              }
                              className="w-full text-left text-base font-medium hover:text-blue-600 py-1"
                            >
                              {area.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <Link
                      href="/wishlist"
                      className={`text-lg font-medium ${
                        pathname === "/wishlist"
                          ? "text-blue-600"
                          : "hover:text-blue-600"
                      }`}
                    >
                      Wishlist
                    </Link>
                    {isMounted && !isAuthenticated && (
                      <Button
                        asChild
                        className="bg-blue-600 hover:bg-blue-700 mt-4"
                      >
                        <Link href="/auth/login">Login</Link>
                      </Button>
                    )}
                    {isMounted && isAuthenticated && (
                      <>
                        <div className="border-t pt-4 mt-4">
                          <p className="font-medium">{user?.name}</p>
                          <p className="text-gray-500 text-sm">{user?.email}</p>
                        </div>
                        <Link
                          href="/account"
                          className="text-lg font-medium hover:text-blue-600"
                        >
                          My Account
                        </Link>
                        <Link
                          href="/orders"
                          className="text-lg font-medium hover:text-blue-600"
                        >
                          My Orders
                        </Link>
                        <Button
                          variant="destructive"
                          onClick={logout}
                          className="mt-4"
                        >
                          Logout
                        </Button>
                      </>
                    )}
                    <div className="block lg:hidden space-y-2">
                      <Button
                        variant="outline"
                        onClick={() => handleRegionChange("canada")}
                        className={`w-full text-sm px-3 py-3 rounded-[8px] flex items-center space-x-2 transition-all duration-200 ${
                          currentRegion === "canada"
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
                        onClick={() => handleRegionChange("us")}
                        className={`w-full text-sm px-3 py-3 rounded-[8px] flex items-center space-x-2 transition-all duration-200 ${
                          currentRegion === "us"
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
>>>>>>> 707db86 (refactor)
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
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
<<<<<<< HEAD
                className="w-full h-[52px] pl-4 pr-12 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
=======
                className="flex-1 text-sm rounded-r-none border border-gray-300 h-10"
                autoFocus
>>>>>>> 707db86 (refactor)
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white rounded-full bg-[#23547B] p-2"
              >
                <Search className="text-xl text-white" />
              </button>
            </form>
          </div>

          {/* Mobile Search Button */}
          <button className="md:hidden text-gray-600 mr-3" onClick={() => setIsSearchOpen(!isSearchOpen)}>
            <Search className="text-2xl" />
          </button>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            <Link href="/wishlist" className="relative p-2 flex">
              <Heart className="text-2xl text-gray-600" />
              {isMounted && wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#23547B] text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <button className="p-2 relative" onClick={() => setOpen(true)}>
              <ShoppingCart className="text-2xl text-gray-600" />
              {isMounted && itemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 bg-[#23547B] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center p-0">
                  {itemCount}
                </Badge>
              )}
            </button>

            {session && user ? (
              <div className="relative group hidden sm:block">
                <button className="text-gray-700">
                  <UserRound className="text-2xl" />
                </button>
                <div className="absolute right-0 mt-1 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block min-w-[200px]">
                  <div className="py-2 text-sm text-gray-700">
                    <p className="font-medium text-center">{user?.name}</p>
                    <p className="text-gray-500 text-xs text-center border-b">{user?.email}</p>
                  </div>
                  <Link href="/account/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
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
<<<<<<< HEAD
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
                    className={`text-lg font-medium ${pathname === "/blog" ? "text-blue-600" : "hover:text-blue-600"}`}
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

                  {!session && (
                    <Button asChild className="bg-blue-600 hover:bg-blue-700 mt-4">
                      <Link href="/sign-in">Login</Link>
                    </Button>
                  )}

                  {session && user && (
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
                      onClick={() => handleRegionChange("canada")}
                      className={`w-full text-sm px-3 py-3 rounded-[8px] flex items-center space-x-2 transition-all duration-200 ${
                        currentRegion === "canada"
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-transparent text-blue-600 border-blue-600 hover:bg-blue-50"
                      }`}
                    >
                      <span className="w-[32px] h-[20px] relative">
                        <Image src="/images/flage.png" alt="Canada Flag" fill className="object-contain" />
                      </span>
                      <span>Lawbie Canada</span>
                    </Button>

                    <Button
                      variant="outline"
                      onClick={() => handleRegionChange("us")}
                      className={`w-full text-sm px-3 py-3 rounded-[8px] flex items-center space-x-2 transition-all duration-200 ${
                        currentRegion === "us"
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-transparent text-blue-600 border-blue-600 hover:bg-blue-50"
                      }`}
                    >
                      <span className="w-[32px] h-[20px] relative">
                        <Image src="/images/flage1.png" alt="US Flag" fill className="object-contain" />
                      </span>
                      <span>Lawbie US</span>
                    </Button>
                  </div>

                  {/* Mobile Promo Display */}
                  <div className="block lg:hidden mt-4 pt-4 border-t">
                    <div className="text-sm font-medium text-center">
                      {specialPromoCodes.length > 0 ? (
                        <div>
                          <p className="text-blue-600 mb-2">Current Special Offers:</p>
                          <div className="space-y-1">
                            {specialPromoCodes.slice(0, 2).map((promo) => (
                              <p key={promo._id} className="text-xs">
                                Save {promo.discountValue}% with code {promo.code}
                              </p>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <p className="text-xs">Special Offers: Save up to 30% Using Promo Code</p>
                      )}
                    </div>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
=======
              <Link
                href="/products"
                className={`font-medium transition-colors ${
                  pathname === "/products"
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                All Resources
              </Link>
              <Link
                href="/blog"
                className={`font-medium transition-colors ${
                  pathname === "/blog"
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                Blog
              </Link>

              {/* Dynamic Practice Areas */}
              {practiceAreasLoading ? (
                <div className="flex space-x-8">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="h-6 w-24 bg-gray-200 rounded animate-pulse"
                    />
                  ))}
                </div>
              ) : (
                <>
                  {visiblePracticeAreas.map((area) => (
                    <button
                      key={area._id}
                      onClick={() =>
                        handlePracticeAreaClick(area._id, area.name)
                      }
                      className="font-medium transition-colors text-gray-700 hover:text-blue-600 truncate max-w-[150px]"
                      title={area.name}
                    >
                      {area.name}
                    </button>
                  ))}
                </>
              )}

              {/* Dropdown for more practice areas */}
              {hasMoreAreas && (
                <PracticeAreasDropdown
                  visibleAreas={visiblePracticeAreas.map((area) => ({
                    _id: area._id,
                    name: area.name,
                  }))}
                />
              )}
            </nav>
>>>>>>> 707db86 (refactor)
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
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

<<<<<<< HEAD
=======
      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        initialQuery={searchQuery}
      />

      {/* Cart Sheet */}
>>>>>>> 707db86 (refactor)
      <CartSheet />
    </header>
  )
}