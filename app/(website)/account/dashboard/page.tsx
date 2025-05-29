import Link from "next/link"
import { AccountLayout } from "@/components/account/account-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, FileText, ShoppingCart, User } from "lucide-react"

export default function DashboardPage() {
  return (
    <AccountLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Recent Orders</CardTitle>
            <CardDescription>You have 12 orders this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12</div>
          </CardContent>
          <CardFooter>
            <Button asChild variant="ghost" className="text-[#2c5d7c]">
              <Link href="/account/orders">
                <ShoppingCart className="mr-2 h-4 w-4" />
                View Orders
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Downloaded Documents</CardTitle>
            <CardDescription>You have downloaded 8 documents</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">8</div>
          </CardContent>
          <CardFooter>
            <Button asChild variant="ghost" className="text-[#2c5d7c]">
              <Link href="/account/downloads">
                <Download className="mr-2 h-4 w-4" />
                View Downloads
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Saved Templates</CardTitle>
            <CardDescription>You have 5 saved templates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">5</div>
          </CardContent>
          <CardFooter>
            <Button asChild variant="ghost" className="text-[#2c5d7c]">
              <Link href="/account/templates">
                <FileText className="mr-2 h-4 w-4" />
                View Templates
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-50">
                    <div className="h-10 w-10 rounded-full bg-[#2c5d7c]/10 flex items-center justify-center text-[#2c5d7c]">
                      <Download className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">Downloaded Muslim Law</p>
                      <p className="text-xs text-gray-500">Feb 10, 2025 at 10:30 AM</p>
                    </div>
                    <Button variant="outline" size="sm" className="text-[#2c5d7c] border-[#2c5d7c]">
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild variant="ghost" className="text-[#2c5d7c]">
                <Link href="/account/activity">View All Activity</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-center mb-4">
                  <div className="h-20 w-20 rounded-full bg-[#2c5d7c]/10 flex items-center justify-center text-[#2c5d7c]">
                    <User className="h-10 w-10" />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">Bessie Edwards</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">alma.lawson@example.com</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Member Since</p>
                  <p className="font-medium">January 15, 2025</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild variant="ghost" className="text-[#2c5d7c]">
                <Link href="/account/profile">Edit Profile</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </AccountLayout>
  )
}
