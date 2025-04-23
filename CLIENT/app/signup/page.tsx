"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertCircle, Loader2, ArrowLeft } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function SignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    companySize: "",
    idNumber: "",
    skills: "",
  })
  const [role, setRole] = useState<"admin" | "employer" | "member">("member")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [termsAccepted, setTermsAccepted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Basic validation
    if (!termsAccepted) {
      setError("You must accept the terms and conditions")
      setLoading(false)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    try {
      // In a real app, this would be an API call to register the user
      // For the hackathon demo, we'll simulate a successful registration after a delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Redirect to verification page or login page
      alert(`Account created successfully! A verification code has been sent to ${formData.phone}.`)
      router.push("/login")
    } catch (err) {
      setError("Registration failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <div className="relative h-12 w-48">
            <div className="flex items-center justify-center h-full">
              <h1 className="text-2xl font-bold text-blue-700">UnionPay</h1>
            </div>
          </div>
        </div>

        <Tabs defaultValue="member" onValueChange={(value) => setRole(value as "admin" | "employer" | "member")}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="member">Member</TabsTrigger>
            <TabsTrigger value="employer">Employer</TabsTrigger>
            <TabsTrigger value="admin">Union Admin</TabsTrigger>
          </TabsList>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>Create an Account</CardTitle>
            <CardDescription>
              {role === "member"
                ? "Sign up as a construction worker to access union benefits"
                : role === "employer"
                  ? "Register your construction company to manage worker payments"
                  : "Register as a union administrator"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
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
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="+254712345678"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
                <p className="text-xs text-muted-foreground">We'll send a verification code to this number</p>
              </div>

              {role === "employer" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      name="companyName"
                      placeholder="ABC Construction Ltd"
                      value={formData.companyName}
                      onChange={handleChange}
                      required={role === "employer"}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="companySize">Company Size</Label>
                    <Select
                      value={formData.companySize}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, companySize: value }))}
                    >
                      <SelectTrigger id="companySize">
                        <SelectValue placeholder="Select company size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-10">1-10 employees</SelectItem>
                        <SelectItem value="11-50">11-50 employees</SelectItem>
                        <SelectItem value="51-200">51-200 employees</SelectItem>
                        <SelectItem value="201+">201+ employees</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              {role === "member" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="idNumber">ID Number</Label>
                    <Input
                      id="idNumber"
                      name="idNumber"
                      placeholder="National ID Number"
                      value={formData.idNumber}
                      onChange={handleChange}
                      required={role === "member"}
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
                </>
              )}

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <Checkbox
                  id="terms"
                  checked={termsAccepted}
                  onCheckedChange={(checked) => setTermsAccepted(!!checked)}
                />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree to the{" "}
                  <Link href="#" className="text-blue-600 hover:underline">
                    terms and conditions
                  </Link>
                </label>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Account
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 hover:underline">
                Sign in
              </Link>
            </div>
            <Link href="/" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to home
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
