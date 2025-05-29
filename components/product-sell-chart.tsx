"use client"

export function ProductSellChart() {
  const categories = [
    { name: "Categories name", percentage: 39, color: "bg-teal-500" },
    { name: "Categories name", percentage: 38, color: "bg-blue-500" },
    { name: "Categories name", percentage: 27, color: "bg-purple-500" },
    { name: "Categories name", percentage: 22, color: "bg-orange-500" },
  ]

  return (
    <div className="space-y-4">
      {categories.map((category, index) => (
        <div key={index} className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
            <span className="text-sm text-gray-600">{category.name}</span>
          </div>
          <span className="text-sm font-medium">{category.percentage}%</span>
        </div>
      ))}

      {/* Donut chart representation */}
      <div className="relative w-32 h-32 mx-auto mt-6">
        <div className="w-full h-full rounded-full border-8 border-gray-200 relative">
          <div className="absolute inset-0 rounded-full border-8 border-teal-500 border-t-transparent transform rotate-0"></div>
          <div className="absolute inset-1 rounded-full border-6 border-blue-500 border-t-transparent transform rotate-45"></div>
          <div className="absolute inset-2 rounded-full border-4 border-purple-500 border-t-transparent transform rotate-90"></div>
          <div className="absolute inset-3 rounded-full border-2 border-orange-500 border-t-transparent transform rotate-135"></div>
        </div>
      </div>
    </div>
  )
}
