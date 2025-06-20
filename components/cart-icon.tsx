"use client";

import { ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCartTotals } from "@/hooks/use-cart-api";
import { useSession } from "next-auth/react";

interface CartIconProps {
  onClick?: () => void;
  className?: string;
}

export function CartIcon({ onClick, className = "" }: CartIconProps) {
  const { itemCount } = useCartTotals();
  const { status } = useSession();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      className={`relative ${className}`}
    >
      <ShoppingCart className="h-6 w-6" />
      {status && itemCount > 0 && (
        <Badge className="absolute -top-1 -right-1 bg-[#23547B] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center p-0">
          {itemCount}
        </Badge>
      )}
    </Button>
  );
}
