"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LayoutGrid, List } from "lucide-react";

interface ViewToggleProps {
  onChange?: (view: "grid" | "list") => void;
  defaultView?: "grid" | "list";
}

export default function ViewToggle({
  onChange,
  defaultView = "list",
}: ViewToggleProps) {
  const [view, setView] = useState<"grid" | "list">(defaultView);

  const handleViewChange = (newView: "grid" | "list") => {
    setView(newView);
    onChange?.(newView);
  };

  return (
    <div className="flex border rounded">
      <Button
        variant="ghost"
        size="icon"
        className={`h-8 w-8 ${view === "grid" ? "bg-gray-100" : ""}`}
        onClick={() => handleViewChange("grid")}
        aria-label="Grid view"
      >
        <LayoutGrid className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className={`h-8 w-8 ${view === "list" ? "bg-gray-100" : ""}`}
        onClick={() => handleViewChange("list")}
        aria-label="List view"
      >
        <List className="h-4 w-4" />
      </Button>
    </div>
  );
}
