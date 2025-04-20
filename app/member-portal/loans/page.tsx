"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, CheckCircle, XCircle, Clock, Upload } from "lucide-react"

// Sample data for the table
const loans = [
  {
    id: "L001",
    requestDate: "2023-05-10",
    amount: "$500",
    purpose: "Medical expenses",
    repaymentPeriod: "3 months",
    status: "pending",
  },
  {
    id: "L002",
    requestDate: "2023-03-15",
    amount: "$300",
    purpose: "School fees",
    repaymentPeriod: "2 months",
    status: "approved",
  },
  {
    id: "L003",
    requestDate: "2023-01-20",
    amount: "$200",
    purpose: "Home repair",
    repaymentPeriod: "1 month",
    status: "completed",
  },
  {
    id: "L004",
    requestDate: "2022-11-05",
    amount: "$400",
    purpose: "Tools purchase",
    repaymentPeriod: "3 months",
    status: "rejected",
  },
]

export default function MemberLoansPage() {
  const [newLoan, setNewLoan] = useState({
    amount: "",
    purpose: "",
    repaymentPeriod: "",
    details: "",
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewLoan((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setNewLoan((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmitLoan = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Validate form
    if (!newLoan.amount || !newLoan.purpose || !newLoan.repaymentPeriod) {
      alert("Please fill in all required fields")
      setLoading(false)
      return
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    alert("Loan application submitted successfully!")
    setNewLoan({
      amount: "",
      purpose: "",
      repaymentPeriod: "",
      details: "",
    })
    setLoading(false)
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="history" className="space-y-4">
        <TabsList>
          <TabsTrigger value="history">Loan History</TabsTrigger>
          <TabsTrigger value="apply">Apply for Loan</TabsTrigger>
        </TabsList>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Loan History</CardTitle>
              <CardDescription>View your loan applications and status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">ID</TableHead>
                      <TableHead>Request Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Purpose</TableHead>
                      <TableHead>Repayment Period</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loans.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                          No loan history found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      loans.map((loan) => (
                        <TableRow key={loan.id}>
                          <TableCell className="font-medium">{loan.id}</TableCell>
                          <TableCell>{loan.requestDate}</TableCell>
                          <TableCell>{loan.amount}</TableCell>
                          <TableCell>{loan.purpose}</TableCell>
                          <TableCell>{loan.repaymentPeriod}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                loan.status === "approved"
                                  ? "default"
                                  : loan.status === "pending"
                                    ? "outline"
                                    : loan.status === "completed"
                                      ? "secondary"
                                      : "destructive"
                              }
                              className="flex w-fit items-center gap-1"
                            >
                              {loan.status === "approved" && <CheckCircle className="h-3 w-3" />}
                              {loan.status === "pending" && <Clock className="h-3 w-3" />}
                              {loan.status === "rejected" && <XCircle className="h-3 w-3" />}
                              {loan.status === "completed" && <CheckCircle className="h-3 w-3" />}
                              {loan.status}
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

          <Card>
            <CardHeader>
              <CardTitle>Active Loan Details</CardTitle>
              <CardDescription>Information about your current loan</CardDescription>
            </CardHeader>
            <CardContent>
              {loans.some((loan) => loan.status === "approved") ? (
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-lg border p-4">
                      <div className="text-sm text-muted-foreground">Loan Amount</div>
                      <div className="mt-1 text-2xl font-bold">$500</div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <div className="text-sm text-muted-foreground">Remaining Balance</div>
                      <div className="mt-1 text-2xl font-bold">$333.33</div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <div className="text-sm text-muted-foreground">Next Payment</div>
                      <div className="mt-1 text-2xl font-bold">$166.67</div>
                      <div className="text-xs text-muted-foreground">Due June 10, 2023</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Repayment Schedule</h3>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Payment</TableHead>
                            <TableHead>Due Date</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>1 of 3</TableCell>
                            <TableCell>May 10, 2023</TableCell>
                            <TableCell>$166.67</TableCell>
                            <TableCell>
                              <Badge className="flex w-fit items-center gap-1">
                                <CheckCircle className="h-3 w-3" />
                                Paid
                              </Badge>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>2 of 3</TableCell>
                            <TableCell>June 10, 2023</TableCell>
                            <TableCell>$166.67</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="flex w-fit items-center gap-1">
                                <Clock className="h-3 w-3" />
                                Upcoming
                              </Badge>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>3 of 3</TableCell>
                            <TableCell>July 10, 2023</TableCell>
                            <TableCell>$166.66</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="flex w-fit items-center gap-1">
                                <Clock className="h-3 w-3" />
                                Upcoming
                              </Badge>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8">
                  <p className="text-muted-foreground">You don't have any active loans.</p>
                  <Button className="mt-4" onClick={() => document.querySelector('[value="apply"]')?.click()}>
                    Apply for a Loan
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="apply">
          <Card>
            <CardHeader>
              <CardTitle>Apply for a Loan</CardTitle>
              <CardDescription>Fill in the details to submit a loan application</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmitLoan}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Loan Amount ($)</Label>
                  <Input
                    id="amount"
                    name="amount"
                    placeholder="e.g., 500"
                    value={newLoan.amount}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="purpose">Purpose</Label>
                  <Select value={newLoan.purpose} onValueChange={(value) => handleSelectChange("purpose", value)}>
                    <SelectTrigger id="purpose">
                      <SelectValue placeholder="Select purpose" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="medical">Medical Expenses</SelectItem>
                      <SelectItem value="education">Education/School Fees</SelectItem>
                      <SelectItem value="housing">Housing/Rent</SelectItem>
                      <SelectItem value="tools">Tools/Equipment</SelectItem>
                      <SelectItem value="emergency">Emergency</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="repaymentPeriod">Repayment Period</Label>
                  <Select
                    value={newLoan.repaymentPeriod}
                    onValueChange={(value) => handleSelectChange("repaymentPeriod", value)}
                  >
                    <SelectTrigger id="repaymentPeriod">
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Month</SelectItem>
                      <SelectItem value="2">2 Months</SelectItem>
                      <SelectItem value="3">3 Months</SelectItem>
                      <SelectItem value="6">6 Months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="details">Additional Details</Label>
                  <Textarea
                    id="details"
                    name="details"
                    placeholder="Provide any additional information about your loan request"
                    value={newLoan.details}
                    onChange={handleChange}
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Supporting Documents (Optional)</Label>
                  <div className="rounded-lg border border-dashed p-6">
                    <div className="flex flex-col items-center justify-center gap-2 text-center">
                      <Upload className="h-8 w-8 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Upload documents</p>
                        <p className="text-xs text-muted-foreground">
                          Attach any supporting documents (receipts, quotes, etc.)
                        </p>
                      </div>
                      <Button variant="outline" size="sm" className="mt-2">
                        Select Files
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting
                    </>
                  ) : (
                    "Submit Loan Application"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
