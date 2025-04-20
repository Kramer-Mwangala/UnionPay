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
import { Loader2, CheckCircle, XCircle, Clock, Upload, ShieldCheck, FileText } from "lucide-react"

// Sample data for insurance plans
const insurancePlans = [
  {
    id: "INS001",
    name: "Basic Health Plan",
    coverage: "Medical, Accident",
    premium: "$10/month",
    description: "Basic health coverage for essential medical needs and accidents",
    enrolled: true,
  },
  {
    id: "INS002",
    name: "Standard Health Plan",
    coverage: "Medical, Accident, Dental",
    premium: "$20/month",
    description: "Comprehensive health coverage including dental care",
    enrolled: false,
  },
  {
    id: "INS003",
    name: "Premium Health Plan",
    coverage: "Medical, Accident, Dental, Vision",
    premium: "$30/month",
    description: "Complete health coverage including vision care and enhanced benefits",
    enrolled: false,
  },
  {
    id: "INS004",
    name: "Life Insurance",
    coverage: "Death Benefit",
    premium: "$15/month",
    description: "Financial protection for your family in case of death",
    enrolled: false,
  },
]

// Sample data for claims
const claims = [
  {
    id: "C001",
    date: "2023-05-05",
    plan: "Basic Health Plan",
    planId: "INS001",
    amount: "$500",
    reason: "Medical treatment",
    status: "pending",
  },
  {
    id: "C002",
    date: "2023-03-15",
    plan: "Basic Health Plan",
    planId: "INS001",
    amount: "$300",
    reason: "Hospital visit",
    status: "approved",
  },
  {
    id: "C003",
    date: "2023-01-20",
    plan: "Basic Health Plan",
    planId: "INS001",
    amount: "$150",
    reason: "Medication",
    status: "rejected",
    rejectionReason: "Not covered under plan",
  },
]

export default function MemberInsurancePage() {
  const [newClaim, setNewClaim] = useState({
    planId: "INS001",
    amount: "",
    reason: "",
    date: "",
    details: "",
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewClaim((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setNewClaim((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmitClaim = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Validate form
    if (!newClaim.amount || !newClaim.reason || !newClaim.date) {
      alert("Please fill in all required fields")
      setLoading(false)
      return
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    alert("Claim submitted successfully!")
    setNewClaim({
      planId: "INS001",
      amount: "",
      reason: "",
      date: "",
      details: "",
    })
    setLoading(false)
  }

  const handleEnroll = (planId: string) => {
    alert(`Enrollment request for plan ${planId} submitted. You will be notified once processed.`)
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="coverage" className="space-y-4">
        <TabsList>
          <TabsTrigger value="coverage">My Coverage</TabsTrigger>
          <TabsTrigger value="claims">Claims History</TabsTrigger>
          <TabsTrigger value="submit">Submit Claim</TabsTrigger>
        </TabsList>

        <TabsContent value="coverage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Insurance Coverage</CardTitle>
              <CardDescription>View your current insurance plans and coverage details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {insurancePlans
                  .filter((plan) => plan.enrolled)
                  .map((plan) => (
                    <Card key={plan.id}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{plan.name}</CardTitle>
                          <Badge className="bg-green-100 text-green-700 border-green-200">Active</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">Coverage:</span>
                            <span>{plan.coverage}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">Premium:</span>
                            <span>{plan.premium}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{plan.description}</p>
                        </div>
                      </CardContent>
                      <CardFooter className="border-t pt-4">
                        <Button variant="outline" size="sm">
                          View Policy Details
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}

                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-4">Available Insurance Plans</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    {insurancePlans
                      .filter((plan) => !plan.enrolled)
                      .map((plan) => (
                        <Card key={plan.id}>
                          <CardHeader className="pb-2">
                            <CardTitle className="text-lg">{plan.name}</CardTitle>
                          </CardHeader>
                          <CardContent className="pb-2">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-sm">
                                <ShieldCheck className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">Coverage:</span>
                                <span>{plan.coverage}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <FileText className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">Premium:</span>
                                <span>{plan.premium}</span>
                              </div>
                              <p className="text-sm text-muted-foreground">{plan.description}</p>
                            </div>
                          </CardContent>
                          <CardFooter className="border-t pt-4">
                            <Button size="sm" onClick={() => handleEnroll(plan.id)}>
                              Enroll Now
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="claims" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Claims History</CardTitle>
              <CardDescription>View your insurance claim history and status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {claims.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                          No claims history found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      claims.map((claim) => (
                        <TableRow key={claim.id}>
                          <TableCell className="font-medium">{claim.id}</TableCell>
                          <TableCell>{claim.date}</TableCell>
                          <TableCell>{claim.plan}</TableCell>
                          <TableCell>{claim.amount}</TableCell>
                          <TableCell>{claim.reason}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                claim.status === "approved"
                                  ? "default"
                                  : claim.status === "pending"
                                    ? "outline"
                                    : "destructive"
                              }
                              className="flex w-fit items-center gap-1"
                            >
                              {claim.status === "approved" && <CheckCircle className="h-3 w-3" />}
                              {claim.status === "pending" && <Clock className="h-3 w-3" />}
                              {claim.status === "rejected" && <XCircle className="h-3 w-3" />}
                              {claim.status}
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

        <TabsContent value="submit">
          <Card>
            <CardHeader>
              <CardTitle>Submit Insurance Claim</CardTitle>
              <CardDescription>Fill in the details to submit a new insurance claim</CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmitClaim}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="planId">Insurance Plan</Label>
                  <Select value={newClaim.planId} onValueChange={(value) => handleSelectChange("planId", value)}>
                    <SelectTrigger id="planId">
                      <SelectValue placeholder="Select insurance plan" />
                    </SelectTrigger>
                    <SelectContent>
                      {insurancePlans
                        .filter((plan) => plan.enrolled)
                        .map((plan) => (
                          <SelectItem key={plan.id} value={plan.id}>
                            {plan.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Claim Amount ($)</Label>
                  <Input
                    id="amount"
                    name="amount"
                    placeholder="e.g., 500"
                    value={newClaim.amount}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reason">Reason for Claim</Label>
                  <Input
                    id="reason"
                    name="reason"
                    placeholder="e.g., Medical treatment, Hospital visit"
                    value={newClaim.reason}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">Date of Service/Incident</Label>
                  <Input id="date" name="date" type="date" value={newClaim.date} onChange={handleChange} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="details">Additional Details</Label>
                  <Textarea
                    id="details"
                    name="details"
                    placeholder="Provide any additional information about your claim"
                    value={newClaim.details}
                    onChange={handleChange}
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Supporting Documents</Label>
                  <div className="rounded-lg border border-dashed p-6">
                    <div className="flex flex-col items-center justify-center gap-2 text-center">
                      <Upload className="h-8 w-8 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Upload documents</p>
                        <p className="text-xs text-muted-foreground">
                          Attach receipts, medical reports, or other supporting documents
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
                    "Submit Claim"
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
