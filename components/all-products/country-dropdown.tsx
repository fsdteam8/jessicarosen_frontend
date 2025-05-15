"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ChevronDown, ChevronUp } from "lucide-react"

interface CountryDropdownProps {
  title: string
  options: string[]
}

export default function CountryDropdown({ title, options }: CountryDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState<string | undefined>(undefined)
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

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between gap-2 h-9 px-3 border-gray-300 font-normal"
      >
        {selected ? `${title}: ${selected}` : title}
        {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </Button>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-64 bg-white rounded-md shadow-lg border border-gray-200 overflow-hidden">
          <div className="p-3 max-h-80 overflow-y-auto">
            <RadioGroup value={selected} onValueChange={setSelected}>
              {options.map((option) => (
                <div key={option} className="flex items-center space-x-2 py-1">
                  <RadioGroupItem value={option} id={`${title}-${option}`.toLowerCase().replace(/\s+/g, "-")} />
                  <Label
                    htmlFor={`${title}-${option}`.toLowerCase().replace(/\s+/g, "-")}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
      )}
    </div>
  )
}
