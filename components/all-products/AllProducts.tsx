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
import { CountriesApiResponse } from "@/types/countery-data-type";
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
  const [sortBy, setSortBy] = useState("");
  const [selectedPracticeArea, setSelectedPracticeArea] = useState<
    string | null
  >(null);
  const [selectedResourceType, setSelectedResourceType] = useState<
    string | null
  >(null);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [currentPage] = useState(1);

  // Fetch practice areas
  const { data } = useQuery<PracticeAreaApiResponse>({
    queryKey: ["practice-areas"],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/practice-area/all`).then(
        (res) => res.json()
      ),
  });

  console.log("Practice Areas Data:", data?.data);
  const practiceAreas = data?.data?.map((item) => item.name);
  console.log(practiceAreas);

  // Fetch resource types
  const { data: resourceTypeData } = useQuery<ResourceTypeApiResponse>({
    queryKey: ["resource-types"],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/resource-type/all`).then(
        (res) => res.json()
      ),
  });

  console.log("Resource Types Data:", resourceTypeData);

  // const resourceTypes = resourceTypeData?.data || [];
  const resourceTypes = resourceTypeData?.data?.map(
    (item) => item.resourceTypeName
  );

  console.log(resourceTypes);

  // countery data fetch
  const { data: countryData } = useQuery<CountriesApiResponse>({
    queryKey: ["all-countries"],
    queryFn: () =>
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/country-state/all`).then(
        (res) => res.json()
      ),
  });

  console.log(countryData?.data);
  const provinces =
    countryData?.data?.find((c) => c.countryName === countryNames)?.states ||
    [];

  // price

  const prices = [
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
      const query = `${range[0] * 1},${range[1] * 1}`;
      setSelectedPrice(query);
      console.log("Backend Query:", query);
    }
  };

  const formats = ["PDF", "Document"];

  const sortOptions = [
    { label: "Relevance", value: "relevance" },
    { label: "Rating", value: "rating" },
    { label: "Best Reviewed", value: "best reviewed" },
    { label: "Most Recent", value: "most recent" },
    { label: "Best Sellers (Products)", value: "best sellers(products)" },
    { label: "Best Sellers (People)", value: "best sellers(people)" },
  ];

  // const filterCategories = [
  //   { name: "Practice Areas", options: practiceAreas ?? [] },
  //   { name: "Resource Types", options: resourceTypes ?? [] },
  //   { name: "Prices", options: prices },
  //   { name: "format", options: formats },
  //   { name: "Province", options: provinces ?? [] },
  //   {
  //     name: "Sort By",
  //     options: sortOptions.map((option) => option.label),
  //   },
  // ];

  const [viewMode, setViewMode] = useState<"grid" | "list">("list");

  const selectedArea = useSelector(
    (state: RootState) => state.practiceArea.selectedArea
  );
  // Fetching all products data
  const { data: allProductData } = useQuery<AllProductDataTypeResponse>({
    queryKey: ["all-products"],
    queryFn: () =>
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/resource/get-all-resources?page=${currentPage}&limit=5000`
      ).then((res) => res.json()),
  });

  console.log(allProductData?.data?.length);

  useEffect(() => {
    if (selectedArea?.name) {
      setSelectedPracticeArea(selectedArea.name);
    }
  }, [selectedArea]);

  return (
    <div className="flex min-h-screen flex-col">
      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 lg:mt-[100px]">
        <div className="flex justify-between items-center mb-2">
          <div>
            <div className="text-sm text-gray-500 mb-2">
              {/* <div>
                {selectedArea ? (
                  <p>
                    Showing content for: <strong>{selectedArea.name}</strong>
                  </p>
                ) : (
                  <p>Please select a practice area.</p>
                )}
              </div> */}
              {allProductData?.data?.length}+ Results
            </div>
            <h1 className="lg:text-[40px] leading-[120%] font-bold mb-4">
              Resources
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

        <div className="lg:mb-[100px] mb-10">
          <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">
              {/* Left: Filter dropdowns */}
              <div className="flex flex-wrap gap-2 max-w-full md:max-w-[calc(100%-150px)]">
                {/* <FilterDropdown
                  title="Practice Areas"
                  options={practiceAreas ?? []}
                  onSelect={(value) => setSelectedPracticeArea(value)}
                /> */}

                <FilterDropdown
                  title="Practice Areas"
                  options={practiceAreas ?? []}
                  onSelect={(value) => setSelectedPracticeArea(value)}
                />

                <FilterDropdown
                  title="Resource Types"
                  options={resourceTypes ?? []}
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
                  onSelect={(value) => setSelectedProvince(value)}
                />
              </div>

              {/* Right: All Filters Drawer */}

              {/* <div className="flex-shrink-0">
                <AllFiltersDrawer categories={filterCategories} />
              </div> */}
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="w-full ">
          <Suspense fallback={<div>Loading products...</div>}>
            <ProductList
              viewMode={viewMode}
              sortBy={sortBy}
              practiceArea={selectedPracticeArea}
              resourceType={selectedResourceType}
              price={selectedPrice ?? undefined}
              format={selectedFormat ?? undefined}
              states={selectedProvince ?? undefined}
            />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
