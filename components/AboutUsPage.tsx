import Image from "next/image";
import LegalDoc from "./HomePage/LegalDoc";

export default function AboutUsPage() {
  return (
    <div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="space-y-8 sm:space-y-12 lg:space-y-16">
          {/* About Your Website Section */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 xl:gap-24">
            {/* Left Content */}
            <div className="flex-1 space-y-8 sm:space-y-10 lg:space-y-12">
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                  About Your Website
                </h1>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Lawbie is the flexible, one-stop marketplace where lawyers buy and sell real legal documents—no subscription required.
 Why pay monthly for generic templates you may never use? On Lawbie, you shop by product. Just find what you need, buy it once, and use it forever. Whether you're building a case, onboarding a client, or managing firm workflows, Lawbie connects you with resources drafted and used by real lawyers in practice. And if you’ve already done the work? Upload it, share it, and get paid—again and again.
                  efficitur lorem, in placerat dui.
                </p>
              </div>

              {/* Our Mission Section */}
              <div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
                  Our Mission
                </h2>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                To empower lawyers with control, community, and compensation.
 Lawbie was built to replace the outdated scramble for precedents and the burden of costly subscriptions. Our mission is to let lawyers access what they need, when they need it—while turning their existing work into a new income stream. We’re here to build a collaborative legal community that shares what works, lifts each other up, and helps everyone practice smarter.
                </p>
              </div>

              {/* Statistics Section */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 py-6 sm:py-8">
                <div className="text-center bg-gray-50 p-4 sm:p-6 rounded-lg">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                    30K+
                  </div>
                  <div className="text-gray-600 text-sm sm:text-base">Our Users</div>
                </div>
                <div className="text-center bg-gray-50 p-4 sm:p-6 rounded-lg">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                    12K+
                  </div>
                  <div className="text-gray-600 text-sm sm:text-base">
                    Satisfied Lawyers
                  </div>
                </div>
                <div className="text-center bg-gray-50 p-4 sm:p-6 rounded-lg">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                    2K+
                  </div>
                  <div className="text-gray-600 text-sm sm:text-base">Mentor List</div>
                </div>
              </div>
            </div>
            
            {/* Right Image */}
            <div className="flex-shrink-0 w-full lg:w-auto order-first lg:order-last">
              <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] w-full lg:w-[400px] xl:w-[516px] rounded-lg overflow-hidden mx-auto">
                <Image
                  src="/images/aboutUs.jpg"
                  alt="Professional team in office environment"
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 516px"
                />
              </div>
            </div>
          </div>

     {/* What We Offer Section */}
<div className="max-w-none">
  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
    What We Offer
  </h2>
  <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4 sm:mb-6">
    Explore our core value propositions designed to simplify your legal workflow and boost your productivity.
  </p>
  <ul className="space-y-3 sm:space-y-4 text-gray-600">
    <li className="flex items-start">
      <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
      <span className="text-sm sm:text-base leading-relaxed">
        <strong>One-Time Payments, Full Access Forever —</strong> Buy only what you need—no subscription, no commitment.
      </span>
    </li>
    <li className="flex items-start">
      <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
      <span className="text-sm sm:text-base leading-relaxed">
        <strong>Earn on Work You’ve Already Done —</strong> Turn your old precedents, templates, and checklists into passive income.
      </span>
    </li>
    <li className="flex items-start">
      <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
      <span className="text-sm sm:text-base leading-relaxed">
        <strong>One-Click Access to Quality Documents —</strong> Stop asking colleagues for precedents. Find what you need in seconds.
      </span>
    </li>
    <li className="flex items-start">
      <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
      <span className="text-sm sm:text-base leading-relaxed">
        <strong>By Lawyers, For Lawyers —</strong> All documents are created by professionals who’ve used them in real practice.
      </span>
    </li>
    <li className="flex items-start">
      <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
      <span className="text-sm sm:text-base leading-relaxed">
        <strong>Everything You Need, Nothing You Don’t —</strong> From pleadings to policies, contracts to client letters—we’ve got you covered.
      </span>
    </li>
  </ul>
</div>


          {/* Unique & Researchable Content Section */}
<div className="max-w-none">
  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
    Unique & Researchable Content
  </h2>
  <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4 sm:mb-6">
    Lawbie isn’t just a template hub—it’s a growing marketplace built on trust, quality, and community. Every resource has been drafted by practicing lawyers and vetted for clarity and use in real-world cases. You can browse by practice area, buy only what you need, and skip the guesswork.
  </p>
  <ul className="space-y-3 sm:space-y-4 text-gray-600">
    <li className="flex items-start">
      <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
      <span className="text-sm sm:text-base leading-relaxed">
        Litigation bundles, contracts, agreements
      </span>
    </li>
    <li className="flex items-start">
      <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
      <span className="text-sm sm:text-base leading-relaxed">
        Client intake and admin forms
      </span>
    </li>
    <li className="flex items-start">
      <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
      <span className="text-sm sm:text-base leading-relaxed">
        Practice-specific checklists and playbooks
      </span>
    </li>
    <li className="flex items-start">
      <span className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
      <span className="text-sm sm:text-base leading-relaxed">
        Tools for family law, real estate, employment, corporate, and more
      </span>
    </li>
  </ul>
</div>


          {/* Our Commitment Section */}
          <div className="max-w-none">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              Our Commitment
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            We’re committed to giving lawyers flexibility, financial opportunity, and fast access to tools that save time and deliver results. No bloated libraries. No auto-renewals. Just real work, real tools, and real results—shared by the legal professionals who know what works best.
            </p>
          </div>

          {/* Join Us Section */}
          <div className="max-w-none">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
              Join Us
            </h2>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
        Why reinvent the wheel—or chase down a precedent from a friend? With Lawbie, you get instant access to documents you can trust and the chance to monetize work you’ve already done. Join Lawbie today and help build the future of legal collaboration.
            </p>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed mt-4">
              Suspendisse auctor facilisis ullamcorper. Maecenas vitae
              efficitur lorem, in placerat dui. Morbi condimentum porttitor
              turpis sed ultrices. Suspendisse auctor facilisis ullamcorper.
              Maecenas vitae efficitur lorem, in placerat dui. Morbi
              condimentum porttitor turpis sed ultrices. Suspendisse auctor
              facilisis ullamcorper. Maecenas vitae efficitur lorem, in
              placerat dui.
            </p>
          </div>


{/* Make Money Info Message Section */}
<div className="bg-gray-50 rounded-xl p-6 sm:p-8 shadow-md text-gray-800 space-y-4">
  <div>
    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">
      Make Money from Work You’ve Already Done
    </h2>
    <p className="text-sm sm:text-base">
      Have documents sitting in old case files or client folders? Don’t let them go to waste.
    </p>
    <p className="text-sm sm:text-base">
      Upload your unused legal templates, agreements, or checklists and turn them into passive income.
    </p>
    <p className="text-sm sm:text-base">
      Make money from the documents you don’t need anymore—while helping other lawyers save time.
    </p>
  </div>

  <div className="pt-4 border-t">
    <h3 className="text-lg sm:text-xl font-semibold">
      Looking for Legal Documents?
    </h3>
    <p className="text-sm sm:text-base">
      Thousands of templates. No subscription. One-time purchase. Upload yours and get paid.
    </p>
  </div>

  <div className="pt-4 border-t flex items-center text-sm sm:text-base space-x-2">
    <span role="img" aria-label="email">📩</span>
    <span>support@lawbie.com</span>
  </div>
</div>

          
        </div>
      </div>
      <LegalDoc />
    </div>
  );
}