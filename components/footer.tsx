import Link from "next/link";
import { FaLinkedinIn } from "react-icons/fa";
import { PiInstagramLogoFill } from "react-icons/pi";
import { FaTwitter } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-white container pt-[10px] md:pt-[45px] lg:pt-[56px] border-t">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 py-8">
          <div>
            <div className="flex items-center w-24 md:w-32 mb-6">
              <div className="text-[#23547B]">
                <Link href="/" className="text-2xl font-bold">
                  <Image
                    src="/images/nav_logo.png"
                    alt="Lawbie Logo"
                    width={500}
                    height={200}
                    className="lg:min-w-[150px] h-[40px] lg:h-[60px] bg-cover"
                  />
                </Link>
              </div>
            </div>
            <p className="text-sm text-[#484848] font-normal tracking-[0%] leading-[120%] mb-4 max-w-[400px]">
              Lawbie is the go-to marketplace for lawyers to buy and sell
              high-quality, practitioner-drafted documents. Access proven
              templates, precedents, and tools—or upload your own and get paid.
              Built by lawyers, for lawyers.
            </p>
            <div className="flex space-x-3">
              <span className="bg-[#9AB0C266] rounded-full p-3">
                <FaTwitter className="h-4 w-4 text-[#23547B] cursor-pointer" />
              </span>
              <span className="bg-[#9AB0C266] rounded-full p-3">
                <PiInstagramLogoFill className="h-4 w-4 text-[#23547B] cursor-pointer" />
              </span>
              <span className="bg-[#9AB0C266] rounded-full p-3">
                <FaLinkedinIn className="h-4 w-4 text-[#23547B] cursor-pointer" />
              </span>
              <span className="bg-[#9AB0C266] rounded-full p-3">
                <FacebookIcon className="h-4 w-4 text-[#23547B] cursor-pointer" />
              </span>
            </div>
          </div>

          <div className="flex gap-20 md:gap-10 lg:gap-40">
            <div>
              <h3 className="font-bold mb-4 text-gray-900">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/about-us"
                    className="text-#363636] font-normal tracking-[0%] leading-[120%] hover:text-gray-900"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-[#363636] font-normal tracking-[0%] leading-[120%] hover:text-gray-900"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products"
                    className="text-[#363636] font-normal tracking-[0%] leading-[120%] hover:text-gray-900"
                  >
                    Resources
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-[#363636] font-normal tracking-[0%] leading-[120%] hover:text-gray-900"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4 text-gray-900">Support</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/account/privacy"
                    className="text-[#363636] font-normal tracking-[0%] leading-[120%] hover:text-gray-900"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/account/terms"
                    className="text-[#363636] font-normal tracking-[0%] leading-[120%] hover:text-gray-900"
                  >
                    Terms Of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-4 text-gray-900">
              Subscribe To Our{" "}
              <span className="text-[#2c5d7c]">NEWSLETTER</span>
            </h3>
            <p className="text-sm text-[#2A2A2A] font-normal tracking-[0%] leading-[120%] mb-4">
              Connect with us on social media and stay in the loop.
            </p>
            <div>
              <NewsLetterForm />
            </div>
          </div>
        </div>

        <div className="border-t border-[#5A5A5A] py-4 text-center leading-[120%] tracking-[0%] text-base font-medium text-[#363636]">
          © 2025 Lawbie. All Rights Reserved
        </div>
      </div>
    </footer>
  );
}

import Image from "next/image";
import NewsLetterForm from "./NewsLetterForm";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 512"
      className={className}
      fill="currentColor"
    >
      <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
    </svg>
  );
}
