use client";

import type React from "react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
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
    dispatch(setRegion(region));
  };

  const session = useSession();
  const user = session?.data?.user;

  // Prevent hydration mismatch by only showing dynamic content after mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const itemCount = isMounted ? getItemCount() : 0;
  const wishlistCount = isMounted ? items.length : 0;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchModalOpen(true);
      setIsSearchOpen(false);
    }
  };

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
              <Button
                type="submit"
                size="sm"
                className="rounded-l-none bg-[#23547b] hover:bg-[#153a58] h-10 px-3"
              >
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
                  pathname === "/"
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                Home
              </Link>
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
          </div>
        </div>
      </header>

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
        initialQuery={searchQuery}
      />

      {/* Cart Sheet */}
      <CartSheet />
    </>
  );
}