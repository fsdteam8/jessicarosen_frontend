"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  List,
  TrendingUp,
  LogOut,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export function Sidebar({ open, setOpen }: SidebarProps) {
  const pathname = usePathname();
  const [resourceListOpen, setResourceListOpen] = useState(true);

  const navigation = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      current: pathname === "/dashboard",
    },
    {
      name: "Resource List",
      icon: List,
      current: pathname.startsWith("/dashboard/resources"),
      children: [
        {
          name: "List",
          href: "/dashboard/resources/list",
          current: pathname === "/dashboard/resources/list",
        },
        {
          name: "Status",
          href: "/dashboard/resources/status",
          current: pathname === "/dashboard/resources/status",
        },
      ],
    },
    {
      name: "My Sales",
      href: "/dashboard/sales",
      icon: TrendingUp,
      current: pathname === "/dashboard/sales",
    },
    // {
    //   name: "Setting",
    //   href: "/dashboard/settings",
    //   icon: Settings,
    //   current: pathname === "/dashboard/settings",
    // },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-slate-800 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center h-16 px-6 mb-[46px]">
            <div className="flex items-center space-x-2">
              <Image
                src="/assets/logo.png"
                width={500}
                height={500}
                alt="logo"
                className="w-[186px] h-[60px] mt-[20px]"
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => (
              <div key={item.name}>
                {item.children ? (
                  <div>
                    <button
                      onClick={() => setResourceListOpen(!resourceListOpen)}
                      className={cn(
                        "w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                        item.current
                          ? "bg-slate-700 text-white"
                          : "text-slate-300 hover:bg-slate-700 hover:text-white"
                      )}
                    >
                      <div className="flex items-center space-x-3">
                        <item.icon className="w-5 h-5" />
                        <span>{item.name}</span>
                      </div>
                      {resourceListOpen ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </button>
                    {resourceListOpen && (
                      <div className="ml-6 mt-2 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className={cn(
                              "block px-3 py-2 text-sm rounded-lg transition-colors",
                              child.current
                                ? "bg-orange-500 text-white"
                                : "text-slate-300 hover:bg-slate-700 hover:text-white"
                            )}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center space-x-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                      item.current
                        ? "bg-orange-500 text-white"
                        : "text-slate-300 hover:bg-slate-700 hover:text-white"
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Logout */}
          <div className="p-4">
            <Button
              variant="ghost"
              className="w-full justify-start text-slate-300 hover:bg-slate-700 hover:text-white"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Log Out
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
