"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ChevronDown, ChevronUp, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface FilterDropdownProps {
  title: string
  options: string[]
  icon?: React.ReactNode
  onSelect: (value: string) => void
}

export default function FilterDropdown({ title, options, icon, onSelect }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState<string | undefined>(undefined)
  const [searchQuery, setSearchQuery] = useState("")
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Filter options based on search query
  const filteredOptions = options?.filter((option) => option.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between gap-2 h-9 px-3 border-gray-300 font-normal"
      >
        {selected ? `${title}: ${selected}` : title}
        {icon ? icon : isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </Button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-64 bg-white rounded-md shadow-lg border border-gray-200 overflow-hidden">
          <div className="p-3">
            <div className="relative mb-3">
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 text-sm"
              />
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            <div className="max-h-60 overflow-y-auto">
              <RadioGroup
                value={selected}
                onValueChange={(value) => {
                  setSelected(value)
                  onSelect(value)
                   setIsOpen(false);
                }}
              >
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option) => (
                    <div key={option} className="flex items-center space-x-2 py-1">
                      <RadioGroupItem value={option} id={`${title}-${option}`.toLowerCase().replace(/\s+/g, "-")} />
                      <Label
                        htmlFor={`${title}-${option}`.toLowerCase().replace(/\s+/g, "-")}
                        className="text-sm font-normal cursor-pointer"
                      >
                        {option}
                      </Label>
                    </div>
                  ))
                ) : (
                  <div className="py-2 text-sm text-gray-500 text-center">No results found</div>
                )}
              </RadioGroup>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
