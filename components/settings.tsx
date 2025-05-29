"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Eye, EyeOff, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

export function Settings() {
  const { toast } = useToast()
  const [passwordModalOpen, setPasswordModalOpen] = useState(false)
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  })
  const [passwordData, setPasswordData] = useState({
    current: "",
    new: "",
    confirm: "",
  })
  const [userInfo, setUserInfo] = useState({
    name: "Mr. Raja",
    email: "raja123@gmail.com",
    phone: "+19 9999 9999",
    address: "00000 Artesia Blvd, Suite 6-000",
  })

  const handlePasswordChange = () => {
    if (passwordData.new !== passwordData.confirm) {
      toast({
        title: "Error",
        description: "New passwords don't match",
        variant: "destructive",
      })
      return
    }

    if (passwordData.new.length < 8) {
      toast({
        title: "Error",
        description: "Password must be at least 8 characters long",
        variant: "destructive",
      })
      return
    }

    // Simulate password change
    toast({
      title: "Success",
      description: "Password changed successfully",
    })

    setPasswordModalOpen(false)
    setPasswordData({ current: "", new: "", confirm: "" })
  }

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Setting</h1>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span>Dashboard</span>
          <span>›</span>
          <span>setting</span>
        </div>
      </div>

      {/* Profile Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 rounded-full overflow-hidden">
                <Image
                  src="/placeholder.svg?height=80&width=80"
                  alt="Profile"
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{userInfo.name}</h3>
                <p className="text-gray-600">Seller</p>
              </div>
            </div>
            <Button onClick={() => setPasswordModalOpen(true)} className="bg-slate-700 hover:bg-slate-800">
              Change Password
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* User Information */}
      <Card>
        <CardHeader>
          <CardTitle>User Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={userInfo.name}
                onChange={(e) => setUserInfo((prev) => ({ ...prev, name: e.target.value }))}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={userInfo.email}
                onChange={(e) => setUserInfo((prev) => ({ ...prev, email: e.target.value }))}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={userInfo.phone}
                onChange={(e) => setUserInfo((prev) => ({ ...prev, phone: e.target.value }))}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={userInfo.address}
                onChange={(e) => setUserInfo((prev) => ({ ...prev, address: e.target.value }))}
                className="mt-1"
              />
            </div>
          </div>
          <div className="flex justify-end pt-4">
            <Button className="bg-slate-700 hover:bg-slate-800">Save Changes</Button>
          </div>
        </CardContent>
      </Card>

      {/* Change Password Modal */}
      <Dialog open={passwordModalOpen} onOpenChange={setPasswordModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle>Change Password</DialogTitle>
              <Button variant="ghost" size="icon" onClick={() => setPasswordModalOpen(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="currentPassword" className="text-gray-600">
                Current Password
              </Label>
              <div className="relative mt-1">
                <Input
                  id="currentPassword"
                  type={showPasswords.current ? "text" : "password"}
                  value={passwordData.current}
                  onChange={(e) => setPasswordData((prev) => ({ ...prev, current: e.target.value }))}
                  placeholder="••••••••••••"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                  onClick={() => togglePasswordVisibility("current")}
                >
                  {showPasswords.current ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="newPassword" className="text-gray-600">
                New Password
              </Label>
              <div className="relative mt-1">
                <Input
                  id="newPassword"
                  type={showPasswords.new ? "text" : "password"}
                  value={passwordData.new}
                  onChange={(e) => setPasswordData((prev) => ({ ...prev, new: e.target.value }))}
                  placeholder="••••••••••••"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                  onClick={() => togglePasswordVisibility("new")}
                >
                  {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="confirmPassword" className="text-gray-600">
                Confirm New Password
              </Label>
              <div className="relative mt-1">
                <Input
                  id="confirmPassword"
                  type={showPasswords.confirm ? "text" : "password"}
                  value={passwordData.confirm}
                  onChange={(e) => setPasswordData((prev) => ({ ...prev, confirm: e.target.value }))}
                  placeholder="••••••••••••"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                  onClick={() => togglePasswordVisibility("confirm")}
                >
                  {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            <Button onClick={handlePasswordChange} className="w-full bg-slate-700 hover:bg-slate-800 mt-6">
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
