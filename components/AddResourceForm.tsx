"use client";

import type React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, ChevronDown, FileText, ImageIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

// import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => (
    <div className="h-[300px] border border-gray-300 rounded-md flex items-center justify-center">
      Loading editor...
    </div>
  ),
});

interface Division {
  divisionName: string;
}

interface StateItem {
  stateName: string;
  divisions: Division[];
}

interface Country {
  _id: string;
  countryName: string;
  states: StateItem[];
}

interface PracticeArea {
  _id: string;
  name: string;
  description: string;
  subPracticeAreas?: { _id: string; name: string }[];
}

interface ResourceType {
  _id: string;
  resourceTypeName: string;
  description: string;
}

interface FormDataState {
  title: string;
  discountPrice: string;
  quantity: string;
  format: string;
  country: string;
  states: string[];
  divisions: string[];
  description: string;
  practiceArea: string; // stores _id
  resourceType: string; // stores _id
  thumbnail: File | null; // ✅ only upload, no default
  file: File | null;
  images: File[];
  productStatus: "pending" | "draft";
}

type MeResponse = {
  data?: {
    stripeAccountId?: string | null;
  };
};

export default function ResourceForm() {
  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: session } = useSession();

  // ✅ safest way to read token (avoids TS error)
  const API_TOKEN = useMemo(() => {
    const s = session as unknown as {
      user?: { accessToken?: string; id?: string };
      accessToken?: string;
    } | null;

    return s?.user?.accessToken || s?.accessToken || "";
  }, [session]);

  const userId = useMemo(() => {
    const s = session as unknown as { user?: { id?: string } } | null;
    return s?.user?.id || "";
  }, [session]);

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

  const [isClient, setIsClient] = useState(false);

  // location selection
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [selectedDivisions, setSelectedDivisions] = useState<string[]>([]);
  const [countryOpen, setCountryOpen] = useState(false);
  const [stateOpen, setStateOpen] = useState(false);
  const [divisionOpen, setDivisionOpen] = useState(false);
  const [stateSearch, setStateSearch] = useState("");
  const [divisionSearch, setDivisionSearch] = useState("");

  // preview states
  const [thumbnailPreview, setThumbnailPreview] = useState<string>("");
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  // practice/resource
  const [selectedSubAreas, setSelectedSubAreas] = useState<string[]>([]);
  const [practiceAreaName, setPracticeAreaName] = useState("");

  // submit UI
  const [isPublishing, setIsPublishing] = useState(false);
  const [isDrafting, setIsDrafting] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  // validation
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<FormDataState>({
    title: "",
    discountPrice: "",
    quantity: "",
    format: "",
    country: "",
    productStatus: "pending",
    states: [],
    divisions: [],
    description: "",
    practiceArea: "",
    resourceType: "",
    thumbnail: null,
    file: null,
    images: [],
  });

  useEffect(() => setIsClient(true), []);

  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ align: [] }],
        ["clean"],
      ],
    }),
    []
  );

  const formats = useMemo(
    () => [
      "header",
      "bold",
      "italic",
      "underline",
      "strike",
      "list",
      "bullet",
      "align",
    ],
    []
  );

  // -------------------- Queries --------------------
  const countriesQuery = useQuery<Country[]>({
    queryKey: ["countries-all"],
    enabled: Boolean(API_BASE_URL && API_TOKEN),
    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}/country-state/all`, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      const data = (await res.json()) as { success?: boolean; data?: Country[] };
      return data.success ? data.data || [] : [];
    },
  });

  const practiceAreasQuery = useQuery<PracticeArea[]>({
    queryKey: ["practiceAreas-all"],
    enabled: Boolean(API_BASE_URL && API_TOKEN),
    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}/practice-area/all`, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw new Error("Failed to fetch practice areas");
      const data = (await res.json()) as {
        success?: boolean;
        data?: PracticeArea[];
      };
      return data.success ? data.data || [] : [];
    },
  });

  const resourceTypesQuery = useQuery<ResourceType[]>({
    queryKey: ["resourceTypes-all"],
    enabled: Boolean(API_BASE_URL && API_TOKEN),
    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}/resource-type/all`, {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw new Error("Failed to fetch resource types");
      const data = (await res.json()) as {
        success?: boolean;
        data?: ResourceType[];
      };
      return data.success ? data.data || [] : [];
    },
  });

  const meQuery = useQuery<MeResponse>({
    queryKey: ["me", userId],
    enabled: Boolean(API_BASE_URL && API_TOKEN && userId),
    queryFn: async () => {
      const res = await fetch(`${API_BASE_URL}/user/${userId}`, {
        headers: { Authorization: `Bearer ${API_TOKEN}` },
      });
      if (!res.ok) throw new Error("Failed to fetch user data");
      return (await res.json()) as MeResponse;
    },
  });

  const selectedPracticeAreaObj = useMemo(() => {
    return practiceAreasQuery.data?.find((p) => p._id === formData.practiceArea);
  }, [practiceAreasQuery.data, formData.practiceArea]);

  // -------------------- Helpers --------------------
  const handleInputChange = (field: keyof FormDataState, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (id: string, checked: boolean) => {
    setSelectedSubAreas((prev) =>
      checked ? [...prev, id] : prev.filter((x) => x !== id)
    );
  };

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setSelectedStates([]);
    setSelectedDivisions([]);
    setFormData((prev) => ({
      ...prev,
      country: country.countryName,
      states: [],
      divisions: [],
    }));
    setCountryOpen(false);
  };

  const handleStateToggle = (stateName: string) => {
    const newStates = selectedStates.includes(stateName)
      ? selectedStates.filter((s) => s !== stateName)
      : [...selectedStates, stateName];

    setSelectedStates(newStates);
    setSelectedDivisions([]);
    setFormData((prev) => ({
      ...prev,
      states: newStates,
      divisions: [],
    }));
  };

  const handleDivisionToggle = (divisionName: string) => {
    const newDivisions = selectedDivisions.includes(divisionName)
      ? selectedDivisions.filter((d) => d !== divisionName)
      : [...selectedDivisions, divisionName];

    setSelectedDivisions(newDivisions);
    setFormData((prev) => ({ ...prev, divisions: newDivisions }));
  };

  // ✅ ONLY thumbnail upload
  const handleThumbnailUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;

    if (thumbnailPreview) URL.revokeObjectURL(thumbnailPreview);

    if (!file) {
      setFormData((prev) => ({ ...prev, thumbnail: null }));
      setThumbnailPreview("");
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please upload only image files for thumbnail.",
        variant: "destructive",
      });
      setFormData((prev) => ({ ...prev, thumbnail: null }));
      setThumbnailPreview("");
      event.target.value = "";
      return;
    }

    setFormData((prev) => ({ ...prev, thumbnail: file }));
    setThumbnailPreview(URL.createObjectURL(file));
    event.target.value = "";
  };

  const handleRemoveThumbnail = () => {
    if (thumbnailPreview) URL.revokeObjectURL(thumbnailPreview);
    setThumbnailPreview("");
    setFormData((prev) => ({ ...prev, thumbnail: null }));
    if (thumbnailInputRef.current) thumbnailInputRef.current.value = "";
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, file: uploadedFile }));
  };

  const handleImagesUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    const maxImages = 4;
    const remainingSlots = maxImages - formData.images.length;

    if (remainingSlots <= 0) {
      toast({
        title: "Image limit reached",
        description: "You can only upload a maximum of 4 images.",
        variant: "destructive",
      });
      event.target.value = "";
      return;
    }

    const imageFiles = newFiles.filter((f) => f.type.startsWith("image/"));
    const filesToAdd = imageFiles.slice(0, remainingSlots);

    if (filesToAdd.length === 0) {
      toast({
        title: "Invalid file type",
        description: "Please upload image files only.",
        variant: "destructive",
      });
      event.target.value = "";
      return;
    }

    setFormData((prev) => ({ ...prev, images: [...prev.images, ...filesToAdd] }));
    setImagePreviews((prev) => [
      ...prev,
      ...filesToAdd.map((f) => URL.createObjectURL(f)),
    ]);

    event.target.value = "";
  };

  const handleRemoveImage = (indexToRemove: number) => {
    const url = imagePreviews[indexToRemove];
    if (url) URL.revokeObjectURL(url);

    setImagePreviews((prev) => prev.filter((_, i) => i !== indexToRemove));
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== indexToRemove),
    }));
  };

  // -------------------- Validation --------------------
  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.practiceArea) errors.practiceArea = "This field is required";
    if (!formData.title.trim()) errors.title = "This field is required";
    if (!formData.quantity || Number.parseInt(formData.quantity) <= 0)
      errors.quantity = "Quantity must be a positive integer";
    if (!formData.resourceType) errors.resourceType = "This field is required";
    if (!formData.discountPrice.trim())
      errors.discountPrice = "This field is required";
    if (!formData.format) errors.format = "This field is required";
    if (!formData.country) errors.country = "This field is required";
    if (formData.states.length === 0) errors.states = "This field is required";
    if (formData.divisions.length === 0)
      errors.divisions = "This field is required";
    if (!formData.description.trim())
      errors.description = "This field is required";
    if (!formData.thumbnail) errors.thumbnail = "Thumbnail is required";
    if (!formData.file) errors.file = "This field is required";

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // -------------------- Mutation --------------------
  const submitMutation = useMutation({
    mutationFn: async (current: FormDataState) => {
      const submitData = new FormData();
      submitData.append("title", current.title);
      submitData.append("description", current.description);
      submitData.append("discountPrice", current.discountPrice);
      submitData.append("format", current.format);
      submitData.append("quantity", current.quantity);
      submitData.append("country", current.country);
      submitData.append("productStatus", current.productStatus);

      current.states.forEach((s) => submitData.append("states[]", s));
      current.divisions.forEach((d) => submitData.append("divisions[]", d));
      selectedSubAreas.forEach((id) => submitData.append("subPracticeAreas[]", id));

      const paObj = practiceAreasQuery.data?.find((p) => p._id === current.practiceArea);
      if (paObj) submitData.append("practiceAreas[]", paObj.name);

      const rtObj = resourceTypesQuery.data?.find((rt) => rt._id === current.resourceType);
      if (rtObj) submitData.append("resourceType[]", rtObj.resourceTypeName);

      if (current.thumbnail) submitData.append("thumbnail", current.thumbnail);
      if (current.file) submitData.append("file", current.file);
      current.images.forEach((img) => submitData.append("images", img));

      const res = await fetch(`${API_BASE_URL}/resource`, {
        method: "POST",
        headers: { Authorization: `Bearer ${API_TOKEN}` },
        body: submitData,
      });

      if (!res.ok) {
        const err = (await res.json().catch(() => ({}))) as { message?: string };
        throw new Error(err.message || "Failed to submit resource");
      }

      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Resource has been submitted successfully.",
      });

      setIsPublishing(false);
      setIsDrafting(false);

      queryClient.invalidateQueries({ queryKey: ["resources"] });
      router.push("/dashboard/resources/list");
    },
    onError: (error: Error) => {
      setIsPublishing(false);
      setIsDrafting(false);

      toast({
        title: "Error",
        description: error.message || "Something went wrong.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (action: "publish" | "draft") => {
    setFormSubmitted(true);

    if (!validateForm()) {
      toast({
        title: "Missing required fields",
        description: "Please fill all required fields before submitting.",
        variant: "destructive",
      });
      return;
    }

    if (action === "publish") setIsPublishing(true);
    if (action === "draft") setIsDrafting(true);

    submitMutation.mutate({
      ...formData,
      productStatus: action === "publish" ? "pending" : "draft",
    });
  };

  // derive practice area name for preview
  useEffect(() => {
    const obj = practiceAreasQuery.data?.find((p) => p._id === formData.practiceArea);
    setPracticeAreaName(obj?.name || "");
    // reset subareas when practice area changes
    setSelectedSubAreas([]);
  }, [formData.practiceArea, practiceAreasQuery.data]);

  const filteredStates =
    selectedCountry?.states.filter((state) =>
      state.stateName.toLowerCase().includes(stateSearch.toLowerCase())
    ) || [];

  const availableDivisions =
    selectedCountry?.states
      .filter((state) => selectedStates.includes(state.stateName))
      .flatMap((state) => state.divisions)
      .filter((division) =>
        division.divisionName.toLowerCase().includes(divisionSearch.toLowerCase())
      ) || [];

  // cleanup blob urls
  useEffect(() => {
    return () => {
      if (thumbnailPreview) URL.revokeObjectURL(thumbnailPreview);
      imagePreviews.forEach((u) => URL.revokeObjectURL(u));
    };
  }, [thumbnailPreview, imagePreviews]);

  const stripeOk = Boolean(meQuery.data?.data?.stripeAccountId);

  return (
    <div>
      <div className="max-w-9xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* LEFT */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">Add Resources</CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-base">
                    Add Title *
                  </Label>
                  <Input
                    id="title"
                    className={cn(
                      "h-[49px] border border-gray-500",
                      formSubmitted && fieldErrors.title && "border-red-500"
                    )}
                    placeholder="Add your title..."
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                  />
                  {formSubmitted && fieldErrors.title && (
                    <p className="text-red-600 text-sm mt-1">{fieldErrors.title}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="text-base font-semibold" htmlFor="discountPrice">
                      Discount Price *
                    </Label>
                    <Input
                      id="discountPrice"
                      className={cn(
                        "h-[49px] border border-gray-500",
                        formSubmitted && fieldErrors.discountPrice && "border-red-500"
                      )}
                      placeholder="Add Discount Price..."
                      value={formData.discountPrice}
                      onChange={(e) => handleInputChange("discountPrice", e.target.value)}
                    />
                    {formSubmitted && fieldErrors.discountPrice && (
                      <p className="text-red-600 text-sm mt-1">{fieldErrors.discountPrice}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-base font-semibold" htmlFor="quantity">
                      Quantity *
                    </Label>
                    <Input
                      id="quantity"
                      className={cn(
                        "h-[49px] border border-gray-500",
                        formSubmitted && fieldErrors.quantity && "border-red-500"
                      )}
                      placeholder="Add Quantity..."
                      value={formData.quantity}
                      onChange={(e) => handleInputChange("quantity", e.target.value)}
                    />
                    {formSubmitted && fieldErrors.quantity && (
                      <p className="text-red-600 text-sm mt-1">{fieldErrors.quantity}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="text-base font-semibold" htmlFor="format">
                      Format *
                    </Label>
                    <Select
                      value={formData.format}
                      onValueChange={(value) => handleInputChange("format", value)}
                    >
                      <SelectTrigger
                        className={cn(
                          "h-[49px] border border-gray-500",
                          formSubmitted && fieldErrors.format && "border-red-500"
                        )}
                      >
                        <SelectValue placeholder="Select format..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PDF">PDF</SelectItem>
                        <SelectItem value="Document">Doc</SelectItem>
                      </SelectContent>
                    </Select>
                    {formSubmitted && fieldErrors.format && (
                      <p className="text-red-600 text-sm mt-1">{fieldErrors.format}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Country *</Label>
                    <Popover open={countryOpen} onOpenChange={setCountryOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={countryOpen}
                          className={cn(
                            "w-full justify-between h-[49px] border",
                            formSubmitted && fieldErrors.country && "border-red-500"
                          )}
                          disabled={countriesQuery.isLoading}
                        >
                          {selectedCountry ? selectedCountry.countryName : "Select country..."}
                          <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput placeholder="Search country..." />
                          <CommandList>
                            <CommandEmpty>No country found.</CommandEmpty>
                            <CommandGroup>
                              {countriesQuery.data?.map((country) => (
                                <CommandItem
                                  key={country._id}
                                  value={country.countryName}
                                  onSelect={() => handleCountrySelect(country)}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      selectedCountry?._id === country._id ? "opacity-100" : "opacity-0"
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
                    {formSubmitted && fieldErrors.country && (
                      <p className="text-red-600 text-sm mt-1">{fieldErrors.country}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>States *</Label>
                    <Popover open={stateOpen} onOpenChange={setStateOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={stateOpen}
                          className={cn(
                            "w-full justify-between h-[49px] border",
                            formSubmitted && fieldErrors.states && "border-red-500"
                          )}
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
                                  key={state.stateName}
                                  value={state.stateName}
                                  onSelect={() => handleStateToggle(state.stateName)}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      selectedStates.includes(state.stateName) ? "opacity-100" : "opacity-0"
                                    )}
                                  />
                                  {state.stateName}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    {formSubmitted && fieldErrors.states && (
                      <p className="text-red-600 text-sm mt-1">{fieldErrors.states}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Divisions *</Label>
                    <Popover open={divisionOpen} onOpenChange={setDivisionOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={divisionOpen}
                          className={cn(
                            "w-full justify-between h-[49px] border",
                            formSubmitted && fieldErrors.divisions && "border-red-500"
                          )}
                          disabled={selectedStates.length === 0}
                        >
                          {selectedDivisions.length > 0
                            ? `${selectedDivisions.length} division(s) selected`
                            : "Select divisions..."}
                          <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search divisions..."
                            value={divisionSearch}
                            onValueChange={setDivisionSearch}
                          />
                          <CommandList>
                            <CommandEmpty>No division found.</CommandEmpty>
                            <CommandGroup>
                              {availableDivisions.map((division) => (
                                <CommandItem
                                  key={division.divisionName}
                                  value={division.divisionName}
                                  onSelect={() => handleDivisionToggle(division.divisionName)}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      selectedDivisions.includes(division.divisionName)
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {division.divisionName}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    {formSubmitted && fieldErrors.divisions && (
                      <p className="text-red-600 text-sm mt-1">{fieldErrors.divisions}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <div
                    className={cn(
                      "rounded-md border border-gray-300 h-[300px] overflow-hidden",
                      formSubmitted && fieldErrors.description && "border-red-500"
                    )}
                  >
                    {isClient && (
                      <ReactQuill
                        theme="snow"
                        value={formData.description}
                        onChange={(content) => handleInputChange("description", content)}
                        modules={modules}
                        formats={formats}
                        className="h-[300px] rounded-md"
                        style={{ height: "300px" }}
                      />
                    )}
                  </div>
                  {formSubmitted && fieldErrors.description && (
                    <p className="text-red-600 text-sm mt-1">{fieldErrors.description}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <Label className="text-base font-semibold">Practice Area *</Label>
                  <Select
                    value={formData.practiceArea}
                    onValueChange={(value) => handleInputChange("practiceArea", value)}
                  >
                    <SelectTrigger
                      className={cn(
                        "h-[49px] border border-gray-400",
                        formSubmitted && fieldErrors.practiceArea && "border-red-500"
                      )}
                    >
                      <SelectValue placeholder="Select a practice area" />
                    </SelectTrigger>
                    <SelectContent>
                      {practiceAreasQuery.isLoading ? (
                        <SelectItem value="loading" disabled>
                          Loading...
                        </SelectItem>
                      ) : (
                        practiceAreasQuery.data?.map((area) => (
                          <SelectItem key={area._id} value={area._id}>
                            {area.name}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  {formSubmitted && fieldErrors.practiceArea && (
                    <p className="text-red-600 text-sm mt-1">{fieldErrors.practiceArea}</p>
                  )}
                </div>

                {/* ✅ subPracticeAreas uses _id (no type bug) */}
                <div>
                  {selectedPracticeAreaObj?.subPracticeAreas?.map((subArea) => (
                    <div key={subArea._id} className="flex items-center space-x-2 mt-2">
                      <Checkbox
                        id={subArea._id}
                        checked={selectedSubAreas.includes(subArea._id)}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange(subArea._id, Boolean(checked))
                        }
                      />
                      <Label htmlFor={subArea._id} className="text-sm font-medium">
                        {subArea.name}
                      </Label>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 mt-4">
                  <Label className="text-base font-semibold">Resource Type *</Label>
                  <Select
                    value={formData.resourceType}
                    onValueChange={(value) => handleInputChange("resourceType", value)}
                  >
                    <SelectTrigger
                      className={cn(
                        "h-[49px] border border-gray-400",
                        formSubmitted && fieldErrors.resourceType && "border-red-500"
                      )}
                    >
                      <SelectValue placeholder="Select a resource type" />
                    </SelectTrigger>
                    <SelectContent>
                      {resourceTypesQuery.isLoading ? (
                        <SelectItem value="loading" disabled>
                          Loading...
                        </SelectItem>
                      ) : (
                        resourceTypesQuery.data?.map((type) => (
                          <SelectItem key={type._id} value={type._id}>
                            {type.resourceTypeName}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  {formSubmitted && fieldErrors.resourceType && (
                    <p className="text-red-600 text-sm mt-1">{fieldErrors.resourceType}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* ✅ Thumbnail (no default images) */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Thumbnail *</CardTitle>
                <CardDescription>Upload a thumbnail image</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="thumbnail-upload" className="text-base font-semibold">
                    Upload Thumbnail
                  </Label>

                  <div
                    className={cn(
                      "border-2 border-dashed border-gray-300 rounded-lg p-4 text-center bg-gray-50 hover:bg-gray-100 transition-colors",
                      formSubmitted && fieldErrors.thumbnail && "border-red-500 bg-red-50"
                    )}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleThumbnailUpload}
                      className="hidden"
                      id="thumbnail-upload"
                      ref={thumbnailInputRef}
                    />
                    <label
                      htmlFor="thumbnail-upload"
                      className="cursor-pointer flex flex-col items-center justify-center space-y-2 py-4"
                    >
                      <ImageIcon className="h-10 w-10 text-gray-400" />
                      <p className="text-sm font-medium text-gray-700">Upload from Device</p>
                      <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                    </label>
                  </div>

                  {formSubmitted && fieldErrors.thumbnail && (
                    <p className="text-red-600 text-sm mt-1">{fieldErrors.thumbnail}</p>
                  )}
                </div>

                {/* ✅ preview uses <img> so blob works always */}
                {thumbnailPreview ? (
                  <div className="space-y-3">
                    <img
                      src={thumbnailPreview}
                      alt="Thumbnail preview"
                      className="max-h-40 w-auto mx-auto rounded-md object-contain border"
                    />
                    <p className="text-sm text-gray-600 truncate" title={formData.thumbnail?.name}>
                      {formData.thumbnail?.name}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleRemoveThumbnail}
                      className="w-full text-red-600 border-red-600 hover:bg-red-50 hover:text-red-700"
                    >
                      <X className="mr-2 h-4 w-4" /> Remove Thumbnail
                    </Button>
                  </div>
                ) : null}
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <Label>File (PDF, Word, etc.) *</Label>
                  <div
                    className={cn(
                      "border-2 border-dashed border-gray-300 rounded-lg p-8 text-center",
                      formSubmitted && fieldErrors.file && "border-red-500 bg-red-50"
                    )}
                  >
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <FileText className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-600">
                        {formData.file ? formData.file.name : "Click to upload file *"}
                      </p>
                    </label>
                  </div>
                  {formSubmitted && fieldErrors.file && (
                    <p className="text-red-600 text-sm mt-1">{fieldErrors.file}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upload Images</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <Label htmlFor="images-upload">
                    Additional Images ({formData.images.length}/4 maximum)
                  </Label>
                  <div
                    className={cn(
                      "border-2 border-dashed rounded-lg p-6 text-center",
                      formData.images.length >= 4 ? "border-gray-200 bg-gray-50" : "border-gray-300"
                    )}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImagesUpload}
                      className="hidden"
                      id="images-upload"
                      disabled={formData.images.length >= 4}
                    />
                    <label
                      htmlFor="images-upload"
                      className={cn(
                        "flex flex-col items-center justify-center space-y-2 py-4",
                        formData.images.length >= 4 ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                      )}
                    >
                      <ImageIcon className="h-12 w-12 text-gray-400" />
                      <p className="text-sm text-gray-600">
                        {formData.images.length >= 4
                          ? "Maximum 4 images reached"
                          : "Click or drag to upload images"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formData.images.length >= 4
                          ? "Remove an image to add more"
                          : "PNG, JPG, GIF up to 5MB each (Max 4 images)"}
                      </p>
                    </label>
                  </div>

                  {imagePreviews.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {imagePreviews.map((previewUrl, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={previewUrl}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-24 object-cover rounded-md"
                          />
                          <Button
                            variant="destructive"
                            size="icon"
                            className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => handleRemoveImage(index)}
                            type="button"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                          <p className="text-xs text-gray-500 truncate mt-1" title={formData.images[index]?.name}>
                            {formData.images[index]?.name}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Button className="w-full" onClick={() => setPreviewOpen(true)} type="button">
              Preview
            </Button>

            <div className="flex gap-4 items-center justify-center">
              <Button
                onClick={() => handleSubmit("publish")}
                className={cn("w-full", isPublishing && "opacity-70 cursor-not-allowed")}
                disabled={isPublishing || !stripeOk}
                type="button"
              >
                {isPublishing ? "Requesting..." : "Add Resources"}
              </Button>

              <Button
                onClick={() => handleSubmit("draft")}
                className={cn("w-full", isDrafting && "opacity-70 cursor-not-allowed")}
                disabled={isDrafting}
                type="button"
              >
                {isDrafting ? "Drafting..." : "Draft"}
              </Button>
            </div>
          </div>
        </div>

        {/* PREVIEW MODAL */}
        <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Preview Data</DialogTitle>
            </DialogHeader>

            <div className="space-y-3">
              <p>
                <strong>Title:</strong> {formData.title}
              </p>
              <p>
                <strong>Discount Price:</strong> {formData.discountPrice}
              </p>
              <p>
                <strong>Quantity:</strong> {formData.quantity}
              </p>
              <p>
                <strong>Format:</strong> {formData.format}
              </p>
              <p>
                <strong>Country:</strong> {formData.country}
              </p>
              <p>
                <strong>States:</strong> {formData.states.join(", ")}
              </p>
              <p>
                <strong>Divisions:</strong> {formData.divisions.join(", ")}
              </p>
              <p>
                <strong>Practice Area:</strong> {practiceAreaName}
              </p>

              <div>
                <strong>Thumbnail:</strong>
                {thumbnailPreview ? (
                  <img
                    src={thumbnailPreview}
                    alt="Thumbnail Preview"
                    className="w-32 h-32 object-cover border mt-2"
                  />
                ) : (
                  <p className="text-sm text-gray-500 mt-1">No thumbnail selected</p>
                )}
              </div>

              {formData.file && (
                <p>
                  <strong>File:</strong> {formData.file.name}
                </p>
              )}

              {imagePreviews.length > 0 && (
                <div>
                  <strong>Images:</strong>
                  <div className="flex gap-2 flex-wrap mt-2">
                    {imagePreviews.map((src, idx) => (
                      <img
                        key={idx}
                        src={src}
                        alt={`Image ${idx + 1}`}
                        className="w-24 h-24 object-cover border"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}





