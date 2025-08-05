"use client"
import type React from "react"
import { useState, useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Search, ShoppingCart, Heart, Menu, UserRound, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/hooks/use-cart"
import { CartSheet } from "@/components/cart-sheet"
import Image from "next/image"
import { useWishlist } from "@/hooks/use-wishlist"
import { useSession, signOut } from "next-auth/react"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { type Region, setRegion } from "@/redux/features/regionSlice"
import { SearchModal } from "@/components/search-modal"
import { usePracticeAreas } from "@/hooks/use-practice-areas"
import { useRouter } from "next/navigation"
import { setSelectedArea } from "@/redux/features/practiceAreaSlice"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef } from "react"
import { SearchDropdown } from "./search-dropdown"

// Define User type for next-auth session
interface User {
  name?: string | null
  email?: string | null
}

type SubPracticeArea = {
  _id: string
  name: string
  category: string
  createdAt: string
  updatedAt: string
  __v: number
}

type PracticeArea = {
  _id: string
  name: string
  description: string
  createdAt: string
  updatedAt: string
  __v: number
  subPracticeAreas: SubPracticeArea[]
}

interface PracticeAreasResponse {
  success: boolean
  message: string
  data: PracticeArea[]
}

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isMounted, setIsMounted] = useState(false)
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { setOpen, getItemCount } = useCart()
  const searchParams = useSearchParams()
  const activePracticeAreaId = searchParams.get("practiceArea")
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200
      if (direction === "left") {
        scrollContainerRef.current.scrollLeft -= scrollAmount
      } else {
        scrollContainerRef.current.scrollLeft += scrollAmount
      }
    }
  }

  const [hoveredAreaId, setHoveredAreaId] = useState<string | null>(null)
  const [expandedMobileAreaId, setExpandedMobileAreaId] = useState<string | null>(null)
  const { items } = useWishlist()
  const dispatch = useAppDispatch()
  const currentRegion = useAppSelector((state) => state.region.currentRegion)
  const { data: practiceAreasData, isLoading: practiceAreasLoading } = usePracticeAreas() as {
    data: PracticeAreasResponse | undefined
    isLoading: boolean
  }
  const [isSheetOpen, setIsSheetOpen] = useState(false)

  const handleRegionChange = (region: Region) => {
    dispatch(setRegion(region))
  }

  const { data: session } = useSession()
  const user = session?.user as User | undefined

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const wishlistCount = isMounted ? items.length : 0

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/products/${encodeURIComponent(searchQuery)}`)
      setDropdownOpen(false)
    }
  }

  const handleMobileSearchClick = () => {
    if (isSearchOpen && searchQuery.trim()) {
      setIsSearchModalOpen(true)
      setIsSearchOpen(false)
    } else {
      setIsSearchOpen(!isSearchOpen)
    }
  }

  const handlePracticeAreaClick = (practiceAreaId: string, practiceAreaName: string) => {
    dispatch(setSelectedArea({ id: practiceAreaId, name: practiceAreaName }))
    router.push(
      `/products?practiceArea=${encodeURIComponent(practiceAreaId)}&name=${encodeURIComponent(practiceAreaName)}`
    )
  }

  const handleSubPracticeAreaClick = (subArea: SubPracticeArea, parentAreaName: string) => {
    dispatch(setSelectedArea({ id: subArea._id, name: subArea.name }))
    router.push(
      `/products?practiceArea=${encodeURIComponent(subArea._id)}&name=${encodeURIComponent(subArea.name)}&parent=${encodeURIComponent(parentAreaName)}`
    )
  }

  const toggleMobileExpansion = (areaId: string) => {
    setExpandedMobileAreaId(expandedMobileAreaId === areaId ? null : areaId)
  }

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white">
        {/* Top Blue Bar */}
        <div className="bg-[#23547B] text-white font-medium leading-[120%] px-2 text-sm py-2">
          <div className="container mx-auto flex items-center justify-between">
            <div className="w-full hidden lg:flex items-center justify-between space-x-2">
              <Button
                variant="outline"
                onClick={() => handleRegionChange("canada")}
                className={`text-base px-3 py-2 rounded-[8px] transition-all duration-200 ${
                  currentRegion === "canada"
                    ? "bg-white text-[#23547B] border-white hover:bg-gray-100"
                    : "bg-transparent text-white border-white hover:bg-white/10"
                }`}
              >
                <span className="w-[48px] h-[24px]">
                  <Image src="/images/flage.png" alt="Canada Flag" width={48} height={24} />
                </span>
                Lawbie CA
              </Button>
              <Button
                variant="outline"
                onClick={() => handleRegionChange("us")}
                className={`text-base px-3 py-2 rounded-[8px] flex items-center space-x-2 transition-all duration-200 ${
                  currentRegion === "us"
                    ? "bg-white text-[#23547B] border-white hover:bg-gray-100"
                    : "bg-transparent text-white border-white hover:bg-white/10"
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
              <div className="text-[#23547B]">
                <Link href="/" className="text-2xl font-bold">
                  <Image
                    src="/images/nav_logo.png"
                    alt="Lawbie Logo"
                    width={186}
                    height={60}
                    className="w-full h-[40px] lg:h-[60px] bg-cover"
                  />
                </Link>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-md mx-8 hidden md:block relative">
              <form onSubmit={handleSearch} className="relative">
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setDropdownOpen(true)}
                  className="w-full h-[52px] pl-4 pr-12 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white rounded-full bg-[#23547B] p-2 hover:bg-[#1a3f5c] transition-colors"
                >
                  <Search className="text-xl text-white" />
                </button>
              </form>
              {dropdownOpen && <SearchDropdown query={searchQuery} onClose={() => setDropdownOpen(false)} />}
            </div>

            {/* Mobile Search Button */}
            <button className="md:hidden text-gray-600 mr-3" onClick={handleMobileSearchClick}>
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
                    {getItemCount() || 0}
                  </Badge>
                )}
              </button>

              {session && user ? (
                <div className="relative group hidden sm:block">
                  <button className="text-[#131313]">
                    <span>
                      <UserRound className="text-2xl" />
                    </span>
                  </button>
                  <div className="absolute right-0 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block min-w-[200px]">
                    <div className="py-2 text-sm text-[#131313]">
                      <p className="font-medium text-center">{user?.name ?? "User"}</p>
                      <p className="text-gray-500 text-xs text-center border-b">{user?.email ?? "No email"}</p>
                    </div>
                    <Link href="/account/profile" className="block px-4 py-2 text-sm text-[#131313] hover:bg-gray-100">
                      My Account
                    </Link>
                    <Link href="/account/orders" className="block px-4 py-2 text-sm text-[#131313] hover:bg-gray-100">
                      My Orders
                    </Link>
                    <button
                      onClick={() => signOut()}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <Link
                    href="/sign-up"
                    className="bg-[#23547B] hover:bg-[#174468] text-white px-3 py-1 rounded-md hidden sm:flex"
                  >
                    Sign Up
                  </Link>
                  <Link
                    href="/sign-in"
                    className="bg-[#23547B] hover:bg-[#174468] text-white px-3 py-1 rounded-md hidden sm:flex"
                  >
                    Login
                  </Link>
                </div>
              )}

              {/* Mobile Menu */}
              <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetTrigger asChild>
                  <button className="md:hidden">
                    <Menu className="text-2xl" />
                  </button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                  <nav className="flex flex-col gap-4 mt-8">
                    <Link
                      href="/"
                      onClick={() => setIsSheetOpen(false)}
                      className={`text-lg font-medium ${pathname === "/" ? "text-[#23547B]" : "hover:text-[#23547B]"}`}
                    >
                      Home
                    </Link>
                    <Link
                      href="/products"
                      onClick={() => setIsSheetOpen(false)}
                      className={`text-lg font-medium ${
                        pathname === "/products" ? "text-[#23547B]" : "hover:text-[#23547B]"
                      }`}
                    >
                      All Resources
                    </Link>
                    <Link
                      href="/blog"
                      onClick={() => setIsSheetOpen(false)}
                      className={`text-lg font-medium ${
                        pathname === "/blog" ? "text-[#23547B]" : "hover:text-[#23547B]"
                      }`}
                    >
                      Blog
                    </Link>

                    {/* Practice Areas - Mobile */}
                    <div className="border-t pt-4 mt-4">
                      <h3 className="text-base font-semibold text-gray-500 mb-3">Practice Areas</h3>
                      <div className="h-[300px] w-full overflow-y-scroll">
                        {practiceAreasLoading ? (
                          <div className="space-y-2">
                            {[...Array(3)].map((_, i) => (
                              <div key={i} className="h-8 bg-gray-200 rounded animate-pulse" />
                            ))}
                          </div>
                        ) : (
                          <div className="space-y-2">
                            {practiceAreasData?.data?.map((area) => (
                              <div key={area._id} className="border-b border-gray-100 pb-2">
                                <div className="flex items-center justify-between">
                                  <button
                                    onClick={() => {
                                      handlePracticeAreaClick(area._id, area.name)
                                      setIsSheetOpen(false)
                                    }}
                                    className="flex-1 text-left text-base font-medium hover:text-[#23547B] py-1"
                                  >
                                    {area.name}
                                  </button>
                                  {area.subPracticeAreas?.length > 0 && (
                                    <button
                                      onClick={() => toggleMobileExpansion(area._id)}
                                      className="p-1 hover:bg-gray-100 rounded"
                                    >
                                      {expandedMobileAreaId === area._id ? (
                                        <ChevronUp className="h-4 w-4" />
                                      ) : (
                                        <ChevronDown className="h-4 w-4" />
                                      )}
                                    </button>
                                  )}
                                </div>
                                {/* Sub Practice Areas - Mobile */}
                                {expandedMobileAreaId === area._id && area.subPracticeAreas?.length > 0 && (
                                  <div className="ml-4 mt-2 space-y-1">
                                    {area.subPracticeAreas.map((subArea) => (
                                      <button
                                        key={subArea._id}
                                        onClick={() => {
                                          handleSubPracticeAreaClick(subArea, area.name)
                                          setIsSheetOpen(false)
                                        }}
                                        className="block w-full text-left text-sm text-gray-600 hover:text-[#23547B] py-1 px-2 hover:bg-gray-50 rounded"
                                      >
                                        {subArea.name}
                                      </button>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Mobile Auth/Profile Section */}
                    {user ? (
                      <div className="border-t pt-4 mt-4">
                        <Link
                          href="/account/profile"
                          onClick={() => setIsSheetOpen(false)}
                          className="flex items-center gap-2 text-base font-medium text-[#131313] hover:text-[#23547B]"
                        >
                          <UserRound className="h-5 w-5" />
                          My Profile
                        </Link>
                        <button
                          onClick={() => {
                            signOut()
                            setIsSheetOpen(false)
                          }}
                          className="mt-3 text-base font-medium text-red-600 hover:text-red-700"
                        >
                          Logout
                        </button>
                      </div>
                    ) : (
                      <div className="w-full flex flex-col">
                        <Link
                          href="/sign-in"
                          onClick={() => setIsSheetOpen(false)}
                          className="bg-[#23547B] hover:bg-blue-700 text-white text-center px-6 py-2 mt-4 rounded-md"
                        >
                          Login
                        </Link>
                        <Link
                          href="/sign-up"
                          onClick={() => setIsSheetOpen(false)}
                          className="bg-[#23547B] hover:bg-blue-700 text-white text-center px-6 py-2 mt-4 rounded-md"
                        >
                          Sign Up
                        </Link>
                      </div>
                    )}

                    {/* Region Switcher Mobile */}
                    <div className="block lg:hidden space-y-2 mt-6 border-t pt-4">
                      <Button
                        variant="outline"
                        onClick={() => {
                          handleRegionChange("canada")
                          setIsSheetOpen(false)
                        }}
                        className={`w-full text-sm px-3 py-3 rounded-[8px] flex items-center space-x-2 transition-all duration-200 ${
                          currentRegion === "canada"
                            ? "bg-[#23547b] text-white border-white hover:bg-[#112a3f]"
                            : "bg-white text-[#23547b] border-[#23547b] hover:bg-gray-100"
                        }`}
                      >
                        <span className="w-[32px] h-[20px] relative">
                          <Image src="/images/flag.png" alt="Canada Flag" fill className="object-contain" />
                        </span>
                        <span className={`${currentRegion === "canada" ? "text-white" : "text-[#23547b]"}`}>
                          Lawbie Canada
                        </span>
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          handleRegionChange("us")
                          setIsSheetOpen(false)
                        }}
                        className={`w-full text-sm px-3 py-3 rounded-[8px] flex items-center space-x-2 transition-all duration-200 ${
                          currentRegion === "us"
                            ? "bg-[#23547b] text-white border-white hover:bg-[#112a3f]"
                            : "bg-white text-[#23547b] border-[#23547b] hover:bg-gray-100"
                        }`}
                      >
                        <span className="w-[32px] h-[20px] relative">
                          <Image src="/images/flag1.png" alt="US Flag" fill className="object-contain" />
                        </span>
                        <span className={`${currentRegion === "us" ? "text-white" : "text-[#23547b]"}`}>Lawbie US</span>
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
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 text-sm rounded-r-none border border-gray-300 h-10"
                autoFocus
              />
              <Button type="submit" size="sm" className="rounded-l-none bg-[#23547b] hover:bg-[#153a58] h-10 px-3">
                <Search className="h-4 w-4 text-white" />
              </Button>
            </form>
          </div>
        )}

        {/* Navigation Menu - Desktop */}
        <div className="bg-white pb-4 px-4 hidden md:block border-b-[1.5px] border-[#23547B]">
          <div className="container mx-auto px-7 relative">
            <nav className="flex items-center text-base space-x-8 justify-center">
              {/* Left Arrow */}
              <button
                onClick={() => handleScroll("left")}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 z-10"
              >
                <ChevronLeft className="h-5 w-5 text-[#23547B]" />
              </button>

              <div
                ref={scrollContainerRef}
                className="flex items-center space-x-8 whitespace-nowrap py-2 px-4 scroll-smooth"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                <div className="flex items-center space-x-8">
                  <Link
                    href="/"
                    className={`font-medium transition-colors ${
                      pathname === "/"
                        ? "bg-[#23547B] text-white font-medium truncate max-w-[150px] transition-colors px-3 py-1 rounded-md"
                        : "text-[#131313] hover:text-[#23547b] hover:bg-[#e6f0fa] font-medium max-w-[150px] transition-colors px-3 py-1 rounded-md"
                    }`}
                  >
                    Home
                  </Link>
                  <Link
                    href="/products"
                    className={`font-medium transition-colors ${
                      pathname === "/products"
                        ? "bg-[#23547B] text-white font-medium truncate max-w-[150px] transition-colors px-3 py-1 rounded-md"
                        : "text-[#131313] hover:text-[#23547b] hover:bg-[#e6f0fa] font-medium truncate max-w-[150px] transition-colors px-3 py-1 rounded-md"
                    }`}
                  >
                    All Resources
                  </Link>
                  <Link
                    href="/blog"
                    className={`font-medium transition-colors ${
                      pathname === "/blog"
                        ? "bg-[#23547B] text-white font-medium truncate max-w-[150px] transition-colors px-3 py-1 rounded-md"
                        : "text-[#131313] hover:text-[#23547b] hover:bg-[#e6f0fa] font-medium truncate max-w-[150px] transition-colors px-3 py-1 rounded-md"
                    }`}
                  >
                    Blog
                  </Link>
                </div>

                {/* Dynamic Practice Areas - Desktop */}
                <div className="flex items-center space-x-8">
                  {practiceAreasLoading ? (
                    <div className="flex space-x-8">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
                      ))}
                    </div>
                  ) : (
                    <>
                      {practiceAreasData?.data?.map((area) => {
                        const isActive = activePracticeAreaId === area._id
                        const isHovered = hoveredAreaId === area._id
                        return (
                          <div
                            key={area._id}
                            className="relative inline-block"
                            onMouseEnter={() => setHoveredAreaId(area._id)}
                            onMouseLeave={() => setHoveredAreaId(null)}
                          >
                            <button
                              onClick={() => handlePracticeAreaClick(area._id, area.name)}
                              className={`font-medium truncate max-w-[150px] transition-colors px-3 py-1 rounded-md ${
                                isActive
                                  ? "bg-[#8eb5d4] text-white"
                                  : "text-[#131313] hover:text-[#23547B] hover:bg-[#e6f0fa]"
                              }`}
                              title={area.name}
                            >
                              {area.name}
                            </button>
                            {/* Hover Dropdown - Desktop Only */}
                            {isHovered && (
                              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[280px] max-w-[320px]">
                                {/* Arrow */}
                                <div className="absolute -top-1.5 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white border-l border-t border-gray-200 rotate-45"></div>
                                <div className="px-4 py-3">
                                  <p className="text-gray-900 font-semibold text-base mb-3">{area.name}</p>
                                  {/* Sub Practice Areas - Desktop Hover */}
                                  {area?.subPracticeAreas?.length > 0 && (
                                    <div className="mb-3">
                                      {/* <p className="text-gray-700 font-medium text-xs mb-2">Sub-categories:</p> */}
                                      <div className="space-y-1 max-h-32 overflow-y-auto">
                                        {area.subPracticeAreas.slice(0, 6).map((subArea: SubPracticeArea) => (
                                          <button
                                            key={subArea._id}
                                            className="block w-full text-left text-gray-600 text-[13px] px-2 py-1 rounded cursor-pointer hover:bg-gray-100 hover:text-[#23547B] transition-colors"
                                            onClick={() => handleSubPracticeAreaClick(subArea, area.name)}
                                          >
                                            {subArea.name}
                                          </button>
                                        ))}
                                        {area.subPracticeAreas.length > 6 && (
                                          <p className="text-gray-500 text-xs italic px-2">
                                            +{area.subPracticeAreas.length - 6} more...
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                  )}
                                  {/* <div className="text-xs text-[#23547B] font-medium">
                                    Click to view all resources →
                                  </div> */}
                                </div>
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </>
                  )}
                </div>
              </div>

              {/* Right Arrow */}
              <button
                onClick={() => handleScroll("right")}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 z-10"
              >
                <ChevronRight className="h-5 w-5 text-[#23547B]" />
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchModalOpen} onClose={() => setIsSearchModalOpen(false)} initialQuery={searchQuery} />

      {/* Cart Sheet */}
      <CartSheet />
    </>
  )
}
