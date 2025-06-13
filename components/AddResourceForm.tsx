"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Check, ChevronDown, FileText, ImageIcon } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";

// Import React Quill dynamically to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface Country {
  _id: string;
  countryName: string;
  states: string[];
}

interface PracticeArea {
  _id: string;
  name: string;
  description: string;
}

interface ResourceType {
  _id: string;
  resourceTypeName: string;
  description: string;
}

interface FormData {
  title: string;
  price: string;
  discountPrice: string;
  quantity: string;
  format: string;
  country: string;
  states: string[];
  description: string;
  practiceArea: string;
  resourceType: string;
  thumbnail: File | null;
  document: File | null;
}

export default function ResourceForm() {
  const { toast } = useToast();
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [countryOpen, setCountryOpen] = useState(false);
  const [stateOpen, setStateOpen] = useState(false);
  const [stateSearch, setStateSearch] = useState("");

  const [formData, setFormData] = useState<FormData>({
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
    document: null,
  });

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  const API_TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODNlZDVlYTY0ODUxNzk2MWZlYmQ2OGQiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3NDk3NDM4MTQsImV4cCI6MTc1MDM0ODYxNH0.jJksgiUUh5MM8Y1O8e8pZWFWAhG0g8oY4MYqPkMkuSI";

  // Quill editor modules and formats
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "align",
  ];

  // Fetch countries and states using TanStack Query
  const { data: countriesData, isLoading: isLoadingCountries } = useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/country-state/all`, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch countries");
      }

      const data = await response.json();
      return data.success ? data.data : [];
    },
  });

  // Fetch practice areas using TanStack Query
  const { data: practiceAreasData, isLoading: isLoadingPracticeAreas } =
    useQuery({
      queryKey: ["practiceAreas"],
      queryFn: async () => {
        const response = await fetch(`${API_BASE_URL}/practice-area/all`, {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch practice areas");
        }

        const data = await response.json();
        return data.success ? data.data : [];
      },
    });

  // Fetch resource types using TanStack Query
  const { data: resourceTypesData, isLoading: isLoadingResourceTypes } =
    useQuery({
      queryKey: ["resourceTypes"],
      queryFn: async () => {
        const response = await fetch(`${API_BASE_URL}/resource-type/all`, {
          headers: {
            Authorization: `Bearer ${API_TOKEN}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch resource types");
        }

        const data = await response.json();
        return data.success ? data.data : [];
      },
    });

  // Create mutation for form submission
  const { mutate: submitResource, isPending: isSubmitting } = useMutation({
    mutationFn: async (formData: FormData) => {
      const submitData = new FormData();
      submitData.append("title", formData.title);
      submitData.append("description", formData.description);
      submitData.append("price", formData.price);
      submitData.append("discountPrice", formData.discountPrice);
      submitData.append("format", formData.format);
      submitData.append("quantity", formData.quantity);
      submitData.append("country", formData.country);

      // Fix: Send states as an array
      formData.states.forEach((state) => {
        submitData.append("states[]", state);
      });

      // Fix: Send practiceAreas as an array
      submitData.append("practiceAreas[]", formData.practiceArea);

      // Fix: Send resourceType as an array
      submitData.append("resourceType[]", formData.resourceType);

      if (formData.thumbnail) {
        submitData.append("thumbnail", formData.thumbnail);
      }

      if (formData.document) {
        submitData.append("document", formData.document);
      }

      const response = await fetch(`${API_BASE_URL}/resource`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
        body: submitData,
      });

      if (!response.ok) {
        throw new Error("Failed to publish resource");
      }

      return await response.json();
    },
    onSuccess: (data) => {
      console.log("Resource published successfully:", data);
      toast({
        title: "Success!",
        description: "Resource has been published successfully.",
        variant: "default",
      });
    },
    onError: (error) => {
      console.error("Error publishing resource:", error);
      toast({
        title: "Error",
        description: "Failed to publish resource. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setSelectedStates([]);
    setFormData((prev) => ({
      ...prev,
      country: country.countryName,
      states: [],
    }));
    setCountryOpen(false);
  };

  const handleStateToggle = (state: string) => {
    const newStates = selectedStates.includes(state)
      ? selectedStates.filter((s) => s !== state)
      : [...selectedStates, state];

    setSelectedStates(newStates);
    setFormData((prev) => ({
      ...prev,
      states: newStates,
    }));
  };

  const handleThumbnailUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0] || null;

    // Only accept image files for thumbnail
    if (file && !file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload only image files for thumbnail.",
        variant: "destructive",
      });
      return;
    }

    setFormData((prev) => ({
      ...prev,
      thumbnail: file,
    }));
  };

  const handleDocumentUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      document: file,
    }));
  };

  const handleSubmit = () => {
    // Console log the form data
    console.log("Form Data:", {
      title: formData.title,
      description: formData.description,
      price: formData.price,
      discountPrice: formData.discountPrice,
      format: formData.format,
      quantity: formData.quantity,
      country: formData.country,
      states: formData.states,
      practiceAreas: [formData.practiceArea],
      resourceType: [formData.resourceType],
      thumbnail: formData.thumbnail,
      document: formData.document,
    });

    // Submit using mutation
    submitResource(formData);
  };

  const filteredStates =
    selectedCountry?.states.filter((state) =>
      state.toLowerCase().includes(stateSearch.toLowerCase())
    ) || [];

  return (
    <div className="max-w-9xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Section */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Add Resource</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">Add Title</Label>
                <Input
                  id="title"
                  placeholder="Add your title..."
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                />
              </div>

              {/* Price, Discount, Quantity, Format */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    placeholder="Add price.."
                    value={formData.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="discountPrice">Discount Price</Label>
                  <Input
                    id="discountPrice"
                    placeholder="Add Discount Price.."
                    value={formData.discountPrice}
                    onChange={(e) =>
                      handleInputChange("discountPrice", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    placeholder="Add Quantity.."
                    value={formData.quantity}
                    onChange={(e) =>
                      handleInputChange("quantity", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="format">Format</Label>
                  <Select
                    value={formData.format}
                    onValueChange={(value) =>
                      handleInputChange("format", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Add format.." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PDF">PDF</SelectItem>
                      <SelectItem value="Audio">Audio</SelectItem>
                      <SelectItem value="Video">Video</SelectItem>
                      <SelectItem value="Document">Document</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Country & State */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Country</Label>
                  <Popover open={countryOpen} onOpenChange={setCountryOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={countryOpen}
                        className="w-full justify-between"
                        disabled={isLoadingCountries}
                      >
                        {selectedCountry
                          ? selectedCountry.countryName
                          : "Select country..."}
                        <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Search country..." />
                        <CommandList>
                          <CommandEmpty>No country found.</CommandEmpty>
                          <CommandGroup>
                            {countriesData?.map((country: Country) => (
                              <CommandItem
                                key={country._id}
                                value={country.countryName}
                                onSelect={() => handleCountrySelect(country)}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    selectedCountry?._id === country._id
                                      ? "opacity-100"
                                      : "opacity-0"
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
                        role="combobox"
                        aria-expanded={stateOpen}
                        className="w-full justify-between"
                        disabled={!selectedCountry}
                      >
                        {selectedStates.length > 0
                          ? `${selectedStates.length} state(s) selected`
                          : "Select states..."}
                        <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search states..."
                          value={stateSearch}
                          onValueChange={setStateSearch}
                        />
                        <CommandList>
                          <CommandEmpty>No state found.</CommandEmpty>
                          <CommandGroup>
                            {filteredStates.map((state) => (
                              <CommandItem
                                key={state}
                                value={state}
                                onSelect={() => handleStateToggle(state)}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    selectedStates.includes(state)
                                      ? "opacity-100"
                                      : "opacity-0"
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
              </div>

              {/* Description with React Quill */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <div className="border rounded-md">
                  {typeof window !== "undefined" && (
                    <ReactQuill
                      theme="snow"
                      value={formData.description}
                      onChange={(content) =>
                        handleInputChange("description", content)
                      }
                      modules={modules}
                      formats={formats}
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
          {/* Practice Area */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <Label>Practice Area</Label>
                <Select
                  value={formData.practiceArea}
                  onValueChange={(value) =>
                    handleInputChange("practiceArea", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a practice area" />
                  </SelectTrigger>
                  <SelectContent>
                    {isLoadingPracticeAreas ? (
                      <SelectItem value="loading" disabled>
                        Loading...
                      </SelectItem>
                    ) : (
                      practiceAreasData?.map((area: PracticeArea) => (
                        <SelectItem key={area._id} value={area._id}>
                          {area.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Resource Type</Label>
                <Select
                  value={formData.resourceType}
                  onValueChange={(value) =>
                    handleInputChange("resourceType", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a resource type" />
                  </SelectTrigger>
                  <SelectContent>
                    {isLoadingResourceTypes ? (
                      <SelectItem value="loading" disabled>
                        Loading...
                      </SelectItem>
                    ) : (
                      resourceTypesData?.map((type: ResourceType) => (
                        <SelectItem key={type._id} value={type._id}>
                          {type.resourceTypeName}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Thumbnail */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <Label>Thumbnail (Images Only)</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailUpload}
                    className="hidden"
                    id="thumbnail-upload"
                  />
                  <label htmlFor="thumbnail-upload" className="cursor-pointer">
                    <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">
                      {formData.thumbnail
                        ? formData.thumbnail.name
                        : "Click to upload thumbnail image"}
                    </p>
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Document Upload */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <Label>Document (PDF, Word, etc.)</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                    onChange={handleDocumentUpload}
                    className="hidden"
                    id="document-upload"
                  />
                  <label htmlFor="document-upload" className="cursor-pointer">
                    <FileText className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">
                      {formData.document
                        ? formData.document.name
                        : "Click to upload document"}
                    </p>
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Publishing..." : "Publish Resources"}
          </Button>
        </div>
      </div>
    </div>
  );
}
