"use client"
import Image from "next/image"
import { useEffect, useRef } from "react"
import modalImage from "@/public/images/authImg.svg";

interface LogoutConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export default function LogoutConfirmationModal({ isOpen, onClose, onConfirm }: LogoutConfirmationModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  // Close modal when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  // Close modal with ESC key
  useEffect(() => {
    function handleEscKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose()
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", handleEscKey)
    }
    return () => {
      document.removeEventListener("keydown", handleEscKey)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div ref={modalRef} className="bg-white rounded-lg shadow-lg mx-4 px-16 py-10 overflow-hidden ">
        <div className="flex flex-col items-center justify-center">
          <div className="mb-[50px]">
            <div className="">
              <Image src={modalImage} width={400} height={400} alt="Logo" />
            </div>
            {/* <div className="text-xs text-center text-gray-600">The Marketplace for Lawyers</div> */}
          </div>
          <h3 className="text-lg font-medium text-[#424242] mb-8">Are You Sure To Log Out?</h3>
          <div className="flex w-full gap-2 mb-4">
            <button
              onClick={onClose}
              className="flex-1 py-2 border border-gray-300 rounded text-gray-700 bg-white hover:bg-gray-50"
            >
              No
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 py-2 bg-[#23547B] text-white rounded hover:bg-blue-800"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}