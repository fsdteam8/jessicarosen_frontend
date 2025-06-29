"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ShoppingCart,
  ArrowLeft,
  Minus,
  Plus,
  CircleX,
  LogIn,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  useUpdateCartItem,
  useRemoveFromCart,
  useCartTotals,
  // useClearCart,
} from "@/hooks/use-cart-api";
import { formatPrice } from "@/lib/utils";
import { useSession } from "next-auth/react";

export default function CartPageAPI() {
  const { status } = useSession();
  const updateCartMutation = useUpdateCartItem();
  const removeCartMutation = useRemoveFromCart();
  // const clearCartMutation = useClearCart();
  const { subtotal, itemCount, shippingCost, total, items } = useCartTotals();

  const handleQuantityChange = async (
    itemId: string,
    targetQuantity: number
  ) => {
    if (targetQuantity < 1) return;
    const currentItem = items.find((item) => item.resource._id === itemId);
    if (!currentItem || currentItem.quantity === targetQuantity) return;

    await updateCartMutation.mutateAsync({ itemId, quantity: targetQuantity });
  };

  const handleRemoveItem = async (itemId: string) => {
    await removeCartMutation.mutateAsync(itemId);
  };

  // const handleClearCart = async () => {
  //   if (window.confirm("Are you sure you want to clear your cart?")) {
  //     await clearCartMutation.mutateAsync();
  //   }
  // };

  if (status === "unauthenticated") {
    return (
      <div className="flex flex-col">
        <main className="flex-1">
          <div className="container mx-auto px-4 py-12">
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <LogIn className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-medium mb-2">Please Login</h3>
              <p className="text-gray-500 mb-6">
                You need to be logged in to view your cart
              </p>
              <Button asChild className="bg-[#2c5d7c] hover:bg-[#1e4258]">
                <Link href="/sign-in">
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </Link>
              </Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          {!items || items.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <ShoppingCart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-medium mb-2">Your cart is empty</h3>
              <p className="text-gray-500 mb-6">
                Add items to your cart to proceed to checkout
              </p>
              <Button asChild className="bg-[#2c5d7c] hover:bg-[#1e4258]">
                <Link href="/products">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Browse Products
                </Link>
              </Button>
            </div>
            
          ) : (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">
                  Shopping Cart ({itemCount} items)
                </h1>
                {/* <Button
                  variant="outline"
                  onClick={handleClearCart}
                  className="text-red-600 border-red-600 hover:bg-red-50"
                >
                  Clear Cart
                </Button> */}
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="text-left border-b-2 border-b-gray-500">
                    <tr>
                      <th className="py-4 px-6 text-xl font-semibold">Products</th>
                      <th className="py-4 px-6 text-xl font-semibold">Quantity</th>
                      <th className="py-4 px-6 text-xl font-semibold">Price</th>
                      <th className="py-4 px-6 text-xl font-semibold">Total</th>
                      <th className="py-4 px-6 text-xl font-semibold">Remove</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {items
                      .filter((item) => {
                        const itemPrice = item.resource.discountPrice || item.resource.price;
                        return itemPrice && itemPrice > 0 && !isNaN(itemPrice);
                      })
                      .map((item) => {
                        const itemPrice = item.resource.discountPrice || item.resource.price;
                        const itemTotal = itemPrice * item.quantity;

                        return (
                        <tr key={item._id}>
                          <td className="py-4 px-6">
                            <div className="flex items-center">
                              <div className="relative h-16 w-16 rounded overflow-hidden flex-shrink-0 mr-4">
                                <Image
                                  src={
                                    item.resource.thumbnail && item.resource.thumbnail !== ""
                                      ? item.resource.thumbnail
                                      : "/images/not-imge.png"
                                  }
                                  alt={item.resource.title || "Product Image"}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <h4 className="font-medium">{item.resource.title}</h4>
                                <div className="text-sm text-gray-500">
                                  Format: {item.resource.format}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center">
                              <button
                                className="h-8 w-8 border rounded-l-md flex items-center justify-center hover:bg-gray-50"
                                onClick={() =>
                                  handleQuantityChange(item.resource._id, Math.max(1, item.quantity - 1))
                                }
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <div className="h-8 w-16 text-center border-y flex items-center justify-center">
                                {item.quantity}
                              </div>
                              <button
                                className="h-8 w-8 border rounded-r-md flex items-center justify-center hover:bg-gray-50"
                                onClick={() =>
                                  handleQuantityChange(item.resource._id, item.quantity + 1)
                                }
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                          </td>
                          <td className="py-4 px-6 font-medium">
                            ${formatPrice(itemPrice)}
                            {item.resource.discountPrice && (
                              <span className="line-through text-gray-500 ml-2 text-sm">
                                ${formatPrice(item.resource.price)}
                              </span>
                            )}
                          </td>
                          <td className="py-4 px-6 font-medium">
                            ${formatPrice(itemTotal)}
                          </td>
                          <td className="py-4 px-6">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRemoveItem(item.resource._id)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <CircleX className="h-5 w-5" />
                            </Button>
                          </td>
                        </tr>
                                              );
                      })}
                  </tbody>
                </table>
              </div>

              <div className="mt-8 flex flex-col md:flex-row gap-8">
                <div className="md:w-2/3">
                  <Button
                    asChild
                    variant="outline"
                    className="mr-4 bg-[#23547B] text-white font-bold w-[220px] h-[48px] hover:bg-[#1e4258]"
                  >
                    <Link href="/products">Continue Shopping</Link>
                  </Button>
                </div>

                <div className="md:w-1/3 p-6 rounded-lg">
                  <h3 className="text-[24px] font-semibold mb-4">Cart Summary</h3>
                  <div className="space-y-2 mb-8">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal ({itemCount} items):</span>
                      <span>${formatPrice(subtotal)}</span>
                    </div>
                    {shippingCost > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Shipping:</span>
                        <span>${formatPrice(shippingCost)}</span>
                      </div>
                    )}
                    <div className="pt-2 border-t flex justify-between font-bold">
                      <span>Total:</span>
                      <span>${formatPrice(total)}</span>
                    </div>
                  </div>
                  <Button
                    asChild
                    className="bg-[#2c5d7c] text-white font-bold w-[220px] h-[40px] hover:bg-[#1e4258]"
                  >
                    <Link href="/checkout">Checkout</Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}





// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import {
//   ShoppingCart,
//   ArrowLeft,
//   Minus,
//   Plus,
//   CircleX,
//   LogIn,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   useUpdateCartItem,
//   useRemoveFromCart,
//   useCartTotals,
//   useClearCart,
// } from "@/hooks/use-cart-api";
// import { formatPrice } from "@/lib/utils";
// import { useSession } from "next-auth/react";
// import { memo, useCallback, useMemo, useState, useRef } from "react";

// // Optimized Cart Item Component with local state management
// const CartItem = memo(({ item, onQuantityChange, onRemoveItem }) => {
//   const [localQuantity, setLocalQuantity] = useState(item.quantity);
//   const [isUpdating, setIsUpdating] = useState(false);
//   const updateTimeoutRef = useRef(null);
  
//   const itemPrice = useMemo(() => 
//     item.resource.discountPrice || item.resource.price || 0, 
//     [item.resource.discountPrice, item.resource.price]
//   );
  
//   // Use local quantity for immediate UI updates
//   const itemTotal = useMemo(() => 
//     itemPrice * localQuantity, 
//     [itemPrice, localQuantity]
//   );

//   const hasDiscount = useMemo(() => 
//     item.resource.discountPrice && item.resource.discountPrice < item.resource.price,
//     [item.resource.discountPrice, item.resource.price]
//   );

//   // Debounced update function to prevent excessive API calls
//   const debouncedUpdate = useCallback((newQuantity) => {
//     if (updateTimeoutRef.current) {
//       clearTimeout(updateTimeoutRef.current);
//     }
    
//     updateTimeoutRef.current = setTimeout(async () => {
//       if (newQuantity !== item.quantity) {
//         setIsUpdating(true);
//         try {
//           await onQuantityChange(item.resource._id, newQuantity);
//         } catch (error) {
//           // Revert local state on error
//           setLocalQuantity(item.quantity);
//           console.error('Error updating quantity:', error);
//         } finally {
//           setIsUpdating(false);
//         }
//       }
//     }, 500); // 500ms debounce
//   }, [item.resource._id, item.quantity, onQuantityChange]);

//   const handleDecrease = useCallback(async () => {
//     if (localQuantity <= 1 || isUpdating) return;
    
//     const newQuantity = localQuantity - 1;
//     setLocalQuantity(newQuantity);
//     debouncedUpdate(newQuantity);
//   }, [localQuantity, isUpdating, debouncedUpdate]);

//   const handleIncrease = useCallback(async () => {
//     if (isUpdating) return;
    
//     const newQuantity = localQuantity + 1;
//     setLocalQuantity(newQuantity);
//     debouncedUpdate(newQuantity);
//   }, [localQuantity, isUpdating, debouncedUpdate]);

//   const handleRemove = useCallback(async () => {
//     if (isUpdating) return;
    
//     setIsUpdating(true);
//     try {
//       await onRemoveItem(item.resource._id);
//     } catch (error) {
//       console.error('Error removing item:', error);
//       setIsUpdating(false);
//     }
//   }, [item.resource._id, onRemoveItem, isUpdating]);

//   const imageSrc = useMemo(() => {
//     return item.resource.thumbnail && item.resource.thumbnail.trim() !== ""
//       ? item.resource.thumbnail
//       : "/images/not-imge.png";
//   }, [item.resource.thumbnail]);

//   // Sync local quantity with prop changes (in case of external updates)
//   useMemo(() => {
//     if (item.quantity !== localQuantity && !isUpdating) {
//       setLocalQuantity(item.quantity);
//     }
//   }, [item.quantity, localQuantity, isUpdating]);

//   return (
//     <tr className={`transition-opacity duration-200 ${isUpdating ? 'opacity-50' : 'opacity-100'}`}>
//       <td className="py-4 px-6">
//         <div className="flex items-center gap-4">
//           <div className="relative h-16 w-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
//             <Image
//               src={imageSrc}
//               alt={item.resource.title || "Product Image"}
//               fill
//               className="object-cover transition-transform duration-200 hover:scale-105"
//               sizes="64px"
//               priority={false}
//             />
//           </div>
//           <div className="min-w-0 flex-1">
//             <h4 className="font-medium text-gray-900 truncate" title={item.resource.title}>
//               {item.resource.title}
//             </h4>
//             <p className="text-sm text-gray-500 mt-1">
//               Format: {item.resource.format}
//             </p>
//           </div>
//         </div>
//       </td>
      
//       <td className="py-4 px-6">
//         <div className="flex items-center justify-center">
//           <button
//             className="h-8 w-8 border border-gray-300 rounded-l-md flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
//             onClick={handleDecrease}
//             disabled={localQuantity <= 1 || isUpdating}
//             aria-label="Decrease quantity"
//           >
//             <Minus className="h-3 w-3" />
//           </button>
          
//           <div className="h-8 w-16 text-center border-t border-b border-gray-300 flex items-center justify-center bg-white font-medium">
//             {localQuantity}
//             {isUpdating && (
//               <span className="ml-1 text-xs text-gray-400">...</span>
//             )}
//           </div>
          
//           <button
//             className="h-8 w-8 border border-gray-300 rounded-r-md flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150"
//             onClick={handleIncrease}
//             disabled={isUpdating}
//             aria-label="Increase quantity"
//           >
//             <Plus className="h-3 w-3" />
//           </button>
//         </div>
//       </td>
      
//       <td className="py-4 px-6">
//         <div className="font-medium text-gray-900">
//           ${formatPrice(itemPrice)}
//           {hasDiscount && (
//             <span className="line-through text-gray-500 ml-2 text-sm">
//               ${formatPrice(item.resource.price)}
//             </span>
//           )}
//         </div>
//       </td>
      
//       <td className="py-4 px-6">
//         <div className="font-semibold text-gray-900">
//           ${formatPrice(itemTotal)}
//         </div>
//       </td>
      
//       <td className="py-4 px-6">
//         <Button
//           variant="ghost"
//           size="icon"
//           onClick={handleRemove}
//           disabled={isUpdating}
//           className="text-red-500 hover:text-red-700 hover:bg-red-50 disabled:opacity-50 transition-colors duration-150"
//           aria-label="Remove item"
//         >
//           <CircleX className="h-5 w-5" />
//         </Button>
//       </td>
//     </tr>
//   );
// }, (prevProps, nextProps) => {
//   // Custom comparison to prevent unnecessary re-renders
//   return (
//     prevProps.item.resource._id === nextProps.item.resource._id &&
//     prevProps.item.quantity === nextProps.item.quantity &&
//     prevProps.item.resource.price === nextProps.item.resource.price &&
//     prevProps.item.resource.discountPrice === nextProps.item.resource.discountPrice &&
//     prevProps.item.resource.title === nextProps.item.resource.title &&
//     prevProps.item.resource.thumbnail === nextProps.item.resource.thumbnail
//   );
// });

// CartItem.displayName = "CartItem";

// // Optimized Cart Summary Component with local calculations
// const CartSummary = memo(({ items, shippingCost = 0 }) => {
//   const calculations = useMemo(() => {
//     if (!items || !Array.isArray(items)) {
//       return { subtotal: 0, itemCount: 0, total: 0 };
//     }

//     const subtotal = items.reduce((sum, item) => {
//       const price = item.resource.discountPrice || item.resource.price || 0;
//       return sum + (price * item.quantity);
//     }, 0);
    
//     const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
//     const total = subtotal + shippingCost;

//     return { subtotal, itemCount, total };
//   }, [items, shippingCost]);

//   const { subtotal, itemCount, total } = calculations;

//   const displaySubtotal = useMemo(() => formatPrice(subtotal), [subtotal]);
//   const displayShipping = useMemo(() => formatPrice(shippingCost), [shippingCost]);
//   const displayTotal = useMemo(() => formatPrice(total), [total]);

//   return (
//     <div className="bg-gray-50 p-6 rounded-lg">
//       <h3 className="text-2xl font-semibold mb-6 text-gray-900">Cart Summary</h3>
      
//       <div className="space-y-3 mb-6">
//         <div className="flex justify-between items-center">
//           <span className="text-gray-600">
//             Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'}):
//           </span>
//           <span className="font-medium">${displaySubtotal}</span>
//         </div>
        
//         {shippingCost > 0 && (
//           <div className="flex justify-between items-center">
//             <span className="text-gray-600">Shipping:</span>
//             <span className="font-medium">${displayShipping}</span>
//           </div>
//         )}
        
//         <hr className="border-gray-200" />
        
//         <div className="flex justify-between items-center text-lg font-bold text-gray-900">
//           <span>Total:</span>
//           <span>${displayTotal}</span>
//         </div>
//       </div>
      
//       <Button
//         asChild
//         className="w-full bg-[#2c5d7c] text-white font-semibold h-12 hover:bg-[#1e4258] transition-colors duration-200"
//       >
//         <Link href="/checkout">
//           Proceed to Checkout
//         </Link>
//       </Button>
//     </div>
//   );
// });

// CartSummary.displayName = "CartSummary";

// // Optimized Empty Cart Component
// const EmptyCart = memo(() => (
//   <div className="text-center py-16 bg-gray-50 rounded-lg">
//     <div className="max-w-md mx-auto">
//       <ShoppingCart className="h-20 w-20 mx-auto text-gray-400 mb-6" />
//       <h3 className="text-2xl font-semibold mb-3 text-gray-900">Your cart is empty</h3>
//       <p className="text-gray-600 mb-8 leading-relaxed">
//         Discover amazing products and add them to your cart to get started
//       </p>
//       <Button 
//         asChild 
//         className="bg-[#2c5d7c] hover:bg-[#1e4258] text-white font-semibold px-8 py-3 transition-colors duration-200"
//       >
//         <Link href="/products">
//           <ArrowLeft className="mr-2 h-4 w-4" />
//           Browse Products
//         </Link>
//       </Button>
//     </div>
//   </div>
// ));

// EmptyCart.displayName = "EmptyCart";

// // Optimized Login Required Component
// const LoginRequired = memo(() => (
//   <div className="text-center py-16 bg-gray-50 rounded-lg">
//     <div className="max-w-md mx-auto">
//       <LogIn className="h-20 w-20 mx-auto text-gray-400 mb-6" />
//       <h3 className="text-2xl font-semibold mb-3 text-gray-900">Please Login</h3>
//       <p className="text-gray-600 mb-8 leading-relaxed">
//         You need to be logged in to view and manage your cart
//       </p>
//       <Button 
//         asChild 
//         className="bg-[#2c5d7c] hover:bg-[#1e4258] text-white font-semibold px-8 py-3 transition-colors duration-200"
//       >
//         <Link href="/sign-in">
//           <LogIn className="mr-2 h-4 w-4" />
//           Login to Continue
//         </Link>
//       </Button>
//     </div>
//   </div>
// ));

// LoginRequired.displayName = "LoginRequired";

// // Main Cart Component
// export default function CartPageAPI() {
//   const { status } = useSession();
//   const updateCartMutation = useUpdateCartItem();
//   const removeCartMutation = useRemoveFromCart();
//   const clearCartMutation = useClearCart();
//   const { items, shippingCost } = useCartTotals();

//   // Memoized valid items filtering with stable reference
//   const validItems = useMemo(() => {
//     if (!items || !Array.isArray(items)) return [];
    
//     return items.filter((item) => {
//       if (!item?.resource) return false;
//       const itemPrice = item.resource.discountPrice || item.resource.price;
//       return itemPrice && itemPrice > 0 && !isNaN(itemPrice) && isFinite(itemPrice);
//     });
//   }, [items]);

//   // Calculate item count locally for header
//   const itemCount = useMemo(() => 
//     validItems.reduce((sum, item) => sum + item.quantity, 0), 
//     [validItems]
//   );

//   // Memoized handlers to prevent unnecessary re-renders
//   const handleQuantityChange = useCallback(async (itemId, targetQuantity) => {
//     if (targetQuantity < 1) return;
    
//     try {
//       await updateCartMutation.mutateAsync({ itemId, quantity: targetQuantity });
//     } catch (error) {
//       console.error('Error updating quantity:', error);
//       throw error; // Re-throw to handle in CartItem
//     }
//   }, [updateCartMutation]);

//   const handleRemoveItem = useCallback(async (itemId) => {
//     try {
//       await removeCartMutation.mutateAsync(itemId);
//     } catch (error) {
//       console.error('Error removing item:', error);
//       throw error; // Re-throw to handle in CartItem
//     }
//   }, [removeCartMutation]);

//   const handleClearCart = useCallback(async () => {
//     const confirmed = window.confirm(
//       `Are you sure you want to remove all ${itemCount} items from your cart?`
//     );
    
//     if (confirmed) {
//       try {
//         await clearCartMutation.mutateAsync();
//       } catch (error) {
//         console.error('Error clearing cart:', error);
//       }
//     }
//   }, [clearCartMutation, itemCount]);

//   // Loading state for unauthenticated users
//   if (status === "loading") {
//     return (
//       <div className="flex flex-col">
//         <main className="flex-1">
//           <div className="container mx-auto px-4 py-12">
//             <div className="animate-pulse">
//               <div className="h-8 bg-gray-200 rounded mb-6 w-1/3"></div>
//               <div className="bg-gray-200 rounded-lg h-64"></div>
//             </div>
//           </div>
//         </main>
//       </div>
//     );
//   }

//   if (status === "unauthenticated") {
//     return (
//       <div className="flex flex-col min-h-screen">
//         <main className="flex-1">
//           <div className="container mx-auto px-4 py-12">
//             <LoginRequired />
//           </div>
//         </main>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col min-h-screen">
//       <main className="flex-1">
//         <div className="container mx-auto px-4 py-8">
//           {validItems.length === 0 ? (
//             <EmptyCart />
//           ) : (
//             <div className="space-y-8">
//               {/* Cart Header */}
//               <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
//                 <h1 className="text-3xl font-bold text-gray-900">
//                   Shopping Cart
//                   <span className="text-lg font-normal text-gray-600 ml-2">
//                     ({itemCount} {itemCount === 1 ? 'item' : 'items'})
//                   </span>
//                 </h1>
                
//                 <Button
//                   variant="outline"
//                   onClick={handleClearCart}
//                   className="text-red-600 border-red-600 hover:bg-red-50 hover:border-red-700 transition-colors duration-200 font-medium"
//                 >
//                   Clear Cart
//                 </Button>
//               </div>

//               {/* Cart Table */}
//               <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//                 <div className="overflow-x-auto">
//                   <table className="w-full">
//                     <thead className="bg-gray-50 border-b border-gray-200">
//                       <tr>
//                         <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
//                           Products
//                         </th>
//                         <th className="py-4 px-6 text-center text-sm font-semibold text-gray-900 uppercase tracking-wider">
//                           Quantity
//                         </th>
//                         <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
//                           Price
//                         </th>
//                         <th className="py-4 px-6 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
//                           Total
//                         </th>
//                         <th className="py-4 px-6 text-center text-sm font-semibold text-gray-900 uppercase tracking-wider">
//                           Remove
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-200">
//                       {validItems.map((item) => (
//                         <CartItem
//                           key={`${item._id}-${item.resource._id}`}
//                           item={item}
//                           onQuantityChange={handleQuantityChange}
//                           onRemoveItem={handleRemoveItem}
//                         />
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>

//               {/* Bottom Section */}
//               <div className="flex flex-col lg:flex-row gap-8">
//                 {/* Continue Shopping */}
//                 <div className="lg:w-2/3">
//                   <Button
//                     asChild
//                     variant="outline"
//                     className="bg-[#23547B] text-white font-semibold px-8 py-3 hover:bg-[#1e4258] border-[#23547B] transition-colors duration-200"
//                   >
//                     <Link href="/products">
//                       <ArrowLeft className="mr-2 h-4 w-4" />
//                       Continue Shopping
//                     </Link>
//                   </Button>
//                 </div>

//                 {/* Cart Summary */}
//                 <div className="lg:w-1/3">
//                   <CartSummary
//                     items={validItems}
//                     shippingCost={shippingCost || 0}
//                   />
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }