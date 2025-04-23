"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, Download, CheckCircle, AlertCircle, Clock } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"

// Sample data for the table
const payments = [
  {
    id: "EP001",
    employer: "ABC Construction",
    amount: "$5,000",
    date: "2023-05-15",
    purpose: "Monthly worker dues",
    status: "completed",
    workers: 10,
  },
  {
    id: "EP002",
    employer: "XYZ Builders",
    amount: "$3,000",
    date: "2023-05-14",
    purpose: "Monthly worker dues",
    status: "completed",
    workers: 6,
  },
  {
    id: "EP003",
    employer: "Lake Construction",
    amount: "$8,000",
    date: "2023-05-16",
    purpose: "Monthly worker dues",
    status: "pending",
    workers: 16,
  },
  {
    id: "EP004",
    employer: "Rift Builders",
    amount: "$2,500",
    date: "2023-05-10",
    purpose: "Monthly worker dues",
    status: "completed",
    workers: 5,
  },
  {
    id: "EP005",
    employer: "Nairobi Contractors",
    amount: "$6,000",
    date: "2023-05-18",
    purpose: "Monthly worker dues",
    status: "failed",
    workers: 12,
  },
]

// Sample employer data for dropdown
const employers = [
  { id: "E001", name: "ABC Construction", workerCount: 10, totalDue: "$5,000" },
  { id: "E002", name: "XYZ Builders", workerCount: 8, totalDue: "$4,000" },
  { id: "E003", name: "Lake Construction", workerCount: 16, totalDue: "$8,000" },
  { id: "E004", name: "Rift Builders", workerCount: 5, totalDue: "$2,500" },
  { id: "E005", name: "Nairobi Contractors", workerCount: 12, totalDue: "$6,000" },
]

export default function EmployerPaymentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPayment, setSelectedPayment] = useState<(typeof payments)[0] | null>(null)
  const [newPayment, setNewPayment] = useState({
    employerId: "",
    amount: "",
    purpose: "Monthly worker dues",
    paymentMethod: "bank_transfer",
    notes: "",
  })
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  // Filter payments based on search term
  const filteredPayments = payments.filter((payment) => {
    return (
      payment.employer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.id.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  const handleEmployerChange = (employerId: string) => {
    const selectedEmployer = employers.find((emp) => emp.id === employerId)
    setNewPayment({
      ...newPayment,
      employerId,
      amount: selectedEmployer ? selectedEmployer.totalDue.replace("$", "") : "",
    })
  }

  const handleRecordPayment = () => {
    if (!newPayment.employerId || !newPayment.amount) {
      return
    }

    // In a real app, this would be an API call to process the payment
    // For the demo, we'll just show a success message
    setSuccessMessage(
      `Payment of $${newPayment.amount} from ${employers.find((emp) => emp.id === newPayment.employerId)?.name} recorded successfully!`,
    )

    // Reset the form
    setNewPayment({
      employerId: "",
      amount: "",
      purpose: "Monthly worker dues",
      paymentMethod: "bank_transfer",
      notes: "",
    })

    // Clear the success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage(null)
    }, 3000)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-3xl font-bold tracking-tight">Employer Payments</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Record Payment
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Record Employer Payment</DialogTitle>
              <DialogDescription>Record a new payment from an employer to the union.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {successMessage && (
                <Alert className="bg-green-50 text-green-800 border-green-200">
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>{successMessage}</AlertDescription>
                </Alert>
              )}
              <div className="grid gap-2">
                <Label htmlFor="employer">Employer</Label>
                <Select value={newPayment.employerId} onValueChange={handleEmployerChange}>
                  <SelectTrigger id="employer">
                    <SelectValue placeholder="Select employer" />
                  </SelectTrigger>
                  <SelectContent>
                    {employers.map((employer) => (
                      <SelectItem key={employer.id} value={employer.id}>
                        {employer.name} ({employer.workerCount} workers)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="amount">Payment Amount ($)</Label>
                  <Input
                    id="amount"
                    value={newPayment.amount}
                    onChange={(e) => setNewPayment({ ...newPayment, amount: e.target.value })}
                    placeholder="0.00"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="payment-method">Payment Method</Label>
                  <Select
                    value={newPayment.paymentMethod}
                    onValueChange={(value) => setNewPayment({ ...newPayment, paymentMethod: value })}
                  >
                    <SelectTrigger id="payment-method">
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                      <SelectItem value="check">Check</SelectItem>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="mobile_money">Mobile Money</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="purpose">Purpose</Label>
                <Input
                  id="purpose"
                  value={newPayment.purpose}
                  onChange={(e) => setNewPayment({ ...newPayment, purpose: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  value={newPayment.notes}
                  onChange={(e) => setNewPayment({ ...newPayment, notes: e.target.value })}
                  placeholder="Enter any additional notes"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleRecordPayment}>Record Payment</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="history" className="space-y-4">
        <TabsList>
          <TabsTrigger value="history">Payment History</TabsTrigger>
          <TabsTrigger value="pending">Pending Payments</TabsTrigger>
        </TabsList>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Employer Payment History</CardTitle>
              <CardDescription>All payments made by employers to the union</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search by employer or ID..."
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
                      <TableHead className="w-[80px]">ID</TableHead>
                      <TableHead>Employer</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Purpose</TableHead>
                      <TableHead>Workers</TableHead>
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
                          <TableCell>{payment.employer}</TableCell>
                          <TableCell>{payment.amount}</TableCell>
                          <TableCell>{payment.date}</TableCell>
                          <TableCell>{payment.purpose}</TableCell>
                          <TableCell>{payment.workers}</TableCell>
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
                              {payment.status === "completed" && <CheckCircle className="h-3 w-3" />}
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
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Employer Payments</CardTitle>
              <CardDescription>Payments that are due but not yet received</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mt-4 rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employer</TableHead>
                      <TableHead>Workers</TableHead>
                      <TableHead>Amount Due</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>ABC Construction</TableCell>
                      <TableCell>10</TableCell>
                      <TableCell>$5,000</TableCell>
                      <TableCell>2023-06-01</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          Send Reminder
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>XYZ Builders</TableCell>
                      <TableCell>8</TableCell>
                      <TableCell>$4,000</TableCell>
                      <TableCell>2023-06-01</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          Send Reminder
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Nairobi Contractors</TableCell>
                      <TableCell>12</TableCell>
                      <TableCell>$6,000</TableCell>
                      <TableCell>2023-05-15</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          Send Reminder
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
