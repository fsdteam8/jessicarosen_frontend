"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, AlignJustify, List } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function AddResource() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    discountPrice: "",
    quantity: "",
    format: "",
    category: "",
    subCategory: "",
    description: "",
    thumbnail: null as File | null,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.title.trim()) {
      newErrors.title = "Title is required"
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
    if (!formData.description.trim()) {
      newErrors.description = "Description is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Success",
        description: "Resource published successfully!",
      })

      router.push("/resources")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to publish resource. Please try again.",
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Add Resource</h1>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>Dashboard</span>
            <span>›</span>
            <span>resource List</span>
            <span>›</span>
            <span>add resource</span>
          </div>
        </div>
        <Button onClick={handleSubmit} disabled={loading} className="bg-slate-700 hover:bg-slate-800">
          {loading ? "Publishing..." : "Publish Resource"}
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <Card>
            <CardContent className="p-6">
              <Label htmlFor="title" className="text-base font-medium">
                Add Title
              </Label>
              <Input
                id="title"
                placeholder="Add your title..."
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className={`mt-2 ${errors.title ? "border-red-500" : ""}`}
              />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
            </CardContent>
          </Card>

          {/* Price, Discount, Quantity, Format */}
          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="price" className="text-sm font-medium">
                    Price
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    placeholder="Add price..."
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
                    placeholder="Add Discount Price..."
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
                    placeholder="Add Quantity..."
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
                      <SelectValue placeholder="Add format..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="doc">DOC</SelectItem>
                      <SelectItem value="all">All Format</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          <Card>
            <CardContent className="p-6">
              <Label className="text-base font-medium">Description</Label>
              <div className="mt-2 border rounded-lg">
                <Textarea
                  placeholder="Description..."
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  className={`min-h-32 border-0 resize-none ${errors.description ? "border-red-500" : ""}`}
                />
                <div className="flex items-center justify-between p-3 border-t bg-gray-50">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Font</span>
                    <Select defaultValue="body">
                      <SelectTrigger className="w-20 h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="body">Body</SelectItem>
                        <SelectItem value="heading">Heading</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="flex items-center space-x-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Bold className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Italic className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Underline className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Alignment</span>
                    <div className="flex items-center space-x-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <AlignLeft className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <AlignCenter className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <AlignRight className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <AlignJustify className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <List className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Category */}
          <Card>
            <CardContent className="p-6">
              <Label className="text-base font-medium">Category</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                <SelectTrigger className={`mt-2 ${errors.category ? "border-red-500" : ""}`}>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="legal">Legal Documents</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                </SelectContent>
              </Select>
              {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
            </CardContent>
          </Card>

          {/* Sub Category */}
          <Card>
            <CardContent className="p-6">
              <Label className="text-base font-medium">Sub_category</Label>
              <Select value={formData.subCategory} onValueChange={(value) => handleInputChange("subCategory", value)}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select a sub_category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="contracts">Contracts</SelectItem>
                  <SelectItem value="litigation">Litigation</SelectItem>
                  <SelectItem value="compliance">Compliance</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Thumbnail */}
          <Card>
            <CardContent className="p-6">
              <Label className="text-base font-medium">Thumbnail</Label>
              <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="thumbnail" />
                <label htmlFor="thumbnail" className="cursor-pointer">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Click to upload thumbnail</p>
                </label>
                {formData.thumbnail && <p className="text-sm text-green-600 mt-2">{formData.thumbnail.name}</p>}
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  )
}
