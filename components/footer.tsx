import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="bg-white py-16 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <Link href="/" className="text-3xl font-bold mb-4 block">
              {/* <span className="text-[#2c5d7c]">L</span>
              <span className="text-[#f0a500]">B</span> */}

              <Image
                src="/assets/logo.png"
                alt="Lawbie Logo"
                width={150}
                height={50}
                className="h-10 w-auto mb-2"/>
            </Link>
            <p className="text-sm text-gray-600 mb-4">
              &apos;Connecting hearts through meaningful dedications, fostering deeper bonds, creating lasting memories, and
              celebrating the beauty of shared emotions.&apos;
            </p>
            <div className="flex space-x-3">
              <SocialButton icon={<TwitterIcon className="h-4 w-4" />} />
              <SocialButton icon={<InstagramIcon className="h-4 w-4" />} />
              <SocialButton icon={<LinkedinIcon className="h-4 w-4" />} />
              <SocialButton icon={<FacebookIcon className="h-4 w-4" />} />
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-4 text-gray-900">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about-us" className="text-gray-600 hover:text-gray-900">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-600 hover:text-gray-900">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-600 hover:text-gray-900">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-gray-900">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4 text-gray-900">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/account/privacy" className="text-gray-600 hover:text-gray-900">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/account/terms" className="text-gray-600 hover:text-gray-900">
                  Terms Of Service
                </Link>
              </li>
              {/* <li>
                <Link href="/faq" className="text-gray-600 hover:text-gray-900">
                  FAQ
                </Link>
              </li> */}
              {/* <li>
                <Link href="/help" className="text-gray-600 hover:text-gray-900">
                  Help Center
                </Link>
              </li> */}
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4 text-gray-900">
              Subscribe Our <span className="text-[#2c5d7c]">NEWSLETTER</span>
            </h3>
            <p className="text-sm text-gray-600 mb-4">Connect with us on social media and stay in the loop.</p>
            <div className="flex">
              <Input type="email" placeholder="Enter Your Email..." className="rounded-r-none border-r-0" />
              <Button className="rounded-l-none bg-[#2c5d7c] hover:bg-[#1e4258]">Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 text-center text-sm text-gray-600">
          © 2025 Lawbie. All Rights Reserved
        </div>
      </div>
    </footer>
  )
}

import { ReactNode } from "react"
import Image from "next/image"

function SocialButton({ icon }: { icon: ReactNode }) {
  return (
    <Button variant="outline" size="icon" className="h-8 w-8 rounded-full border-gray-300">
      {icon}
    </Button>
  )
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className={className} fill="currentColor">
      <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
    </svg>
  )
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className={className} fill="currentColor">
      <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
    </svg>
  )
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className={className} fill="currentColor">
      <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1-26.2 26.2-34.4 58-36.2 93.9-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9 26.2 26.2 34.4 58 36.2 93.9 2.1 37 2.1 147.8 0 184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11" />
    </svg>
  )
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className={className} fill="currentColor">
      <path d="M416 32H31.9C14.3 32 0 46.3 0 63.9v384.1c0 17.6 14.3 31.9 31.9 31.9H416c17.6 0 32-14.3 32-31.9V63.9c0-17.6-14.4-31.9-32-31.9zM131.8 480.7H70.6V205.8h61.3V480.7zM101.2 185.7c-30.2 0-49.4-20.2-49.4-45.1c0-24.8 19.2-45.1 49.4-45.1s49.4 20.3 49.4 45.1c0 24.9-19.2 45.1-49.4 45.1zM416 480.7H354.8V300.3c0-48.1-26.3-71.8-68.3-71.8c-39.2 0-53.2 26.6-53.2 71.5V480.7H193.8V205.8h61.3v27.8c8.4-16.2 30.5-33 106.3-33c113.8 0 125.4 74.4 125.4 281.6z" />
    </svg>
  )
}
