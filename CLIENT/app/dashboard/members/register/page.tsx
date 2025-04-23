"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import { AlertCircle, Loader2, CheckCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function RegisterMemberPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    idNumber: "",
    skills: "",
    address: "",
    unionCode: "",
    membershipFee: "",
    paymentStatus: "unpaid",
    notes: "",
  })

  // Union codes with their corresponding membership fees
  const unionCodes = [
    { code: "NAIROBI001", fee: "1500" },
    { code: "MOMBASA002", fee: "1200" },
    { code: "NAKURU003", fee: "1000" },
    { code: "KISUMU004", fee: "1100" },
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleUnionCodeChange = (code: string) => {
    const selectedUnion = unionCodes.find((union) => union.code === code)
    setFormData((prev) => ({
      ...prev,
      unionCode: code,
      membershipFee: selectedUnion ? selectedUnion.fee : prev.membershipFee,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Validate form data
      if (!formData.fullName || !formData.email || !formData.phone) {
        throw new Error("Please fill in all required fields")
      }

      // In a real app, this would be an API call to register the member
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setSuccess(true)

      // Reset form after 2 seconds and redirect
      setTimeout(() => {
        router.push("/dashboard/members")
      }, 2000)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("An unknown error occurred")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Register New Member</CardTitle>
          <CardDescription>Add a new member to the construction workers union</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="bg-green-50 text-green-800 border-green-200">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>Member registered successfully! Redirecting...</AlertDescription>
              </Alert>
            )}

            <div className="grid gap-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="fullName">
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="idNumber">
                    ID Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="idNumber"
                    name="idNumber"
                    placeholder="National ID Number"
                    value={formData.idNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john.doe@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">
                    Phone Number <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="+254712345678"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  placeholder="123 Main St, Nairobi"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="skills">Skills (comma separated)</Label>
                <Input
                  id="skills"
                  name="skills"
                  placeholder="e.g., Carpentry, Masonry, Plumbing"
                  value={formData.skills}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="unionCode">
                    Union Code <span className="text-red-500">*</span>
                  </Label>
                  <Select value={formData.unionCode} onValueChange={handleUnionCodeChange}>
                    <SelectTrigger id="unionCode">
                      <SelectValue placeholder="Select union code" />
                    </SelectTrigger>
                    <SelectContent>
                      {unionCodes.map((union) => (
                        <SelectItem key={union.code} value={union.code}>
                          {union.code} - KES {union.fee}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">The unique code for this member's union branch</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="membershipFee">
                    Membership Fee (KES) <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="membershipFee"
                    name="membershipFee"
                    placeholder="1500"
                    value={formData.membershipFee}
                    onChange={handleChange}
                    readOnly
                  />
                  <p className="text-xs text-muted-foreground">Set automatically based on the union code</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="paymentStatus">Payment Status</Label>
                <Select
                  value={formData.paymentStatus}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, paymentStatus: value }))}
                >
                  <SelectTrigger id="paymentStatus">
                    <SelectValue placeholder="Select payment status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unpaid">Unpaid</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="waived">Waived</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  placeholder="Enter any additional information about this member"
                  rows={3}
                  value={formData.notes}
                  onChange={handleChange}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => router.push("/dashboard/members")}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Registering Member
                </>
              ) : (
                "Register Member"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
