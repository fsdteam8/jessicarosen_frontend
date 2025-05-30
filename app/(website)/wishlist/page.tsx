// "use client"

// import Link from "next/link"
// import Image from "next/image"
// import { ChevronRight, Heart, ShoppingCart, Trash2 } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import { useWishlist } from "@/hooks/use-wishlist"
// import { useCart } from "@/hooks/use-cart"

// export default function WishlistPage() {
//   const { items, removeItem, clearWishlist } = useWishlist()
//   const { addItem } = useCart()

//   const handleAddToCart = (id: string) => {
//     const item = items.find((item) => item.id === id)
//     if (item) {
//       addItem({
//         id: item.id,
//         title: item.title,
//         image: item.image,
//         price: item.price,
//         discountPrice: item.discountPrice,
//         quantity: 1,
//       })
//     }
//   }

//   console.log("Wishlist items:", items)

//   return (
//     <div className="min-h-screen flex flex-col">

//       <main className="flex-1">
//         {/* Hero Section */}
//         {/* <div className="relative h-[300px] flex items-center">
//           <div className="absolute inset-0 z-0">
//             <Image
//               src="/placeholder.svg?height=300&width=1200"
//               alt="Resource details background"
//               fill
//               className="object-cover brightness-50"
//               priority
//             />
//           </div>
//           <div className="container mx-auto px-4 z-10 text-white">
//             <div className="flex items-center text-sm mb-4">
//               <Link href="/" className="hover:text-[#f0a500]">
//                 Welcome & Shop With Us
//               </Link>
//               <ChevronRight className="h-3 w-3 mx-2" />
//               <span>Resource Details</span>
//             </div>
//             <h1 className="text-4xl font-bold mb-2">Recently added to your list of favourites.</h1>
//             <p className="text-sm opacity-90 max-w-2xl">
//               Widely used materials that help students, legal professionals, and researchers understand and apply legal
//               principles.
//             </p>
//           </div>
//         </div> */}

//         <div className="bg-[#e8f3e8] py-12">
//           <div className="container mx-auto px-4">
//             {items.length === 0 ? (
//               <div className="text-center py-12 bg-white rounded-lg shadow-sm">
//                 <div className="mb-4">
//                   <Heart className="h-16 w-16 mx-auto text-gray-400" />
//                 </div>
//                 <h3 className="text-xl font-medium mb-2">Your wishlist is empty</h3>
//                 <p className="text-gray-500 mb-6">Add items to your wishlist to save them for later</p>
//                 <Button asChild className="bg-[#2c5d7c] hover:bg-[#1e4258]">
//                   <Link href="/products">Browse Products</Link>
//                 </Button>
//               </div>
//             ) : (
//               <>
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {items.map((item) => (
//                     <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden relative group">
//                       <button
//                         onClick={() => removeItem(item.id)}
//                         className="absolute top-2 right-2 z-10 h-8 w-8 rounded-full bg-white/80 flex items-center justify-center text-red-500 hover:bg-white"
//                       >
//                         <Trash2 className="h-4 w-4" />
//                       </button>

//                       <div className="relative h-48">
//                         <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
//                       </div>

//                       <div className="p-4">
//                         <h3 className="font-medium text-lg mb-2">{item.title}</h3>

//                         <div className="flex justify-between items-center mb-3">
//                           <div className="font-bold">
//                             Price: ${item.discountPrice || item.price}
//                             {item.discountPrice && (
//                               <span className="text-red-500 ml-1 text-sm font-normal line-through">${item.price}</span>
//                             )}
//                           </div>
//                           <div className="flex items-center">
//                             <span className="text-yellow-500 mr-1">★</span>
//                             <span className="mr-1">{item.rating.toFixed(1)}</span>
//                             <span className="text-gray-500 text-sm">({item.reviews?.toLocaleString()} Reviews)</span>
//                           </div>
//                         </div>

//                         <div className="flex gap-2">
//                           <Button
//                             className="flex-1 bg-[#2c5d7c] hover:bg-[#1e4258]"
//                             onClick={() => handleAddToCart(item.id)}
//                           >
//                             <ShoppingCart className="mr-2 h-4 w-4" />
//                             Add to Cart
//                           </Button>
//                           <Button asChild variant="outline" className="flex-1 border-[#2c5d7c] text-[#2c5d7c]">
//                             <Link href={`/products/${item.id}`}>View Details</Link>
//                           </Button>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 {items.length > 0 && (
//                   <div className="mt-8 flex justify-center">
//                     <Button
//                       variant="outline"
//                       className="text-red-500 border-red-500 hover:bg-red-50 hover:text-red-600"
//                       onClick={() => clearWishlist()}
//                     >
//                       <Trash2 className="mr-2 h-4 w-4" />
//                       Clear Wishlist
//                     </Button>
//                   </div>
//                 )}
//               </>
//             )}
//           </div>
//         </div>
//       </main>

//     </div>
//   )
// }

"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Heart, Trash2, ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useWishlist } from "@/hooks/use-wishlist";
import { useCart } from "@/hooks/use-cart";

export default function WishlistPage() {
  const { items, removeItem, clearWishlist } = useWishlist();
  const { addItem } = useCart();

  const handleAddToCart = (id: string) => {
    const item = items.find((item) => item.id === id);
    if (item) {
      addItem({
        id: item.id,
        title: item.title,
        image: item.image,
        price: item.price,
        discountPrice: item.discountPrice,
        quantity: 1,
      });
    }
  };

  console.log("Wishlist items:", items);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Wish List Details
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Here are specific information about recommended suppliers, cost,
              or programmes. These resources cannot handle financial, medical,
              or international
            </p>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-12">
              <div className="mb-4">
                <Heart className="h-16 w-16 mx-auto text-gray-400" />
              </div>
              <h3 className="text-xl font-medium mb-2">
                Your wishlist is empty
              </h3>
              <p className="text-gray-500 mb-6">
                Add items to your wishlist to save them for later
              </p>
              <Button asChild className="bg-[#2c5d7c] hover:bg-[#1e4258]">
                <Link href="/products">Browse Products</Link>
              </Button>
            </div>
          ) : (
            <>
              {/* Wishlist Items - Vertical List Layout */}
              <div className="space-y-6">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-6 p-6 relative group hover:shadow-md transition-shadow"
                  >
                    <button
                      onClick={() => removeItem(item.id)}
                      className="absolute top-4 left-4 z-10 h-8 w-8 rounded-full bg-gray-100 hover:bg-red-100 flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </button>

                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <div className="w-32 h-32 relative rounded-lg overflow-hidden bg-gray-100">
                        <Image
                          src={
                            item.image ||
                            "/placeholder.svg?height=128&width=128"
                          }
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1 pr-4">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {item.title}
                          </h3>

                          {/* Author Info */}
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-6 h-6 rounded-full bg-gray-300 overflow-hidden">
                              <Image
                                src="/placeholder.svg?height=24&width=24"
                                alt="Author"
                                width={24}
                                height={24}
                                className="object-cover"
                              />
                            </div>
                            <span className="text-sm text-gray-600">
                              Cameron Williamson
                            </span>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <div className="text-red-500 font-bold text-lg">
                            ${item.discountPrice || item.price}
                          </div>
                          {item.discountPrice && (
                            <div className="text-gray-400 line-through text-sm">
                              ${item.price}
                            </div>
                          )}
                          <div className="text-xs text-gray-500 mt-1">
                            Price: Sale
                          </div>
                        </div>
                      </div>

                      {/* Rating and Reviews */}
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-1">
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className="text-sm">
                                {i < Math.floor(item.rating) ? "★" : "☆"}
                              </span>
                            ))}
                          </div>
                          <span className="text-sm font-medium text-gray-700">
                            {item?.rating?.toFixed(1)} (
                            {item.reviews?.toLocaleString() || "1,991"})
                          </span>
                        </div>
                      </div>

                      {/* Action Button and Category */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center justify-between gap-5">
                          <Button
                            className="bg-[#23547B] hover:bg-[#143753] text-white px-6"
                            onClick={() => handleAddToCart(item.id)}
                          >
                            Add To Cart
                          </Button>
                          <Button className="bg-[#23547B] hover:bg-[#143753] text-white px-6">
                            <Link
                              href={`/products/${item.id}`}
                              className="hover:text-blue-600"
                            >
                              View Details
                            </Link>
                          </Button>
                        </div>

                        <div className="text-xs text-gray-500">
                          English Language, Practical law
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-center gap-4 mt-12">
                <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50">
                  <ChevronLeft className="h-4 w-4" />
                </button>

                <div className="flex gap-2">
                  <button className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-medium">
                    01
                  </button>
                  <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-sm font-medium hover:bg-gray-50">
                    02
                  </button>
                  <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-sm font-medium hover:bg-gray-50">
                    03
                  </button>
                </div>

                <button className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              {/* Clear Wishlist Button */}
              {items.length > 0 && (
                <div className="mt-8 flex justify-center">
                  <Button
                    variant="outline"
                    className="text-red-500 border-red-500 hover:bg-red-50 hover:text-red-600"
                    onClick={() => clearWishlist()}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Clear Wishlist
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
