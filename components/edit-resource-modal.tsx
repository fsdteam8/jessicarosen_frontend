"use client"

import type React from "react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Check, ChevronDown, FileText, ImageIcon, Loader2, X } from "lucide-react"
import dynamic from "next/dynamic"
import { useState, useEffect, useRef } from "react"
import "react-quill/dist/quill.snow.css"
import type { Resource } from "./resource-status" // Assuming types are in resource-status.tsx
import Image from "next/image"
import { useSession } from "next-auth/react"

// Import React Quill dynamically to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false })

interface Country {
  _id: string
  countryName: string
  states: string[]
}

interface PracticeArea {
  _id: string
  name: string
  description: string
}

interface ResourceType {
  _id: string
  resourceTypeName: string
  description: string
}

interface FormDataState {
  title: string
  price: string
  discountPrice: string
  quantity: string
  format: string
  country: string
  states: string[]
  description: string
  practiceArea: string // Stores ID
  resourceType: string // Stores ID
  thumbnail: File | null // Holds the new File object if selected
  thumbnailPreview?: string | null // For displaying existing (URL) or new (blob URL) thumbnail
  file: File | null // Holds the new File object for the main resource file
  // Store URLs of existing files for display and comparison
  existingThumbnailUrl?: string | null
  existingFileUrl?: string | null
  images: (File | string)[] // New files or existing URLs
  imagePreviews: string[] // For display: blob URLs for new, existing URLs for old
  existingImageUrls: string[] // Initial URLs from the resource
  existingFileName?: string | null
}

interface EditResourceModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  resource: Resource | null
  onUpdate: (updatedResource: Resource) => void
}

export function EditResourceModal({ open, onOpenChange, resource, onUpdate }: EditResourceModalProps) {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null)
  const [selectedStates, setSelectedStates] = useState<string[]>([])
  const [countryOpen, setCountryOpen] = useState(false)
  const [stateOpen, setStateOpen] = useState(false)
  const [stateSearch, setStateSearch] = useState("")
  const thumbnailInputRef = useRef<HTMLInputElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const imagesInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState<FormDataState>({
    title: "",
    price: "",
    discountPrice: "",
    quantity: "",
    format: "",
    country: "",
    states: [],
    description: "",
    practiceArea: "",
    resourceType: "",
    thumbnail: null,
    thumbnailPreview: null,
    file: null,
    existingThumbnailUrl: null,
    existingFileUrl: null,
    images: [],
    imagePreviews: [],
    existingImageUrls: [],
    existingFileName: null,
  })

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

  const session = useSession()
  const API_TOKEN = session?.data?.user?.accessToken
  // const API_TOKEN =
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODFhZGYyYjVmYzQyNjAwMGM4MWQ2Y2UiLCJyb2xlIjoiU0VMTEVSIiwiaWF0IjoxNzUwMDU1NzkwLCJleHAiOjE3NTA2NjA1OTB9.f25R6lWhkEDKCgnRYDDfHe5veZImx6v74kAfZZ2RDrI"

  const { data: countriesData, isLoading: isLoadingCountries } = useQuery<Country[]>({
    queryKey: ["countries"],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/country-state/all`, {
        headers: { Authorization: `Bearer ${API_TOKEN}` },
      })
      if (!response.ok) throw new Error("Failed to fetch countries")
      const data = await response.json()
      return data.success ? data.data : []
    },
  })

  const { data: practiceAreasData, isLoading: isLoadingPracticeAreas } = useQuery<PracticeArea[]>({
    queryKey: ["practiceAreas"],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/practice-area/all`, {
        headers: { Authorization: `Bearer ${API_TOKEN}` },
      })
      if (!response.ok) throw new Error("Failed to fetch practice areas")
      const data = await response.json()
      return data.success ? data.data : []
    },
  })

  const { data: resourceTypesData, isLoading: isLoadingResourceTypes } = useQuery<ResourceType[]>({
    queryKey: ["resourceTypes"],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/resource-type/all`, {
        headers: { Authorization: `Bearer ${API_TOKEN}` },
      })
      if (!response.ok) throw new Error("Failed to fetch resource types")
      const data = await response.json()
      return data.success ? data.data : []
    },
  })

  useEffect(() => {
    if (resource && countriesData && practiceAreasData && resourceTypesData) {
      setFormData({
        title: resource.title || "",
        price: resource.price?.toString() || "0",
        discountPrice: resource.discountPrice?.toString() || "0",
        quantity: resource.quantity?.toString() || "0",
        format: resource.format || "",
        country: resource.country || "",
        states: resource.states || [],
        description: resource.description || "",
        practiceArea: practiceAreasData.find((p) => resource.practiceAreas?.includes(p.name))?._id || "",
        resourceType: resourceTypesData.find((rt) => resource.resourceType?.includes(rt.resourceTypeName))?._id || "",
        thumbnail: null, // Reset file input on open
        thumbnailPreview: resource.thumbnail || null, // Display existing thumbnail URL
        file: null, // Reset file input on open
        existingThumbnailUrl: resource.thumbnail || null,
        existingFileUrl: resource.file?.url || null,
        existingFileName: resource.file?.url
          ? resource.file.url.substring(resource.file.url.lastIndexOf("/") + 1)
          : null,
        images: resource.images || [],
        imagePreviews: resource.images || [],
        existingImageUrls: resource.images || [],
      })
      setSelectedStates(resource.states || [])
      const countryObj = countriesData.find((c) => c.countryName === resource.country)
      setSelectedCountry(countryObj || null)
    }
  }, [resource, countriesData, practiceAreasData, resourceTypesData, open]) // Added `open` to reset form state when modal reopens

  useEffect(() => {
    // Cleanup for thumbnail preview
    const currentThumbnailPreview = formData.thumbnailPreview
    // Cleanup for image previews
    const currentImagePreviews = formData.imagePreviews

    return () => {
      if (currentThumbnailPreview && currentThumbnailPreview.startsWith("blob:")) {
        URL.revokeObjectURL(currentThumbnailPreview)
      }
      currentImagePreviews?.forEach((preview) => {
        if (preview && preview.startsWith("blob:")) {
          URL.revokeObjectURL(preview)
        }
      })
    }
  }, [formData.thumbnailPreview, formData.imagePreviews])

  const { mutate: updateResource, isPending: isSubmitting } = useMutation({
    mutationFn: async (currentFormData: FormDataState) => {
      if (!resource) throw new Error("No resource selected for update.")

      // Helper function for placeholder uploads (concept, replace with actual uploads)
      const uploadFileAndGetUrl = async (file: File, type: "image" | "thumbnail" | "file") => {
        // Simulate upload delay
        await new Promise((resolve) => setTimeout(resolve, 500))
        // In a real app, this would involve:
        // 1. Creating FormData
        // 2. Appending the file
        // 3. Sending a POST request to your upload endpoint (e.g., Cloudinary, S3, custom backend)
        // 4. Receiving the URL of the uploaded file in response
        toast({
          title: "Dev Note",
          description: `${type} '${file.name}' would be uploaded and URL sent.`,
          variant: "default",
        })
        return `https://res.cloudinary.com/your_cloud/${type === "file" ? "raw" : "image"}/upload/v_placeholder/new_${type}_${Date.now()}_${file.name}` // Placeholder URL
      }

      const metadataUpdatePayload: {
        title: string
        description: string
        price: number
        discountPrice: number
        format: string
        quantity: number
        country: string
        states: string[]
        practiceAreas?: string[]
        resourceType?: string[]
        thumbnail?: string | null
        file?: { url: string; type: string } | null
        images?: string[] // Added images field
      } = {
        title: currentFormData.title,
        description: currentFormData.description,
        price: Number.parseFloat(currentFormData.price) || 0,
        discountPrice: Number.parseFloat(currentFormData.discountPrice) || 0,
        format: currentFormData.format,
        quantity: Number.parseInt(currentFormData.quantity, 10) || 0,
        country: currentFormData.country,
        states: currentFormData.states,
      }

      const practiceAreaObj = practiceAreasData?.find((p) => p._id === currentFormData.practiceArea)
      if (practiceAreaObj) metadataUpdatePayload.practiceAreas = [practiceAreaObj.name]
      else if (currentFormData.practiceArea) metadataUpdatePayload.practiceAreas = [currentFormData.practiceArea]

      const resourceTypeObj = resourceTypesData?.find((rt) => rt._id === currentFormData.resourceType)
      if (resourceTypeObj) metadataUpdatePayload.resourceType = [resourceTypeObj.resourceTypeName]
      else if (currentFormData.resourceType) metadataUpdatePayload.resourceType = [currentFormData.resourceType]

      // --- Thumbnail Handling ---
      if (currentFormData.thumbnail instanceof File) {
        metadataUpdatePayload.thumbnail = await uploadFileAndGetUrl(currentFormData.thumbnail, "thumbnail")
      } else if (
        currentFormData.thumbnail === null &&
        currentFormData.thumbnailPreview === null && // Explicitly removed
        currentFormData.existingThumbnailUrl
      ) {
        metadataUpdatePayload.thumbnail = null
      } else if (currentFormData.existingThumbnailUrl) {
        metadataUpdatePayload.thumbnail = currentFormData.existingThumbnailUrl
      } else {
        metadataUpdatePayload.thumbnail = null
      }

      // --- Main File Handling ---
      if (currentFormData.file instanceof File) {
        const fileUrl = await uploadFileAndGetUrl(currentFormData.file, "file")
        metadataUpdatePayload.file = { url: fileUrl, type: currentFormData.file.type }
      } else if (currentFormData.file === null && currentFormData.existingFileName === null && resource.file?.url) {
        // Explicitly removed
        metadataUpdatePayload.file = null
      } else if (currentFormData.existingFileUrl) {
        metadataUpdatePayload.file = { url: currentFormData.existingFileUrl, type: resource.file?.type || "" }
      } else {
        metadataUpdatePayload.file = null
      }

      // --- Images Handling ---
      const finalImageUrls: string[] = []
      for (const imageItem of currentFormData.images) {
        if (typeof imageItem === "string") {
          // Existing image URL
          finalImageUrls.push(imageItem)
        } else if (imageItem instanceof File) {
          // New image File
          const newImageUrl = await uploadFileAndGetUrl(imageItem, "image")
          finalImageUrls.push(newImageUrl)
        }
      }
      metadataUpdatePayload.images = finalImageUrls

      const response = await fetch(`${API_BASE_URL}/resource/${resource._id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(metadataUpdatePayload),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(`Failed to update resource: ${errorData.message || response.statusText}`)
      }
      return response.json()
    },
    onSuccess: (data) => {
      toast({ title: "Success!", description: "Resource has been updated successfully." })
      queryClient.invalidateQueries({ queryKey: ["resources"] })
      onOpenChange(false)
      if (data.data && typeof onUpdate === "function") {
        onUpdate(data.data)
      }
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message || "Failed to update resource.", variant: "destructive" })
    },
  })

  const handleInputChange = (field: keyof FormDataState, value: string | string[] | (File | string)[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country)
    setSelectedStates([])
    setFormData((prev) => ({ ...prev, country: country.countryName, states: [] }))
    setCountryOpen(false)
  }

  const handleStateToggle = (state: string) => {
    const newStates = selectedStates.includes(state)
      ? selectedStates.filter((s) => s !== state)
      : [...selectedStates, state]
    setSelectedStates(newStates)
    setFormData((prev) => ({ ...prev, states: newStates }))
  }

  const handleThumbnailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    // Revoke previous blob URL if it exists
    if (formData.thumbnailPreview && formData.thumbnailPreview.startsWith("blob:")) {
      URL.revokeObjectURL(formData.thumbnailPreview)
    }
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: "Please upload an image for the thumbnail.",
          variant: "destructive",
        })
        setFormData((prev) => ({ ...prev, thumbnail: null, thumbnailPreview: prev.existingThumbnailUrl }))
        if (thumbnailInputRef.current) thumbnailInputRef.current.value = ""
        return
      }
      setFormData((prev) => ({ ...prev, thumbnail: file, thumbnailPreview: URL.createObjectURL(file) }))
    } else {
      // No file selected, revert to existing or clear if none
      setFormData((prev) => ({ ...prev, thumbnail: null, thumbnailPreview: prev.existingThumbnailUrl }))
    }
  }

  // const handleRemoveThumbnail = () => {
  //   if (formData.thumbnailPreview && formData.thumbnailPreview.startsWith("blob:")) {
  //     URL.revokeObjectURL(formData.thumbnailPreview)
  //   }
  //   setFormData((prev) => ({ ...prev, thumbnail: null, thumbnailPreview: null }))
  //   if (thumbnailInputRef.current) thumbnailInputRef.current.value = ""
  // }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    setFormData((prev) => ({ ...prev, file: file, existingFileName: file ? file.name : prev.existingFileName }))
    if (!file && fileInputRef.current) {
      fileInputRef.current.value = ""
      setFormData((prev) => ({
        ...prev,
        existingFileName: resource?.file?.url?.substring(resource.file.url.lastIndexOf("/") + 1) || null,
      }))
    }
  }

  const handleRemoveFile = () => {
    setFormData((prev) => ({ ...prev, file: null, existingFileName: null }))
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const handleNewImagesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const newImageFiles: File[] = []
      const newImagePreviews: string[] = []
      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        if (file.type.startsWith("image/")) {
          newImageFiles.push(file)
          newImagePreviews.push(URL.createObjectURL(file))
        } else {
          toast({
            title: "Invalid file type",
            description: `Skipping '${file.name}' as it's not an image.`,
            variant: "destructive",
          })
        }
      }
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...newImageFiles],
        imagePreviews: [...prev.imagePreviews, ...newImagePreviews],
      }))
    }
    if (imagesInputRef.current) imagesInputRef.current.value = "" // Reset file input
  }

  const handleRemoveImage = (indexToRemove: number) => {
    const previewToRemove = formData.imagePreviews[indexToRemove]
    if (previewToRemove && previewToRemove.startsWith("blob:")) {
      URL.revokeObjectURL(previewToRemove)
    }
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove),
      imagePreviews: prev.imagePreviews.filter((_, index) => index !== indexToRemove),
    }))
  }

  const handleSubmit = () => {
    // Basic validation example (can be expanded)
    if (!formData.title) {
      toast({ title: "Validation Error", description: "Title is required.", variant: "destructive" })
      return
    }
    updateResource(formData)
  }

  const filteredStates =
    selectedCountry?.states.filter((state) => state.toLowerCase().includes(stateSearch.toLowerCase())) || []
  const modules = {
    toolbar: [[{ header: [1, 2, false] }], ["bold", "italic", "underline"], [{ list: "ordered" }, { list: "bullet" }]],
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Edit Resource</DialogTitle>
          <DialogDescription>Update the details for: {resource?.title}</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 max-h-[80vh] overflow-y-auto p-4">
          {/* Left Section */}
          <div className="lg:col-span-3 space-y-6">
            <Card>
              <CardContent className="space-y-6 pt-6">
                <div className="space-y-2">
                  <Label htmlFor="title-edit">Title</Label>
                  <Input
                    id="title-edit"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price-edit">Price</Label>
                    <Input
                      id="price-edit"
                      type="number"
                      value={formData.price}
                      onChange={(e) => handleInputChange("price", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="discountPrice-edit">Discount Price</Label>
                    <Input
                      id="discountPrice-edit"
                      type="number"
                      value={formData.discountPrice}
                      onChange={(e) => handleInputChange("discountPrice", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quantity-edit">Quantity</Label>
                    <Input
                      id="quantity-edit"
                      type="number"
                      value={formData.quantity}
                      onChange={(e) => handleInputChange("quantity", e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description-edit">Description</Label>
                  <div className="border rounded-md">
                    {typeof window !== "undefined" && (
                      <ReactQuill
                        theme="snow"
                        value={formData.description}
                        onChange={(content) => handleInputChange("description", content)}
                        modules={modules}
                        className="min-h-[150px]"
                      />
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Images Section */}
            <Card className="cursor-default pointer-events-none opacity-50">
              <CardHeader>
                <Label>Images</Label>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  {/* <Label
                    htmlFor="images-upload-edit"
                    className="cursor-pointer text-sm font-medium text-primary hover:underline"
                  >
                    Upload New Images
                  </Label> */}
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleNewImagesChange}
                    className="hidden"
                    id="images-upload-edit"
                    ref={imagesInputRef}
                  />
                </div>
                {formData.imagePreviews && formData.imagePreviews.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {formData.imagePreviews.map((previewUrl, index) => (
                      <div key={index} className="relative group">
                        <Image
                          width={150}
                          height={150}
                          src={previewUrl || "/placeholder.svg"}
                          alt={`Resource image ${index + 1}`}
                          className="rounded-md object-cover aspect-square"
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => handleRemoveImage(index)}
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Remove image</span>
                        </Button>
                        {typeof formData.images[index] !== "string" && (
                          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs text-center p-1">
                            New
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No images uploaded yet. Click above to add some.</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <Label>Practice Area</Label>
                  <Select
                    value={formData.practiceArea}
                    onValueChange={(value) => handleInputChange("practiceArea", value)}
                    disabled={isLoadingPracticeAreas}
                  >
                    <SelectTrigger id="practiceArea-edit-trigger">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      {practiceAreasData?.map((area) => (
                        <SelectItem key={area._id} value={area._id}>
                          {area.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Resource Type</Label>
                  <Select
                    value={formData.resourceType}
                    onValueChange={(value) => handleInputChange("resourceType", value)}
                    disabled={isLoadingResourceTypes}
                  >
                    <SelectTrigger id="resourceType-edit-trigger">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      {resourceTypesData?.map((type) => (
                        <SelectItem key={type._id} value={type._id}>
                          {type.resourceTypeName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="format-edit">Format</Label>
                  <Select value={formData.format} onValueChange={(value) => handleInputChange("format", value)}>
                    <SelectTrigger id="format-edit-trigger">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PDF">PDF</SelectItem>
                      <SelectItem value="Document">Doc</SelectItem>
                      {/* Add other formats as needed */}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="space-y-2">
                  <Label>Country</Label>
                  <Popover open={countryOpen} onOpenChange={setCountryOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-between"
                        disabled={isLoadingCountries}
                        id="country-edit-trigger"
                      >
                        {selectedCountry ? selectedCountry.countryName : "Select..."}
                        <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Search..." />
                        <CommandList>
                          <CommandEmpty>No country found.</CommandEmpty>
                          <CommandGroup>
                            {countriesData?.map((country) => (
                              <CommandItem
                                key={country._id}
                                value={country.countryName}
                                onSelect={() => handleCountrySelect(country)}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    selectedCountry?._id === country._id ? "opacity-100" : "opacity-0",
                                  )}
                                />
                                {country.countryName}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label>States</Label>
                  <Popover open={stateOpen} onOpenChange={setStateOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-between"
                        disabled={!selectedCountry}
                        id="states-edit-trigger"
                      >
                        {selectedStates.length > 0 ? `${selectedStates.length} selected` : "Select..."}
                        <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Search..." value={stateSearch} onValueChange={setStateSearch} />
                        <CommandList>
                          <CommandEmpty>No state found.</CommandEmpty>
                          <CommandGroup>
                            {filteredStates.map((state) => (
                              <CommandItem key={state} value={state} onSelect={() => handleStateToggle(state)}>
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    selectedStates.includes(state) ? "opacity-100" : "opacity-0",
                                  )}
                                />
                                {state}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="p-4">
                <Label>Thumbnail</Label>
              </CardHeader>
              <CardContent className="pt-0 p-4">
                <div className="border-2 border-dashed rounded-lg p-4 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailChange}
                    className="hidden"
                    id="thumbnail-upload-edit"
                    ref={thumbnailInputRef}
                  />
                  {formData.thumbnailPreview ? (
                    <div className="space-y-2 cursor-default pointer-events-none opacity-50">
                      <Image
                        width={128}
                        height={128}
                        src={
                          formData.thumbnailPreview ||
                          "/placeholder.svg?width=128&height=128&query=thumbnail+placeholder"
                        }
                        alt="Thumbnail preview"
                        className="max-h-32 w-auto mx-auto rounded-md object-contain"
                      />
                      {formData.thumbnail && (
                        <p className="text-xs text-gray-500 truncate" title={formData.thumbnail.name}>
                          New: {formData.thumbnail.name}
                        </p>
                      )}
                      {/* <Button
                        variant="outline"
                        size="sm"
                        onClick={handleRemoveThumbnail}
                        className="w-full text-red-500 border-red-500 hover:bg-red-50 hover:text-red-600 text-xs"
                      >
                        <X className="mr-1 h-3 w-3" /> Remove
                      </Button> */}
                    </div>
                  ) : (
                    <label
                      htmlFor="thumbnail-upload-edit"
                      className="cursor-pointer flex flex-col items-center justify-center space-y-1 py-2"
                    >
                      <ImageIcon className="h-10 w-10 text-gray-400" />
                      <p className="text-xs text-gray-600">Upload thumbnail</p>
                    </label>
                  )}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="p-4">
                <Label>Resource File</Label>
              </CardHeader>
              <CardContent className="pt-0 p-4">
                <div className="border-2 border-dashed rounded-lg p-4 text-center space-y-2 cursor-default pointer-events-none opacity-50">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload-edit"
                    ref={fileInputRef}
                  />
                  {formData.file ? (
                    <div className="space-y-2">
                      <FileText className="mx-auto h-10 w-10 text-gray-400" />
                      <p className="text-xs text-gray-500 truncate" title={formData.file.name}>
                        New: {formData.file.name}
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleRemoveFile}
                        className="w-full text-red-500 border-red-500 hover:bg-red-50 hover:text-red-600 text-xs"
                      >
                        <X className="mr-1 h-3 w-3" /> Remove / Change
                      </Button>
                    </div>
                  ) : formData.existingFileName ? (
                    <div className="space-y-2">
                      <FileText className="mx-auto h-10 w-10 text-gray-400" />
                      <p className="text-xs text-gray-500 truncate" title={formData.existingFileName}>
                        Current: {formData.existingFileName}
                      </p>
                      <label
                        htmlFor="file-upload-edit"
                        className="cursor-pointer text-xs text-blue-600 hover:underline"
                      >
                        Click to change file
                      </label>
                    </div>
                  ) : (
                    <label
                      htmlFor="file-upload-edit"
                      className="cursor-pointer flex flex-col items-center justify-center space-y-1 py-2"
                    >
                      <FileText className="mx-auto h-10 w-10 text-gray-400" />
                      <p className="text-xs text-gray-600">Upload file</p>
                    </label>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <DialogFooter className="pt-4 border-t">
          <Button onClick={() => onOpenChange(false)} variant="outline">
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
