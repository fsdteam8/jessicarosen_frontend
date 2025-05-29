import Image from "next/image"

export default function AboutUsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Left Content */}
        <div className="space-y-12">
          {/* About Your Website Section */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-6">About Your Website</h1>
            <p className="text-gray-600 leading-relaxed">
              Lorem Ipsum dolor sit amet, consectetur adipiscing elit. Sed eget euismod velit, ut dapibus est urna.
              Suspendisse dictum facilisis ullamcorper. Maecenas vitae efficitur lorem, in placerat dui. Morbi
              condimentum porttitor turpis sed ultrices. Suspendisse auctor facilisis ullamcorper. Maecenas vitae
              efficitur lorem, in placerat dui. Morbi condimentum porttitor turpis sed ultrices. Suspendisse auctor
              facilisis ullamcorper. Maecenas vitae efficitur lorem, in placerat dui. Morbi condimentum porttitor turpis
              sed ultrices. Suspendisse auctor facilisis ullamcorper. Maecenas vitae efficitur lorem, in placerat dui.
            </p>
          </div>

          {/* Our Mission Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              Lorem Ipsum dolor sit amet, consectetur adipiscing elit. Sed eget euismod velit, ut dapibus est urna.
              Suspendisse dictum facilisis ullamcorper. Maecenas vitae efficitur lorem, in placerat dui. Morbi
              condimentum porttitor turpis sed ultrices. Suspendisse auctor facilisis ullamcorper. Maecenas vitae
              efficitur lorem, in placerat dui. Morbi condimentum porttitor turpis sed ultrices. Suspendisse auctor
              facilisis ullamcorper. Maecenas vitae efficitur lorem, in placerat dui. Morbi condimentum porttitor turpis
              sed ultrices. Suspendisse auctor facilisis ullamcorper. Maecenas vitae efficitur lorem, in placerat dui.
            </p>
          </div>

          {/* Statistics Section */}
          <div className="grid grid-cols-3 gap-8 py-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">30K+</div>
              <div className="text-gray-600 text-sm">Our Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">12K+</div>
              <div className="text-gray-600 text-sm">Satisfied Lawyers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">2K+</div>
              <div className="text-gray-600 text-sm">Mentor List</div>
            </div>
          </div>

          {/* What We Offer Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">What We Offer</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Lorem Ipsum dolor sit amet, consectetur adipiscing elit. Sed eget euismod velit, ut dapibus est urna.
              Suspendisse dictum facilisis ullamcorper.
            </p>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span className="leading-relaxed">
                  Lorem Ipsum. Lorem Ipsum dolor sit amet, consectetur adipiscing elit. Sed eget euismod velit, ut
                  dapibus est urna. Suspendisse dictum facilisis ullamcorper. Maecenas vitae efficitur lorem, in
                  placerat dui.
                </span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span className="leading-relaxed">
                  Lorem Ipsum. Lorem Ipsum dolor sit amet, consectetur adipiscing elit. Sed eget euismod velit, ut
                  dapibus est urna. Suspendisse dictum facilisis ullamcorper. Maecenas vitae efficitur lorem, in
                  placerat dui.
                </span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span className="leading-relaxed">
                  Lorem Ipsum. Lorem Ipsum dolor sit amet, consectetur adipiscing elit. Sed eget euismod velit, ut
                  dapibus est urna. Suspendisse dictum facilisis ullamcorper. Maecenas vitae efficitur lorem, in
                  placerat dui.
                </span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span className="leading-relaxed">
                  Lorem Ipsum. Lorem Ipsum dolor sit amet, consectetur adipiscing elit. Sed eget euismod velit, ut
                  dapibus est urna. Suspendisse dictum facilisis ullamcorper. Maecenas vitae efficitur lorem, in
                  placerat dui.
                </span>
              </li>
            </ul>
          </div>

          {/* Unique & researchable content Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Unique & researchable content</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Lorem Ipsum dolor sit amet, consectetur adipiscing elit. Sed eget euismod velit, ut dapibus est urna.
              Suspendisse dictum facilisis ullamcorper. Maecenas vitae efficitur lorem, in placerat dui. Morbi
              condimentum porttitor turpis sed ultrices. Suspendisse auctor facilisis ullamcorper. Maecenas vitae
              efficitur lorem, in placerat dui.
            </p>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span className="leading-relaxed">
                  Lorem Ipsum. Lorem Ipsum dolor sit amet, consectetur adipiscing elit. Sed eget euismod velit, ut
                  dapibus est urna. Suspendisse dictum facilisis ullamcorper. Maecenas vitae efficitur lorem, in
                  placerat dui.
                </span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span className="leading-relaxed">
                  Lorem Ipsum. Lorem Ipsum dolor sit amet, consectetur adipiscing elit. Sed eget euismod velit, ut
                  dapibus est urna. Suspendisse dictum facilisis ullamcorper. Maecenas vitae efficitur lorem, in
                  placerat dui.
                </span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span className="leading-relaxed">
                  Lorem Ipsum. Lorem Ipsum dolor sit amet, consectetur adipiscing elit. Sed eget euismod velit, ut
                  dapibus est urna. Suspendisse dictum facilisis ullamcorper. Maecenas vitae efficitur lorem, in
                  placerat dui.
                </span>
              </li>
            </ul>
          </div>

          {/* Our Commitment Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Commitment</h2>
            <p className="text-gray-600 leading-relaxed">
              Lorem Ipsum dolor sit amet, consectetur adipiscing elit. Sed eget euismod velit, ut dapibus est urna.
              Suspendisse dictum facilisis ullamcorper. Maecenas vitae efficitur lorem, in placerat dui. Morbi
              condimentum porttitor turpis sed ultrices. Suspendisse auctor facilisis ullamcorper. Maecenas vitae
              efficitur lorem, in placerat dui. Morbi condimentum porttitor turpis sed ultrices. Suspendisse auctor
              facilisis ullamcorper. Maecenas vitae efficitur lorem, in placerat dui. Morbi condimentum porttitor turpis
              sed ultrices. Suspendisse auctor facilisis ullamcorper. Maecenas vitae efficitur lorem, in placerat dui.
            </p>
          </div>

          {/* Join Us Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Join Us</h2>
            <p className="text-gray-600 leading-relaxed">
              Lorem Ipsum dolor sit amet, consectetur adipiscing elit. Sed eget euismod velit, ut dapibus est urna.
              Suspendisse dictum facilisis ullamcorper. Maecenas vitae efficitur lorem, in placerat dui. Morbi
              condimentum porttitor turpis sed ultrices.
            </p>
            <p className="text-gray-600 leading-relaxed mt-4">
              Suspendisse auctor facilisis ullamcorper. Maecenas vitae efficitur lorem, in placerat dui. Morbi
              condimentum porttitor turpis sed ultrices. Suspendisse auctor facilisis ullamcorper. Maecenas vitae
              efficitur lorem, in placerat dui. Morbi condimentum porttitor turpis sed ultrices. Suspendisse auctor
              facilisis ullamcorper. Maecenas vitae efficitur lorem, in placerat dui.
            </p>
          </div>
        </div>

        {/* Right Image - Fixed: Removed sticky positioning */}
        <div className="w-full">
          <div className="relative h-[800px] w-full rounded-lg overflow-hidden">
            <Image
              src="/images/aboutUs.jpg"
              alt="Professional team in office environment"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  )
}
