"use client";

import { Button } from "@/components/ui/button";
import { Bell, Menu } from "lucide-react";
import Image from "next/image";

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

export function Header({ setSidebarOpen }: HeaderProps) {
  return (
    <header className="bg-slate-700 border-b border-slate-600 h-16 flex items-center justify-between px-4 lg:px-6">
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden text-white hover:bg-slate-600"
        onClick={() => setSidebarOpen(true)}
      >
        <Menu className="w-5 h-5" />
      </Button>

      <div className="flex items-center space-x-4 ml-auto">
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-slate-600"
        >
          <Bell className="w-5 h-5" />
        </Button>

        <div className="flex items-center space-x-3">
          <span className="text-white text-sm font-medium hidden sm:block">
            Mr. Raja
          </span>
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <Image
              src="/placeholder.svg?height=32&width=32"
              alt="User avatar"
              width={32}
              height={32}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
