import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

export default function BlogNotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center">
        <div className="container max-w-md text-center py-16">
          <h1 className="text-6xl font-bold text-[#2c5d7c] mb-4">404</h1>
          <h2 className="text-2xl font-bold mb-4">Blog Post Not Found</h2>
          <p className="text-gray-600 mb-8">
            The blog post you are looking for might have been removed or is temporarily unavailable.
          </p>
          <Button asChild className="bg-[#2c5d7c] hover:bg-[#1e4258]">
            <Link href="/blog">Return to Blog</Link>
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  )
}
