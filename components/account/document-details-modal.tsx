// "use client"

// import Image from "next/image"
// import { Download, Star } from "lucide-react"
// import { Dialog, DialogContent } from "@/components/ui/dialog"
// import { Button } from "@/components/ui/button"

// interface DocumentDetailsModalProps {
//   isOpen: boolean
//   onClose: () => void
// }

// export function DocumentDetailsModal({ isOpen, onClose }: DocumentDetailsModalProps) {
//   return (
//     <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
//       <DialogContent className="max-w-3xl p-0 overflow-hidden">
//         <div className="flex flex-col md:flex-row">
//           <div className="p-6 md:w-1/3 bg-gray-50 flex items-center justify-center">
//             <div className="relative w-full aspect-[3/4] max-w-[240px]">
//               <Image src="/placeholder.svg?key=v6tph" alt="Document Cover" fill className="object-contain" />
//             </div>
//           </div>

//           <div className="p-6 md:w-2/3">
//             <h3 className="text-xl font-bold mb-2">Admissibility of evidence in civil proceedings</h3>
//             <div className="flex items-center gap-2 my-3">
//               <div className="w-12 h-12 rounded-full bg-slate-500">

//               </div>
//              <div>
//                <p>Created by</p>
//                <p>Dr. John Doe</p>
//              </div>
//             </div>
//             <div className="flex items-center mb-4">
//               <div className="flex mr-2">
//                 {[1, 2, 3, 4].map((star) => (
//                   <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
//                 ))}
//                 <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" strokeWidth={0} fill="currentColor" />
//                 <span className="text-sm text-gray-600">4.8</span>
//               </div>
//               <span className="text-sm text-gray-500">(1.5k Reviews)</span>
//             </div>

//             <div className="flex items-center mb-4">
//               <span className="text-lg font-bold mr-2">Price: $8.5</span>
//               <span className="text-sm text-gray-500 line-through">$10.00</span>
//             </div>

//             <p className="text-gray-700 mb-6">
//               Admissibility refers to whether evidence presented in court can be considered by the judge or jury. In
//               civil cases, this standard ensures that only relevant, reliable, and legally obtained evidence is used to
//               decide disputes. Evidence must be relevant to the issues being decided. This means it should have a direct
//               bearing on key facts or legal points in the case.
//             </p>

//             <div className="flex flex-wrap gap-4 mb-6">
//               <div>
//                 <span className="block text-sm text-gray-500">Quantity:</span>
//                 <div className="inline-flex items-center justify-center h-8 w-8 bg-[#2c5d7c] text-white rounded">2</div>
//               </div>

//               <div>
//                 <span className="block text-sm text-gray-500">Total Price:</span>
//                 <span className="font-bold">$20.00</span>
//               </div>

//               <div>
//                 <span className="block text-sm text-gray-500">Format:</span>
//                 <span className="inline-flex items-center justify-center px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
//                   DOC
//                 </span>
//               </div>
//             </div>

//             <div className="mb-4">
//               <span className="block text-sm text-gray-500 mb-1">Sale And Secured Checkout By:</span>
//               <div className="inline-flex items-center justify-center px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-medium">
//                 <span className="mr-1">VISA</span>
//                 <span className="mr-1">MASTERCARD</span>
//               </div>
//             </div>

//             <Button className="w-full bg-[#2c5d7c] hover:bg-[#1e4258]">
//               <Download className="mr-2 h-4 w-4" />
//               Download Now
//             </Button>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   )
// }





"use client"

import Image from "next/image"
import { Star } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Document {
  id: string
  title: string
  author: {
    name: string
    avatar: string
  }
  price: {
    original: number
    discounted: number
  }
  rating: {
    score: number
    count: number
  }
  description: string
  category: string
  language: string
  coverImage: string
}

interface DocumentDetailsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function DocumentDetailsModal({ isOpen, onClose }: DocumentDetailsModalProps) {
  // Sample data - in a real app, this would come from props or an API
  const documents: Document[] = [
    {
      id: "1",
      title: "Securing Organizational Objectives",
      author: {
        name: "Jane Cooper",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      price: {
        original: 10.0,
        discounted: 12.8,
      },
      rating: {
        score: 4.8,
        count: 1950,
      },
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum sunt in culpa qui officia deserunt mollit anim id est laborum.",
      category: "Practical law",
      language: "English Language",
      coverImage: "/placeholder.svg?height=200&width=150",
    },
    {
      id: "2",
      title: "Starting the Professional Engagement",
      author: {
        name: "Claire McCoy",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      price: {
        original: 10.0,
        discounted: 12.8,
      },
      rating: {
        score: 4.8,
        count: 1950,
      },
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum sunt in culpa qui officia deserunt mollit anim id est laborum.",
      category: "Practical law",
      language: "English Language",
      coverImage: "/placeholder.svg?height=200&width=150",
    },
    {
      id: "3",
      title: "Commercial Transactions Objective",
      author: {
        name: "Cameron Williamson",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      price: {
        original: 10.0,
        discounted: 12.8,
      },
      rating: {
        score: 4.8,
        count: 1950,
      },
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum sunt in culpa qui officia deserunt mollit anim id est laborum.",
      category: "Practical law",
      language: "English Language",
      coverImage: "/placeholder.svg?height=200&width=150",
    },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-5xl p-6 overflow-auto max-h-[90vh]">
        <div className="space-y-6">
          {documents.map((document) => (
            <div key={document.id} className="flex gap-4 pb-6 border-b last:border-b-0">
              <div className="flex-shrink-0 w-[140px]">
                <div className="relative w-full aspect-[3/4]">
                  <Image
                    src={document.coverImage || "/placeholder.svg"}
                    alt={document.title}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-1">{document.title}</h3>

                <div className="flex items-center gap-2 my-2">
                  <div className="w-6 h-6 rounded-full overflow-hidden relative">
                    <Image
                      src={document.author.avatar || "/placeholder.svg"}
                      alt={document.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-sm">
                    <p className="text-gray-500">Created by</p>
                    <p className="font-medium">{document.author.name}</p>
                  </div>
                </div>

                <p className="text-sm text-gray-600 line-clamp-3 mb-2">{document.description}</p>

                <div className="flex flex-wrap items-center justify-between gap-2 mt-3">
                  <div className="flex items-center gap-1">
                    <Badge variant="outline" className="text-xs font-normal">
                      {document.language}
                    </Badge>
                    <Badge variant="outline" className="text-xs font-normal">
                      {document.category}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      <div className="flex mr-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${i < Math.floor(document.rating.score) ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
                          />
                        ))}
                      </div>
                      <span className="text-xs font-medium">{document.rating.score}</span>
                      <span className="text-xs text-gray-500 ml-1">({(document.rating.count / 1000).toFixed(1)}k)</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <div>
                    <span className="text-red-500 font-medium">${document.price.original.toFixed(2)}</span>
                    <div className="text-xs">
                      <span className="text-gray-500">Price: </span>
                      <span className="font-medium">${document.price.discounted.toFixed(1)}</span>
                    </div>
                  </div>

                  <Button className="bg-blue-700 hover:bg-blue-800 text-white">Download Now</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
