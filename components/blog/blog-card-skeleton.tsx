import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

interface BlogCardSkeletonProps {
  featured?: boolean
  className?: string
}

export function BlogCardSkeleton({ featured = false, className }: BlogCardSkeletonProps) {
  return (
    <div className={cn("space-y-3", className)}>
      <Skeleton className={cn("w-full rounded-lg", featured ? "h-64" : "h-48")} />
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-24" />
    </div>
  )
}
