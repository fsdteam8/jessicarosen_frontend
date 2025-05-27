"use client";

import { Suspense, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import FilterDropdown from "./filter-dropdown";
import CountryDropdown from "./country-dropdown";
import AllFiltersDrawer from "./all-filters-drawer";
import SortDropdown from "./sort-dropdown";
import ViewToggle from "./view-toggle";
import ProductList from "./product-list";

export default function AllProducts() {
  // Filter options
  const practiceAreas = [
    "Employment",
    "Corporate and M&A",
    "Litigation",
    "Legal Operations",
    "Professional Development",
    "Commercial Transactions",
    "Commercial Real Estate",
    "Finance",
    "Estates Law",
    "Wills Law",
    "Corporate Law",
  ];

  const resourceTypes = [
    "Checklist",
    "Contract",
    "Presentations",
    "Court Materials",
    "Practise Notes",
    "Glossary",
  ];

  const prices = [
    "Under $5.00",
    "From $6-$10",
    "From $11-$15",
    "From $16-$20",
    "From $21-$25",
  ];

  const formats = [
    "PDF",
    "Microsoft Word",
    "Ebook",
    "Easel",
    "Video",
    "Image",
    "PowerPoint",
    "Google Apps",
    "Digital",
  ];

  const countries = ["Canada", "USA (United States)"];

  const provinces = [
    "Ontario",
    "Alberta",
    "British Columbia",
    "Manitoba",
    "New Brunswick",
    "Newfoundland and Labrador",
    "Nova Scotia",
    "Prince Edward Island",
    "Quebec",
    "Saskatchewan",
    "Scotland",
  ];

  const sortOptions = [
    { label: "Best Reviewed", value: "best-reviewed" },
    { label: "Relevance", value: "relevance" },
    { label: "Rating", value: "rating" },
    { label: "Most Recent", value: "most-recent" },
    { label: "Best Sellers (Products)", value: "best-sellers-products" },
    { label: "Best Sellers (People)", value: "best-sellers-people" },
  ];

  const filterCategories = [
    { name: "Practice Areas", options: practiceAreas },
    { name: "Resource Types", options: resourceTypes },
    { name: "Prices", options: prices },
    { name: "Format", options: formats },
    { name: "Country", options: countries },
    {
      name: "Region",
      options: [
        "North America",
        "Europe",
        "Asia",
        "Africa",
        "South America",
        "Australia",
      ],
    },
    { name: "Province", options: provinces },
    { name: "Short By", options: sortOptions.map((option) => option.label) },
    {
      name: "Language",
      options: [
        "English",
        "French",
        "Spanish",
        "German",
        "Chinese",
        "Japanese",
      ],
    },
  ];

  const [viewMode, setViewMode] = useState<"grid" | "list">("list");

  return (
    <div className="flex min-h-screen flex-col">

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        <div className="text-sm text-gray-500 mb-2">15,000,000+ Results</div>
        <h1 className="text-2xl font-bold mb-4">Filter Resources</h1>

        {/* Filter Bar */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 mb-4 justify-between">
            <div className="flex flex-wrap gap-2">
              <FilterDropdown title="Practice Areas" options={practiceAreas} />
              <FilterDropdown title="Resource Types" options={resourceTypes} />
              <FilterDropdown title="Prices" options={prices} />
              <FilterDropdown title="Format" options={formats} />
              <CountryDropdown title="Country" options={countries} />
              <FilterDropdown title="Province/State" options={provinces} />

              <AllFiltersDrawer categories={filterCategories} />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm whitespace-nowrap">Short By:</span>
              <SortDropdown
                options={sortOptions}
                defaultValue="best-reviewed"
              />

              <ViewToggle
                defaultView={viewMode}
                onChange={(mode) => setViewMode(mode)}
              />
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="w-full">
          <Suspense fallback={<div>Loading products...</div>}>
            <ProductList viewMode={viewMode} />
          </Suspense>

          <Pagination className="mt-8">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">4</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">5</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <span className="flex h-9 items-center justify-center px-4">
                  ...
                </span>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">50</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </main>
    </div>
  );
}
