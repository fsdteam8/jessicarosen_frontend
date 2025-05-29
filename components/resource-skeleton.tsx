import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function ResourceSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center">
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>

      {/* Table Skeleton */}
      <Card>
        <div className="p-4">
          {/* Table Header */}
          <div className="grid grid-cols-8 gap-4 mb-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))}
          </div>

          {/* Table Rows */}
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="grid grid-cols-8 gap-4 mb-4">
              <div className="flex items-center space-x-3">
                <Skeleton className="h-12 w-12 rounded" />
                <Skeleton className="h-4 w-32" />
              </div>
              {Array.from({ length: 7 }).map((_, j) => (
                <Skeleton key={j} className="h-4 w-full" />
              ))}
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
