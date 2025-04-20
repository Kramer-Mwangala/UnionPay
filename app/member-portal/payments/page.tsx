"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Download, CheckCircle2, AlertCircle, Clock, AlertTriangle, Loader2 } from "lucide-react"

// Import the SIM swap detection utilities at the top of the file
import { checkSimSwapStatus, handleSimSwapVerification } from "@/utils/sim-swap-detection"

export default function MemberPaymentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showSimSwapModal, setShowSimSwapModal] = useState(false)
  const [simSwapStatus, setSimSwapStatus] = useState<{
    recentSwap: boolean
    lastSwapDate: Date | null
    riskLevel: "low" | "medium" | "high"
  } | null>(null)
  const [verificationInProgress, setVerificationInProgress] = useState(false)

  // Sample data for the table
  const payments = [
    {
      id: "P001",
      date: "2023-05-15",
      amount: "$500",
      description: "Monthly salary payment",
      source: "ABC Construction",
      status: "completed",
    },
    {
      id: "P002",
      date: "2023-04-15",
      amount: "$500",
      description: "Monthly salary payment",
      source: "ABC Construction",
      status: "completed",
    },
    {
      id: "P003",
      date: "2023-03-15",
      amount: "$450",
      description: "Monthly salary payment",
      source: "ABC Construction",
      status: "completed",
    },
    {
      id: "P004",
      date: "2023-06-01",
      amount: "$166.67",
      description: "Loan repayment (1/3)",
      source: "Automatic deduction",
      status: "pending",
    },
    {
      id: "P005",
      date: "2023-02-15",
      amount: "$450",
      description: "Monthly salary payment",
      source: "ABC Construction",
      status: "completed",
    },
    {
      id: "P006",
      date: "2023-01-15",
      amount: "$450",
      description: "Monthly salary payment",
      source: "ABC Construction",
      status: "completed",
    },
  ]

  // Filter payments based on search term
  const filteredPayments = payments.filter((payment) => {
    return (
      payment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.amount.includes(searchTerm)
    )
  })

  // Add a function to handle payment verification
  const handlePaymentVerification = async (paymentId: string) => {
    // In a real app, we would get the user's phone number from their profile
    const userPhoneNumber = "+254712345678" // Example phone number

    // Check for SIM swap
    const swapStatus = await checkSimSwapStatus(userPhoneNumber)
    setSimSwapStatus(swapStatus)

    if (swapStatus.recentSwap) {
      // If a recent SIM swap is detected, show the verification modal
      setShowSimSwapModal(true)
    } else {
      // If no SIM swap detected, proceed with payment
      alert(`Payment ${paymentId} verified successfully!`)
    }
  }

  // Add a function to handle additional verification
  const handleAdditionalVerification = async () => {
    if (!simSwapStatus) return

    setVerificationInProgress(true)

    try {
      // In a real app, we would get the user's phone number from their profile
      const userPhoneNumber = "+254712345678" // Example phone number

      // Perform additional verification
      const verificationResult = await handleSimSwapVerification(userPhoneNumber, simSwapStatus.riskLevel)

      if (verificationResult.verified) {
        alert(`Additional verification successful using ${verificationResult.verificationMethod}. Payment can proceed.`)
        setShowSimSwapModal(false)
      } else {
        alert("Verification failed. Please contact support.")
      }
    } catch (error) {
      alert("Verification process failed. Please try again later.")
    } finally {
      setVerificationInProgress(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
          <CardDescription>View your payment history and transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search payments..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>

          <div className="mt-4 rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No payments found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPayments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.id}</TableCell>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell>{payment.amount}</TableCell>
                      <TableCell>{payment.description}</TableCell>
                      <TableCell>{payment.source}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            payment.status === "completed"
                              ? "default"
                              : payment.status === "pending"
                                ? "outline"
                                : "destructive"
                          }
                          className="flex w-fit items-center gap-1"
                        >
                          {payment.status === "completed" && <CheckCircle2 className="h-3 w-3" />}
                          {payment.status === "pending" && <Clock className="h-3 w-3" />}
                          {payment.status === "failed" && <AlertCircle className="h-3 w-3" />}
                          {payment.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {filteredPayments.length} of {payments.length} payments
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" disabled>
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Summary</CardTitle>
          <CardDescription>Overview of your payment activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border p-4">
              <div className="text-sm text-muted-foreground">Total Received (2023)</div>
              <div className="mt-1 text-2xl font-bold">$2,850</div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="text-sm text-muted-foreground">Average Monthly</div>
              <div className="mt-1 text-2xl font-bold">$475</div>
            </div>
            <div className="rounded-lg border p-4">
              <div className="text-sm text-muted-foreground">Next Expected Payment</div>
              <div className="mt-1 text-2xl font-bold">June 15, 2023</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {showSimSwapModal && simSwapStatus && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <CardTitle className="text-amber-600">Security Alert: SIM Swap Detected</CardTitle>
              <CardDescription>
                We've detected a recent SIM card change on your registered phone number.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md bg-amber-50 p-4 text-amber-800 dark:bg-amber-900 dark:text-amber-200">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  <p className="font-medium">Risk Level: {simSwapStatus.riskLevel.toUpperCase()}</p>
                </div>
                {simSwapStatus.lastSwapDate && (
                  <p className="mt-2 text-sm">
                    SIM change detected on: {simSwapStatus.lastSwapDate.toLocaleDateString()}
                  </p>
                )}
                <p className="mt-2 text-sm">
                  For your security, we need to verify your identity before proceeding with any payment transactions.
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Additional verification is required:</p>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  {simSwapStatus.riskLevel === "high" && (
                    <>
                      <li>Verification via an alternative phone number</li>
                      <li>Additional ID verification may be required</li>
                    </>
                  )}
                  {simSwapStatus.riskLevel === "medium" && (
                    <>
                      <li>Email verification</li>
                      <li>Security questions verification</li>
                    </>
                  )}
                  {simSwapStatus.riskLevel === "low" && <li>Simple verification code via email</li>}
                </ul>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setShowSimSwapModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleAdditionalVerification} disabled={verificationInProgress}>
                {verificationInProgress ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Proceed with Verification"
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  )
}
