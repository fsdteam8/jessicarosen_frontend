"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X, Upload } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

interface Resource {
  id: string
  name: string
  price: number
  discountPrice: number
  quantity: number
  format: string
  date: string
  status: "Pending" | "Approved" | "Rejected"
  image: string
}

interface EditResourceModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  resource: Resource | null
  onUpdate: (resource: Resource) => void
}

export function EditResourceModal({ open, onOpenChange, resource, onUpdate }: EditResourceModalProps) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    discountPrice: "",
    quantity: "",
    format: "",
    status: "Pending" as Resource["status"],
    description: "",
    category: "",
    subCategory: "",
    thumbnail: null as File | null,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (resource) {
      setFormData({
        name: resource.name,
        price: resource.price.toString(),
        discountPrice: resource.discountPrice.toString(),
        quantity: resource.quantity.toString(),
        format: resource.format,
        status: resource.status,
        description: "Sample description for " + resource.name,
        category: "Legal Documents",
        subCategory: "Civil Law",
        thumbnail: null,
      })
    }
  }, [resource])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Resource name is required"
    }
    if (!formData.price || Number.parseFloat(formData.price) <= 0) {
      newErrors.price = "Valid price is required"
    }
    if (!formData.quantity || Number.parseInt(formData.quantity) <= 0) {
      newErrors.quantity = "Valid quantity is required"
    }
    if (!formData.category) {
      newErrors.category = "Category is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm() || !resource) {
      return
    }

    setLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const updatedResource: Resource = {
        ...resource,
        name: formData.name,
        price: Number.parseFloat(formData.price),
        discountPrice: Number.parseFloat(formData.discountPrice),
        quantity: Number.parseInt(formData.quantity),
        format: formData.format,
        status: formData.status,
      }

      onUpdate(updatedResource)

      toast({
        title: "Success",
        description: "Resource updated successfully!",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update resource. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({ ...prev, thumbnail: file }))
    }
  }

  const getStatusColor = (status: Resource["status"]) => {
    switch (status) {
      case "Pending":
        return "bg-orange-100 text-orange-800"
      case "Approved":
        return "bg-green-100 text-green-800"
      case "Rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (!resource) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold">Edit Resource</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Resource Info */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Image
                  src={resource.image || "/placeholder.svg"}
                  alt="Resource"
                  width={60}
                  height={60}
                  className="rounded-lg object-cover"
                />
                <div>
                  <p className="font-medium text-gray-900">Resource ID: {resource.id}</p>
                  <p className="text-sm text-gray-600">Created: {resource.date}</p>
                </div>
              </div>
              <Badge className={getStatusColor(formData.status)}>{formData.status}</Badge>
            </div>

            {/* Resource Name */}
            <div>
              <Label htmlFor="name" className="text-base font-medium">
                Resource Name
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className={`mt-2 ${errors.name ? "border-red-500" : ""}`}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Price, Discount, Quantity, Format */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="price" className="text-sm font-medium">
                  Price
                </Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  className={`mt-1 ${errors.price ? "border-red-500" : ""}`}
                />
                {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
              </div>
              <div>
                <Label htmlFor="discountPrice" className="text-sm font-medium">
                  Discount Price
                </Label>
                <Input
                  id="discountPrice"
                  type="number"
                  step="0.01"
                  value={formData.discountPrice}
                  onChange={(e) => handleInputChange("discountPrice", e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="quantity" className="text-sm font-medium">
                  Quantity
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => handleInputChange("quantity", e.target.value)}
                  className={`mt-1 ${errors.quantity ? "border-red-500" : ""}`}
                />
                {errors.quantity && <p className="text-red-500 text-xs mt-1">{errors.quantity}</p>}
              </div>
              <div>
                <Label htmlFor="format" className="text-sm font-medium">
                  Format
                </Label>
                <Select value={formData.format} onValueChange={(value) => handleInputChange("format", value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PDF">PDF</SelectItem>
                    <SelectItem value="DOC">DOC</SelectItem>
                    <SelectItem value="All Format">All Format</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Description */}
            <div>
              <Label className="text-base font-medium">Description</Label>
              <Textarea
                placeholder="Resource description..."
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                className="mt-2 min-h-24"
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Status */}
            <div>
              <Label className="text-base font-medium">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value: Resource["status"]) => handleInputChange("status", value)}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Approved">Approved</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Category */}
            <div>
              <Label className="text-base font-medium">Category</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                <SelectTrigger className={`mt-2 ${errors.category ? "border-red-500" : ""}`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Legal Documents">Legal Documents</SelectItem>
                  <SelectItem value="Business">Business</SelectItem>
                  <SelectItem value="Education">Education</SelectItem>
                </SelectContent>
              </Select>
              {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
            </div>

            {/* Sub Category */}
            <div>
              <Label className="text-base font-medium">Sub Category</Label>
              <Select value={formData.subCategory} onValueChange={(value) => handleInputChange("subCategory", value)}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Civil Law">Civil Law</SelectItem>
                  <SelectItem value="Criminal Law">Criminal Law</SelectItem>
                  <SelectItem value="Corporate Law">Corporate Law</SelectItem>
                  <SelectItem value="Contracts">Contracts</SelectItem>
                  <SelectItem value="Litigation">Litigation</SelectItem>
                  <SelectItem value="Compliance">Compliance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Thumbnail */}
            <div>
              <Label className="text-base font-medium">Thumbnail</Label>
              <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="edit-thumbnail"
                />
                <label htmlFor="edit-thumbnail" className="cursor-pointer">
                  <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Click to upload new thumbnail</p>
                </label>
                {formData.thumbnail && <p className="text-xs text-green-600 mt-2">{formData.thumbnail.name}</p>}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
                Cancel
              </Button>
              <Button type="submit" disabled={loading} className="flex-1 bg-slate-700 hover:bg-slate-800">
                {loading ? "Updating..." : "Update Resource"}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
