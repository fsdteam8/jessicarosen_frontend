"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Menu } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

export function Header({ setSidebarOpen }: HeaderProps) {
  const session = useSession();
  return (
    <header className="bg-gray-300  border-slate-600 h-16 flex items-center justify-between px-4 lg:px-6">
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden text-white hover:bg-slate-600"
        onClick={() => setSidebarOpen(true)}
      >
        <Menu className="w-5 h-5" />
      </Button>

      <div className="flex items-center space-x-4 ml-auto">
        {/* <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-slate-600"
        >

          <Bell className="w-5 h-5" />
        </Button> */}


        <div className="flex items-center space-x-3">
          <span className=" text-white text-sm font-medium hidden sm:block">
            <Link href={'/account'} className="flex items-center space-x-1 text-black cursor-pointer">
              <ArrowLeft/> Return to Lawbie
              </Link> 
          </span>
          <div className="w-8 h-8 rounded-full overflow-hidden">
            
            <Avatar className="w-full h-full border flex items-center justify-center">
              <AvatarImage src={session.data?.user?.profileImage} alt="@shadcn" />
              <AvatarFallback>{session.data?.user.name?.slice(0,2)}</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
}
