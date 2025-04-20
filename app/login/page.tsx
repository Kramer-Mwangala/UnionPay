"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [step, setStep] = useState<"credentials" | "verification">("credentials")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [role, setRole] = useState<"admin" | "employer">("admin")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // In a real app, this would be an API call to verify credentials
      // For the hackathon demo, we'll simulate a successful login after a delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (email && password) {
        // Simulate sending SMS verification code
        console.log("SMS code sent to registered phone number: 123456")
        setStep("verification")
      } else {
        setError("Please enter both email and password")
      }
    } catch (err) {
      setError("Authentication failed. Please check your credentials.")
    } finally {
      setLoading(false)
    }
  }

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // In a real app, this would verify the SMS code
      // For the hackathon demo, we'll accept any 6-digit code
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (verificationCode === "123456" || verificationCode.length === 6) {
        // Store auth token and role in localStorage
        localStorage.setItem("unionpay_token", "demo_token_123")
        localStorage.setItem("unionpay_role", role)

        // Redirect to dashboard
        router.push("/dashboard")
      } else {
        setError("Invalid verification code. Please try again.")
      }
    } catch (err) {
      setError("Verification failed. Please try again.")
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

        <Tabs defaultValue="admin" onValueChange={(value) => setRole(value as "admin" | "employer")}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="admin">Union Admin</TabsTrigger>
            <TabsTrigger value="employer">Employer</TabsTrigger>
          </TabsList>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              {step === "credentials"
                ? "Enter your credentials to access your account"
                : "Enter the verification code sent to your phone"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {step === "credentials" ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@unionpay.org"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing In
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleVerification} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="code">Verification Code</Label>
                  <Input
                    id="code"
                    type="text"
                    placeholder="123456"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    maxLength={6}
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">For demo purposes, use code: 123456</p>
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verifying
                    </>
                  ) : (
                    "Verify"
                  )}
                </Button>
              </form>
            )}
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-500">
              {step === "verification" && (
                <Button variant="link" onClick={() => setStep("credentials")} className="p-0 h-auto">
                  Back to login
                </Button>
              )}
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
