"use client"

import Image from "next/image"
import { Download, Star } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface DocumentDetailsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function DocumentDetailsModal({ isOpen, onClose }: DocumentDetailsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="p-6 md:w-1/3 bg-gray-50 flex items-center justify-center">
            <div className="relative w-full aspect-[3/4] max-w-[240px]">
              <Image src="/placeholder.svg?key=v6tph" alt="Document Cover" fill className="object-contain" />
            </div>
          </div>

          <div className="p-6 md:w-2/3">
            <h3 className="text-xl font-bold mb-2">Admissibility of evidence in civil proceedings</h3>
            <div className="flex items-center mb-4">
              <div className="flex mr-2">
                {[1, 2, 3, 4].map((star) => (
                  <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" strokeWidth={0} fill="currentColor" />
                <span className="text-sm text-gray-600">4.8</span>
              </div>
              <span className="text-sm text-gray-500">(1.5k Reviews)</span>
            </div>

            <div className="flex items-center mb-4">
              <span className="text-lg font-bold mr-2">Price: $8.5</span>
              <span className="text-sm text-gray-500 line-through">$10.00</span>
            </div>

            <p className="text-gray-700 mb-6">
              Admissibility refers to whether evidence presented in court can be considered by the judge or jury. In
              civil cases, this standard ensures that only relevant, reliable, and legally obtained evidence is used to
              decide disputes. Evidence must be relevant to the issues being decided. This means it should have a direct
              bearing on key facts or legal points in the case.
            </p>

            <div className="flex flex-wrap gap-4 mb-6">
              <div>
                <span className="block text-sm text-gray-500">Quantity:</span>
                <div className="inline-flex items-center justify-center h-8 w-8 bg-[#2c5d7c] text-white rounded">2</div>
              </div>

              <div>
                <span className="block text-sm text-gray-500">Total Price:</span>
                <span className="font-bold">$20.00</span>
              </div>

              <div>
                <span className="block text-sm text-gray-500">Format:</span>
                <span className="inline-flex items-center justify-center px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                  DOC
                </span>
              </div>
            </div>

            <div className="mb-4">
              <span className="block text-sm text-gray-500 mb-1">Sale And Secured Checkout By:</span>
              <div className="inline-flex items-center justify-center px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-medium">
                <span className="mr-1">VISA</span>
                <span className="mr-1">MASTERCARD</span>
              </div>
            </div>

            <Button className="w-full bg-[#2c5d7c] hover:bg-[#1e4258]">
              <Download className="mr-2 h-4 w-4" />
              Download Now
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
