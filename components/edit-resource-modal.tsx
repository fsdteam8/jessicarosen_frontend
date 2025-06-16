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
    existingFileName: null,
  })

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

   const session = useSession();
        const API_TOKEN = session?.data?.user?.accessToken;
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
      })
      setSelectedStates(resource.states || [])
      const countryObj = countriesData.find((c) => c.countryName === resource.country)
      setSelectedCountry(countryObj || null)
    }
  }, [resource, countriesData, practiceAreasData, resourceTypesData, open]) // Added `open` to reset form state when modal reopens

  const { mutate: updateResource, isPending: isSubmitting } = useMutation({
    mutationFn: async (currentFormData: FormDataState) => {
      if (!resource) throw new Error("No resource selected for update.")
//@ts-nocheck //
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
        // **IMPORTANT**: A new thumbnail file has been selected.
        // You need to upload this `currentFormData.thumbnail` to your storage (e.g., Cloudinary, S3, or a dedicated backend endpoint)
        // and get a URL in return.
        // For this example, we'll use a placeholder URL. Replace this with actual upload logic.
        // const thumbnailUrl = await uploadFileAndGetUrl(currentFormData.thumbnail); // Your actual upload function
        const thumbnailUrl = `https://res.cloudinary.com/your_cloud/image/upload/v_placeholder/new_thumb_${currentFormData.thumbnail.name}` // Placeholder
        metadataUpdatePayload.thumbnail = thumbnailUrl
        toast({ title: "Dev Note", description: "Thumbnail would be uploaded and URL sent.", variant: "default" })
      } else if (
        currentFormData.thumbnail === null &&
        currentFormData.thumbnailPreview === null &&
        currentFormData.existingThumbnailUrl
      ) {
        // Thumbnail was explicitly removed by the user (and there was an existing one)
        metadataUpdatePayload.thumbnail = null // Or "" depending on how your API handles removal
      } else if (currentFormData.existingThumbnailUrl) {
        // No change to thumbnail, keep existing URL (if API expects it, otherwise omit)
        // Some APIs might not require sending the URL if it's unchanged.
        // If your API clears the field if not sent, you MUST send the existing URL.
        metadataUpdatePayload.thumbnail = currentFormData.existingThumbnailUrl
      } else {
        // No existing thumbnail and no new one selected
        metadataUpdatePayload.thumbnail = null
      }

      // --- Main File Handling (similar logic to thumbnail) ---
      if (currentFormData.file instanceof File) {
        // **IMPORTANT**: A new main file has been selected.
        // Upload `currentFormData.file` and get its URL.
        // const fileUrl = await uploadFileAndGetUrl(currentFormData.file); // Your actual upload function
        const fileUrl = `https://res.cloudinary.com/your_cloud/raw/upload/v_placeholder/new_file_${currentFormData.file.name}` // Placeholder
        metadataUpdatePayload.file = { url: fileUrl, type: currentFormData.file.type } // Assuming API expects {url, type}
        toast({ title: "Dev Note", description: "Main file would be uploaded and URL sent.", variant: "default" })
      } else if (currentFormData.file === null && currentFormData.existingFileUrl === null && resource.file?.url) {
        // Main file was explicitly removed
        metadataUpdatePayload.file = null // Or an appropriate structure to indicate removal
      } else if (currentFormData.existingFileUrl) {
        metadataUpdatePayload.file = { url: currentFormData.existingFileUrl, type: resource.file?.type || "" } // Send existing if no change
      } else {
        metadataUpdatePayload.file = null
      }

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

  const handleInputChange = (field: keyof FormDataState, value: string) => {
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
    if (formData.thumbnailPreview && formData.thumbnailPreview.startsWith("blob:")) {
      URL.revokeObjectURL(formData.thumbnailPreview)
    }
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast({ title: "Invalid file type", description: "Please upload an image.", variant: "destructive" })
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

  const handleRemoveThumbnail = () => {
    if (formData.thumbnailPreview && formData.thumbnailPreview.startsWith("blob:")) {
      URL.revokeObjectURL(formData.thumbnailPreview)
    }
    setFormData((prev) => ({ ...prev, thumbnail: null, thumbnailPreview: null })) // Keep existingThumbnailUrl to know original state
    if (thumbnailInputRef.current) thumbnailInputRef.current.value = ""
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null
    setFormData((prev) => ({ ...prev, file: file, existingFileName: file ? file.name : prev.existingFileName }))
    if (!file && fileInputRef.current) {
      // If selection cancelled, reset input
      fileInputRef.current.value = ""
      setFormData((prev) => ({
        ...prev,
        existingFileName: resource?.file?.url?.substring(resource.file.url.lastIndexOf("/") + 1) || null,
      }))
    }
  }

  const handleRemoveFile = () => {
    setFormData((prev) => ({ ...prev, file: null, existingFileName: null })) // Keep existingFileUrl to know original state
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const handleSubmit = () => {
    updateResource(formData)
  }

  const filteredStates =
    selectedCountry?.states.filter((state) => state.toLowerCase().includes(stateSearch.toLowerCase())) || []
  const modules = {
    toolbar: [[{ header: [1, 2, false] }], ["bold", "italic", "underline"], [{ list: "ordered" }, { list: "bullet" }]],
  }

  useEffect(() => {
    const currentPreview = formData.thumbnailPreview
    return () => {
      if (currentPreview && currentPreview.startsWith("blob:")) {
        URL.revokeObjectURL(currentPreview)
      }
    }
  }, [formData.thumbnailPreview])

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
                    id="thumbnail-upload-edit" // Unique ID for edit modal
                    ref={thumbnailInputRef}
                  />
                  {formData.thumbnailPreview ? (
                    <div className="space-y-2">
                      <Image
                        width={128}
                        height={128}
                        // thumbnail?.[0] ||
                        src={formData.thumbnailPreview || "/placeholder.svg"} // Shows blob URL for new, or existing URL
                        alt="Thumbnail"
                        className="max-h-32 w-auto mx-auto rounded-md object-contain"
                      />
                      {formData.thumbnail && ( // Show name only if it's a new file
                        <p className="text-xs text-gray-500 truncate" title={formData.thumbnail.name}>
                          New: {formData.thumbnail.name}
                        </p>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleRemoveThumbnail}
                        className="w-full text-red-500 border-red-500 hover:bg-red-50 hover:text-red-600 text-xs"
                      >
                        <X className="mr-1 h-3 w-3" /> Remove
                      </Button>
                    </div>
                  ) : (
                    <label
                      htmlFor="thumbnail-upload-edit"
                      className="cursor-pointer flex flex-col items-center justify-center space-y-1 py-2"
                    >
                      <ImageIcon className="h-10 w-10 text-gray-400" />
                      <p className="text-xs text-gray-600">Upload image</p>
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
                <div className="border-2 border-dashed rounded-lg p-4 text-center">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload-edit" // Unique ID for edit modal
                    ref={fileInputRef}
                  />
                  {formData.file ? ( // A new file is selected
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
                  ) : formData.existingFileName ? ( // Display existing file if no new one is selected
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
                    </div> // No new file and no existing file
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
