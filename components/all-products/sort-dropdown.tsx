"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

interface SortDropdownProps {
  options: { label: string; value: string }[];
  defaultValue: string;
  onChange: (value: string) => void;
}

export default function SortDropdown({
  options,
  defaultValue,
  onChange,
}: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(defaultValue);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedLabel =
    options.find((option) => option.value === selected)?.label || defaultValue;

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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between gap-2 h-9 px-3 border-gray-300 font-normal"
      >
        {selectedLabel}
        {isOpen ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </Button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-64 right-0 bg-white rounded-md shadow-lg border border-gray-200 overflow-hidden">
          <div className="p-1 max-h-80 overflow-y-auto">
            {options.map((option) => (
              <div
                key={option.value}
                className={`py-2 px-3 hover:bg-gray-100 cursor-pointer text-sm ${
                  selected === option.value ? "bg-gray-100" : ""
                }`}
                onClick={() => {
                  setSelected(option.value);
                  setIsOpen(false);
                  onChange(option.value);
                }}
              >
                {option.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
