"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePracticeAreas } from "@/hooks/use-practice-areas";
import { useRouter } from "next/navigation";

interface PracticeAreasDropdownProps {
  visibleAreas: Array<{ _id: string; name: string }>;
  className?: string;
}

export function PracticeAreasDropdown({
  visibleAreas,
  className = "",
}: PracticeAreasDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { data: practiceAreasData, isLoading } = usePracticeAreas();
  const router = useRouter();

  // Get remaining practice areas (not shown in main navigation)
  const remainingAreas =
    practiceAreasData?.data?.filter(
      (area) => !visibleAreas.some((visible) => visible._id === area._id)
    ) || [];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handlePracticeAreaClick = (
    practiceAreaId: string,
    practiceAreaName: string
  ) => {
    setIsOpen(false);
    router.push(
      `/products?practiceArea=${encodeURIComponent(
        practiceAreaId
      )}&name=${encodeURIComponent(practiceAreaName)}`
    );
  };

  if (remainingAreas.length === 0) {
    return null;
  }

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="ml-2 p-2 rounded-full border border-[#23547B] bg-gray-100 hover:bg-gray-200 transition-colors"
        aria-label="More practice areas"
      >
        {isOpen ? (
          <ChevronDown className="w-6 h-6 transition-transform" />
        ) : (
          <ChevronRight className="w-6 h-6 transition-transform" />
        )}
      </Button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-96 overflow-y-auto">
          <div className="p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3 border-b pb-2">
              More Practice Areas
            </h3>
            {isLoading ? (
              <div className="space-y-2">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="h-8 bg-gray-200 rounded animate-pulse"
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-1">
                {remainingAreas.map((area) => (
                  <button
                    key={area._id}
                    onClick={() => handlePracticeAreaClick(area._id, area.name)}
                    className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors"
                  >
                    <div className="font-medium">{area.name}</div>
                    {area.description && (
                      <div className="text-xs text-gray-500 mt-1 line-clamp-2">
                        {area.description}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
