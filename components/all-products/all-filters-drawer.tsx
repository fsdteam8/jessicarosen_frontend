"use client";

import { useState, useEffect } from "react";
import { X, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

interface FilterCategory {
  name: string;
  options: string[];
}

interface AllFiltersDrawerProps {
  categories: FilterCategory[];
}

export default function AllFiltersDrawer({
  categories,
}: AllFiltersDrawerProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string>
  >({});
  const [activeFilters, setActiveFilters] = useState<
    { category: string; value: string }[]
  >([]);

  // Toggle category expansion
  const toggleCategory = (category: string) => {
    if (expandedCategories.includes(category)) {
      setExpandedCategories(expandedCategories.filter((c) => c !== category));
    } else {
      setExpandedCategories([...expandedCategories, category]);
    }
  };

  // Handle filter selection
  const handleFilterChange = (category: string, value: string) => {
    setSelectedFilters({
      ...selectedFilters,
      [category]: value,
    });
  };

  // Update active filters when selected filters change
  useEffect(() => {
    const newActiveFilters = Object.entries(selectedFilters).map(
      ([category, value]) => ({
        category,
        value,
      })
    );
    setActiveFilters(newActiveFilters);
  }, [selectedFilters]);

  // Remove a single filter
  const removeFilter = (category: string) => {
    const newSelectedFilters = { ...selectedFilters };
    delete newSelectedFilters[category];
    setSelectedFilters(newSelectedFilters);
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedFilters({});
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 h-9 px-3 border-gray-300 font-normal"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
          >
            <path
              d="M5.5 3C4.67157 3 4 3.67157 4 4.5C4 5.32843 4.67157 6 5.5 6C6.32843 6 7 5.32843 7 4.5C7 3.67157 6.32843 3 5.5 3ZM3 5C3.01671 5 3.03323 4.99918 3.04952 4.99758C3.28022 6.1399 4.28967 7 5.5 7C6.71033 7 7.71978 6.1399 7.95048 4.99758C7.96677 4.99918 7.98329 5 8 5H13.5C13.7761 5 14 4.77614 14 4.5C14 4.22386 13.7761 4 13.5 4H8C7.98329 4 7.96677 4.00082 7.95048 4.00242C7.71978 2.86009 6.71033 2 5.5 2C4.28967 2 3.28022 2.86009 3.04952 4.00242C3.03323 4.00082 3.01671 4 3 4H1.5C1.22386 4 1 4.22386 1 4.5C1 4.77614 1.22386 5 1.5 5H3ZM11.9505 10.9976C11.7198 12.1399 10.7103 13 9.5 13C8.28967 13 7.28022 12.1399 7.04952 10.9976C7.03323 10.9992 7.01671 11 7 11H1.5C1.22386 11 1 10.7761 1 10.5C1 10.2239 1.22386 10 1.5 10H7C7.01671 10 7.03323 10.0008 7.04952 10.0024C7.28022 8.8601 8.28967 8 9.5 8C10.7103 8 11.7198 8.8601 11.9505 10.0024C11.9668 10.0008 11.9833 10 12 10H13.5C13.7761 10 14 10.2239 14 10.5C14 10.7761 13.7761 11 13.5 11H12C11.9833 11 11.9668 10.9992 11.9505 10.9976ZM8 10.5C8 9.67157 8.67157 9 9.5 9C10.3284 9 11 9.67157 11 10.5C11 11.3284 10.3284 12 9.5 12C8.67157 12 8 11.3284 8 10.5Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
          <span>All Filters</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-xl font-bold">Filters</SheetTitle>
        </SheetHeader>

        {/* Active filters */}
        {activeFilters.length > 0 && (
          <div className="mt-4 mb-2">
            <div className="flex flex-wrap gap-2 mb-2">
              {activeFilters.map((filter, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 px-3 py-1.5 bg-white border border-gray-300 rounded-full text-sm"
                >
                  <span>{filter.value}</span>
                  <button
                    onClick={() => removeFilter(filter.category)}
                    className="ml-1 text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
            <Button
              variant="link"
              onClick={clearAllFilters}
              className="text-blue-600 p-0 h-auto font-normal"
            >
              Clear All
            </Button>
            <Separator className="my-4" />
          </div>
        )}

        {/* Filter categories */}
        <div className="space-y-0">
          {categories.map((category) => (
            <div key={category.name}>
              <button
                className="flex items-center justify-between w-full py-4 text-left font-medium"
                onClick={() => toggleCategory(category.name)}
              >
                <span>{category.name}</span>
                {expandedCategories.includes(category.name) ? (
                  <Minus className="h-4 w-4" />
                ) : (
                  <Plus className="h-4 w-4" />
                )}
              </button>

              {expandedCategories.includes(category.name) && (
                <div className="pb-4">
                  <RadioGroup
                    value={selectedFilters[category.name]}
                    onValueChange={(value) =>
                      handleFilterChange(category.name, value)
                    }
                  >
                    {category.options.map((option) => (
                      <div
                        key={option}
                        className="flex items-center space-x-2 py-2"
                      >
                        <RadioGroupItem
                          value={option}
                          id={`${category.name}-${option}`
                            .toLowerCase()
                            .replace(/\s+/g, "-")}
                        />
                        <Label
                          htmlFor={`${category.name}-${option}`
                            .toLowerCase()
                            .replace(/\s+/g, "-")}
                          className="text-sm font-normal cursor-pointer"
                        >
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}
              <Separator />
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <SheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
          <SheetClose asChild>
            <Button>Apply Filters</Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
}
