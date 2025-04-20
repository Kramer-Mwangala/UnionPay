"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Upload,
  Download,
  Search,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  Clock,
  FileText,
  AlertTriangle,
  Loader2,
} from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

// Import the SIM swap detection utilities at the top of the file
import { checkSimSwapStatus, handleSimSwapVerification } from "@/utils/sim-swap-detection"

// Sample data for the table
const payments = [
  {
    id: "P001",
    worker: "John Doe",
    workerId: "M001",
    amount: "$500",
    date: "2023-05-15",
    status: "completed",
    method: "Bank Transfer",
  },
  {
    id: "P002",
    worker: "Jane Smith",
    workerId: "M002",
    amount: "$450",
    date: "2023-05-15",
    status: "completed",
    method: "Mobile Money",
  },
  {
    id: "P003",
    worker: "Michael Johnson",
    workerId: "M007",
    amount: "$600",
    date: "2023-05-15",
    status: "pending",
    method: "Bank Transfer",
  },
  {
    id: "P004",
    worker: "Sarah Williams",
    workerId: "M004",
    amount: "$350",
    date: "2023-05-14",
    status: "failed",
    method: "Mobile Money",
  },
  {
    id: "P005",
    worker: "Robert Brown",
    workerId: "M005",
    amount: "$520",
    date: "2023-05-14",
    status: "completed",
    method: "Bank Transfer",
  },
  {
    id: "P006",
    worker: "David Wilson",
    workerId: "M007",
    amount: "$480",
    date: "2023-05-13",
    status: "completed",
    method: "Mobile Money",
  },
]

export default function PaymentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [newPayment, setNewPayment] = useState({
    workerId: "",
    amount: "",
    method: "mobile",
    description: "",
  })

  // Add new states for SIM swap detection
  const [showSimSwapModal, setShowSimSwapModal] = useState(false)
  const [currentPayment, setCurrentPayment] = useState<{
    workerId: string
    phone: string
    amount: string
  } | null>(null)
  const [simSwapStatus, setSimSwapStatus] = useState<{
    recentSwap: boolean
    lastSwapDate: Date | null
    riskLevel: "low" | "medium" | "high"
  } | null>(null)
  const [verificationInProgress, setVerificationInProgress] = useState(false)

  // Filter payments based on search term
  const filteredPayments = payments.filter((payment) => {
    return (
      payment.worker.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.workerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsUploading(true)

      // Simulate file processing
      setTimeout(() => {
        setIsUploading(false)
        alert("CSV file processed successfully. 5 payments ready to disburse.")
      }, 2000)
    }
  }

  // Modify the handleProcessPayments function to include SIM swap detection
  const handleProcessPayments = async () => {
    setIsProcessing(true)

    // Simulate API call to check for SIM swaps in bulk
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // For demo purposes, we'll simulate that 1 out of 5 payments has a SIM swap issue
    alert("SIM swap detection completed: 4 payments ready to process, 1 payment flagged for additional verification.")

    // Simulate API call to process payments
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsProcessing(false)
    alert("4 payments processed successfully! 1 payment requires manual verification.")
  }

  // Modify the handleSinglePayment function to include SIM swap detection
  const handleSinglePayment = async () => {
    if (!newPayment.workerId || !newPayment.amount) {
      alert("Please fill in all required fields")
      return
    }

    // In a real app, we would get the worker's phone number from their profile
    // For demo purposes, we'll use a hardcoded phone number
    const workerPhone = "+254712345678"

    setCurrentPayment({
      workerId: newPayment.workerId,
      phone: workerPhone,
      amount: newPayment.amount,
    })

    // Check for SIM swap
    const swapStatus = await checkSimSwapStatus(workerPhone)
    setSimSwapStatus(swapStatus)

    if (swapStatus.recentSwap) {
      // If a recent SIM swap is detected, show the verification modal
      setShowSimSwapModal(true)
    } else {
      // If no SIM swap detected, proceed with payment
      alert(`Payment of ${newPayment.amount} to worker ${newPayment.workerId} initiated`)

      // Reset form
      setNewPayment({
        workerId: "",
        amount: "",
        method: "mobile",
        description: "",
      })
    }
  }

  // Add a function to handle additional verification
  const handleAdditionalVerification = async () => {
    if (!simSwapStatus || !currentPayment) return

    setVerificationInProgress(true)

    try {
      // Perform additional verification
      const verificationResult = await handleSimSwapVerification(currentPayment.phone, simSwapStatus.riskLevel)

      if (verificationResult.verified) {
        alert(`Additional verification successful using ${verificationResult.verificationMethod}. Payment can proceed.`)
        alert(`Payment of ${currentPayment.amount} to worker ${currentPayment.workerId} initiated`)

        // Reset form
        setNewPayment({
          workerId: "",
          amount: "",
          method: "mobile",
          description: "",
        })

        setShowSimSwapModal(false)
      } else {
        alert("Verification failed. Payment cannot be processed.")
      }
    } catch (error) {
      alert("Verification process failed. Please try again later.")
    } finally {
      setVerificationInProgress(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-3xl font-bold tracking-tight">Payment Management</h2>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" asChild>
            <a href="/dashboard/payments/employer-payments">Employer Payments</a>
          </Button>
          <Button variant="outline" asChild>
            <a href="/dashboard/payments/union-distributions">Union Distributions</a>
          </Button>
        </div>
      </div>
      <Tabs defaultValue="history" className="space-y-4">
        <TabsList>
          <TabsTrigger value="history">Payment History</TabsTrigger>
          <TabsTrigger value="new">New Payment</TabsTrigger>
          <TabsTrigger value="bulk">Bulk Upload</TabsTrigger>
        </TabsList>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>View and manage all payment transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search by worker name or ID..."
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
                      <TableHead>Worker</TableHead>
                      <TableHead>Worker ID</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPayments.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          No payments found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredPayments.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell className="font-medium">{payment.id}</TableCell>
                          <TableCell>{payment.worker}</TableCell>
                          <TableCell>{payment.workerId}</TableCell>
                          <TableCell>{payment.amount}</TableCell>
                          <TableCell>{payment.date}</TableCell>
                          <TableCell>{payment.method}</TableCell>
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
            </CardContent>
            <CardFooter className="flex items-center justify-between">
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
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="new">
          <Card>
            <CardHeader>
              <CardTitle>New Payment</CardTitle>
              <CardDescription>Create a single payment to a union member</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="worker-id">Worker ID</Label>
                  <Input
                    id="worker-id"
                    placeholder="Enter worker ID (e.g., M001)"
                    value={newPayment.workerId}
                    onChange={(e) => setNewPayment({ ...newPayment, workerId: e.target.value })}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    placeholder="Enter amount (e.g., 500)"
                    value={newPayment.amount}
                    onChange={(e) => setNewPayment({ ...newPayment, amount: e.target.value })}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="payment-method">Payment Method</Label>
                  <Select
                    value={newPayment.method}
                    onValueChange={(value) => setNewPayment({ ...newPayment, method: value })}
                  >
                    <SelectTrigger id="payment-method">
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mobile">Mobile Money</SelectItem>
                      <SelectItem value="bank">Bank Transfer</SelectItem>
                      <SelectItem value="cash">Cash</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter payment description"
                    value={newPayment.description}
                    onChange={(e) => setNewPayment({ ...newPayment, description: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSinglePayment}>
                <CreditCard className="mr-2 h-4 w-4" />
                Process Payment
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="bulk">
          <Card>
            <CardHeader>
              <CardTitle>Bulk Payment Upload</CardTitle>
              <CardDescription>Upload a CSV file with payment details for multiple workers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="rounded-lg border border-dashed p-10">
                  <div className="flex flex-col items-center justify-center gap-4 text-center">
                    <Upload className="h-10 w-10 text-muted-foreground" />
                    <div>
                      <h3 className="text-lg font-semibold">Upload Payment CSV</h3>
                      <p className="text-sm text-muted-foreground">
                        Drag and drop your CSV file here, or click to browse
                      </p>
                    </div>
                    <Input type="file" accept=".csv" className="hidden" id="csv-upload" onChange={handleFileUpload} />
                    <Label
                      htmlFor="csv-upload"
                      className="cursor-pointer rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
                    >
                      {isUploading ? "Uploading..." : "Select CSV File"}
                    </Label>
                    <div className="text-xs text-muted-foreground">
                      <p>CSV should include: Worker ID, Amount, Payment Method</p>
                      <a href="#" className="text-blue-600 hover:underline">
                        <FileText className="mr-1 inline-block h-3 w-3" />
                        Download template
                      </a>
                    </div>
                  </div>
                </div>

                <div className="rounded-md bg-muted p-4">
                  <h3 className="mb-2 font-medium">Payment Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Total Workers:</span>
                      <span>5</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Amount:</span>
                      <span>$2,500</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Payment Method:</span>
                      <span>Mobile Money (3), Bank Transfer (2)</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleProcessPayments} disabled={isProcessing}>
                {isProcessing ? (
                  <>Processing...</>
                ) : (
                  <>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Process Bulk Payments
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      {showSimSwapModal && simSwapStatus && currentPayment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <CardTitle className="text-amber-600">Security Alert: SIM Swap Detected</CardTitle>
              <CardDescription>
                A recent SIM card change was detected for worker ID {currentPayment.workerId}.
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
                  For security reasons, additional verification is required before processing this payment.
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Recommended actions:</p>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  {simSwapStatus.riskLevel === "high" && (
                    <>
                      <li>Contact the worker directly via alternative means</li>
                      <li>Request in-person verification if possible</li>
                      <li>Verify identity with additional documentation</li>
                    </>
                  )}
                  {simSwapStatus.riskLevel === "medium" && (
                    <>
                      <li>Send verification code to registered email</li>
                      <li>Verify with security questions</li>
                    </>
                  )}
                  {simSwapStatus.riskLevel === "low" && <li>Proceed with standard verification</li>}
                </ul>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setShowSimSwapModal(false)}>
                Cancel Payment
              </Button>
              <Button onClick={handleAdditionalVerification} disabled={verificationInProgress}>
                {verificationInProgress ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify and Process"
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  )
}
