"use client";

import { Suspense, useEffect, useState } from "react";
import FilterDropdown from "./filter-dropdown";
// import AllFiltersDrawer from "./all-filters-drawer";
import SortDropdown from "./sort-dropdown";
import ViewToggle from "./view-toggle";
import ProductList from "./product-list";
import { useQuery } from "@tanstack/react-query";
import { PracticeAreaApiResponse } from "@/types/practice-area-data-type";
import { ResourceTypeApiResponse } from "@/types/resource-type-data-type";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CountriesApiResponse, Country, State } from "@/types/countery-data-type";
import { useAppSelector } from "@/redux/hooks";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { AllProductDataTypeResponse } from "@/types/all-product-dataType";

export default function AllProducts() {
  const currentRegion = useAppSelector((state) => state.region.currentRegion);
  const countryNames =
    currentRegion === "canada"
      ? "Canada"
      : currentRegion === "us"
      ? "USA"
      : null;

  const [sortBy, setSortBy] = useState<string>("");
  const [selectedPracticeArea, setSelectedPracticeArea] = useState<string | null>(null);
  const [selectedResourceType, setSelectedResourceType] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);

  // New state for divisions
  const [selectedDivision, setSelectedDivision] = useState<string | null>(null);
  const [divisionOptions, setDivisionOptions] = useState<string[]>([]);

  const [currentPage] = useState<number>(1);

  // Fetch practice areas
  const { data } = useQuery<PracticeAreaApiResponse>({
    queryKey: ["practice-areas"],
    queryFn: async () =>
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/practice-area/all`).then((res) => res.json()),
  });

  const practiceAreas = data?.data?.map((item) => item.name) ?? [];

  // Fetch resource types
  const { data: resourceTypeData } = useQuery<ResourceTypeApiResponse>({
    queryKey: ["resource-types"],
    queryFn: async () =>
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/resource-type/all`).then((res) => res.json()),
  });

  const resourceTypes = resourceTypeData?.data?.map((item) => item.resourceTypeName) ?? [];

  // Fetch country/state data
  const { data: countryData } = useQuery<CountriesApiResponse>({
    queryKey: ["all-countries"],
    queryFn: async () =>
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/country-state/all`).then((res) => res.json()),
  });

  // Find selected country
  const selectedCountry: Country | undefined = countryData?.data?.find(
    (c) => c.countryName === countryNames
  );

  // Get all states
  const allStates: string[] =
    countryData?.data?.flatMap((country) =>
      country.states?.map((state) => state.stateName) ?? []
    ) ?? [];

  // Use the specific country if found, otherwise use all states
  const provinces: string[] = selectedCountry?.states?.map((state) => state.stateName) ?? allStates;

  // Price options
  const prices: string[] = [
    "Under $50",
    "From $51-$100",
    "From $101-$150",
    "From $151-$200",
    "From $201-$250",
    "Under $251-$300",
    "From $301-$350",
    "From $351-$400",
    "From $401-$450",
    "From $451-$500",
    "From $501-$999",
    "Over $1000",
  ];

  const priceRangeMap: Record<string, [number, number]> = {
    "Under $50": [0, 50],
    "From $51-$100": [51, 100],
    "From $101-$150": [101, 150],
    "From $151-$200": [151, 200],
    "From $201-$250": [201, 250],
    "Under $251-$300": [251, 300],
    "From $301-$350": [301, 350],
    "From $351-$400": [351, 400],
    "From $401-$450": [401, 450],
    "From $451-$500": [451, 500],
    "From $501-$999": [501, 999],
    "Over $1000": [1000, Infinity],
  };

  const handlePriceSelect = (label: string) => {
    const range = priceRangeMap[label];
    if (range) {
      const query = `${range[0]},${range[1]}`;
      setSelectedPrice(query);
    }
  };

  const formats: string[] = ["PDF", "Document"];

  const sortOptions = [
    { label: "Relevance", value: "relevance" },
    { label: "Rating", value: "rating" },
    { label: "Best Reviewed", value: "best reviewed" },
    { label: "Most Recent", value: "most recent" },
    { label: "Best Sellers (Products)", value: "best sellers(products)" },
    { label: "Best Sellers (People)", value: "best sellers(people)" },
  ];

  const [viewMode, setViewMode] = useState<"grid" | "list">("list");

  const selectedArea = useSelector((state: RootState) => state.practiceArea.selectedArea);

  // Fetch all products
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: allProductData } = useQuery<AllProductDataTypeResponse>({
    queryKey: ["all-products"],
    queryFn: async () =>
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/resource/get-all-resources?page=${currentPage}&limit=5000`
      ).then((res) => res.json()),
  });

  useEffect(() => {
    if (selectedArea?.name) {
      setSelectedPracticeArea(selectedArea.name);
    }
  }, [selectedArea]);

  // Handle province select
  const handleProvinceSelect = (province: string) => {
    setSelectedProvince(province);
    setSelectedDivision(null); // Reset division

    // map only divisionName to string
    const divisions: string[] =
      selectedCountry?.states
        ?.find((s) => s.stateName === province)
        ?.divisions?.map((d) => d.divisionName) ?? [];

    setDivisionOptions(divisions);
  };

  return (
    <div className="flex h-auto md:min-h-screen flex-col">
      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 lg:mt-[100px]">
        <div className="flex justify-between items-center mb-2">
          <div>
            <h1 className="lg:text-[40px] leading-[120%] font-bold mb-4">
              All Resources
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-base font-medium leading-[120%] whitespace-nowrap">
              Short By:
            </span>
            <SortDropdown
              options={sortOptions}
              defaultValue="Sort By"
              onChange={(value: string) => setSortBy(value)}
            />
            <ViewToggle
              defaultView={viewMode}
              onChange={(mode) => setViewMode(mode)}
            />
          </div>
        </div>

        {/* Filters */}
        <div className="lg:mb-[100px] mb-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">
            <div className="flex flex-wrap gap-2 max-w-full md:max-w-[calc(100%-150px)]">
              <FilterDropdown
                title="Practice Areas"
                options={practiceAreas}
                onSelect={(value) => setSelectedPracticeArea(value)}
              />

              <FilterDropdown
                title="Resource Types"
                options={resourceTypes}
                onSelect={(value) => setSelectedResourceType(value)}
              />

              <FilterDropdown
                title="Prices"
                options={prices}
                onSelect={handlePriceSelect}
              />

              <FilterDropdown
                title="Format"
                options={formats}
                onSelect={(value) => setSelectedFormat(value)}
              />

              <FilterDropdown
                title="Province/State"
                options={provinces}
                onSelect={handleProvinceSelect}
              />

              <FilterDropdown
                title="Province/Division"
                options={divisionOptions}
                onSelect={(value) => setSelectedDivision(value)}
              />
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="w-full">
          <Suspense fallback={<div>Loading products...</div>}>
            <ProductList
              viewMode={viewMode}
              sortBy={sortBy}
              practiceArea={selectedPracticeArea ?? undefined}
              resourceType={selectedResourceType ?? undefined}
              price={selectedPrice ?? undefined}
              format={selectedFormat ?? undefined}
              states={selectedProvince ?? undefined}
              divisions={selectedDivision ?? undefined}
            />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
