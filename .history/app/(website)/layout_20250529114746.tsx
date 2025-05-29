import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Lawbie Dashboard",
  description: "Multi-role ecommerce dashboard",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
  <main>
        <Header/>

    {children}
  </main>
  )
}
