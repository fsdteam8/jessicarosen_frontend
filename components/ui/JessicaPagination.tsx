import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export const JessicaPagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const generatePageNumbers = () => {
    const pages: (number | "...")[] = [];

    const delta = 2; // how many numbers to show around current
    const range = [];
    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    const hasLeftDots = currentPage - delta > 2;
    const hasRightDots = currentPage + delta < totalPages - 1;

    pages.push(1);
    if (hasLeftDots) pages.push("...");
    pages.push(...range);
    if (hasRightDots) pages.push("...");
    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div className="flex items-center justify-between gap-2">
      {/* Previous button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="text-lg px-2"
      >
        <ChevronLeft className="h-4 w-4"/>
      </button>

      <div className="flex items-center gap-8">
        {/* Page buttons */}
        {pageNumbers.map((page, index) =>
          page === "..." ? (
            <span key={`ellipsis-${index}`} className="px-2">
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`h-[36px] w-[36px] ${
                page === currentPage
                  ? "bg-transparent border-[2px] border-[#0066CC] rounded-[4px] text-base font-medium text-[#23547B] leading-[120%]"
                  : "text-base font-medium text-[#131313] leading-[120%]"
              }`}
            >
              {String(page).padStart(2, "0")}
            </button>
          )
        )}
      </div>

      {/* Next button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="text-lg px-2 bg-[#23547B] text-white rounded-full w-9 h-9 flex items-center justify-center"
      >
        <ChevronRight className="!w-4 !h-4"/>
      </button>
    </div>
  );
};
