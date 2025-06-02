import Image from "next/image";
import React from "react";

function HappyCoustomer() {
    const customerImages = [
    "/images/aboutUs.jpg",
    "/images/aboutUs.jpg",
    "/images/aboutUs.jpg",
    "/images/aboutUs.jpg",
  ]
  return (
    <div>
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h2 className="text-xl md:text-4xl font-semibold text-gray-900 mb-4">
              Happy Customers
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              Find answers to common questions about our services and features.
            </p>
          </div>

          {/* Simple Image Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {customerImages.map((image, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="aspect-square relative">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Happy customer ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default HappyCoustomer;
