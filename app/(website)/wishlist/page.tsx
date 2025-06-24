// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { ChevronRight, Heart, Trash2, ChevronLeft } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import { useWishlist } from "@/hooks/use-wishlist";
// import { useCart } from "@/hooks/use-cart";

// export default function WishlistPage() {
//   const { items, removeItem, clearWishlist } = useWishlist();
//   const { addItem } = useCart();

//   const handleAddToCart = (id: string) => {
//     const item = items.find((item) => item.id === id);
//     if (item) {
//       addItem({
//         id: item.id,
//         title: item.title,
//         image: item.image,
//         price: item.price,
//         discountPrice: item.discountPrice,
//         quantity: 1,
//       });
//     }
//   };

//   console.log("Wishlist items:", items);

//   return (
//     <div className="min-h-screen flex flex-col bg-white">
//       <main className="flex-1">
//         <div className="container mx-auto px-4 py-12">
//           {/* Header */}
//           <div className="text-center mb-12">
//             <h1 className="text-3xl font-bold text-gray-900 mb-4">
//               Wish List Details
//             </h1>
//             <p className="text-gray-600 max-w-2xl mx-auto">
//               Here are specific information about recommended suppliers, cost,
//               or programmes. These resources cannot handle financial, medical,
//               or international
//             </p>
//           </div>

//           {items.length === 0 ? (
//             <div className="text-center py-12">
//               <div className="mb-4">
//                 <Heart className="h-16 w-16 mx-auto text-gray-400" />
//               </div>
//               <h3 className="text-xl font-medium mb-2">
//                 Your wishlist is empty
//               </h3>
//               <p className="text-gray-500 mb-6">
//                 Add items to your wishlist to save them for later
//               </p>
//               <Button asChild className="bg-[#2c5d7c] hover:bg-[#1e4258]">
//                 <Link href="/products">Browse Products</Link>
//               </Button>
//             </div>
//           ) : (
//             <>
//               {/* Wishlist Items - Vertical List Layout */}
//               <div className="space-y-6">
//                 {items.map((item) => (
//                   <div
//                     key={item.id}
//                     className="flex gap-6 p-6 relative group hover:shadow-md transition-shadow"
//                   >
//                     <button
//                       onClick={() => removeItem(item.id)}
//                       className="absolute top-4 left-4 z-10 h-8 w-8 rounded-full bg-gray-100 hover:bg-red-100 flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors"
//                     >
//                       <Trash2 className="h-4 w-4 text-red-600" />
//                     </button>

//                     {/* Product Image */}
//                     <div className="flex-shrink-0">
//                       <div className="w-32 h-32 relative rounded-lg overflow-hidden bg-gray-100">
//                         <Image
//                           src={
//                             item.image ||
//                             "/placeholder.svg?height=128&width=128"
//                           }
//                           alt={item.title}
//                           fill
//                           className="object-cover"
//                         />
//                       </div>
//                     </div>

//                     {/* Product Details */}
//                     <div className="flex-1 min-w-0">
//                       <div className="flex justify-between items-start mb-3">
//                         <div className="flex-1 pr-4">
//                           <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                             {item.title}
//                           </h3>

//                           {/* Author Info */}
//                           <div className="flex items-center gap-2 mb-3">
//                             <div className="w-6 h-6 rounded-full bg-gray-300 overflow-hidden">
//                               <Image
//                                 src="/placeholder.svg?height=24&width=24"
//                                 alt="Author"
//                                 width={24}
//                                 height={24}
//                                 className="object-cover"
//                               />
//                             </div>
//                             <span className="text-sm text-gray-600">
//                               Cameron Williamson
//                             </span>
//                           </div>
//                         </div>

//                         {/* Price */}
//                         <div className="text-right">
//                           <div className="text-red-500 font-bold text-lg">
//                             ${item.discountPrice || item.price}
//                           </div>
//                           {item.discountPrice && (
//                             <div className="text-gray-400 line-through text-sm">
//                               ${item.price}
//                             </div>
//                           )}
//                           <div className="text-xs text-gray-500 mt-1">
//                             Price: Sale
//                           </div>
//                         </div>
//                       </div>

//                       {/* Rating and Reviews */}
//                       <div className="flex items-center gap-4 mb-4">
//                         <div className="flex items-center gap-1">
//                           <div className="flex text-yellow-400">
//                             {[...Array(5)].map((_, i) => (
//                               <span key={i} className="text-sm">
//                                 {i < Math.floor(item.rating) ? "★" : "☆"}
//                               </span>
//                             ))}
//                           </div>
//                           <span className="text-sm font-medium text-gray-700">
//                             {item?.rating?.toFixed(1)} (
//                             {item.reviews?.toLocaleString() || "1,991"})
//                           </span>
//                         </div>
//                       </div>

//                       {/* Action Button and Category */}
//                       <div className="flex items-center justify-between mt-4">
//                         <div className="flex items-center justify-between gap-5">
//                           <Button
//                             className="bg-[#23547B] hover:bg-[#143753] text-white px-6"
//                             onClick={() => handleAddToCart(item.id)}
//                           >
//                             Add To Cart
//                           </Button>
//                           <Button className="bg-[#23547B] hover:bg-[#143753] text-white px-6">
//                             <Link
//                               href={`/products/${item.id}`}
//                               className="hover:text-blue-600"
//                             >
//                               View Details
//                             </Link>
//                           </Button>
//                         </div>

//                         <div className="text-xs text-gray-500">
//                           English Language, Practical law
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Pagination */}
//               <div className="flex items-center justify-center gap-4 mt-12">
//                 <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50">
//                   <ChevronLeft className="h-4 w-4" />
//                 </button>

//                 <div className="flex gap-2">
//                   <button className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-medium">
//                     01
//                   </button>
//                   <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-sm font-medium hover:bg-gray-50">
//                     02
//                   </button>
//                   <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-sm font-medium hover:bg-gray-50">
//                     03
//                   </button>
//                 </div>

//                 <button className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700">
//                   <ChevronRight className="h-4 w-4" />
//                 </button>
//               </div>

//               {/* Clear Wishlist Button */}
//               {items.length > 0 && (
//                 <div className="mt-8 flex justify-center">
//                   <Button
//                     variant="outline"
//                     className="text-red-500 border-red-500 hover:bg-red-50 hover:text-red-600"
//                     onClick={() => clearWishlist()}
//                   >
//                     <Trash2 className="mr-2 h-4 w-4" />
//                     Clear Wishlist
//                   </Button>
//                 </div>
//               )}
//             </>
//           )}
//         </div>
//       </main>
//     </div>
//   );
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
  console.log("items", items);

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
        thumbnail: ""
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 sm:py-10 lg:py-12">
          <div className="text-center mb-10 sm:mb-12">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Wish List Details
            </h1>
            <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
              Here are specific information about recommended suppliers, cost,
              or programmes. These resources cannot handle financial, medical,
              or international
            </p>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-medium mb-2">
                Your wishlist is empty
              </h3>
              <p className="text-gray-500 mb-6 text-sm sm:text-base">
                Add items to your wishlist to save them for later
              </p>
              <Button asChild className="bg-[#2c5d7c] hover:bg-[#1e4258]">
                <Link href="/products">Browse Products</Link>
              </Button>
            </div>
          ) : (
            <>
              <div className="space-y-6">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-6 relative group hover:shadow-md transition-shadow border rounded-lg"
                  >
                    <button
                      onClick={() => removeItem(item.id)}
                      className="absolute top-4 left-4 z-10 h-8 w-8 rounded-full bg-gray-100 hover:bg-red-100 flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </button>

                    {/* Product Image */}
                    <div className="w-full sm:w-32 h-32 relative rounded-lg overflow-hidden bg-gray-100 mx-auto sm:mx-0">
                      <Image
                        src={item.image || "/images/no-image.jpg"}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3">
                        <div className="flex-1 min-w-0 pr-0 sm:pr-4">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
                            {item.title}
                          </h3>

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
                            <span className="text-sm text-gray-600 truncate">
                              Cameron Williamson
                            </span>
                          </div>
                        </div>

                        <div className="text-right mt-2 sm:mt-0">
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

                      <div className="flex items-center gap-3 mb-4 flex-wrap">
                        <div className="flex text-yellow-400 text-sm">
                          {[...Array(5)].map((_, i) => (
                            <span key={i}>
                              {i < Math.floor(item.rating) ? "★" : "☆"}
                            </span>
                          ))}
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          {item?.rating?.toFixed(1)} (
                          {item.reviews?.toLocaleString() || "1,991"})
                        </span>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4">
                        <div className="flex flex-col sm:flex-row gap-3">
                          <Button
                            className="bg-[#23547B] hover:bg-[#143753] text-white"
                            onClick={() => handleAddToCart(item.id)}
                          >
                            Add To Cart
                          </Button>
                          <Button className="bg-[#23547B] hover:bg-[#143753] text-white">
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
              <div className="flex items-center justify-center gap-4 mt-12 flex-wrap">
                <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <div className="flex gap-2">
                  {[1, 2, 3].map((num) => (
                    <button
                      key={num}
                      className={`w-10 h-10 rounded-full ${
                        num === 1
                          ? "bg-blue-600 text-white"
                          : "border border-gray-300 hover:bg-gray-50"
                      } flex items-center justify-center text-sm font-medium`}
                    >
                      0{num}
                    </button>
                  ))}
                </div>
                <button className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              {/* Clear Wishlist */}
              <div className="mt-10 flex justify-center">
                <Button
                  variant="outline"
                  className="text-red-500 border-red-500 hover:bg-red-50 hover:text-red-600"
                  onClick={() => clearWishlist()}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear Wishlist
                </Button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
