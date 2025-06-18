// "use client"

// import Image from "next/image"
// import { Star } from "lucide-react"
// import { Dialog, DialogContent } from "@/components/ui/dialog"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"

// interface Document {
//   id: string
//   title: string
//   author: {
//     name: string
//     avatar: string
//   }
//   price: {
//     original: number
//     discounted: number
//   }
//   rating: {
//     score: number
//     count: number
//   }
//   description: string
//   category: string
//   language: string
//   coverImage: string
// }

// interface DocumentDetailsModalProps {
//   isOpen: boolean
//   onClose: () => void
// }

// export function DocumentDetailsModal({ isOpen, onClose }: DocumentDetailsModalProps) {
//   // Sample data - in a real app, this would come from props or an API
//   const documents: Document[] = [
//     {
//       id: "1",
//       title: "Securing Organizational Objectives",
//       author: {
//         name: "Jane Cooper",
//         avatar: "/placeholder.svg?height=40&width=40",
//       },
//       price: {
//         original: 10.0,
//         discounted: 12.8,
//       },
//       rating: {
//         score: 4.8,
//         count: 1950,
//       },
//       description:
//         "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum sunt in culpa qui officia deserunt mollit anim id est laborum.",
//       category: "Practical law",
//       language: "English Language",
//       coverImage: "/placeholder.svg?height=200&width=150",
//     },
//     {
//       id: "2",
//       title: "Starting the Professional Engagement",
//       author: {
//         name: "Claire McCoy",
//         avatar: "/placeholder.svg?height=40&width=40",
//       },
//       price: {
//         original: 10.0,
//         discounted: 12.8,
//       },
//       rating: {
//         score: 4.8,
//         count: 1950,
//       },
//       description:
//         "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum sunt in culpa qui officia deserunt mollit anim id est laborum.",
//       category: "Practical law",
//       language: "English Language",
//       coverImage: "/placeholder.svg?height=200&width=150",
//     },
//     {
//       id: "3",
//       title: "Commercial Transactions Objective",
//       author: {
//         name: "Cameron Williamson",
//         avatar: "/placeholder.svg?height=40&width=40",
//       },
//       price: {
//         original: 10.0,
//         discounted: 12.8,
//       },
//       rating: {
//         score: 4.8,
//         count: 1950,
//       },
//       description:
//         "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum sunt in culpa qui officia deserunt mollit anim id est laborum.",
//       category: "Practical law",
//       language: "English Language",
//       coverImage: "/placeholder.svg?height=200&width=150",
//     },
//   ]

//   return (
//     <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
//       <DialogContent className="max-w-5xl p-6 overflow-auto max-h-[90vh]">
//         <div className="space-y-6">
//           {documents.map((document) => (
//             <div key={document.id} className="flex gap-4 pb-6 border-b last:border-b-0">
//               <div className="flex-shrink-0 w-[140px]">
//                 <div className="relative w-full aspect-[3/4]">
//                   <Image
//                     src={document.coverImage || "/placeholder.svg"}
//                     alt={document.title}
//                     fill
//                     className="object-cover rounded-md"
//                   />
//                 </div>
//               </div>

//               <div className="flex-1">
//                 <h3 className="text-lg font-semibold mb-1">{document.title}</h3>

//                 <div className="flex items-center gap-2 my-2">
//                   <div className="w-6 h-6 rounded-full overflow-hidden relative">
//                     <Image
//                       src={document.author.avatar || "/placeholder.svg"}
//                       alt={document.author.name}
//                       fill
//                       className="object-cover"
//                     />
//                   </div>
//                   <div className="text-sm">
//                     <p className="text-gray-500">Created by</p>
//                     <p className="font-medium">{document.author.name}</p>
//                   </div>
//                 </div>

//                 <p className="text-sm text-gray-600 line-clamp-3 mb-2">{document.description}</p>

//                 <div className="flex flex-wrap items-center justify-between gap-2 mt-3">
//                   <div className="flex items-center gap-1">
//                     <Badge variant="outline" className="text-xs font-normal">
//                       {document.language}
//                     </Badge>
//                     <Badge variant="outline" className="text-xs font-normal">
//                       {document.category}
//                     </Badge>
//                   </div>

//                   <div className="flex items-center gap-2">
//                     <div className="flex items-center">
//                       <div className="flex mr-1">
//                         {[...Array(5)].map((_, i) => (
//                           <Star
//                             key={i}
//                             className={`h-3 w-3 ${i < Math.floor(document.rating.score) ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
//                           />
//                         ))}
//                       </div>
//                       <span className="text-xs font-medium">{document.rating.score}</span>
//                       <span className="text-xs text-gray-500 ml-1">({(document.rating.count / 1000).toFixed(1)}k)</span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex items-center justify-between mt-3">
//                   <div>
//                     <span className="text-red-500 font-medium">${document.price.original.toFixed(2)}</span>
//                     <div className="text-xs">
//                       <span className="text-gray-500">Price: </span>
//                       <span className="font-medium">${document.price.discounted.toFixed(1)}</span>
//                     </div>
//                   </div>

//                   <Button className="bg-blue-700 hover:bg-blue-800 text-white">Download Now</Button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </DialogContent>
//     </Dialog>
//   )
// }

"use client";

import { useEffect, useState } from "react";
// import Image from "next/image"
import { Package, User, Calendar, CreditCard, Truck, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSession } from "next-auth/react";

interface OrderItem {
  resource: {
    _id: string;
    title: string;
    description: string;
  };
  seller: {
    _id: string;
    email: string;
  };
  quantity: number;
  price: number;
  status: string;
}

interface OrderDetails {
  _id: string;
  user: {
    _id: string;
    email: string;
  };
  items: OrderItem[];
  totalAmount: number;
  paymentMethod: string | null;
  paymentStatus: string;
  orderStatus: string;
  stripeSessionId: string;
  stripePaymentIntentId: string | null;
  transferGroup: string;
  createdAt: string;
  updatedAt: string;
}

interface DocumentDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string | null;
}

export function DocumentDetailsModal({
  isOpen,
  onClose,
  orderId,
}: DocumentDetailsModalProps) {
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { data: session } = useSession();
  const token = session?.user?.accessToken;

  const fetchOrderDetails = async () => {
    if (!orderId || !token) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/orders/${orderId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch order details");
      }

      const data = await response.json();
      setOrderDetails(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && orderId && token) {
      fetchOrderDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, orderId, token]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "pending":
        return "bg-orange-100 text-orange-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "paid":
        return "bg-green-100 text-green-800";
      case "unpaid":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return <Package className="h-4 w-4" />;
      case "processing":
        return <Truck className="h-4 w-4" />;
      case "pending":
        return <Calendar className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl p-0 max-h-[90vh] flex flex-col  overflow-x-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-1">Order Details</h2>
              <p className="text-blue-100">
                {orderId && `Order ID: ${orderId.slice(-8).toUpperCase()}`}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1">
          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading order details...</p>
              </div>
            </div>
          )}

          {error && (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="text-red-600 mb-2">
                  Error loading order details
                </div>
                <p className="text-gray-600 mb-4">{error}</p>
                <Button onClick={fetchOrderDetails} variant="outline">
                  Try Again
                </Button>
              </div>
            </div>
          )}

          {orderDetails && !loading && !error && (
            <div className="p-6 space-y-6">
              {/* Order Summary */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Calendar className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Order Date</p>
                      <p className="font-semibold">
                        {formatDate(orderDetails.createdAt)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <CreditCard className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Amount</p>
                      <p className="font-semibold text-lg">
                        ${orderDetails.totalAmount.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-purple-100 p-2 rounded-full">
                      {getStatusIcon(orderDetails.orderStatus)}
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Order Status</p>
                      <Badge
                        className={`${getStatusColor(
                          orderDetails.orderStatus
                        )} font-medium`}
                      >
                        {orderDetails.orderStatus.charAt(0).toUpperCase() +
                          orderDetails.orderStatus.slice(1)}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="border rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Payment Status</p>
                    <Badge
                      className={`${getStatusColor(
                        orderDetails.paymentStatus
                      )} font-medium mt-1`}
                    >
                      {orderDetails.paymentStatus.charAt(0).toUpperCase() +
                        orderDetails.paymentStatus.slice(1)}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Payment Method</p>
                    <p className="font-medium">
                      {orderDetails.paymentMethod || "Card Payment"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="border rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Order Items ({orderDetails.items.length})
                </h3>

                <div className="space-y-4">
                  {orderDetails.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex gap-4 p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                        <Package className="h-8 w-8 text-blue-600" />
                      </div>

                      <div className="flex-1">
                        <h4 className="font-semibold text-lg mb-1">
                          {item.resource.title}
                        </h4>
                        <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                          {item.resource.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4 text-gray-500" />
                            <span className="text-gray-600">
                              Seller: {item.seller.email}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-gray-600">Quantity: </span>
                            <span className="font-medium">{item.quantity}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-gray-600">Price: </span>
                            <span className="font-medium">
                              ${item.price.toFixed(2)}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          <Badge
                            className={`${getStatusColor(
                              item.status
                            )} font-medium`}
                          >
                            {item.status.charAt(0).toUpperCase() +
                              item.status.slice(1)}
                          </Badge>
                          <div className="text-lg font-bold text-blue-600">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Customer Information */}
              <div className="border rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Customer Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Customer Email</p>
                    <p className="font-medium">{orderDetails.user.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Last Updated</p>
                    <p className="font-medium">
                      {formatDate(orderDetails.updatedAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
