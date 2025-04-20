"use client"

import { Label } from "@/components/ui/label"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Search, Plus, FileText, ShieldCheck, AlertTriangle, CheckCircle, XCircle, User } from "lucide-react"

// Sample data for the table
const insurancePlans = [
  {
    id: "INS001",
    name: "Basic Health Plan",
    coverage: "Medical, Accident",
    premium: "$10/month",
    enrolledMembers: 45,
  },
  {
    id: "INS002",
    name: "Standard Health Plan",
    coverage: "Medical, Accident, Dental",
    premium: "$20/month",
    enrolledMembers: 30,
  },
  {
    id: "INS003",
    name: "Premium Health Plan",
    coverage: "Medical, Accident, Dental, Vision",
    premium: "$30/month",
    enrolledMembers: 15,
  },
  {
    id: "INS004",
    name: "Life Insurance",
    coverage: "Death Benefit",
    premium: "$15/month",
    enrolledMembers: 25,
  },
  {
    id: "INS005",
    name: "Disability Insurance",
    coverage: "Income Protection",
    premium: "$18/month",
    enrolledMembers: 20,
  },
]

const enrollments = [
  {
    id: "E001",
    member: "John Doe",
    memberId: "M001",
    plan: "Basic Health Plan",
    planId: "INS001",
    startDate: "2023-01-15",
    status: "active",
  },
  {
    id: "E002",
    member: "Jane Smith",
    memberId: "M002",
    plan: "Premium Health Plan",
    planId: "INS003",
    startDate: "2023-02-20",
    status: "active",
  },
  {
    id: "E003",
    member: "Michael Johnson",
    memberId: "M007",
    plan: "Life Insurance",
    planId: "INS004",
    startDate: "2023-03-10",
    status: "active",
  },
  {
    id: "E004",
    member: "Sarah Williams",
    memberId: "M004",
    plan: "Standard Health Plan",
    planId: "INS002",
    startDate: "2023-01-05",
    status: "inactive",
  },
  {
    id: "E005",
    member: "Robert Brown",
    memberId: "M005",
    plan: "Disability Insurance",
    planId: "INS005",
    startDate: "2023-04-15",
    status: "active",
  },
]

const claims = [
  {
    id: "C001",
    member: "John Doe",
    memberId: "M001",
    plan: "Basic Health Plan",
    planId: "INS001",
    amount: "$500",
    date: "2023-05-05",
    reason: "Medical treatment",
    status: "pending",
  },
  {
    id: "C002",
    member: "Jane Smith",
    memberId: "M002",
    plan: "Premium Health Plan",
    planId: "INS003",
    amount: "$800",
    date: "2023-05-02",
    reason: "Dental procedure",
    status: "approved",
  },
  {
    id: "C003",
    member: "Michael Johnson",
    memberId: "M007",
    plan: "Life Insurance",
    planId: "INS004",
    amount: "$1,200",
    date: "2023-05-08",
    reason: "Hospital stay",
    status: "pending",
  },
  {
    id: "C004",
    member: "Sarah Williams",
    memberId: "M004",
    plan: "Standard Health Plan",
    planId: "INS002",
    amount: "$300",
    date: "2023-04-25",
    reason: "Prescription medication",
    status: "rejected",
  },
]

export default function InsurancePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [newClaim, setNewClaim] = useState({
    memberId: "",
    planId: "",
    amount: "",
    reason: "",
    date: "",
  })

  // Filter data based on search term
  const filteredEnrollments = enrollments.filter((enrollment) => {
    return (
      enrollment.member.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enrollment.memberId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enrollment.plan.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  const filteredClaims = claims.filter((claim) => {
    return (
      claim.member.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.memberId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.plan.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  const handleSubmitClaim = () => {
    // Validate form
    if (!newClaim.memberId || !newClaim.planId || !newClaim.amount || !newClaim.reason) {
      alert("Please fill in all required fields")
      return
    }

    alert("Claim submitted successfully!")

    // Reset form
    setNewClaim({
      memberId: "",
      planId: "",
      amount: "",
      reason: "",
      date: "",
    })
  }

  const handleApproveClaim = (claimId: string) => {
    alert(`Claim ${claimId} approved successfully!`)
  }

  const handleRejectClaim = (claimId: string) => {
    alert(`Claim ${claimId} rejected.`)
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="plans" className="space-y-4">
        <TabsList>
          <TabsTrigger value="plans">Insurance Plans</TabsTrigger>
          <TabsTrigger value="enrollments">Member Enrollments</TabsTrigger>
          <TabsTrigger value="claims">Claims</TabsTrigger>
          <TabsTrigger value="new-claim">Submit Claim</TabsTrigger>
        </TabsList>

        <TabsContent value="plans" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Insurance Plans</CardTitle>
              <CardDescription>View and manage available insurance plans</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search plans..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Plan
                </Button>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {insurancePlans.map((plan) => (
                  <Card key={plan.id}>
                    <CardHeader className="pb-2">
                      <Badge className="w-fit">{plan.id}</Badge>
                      <CardTitle className="text-xl">{plan.name}</CardTitle>
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
                        <div className="flex items-center gap-2 text-sm">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">Enrolled:</span>
                          <span>{plan.enrolledMembers} members</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t pt-4">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button size="sm">Edit Plan</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="enrollments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Member Enrollments</CardTitle>
              <CardDescription>View and manage member insurance enrollments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search enrollments..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Enrollment
                </Button>
              </div>

              <div className="mt-4 rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">ID</TableHead>
                      <TableHead>Member</TableHead>
                      <TableHead>Member ID</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEnrollments.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          No enrollments found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredEnrollments.map((enrollment) => (
                        <TableRow key={enrollment.id}>
                          <TableCell className="font-medium">{enrollment.id}</TableCell>
                          <TableCell>{enrollment.member}</TableCell>
                          <TableCell>{enrollment.memberId}</TableCell>
                          <TableCell>{enrollment.plan}</TableCell>
                          <TableCell>{enrollment.startDate}</TableCell>
                          <TableCell>
                            <Badge
                              variant={enrollment.status === "active" ? "default" : "secondary"}
                              className="flex w-fit items-center gap-1"
                            >
                              {enrollment.status === "active" ? (
                                <CheckCircle className="h-3 w-3" />
                              ) : (
                                <XCircle className="h-3 w-3" />
                              )}
                              {enrollment.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" size="sm">
                                View
                              </Button>
                              <Button size="sm">Edit</Button>
                            </div>
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

        <TabsContent value="claims" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Insurance Claims</CardTitle>
              <CardDescription>View and manage insurance claims</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search claims..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Submit New Claim
                </Button>
              </div>

              <div className="mt-4 rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">ID</TableHead>
                      <TableHead>Member</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredClaims.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="h-24 text-center">
                          No claims found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredClaims.map((claim) => (
                        <TableRow key={claim.id}>
                          <TableCell className="font-medium">{claim.id}</TableCell>
                          <TableCell>{claim.member}</TableCell>
                          <TableCell>{claim.plan}</TableCell>
                          <TableCell>{claim.amount}</TableCell>
                          <TableCell>{claim.date}</TableCell>
                          <TableCell>{claim.reason}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                claim.status === "approved"
                                  ? "default"
                                  : claim.status === "pending"
                                    ? "outline"
                                    : "secondary"
                              }
                              className="flex w-fit items-center gap-1"
                            >
                              {claim.status === "approved" && <CheckCircle className="h-3 w-3" />}
                              {claim.status === "pending" && <AlertTriangle className="h-3 w-3" />}
                              {claim.status === "rejected" && <XCircle className="h-3 w-3" />}
                              {claim.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              {claim.status === "pending" && (
                                <>
                                  <Button variant="outline" size="sm" onClick={() => handleRejectClaim(claim.id)}>
                                    <XCircle className="h-4 w-4" />
                                  </Button>
                                  <Button size="sm" onClick={() => handleApproveClaim(claim.id)}>
                                    <CheckCircle className="h-4 w-4" />
                                  </Button>
                                </>
                              )}
                              {claim.status !== "pending" && (
                                <Button variant="outline" size="sm">
                                  View
                                </Button>
                              )}
                            </div>
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

        <TabsContent value="new-claim" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Submit New Claim</CardTitle>
              <CardDescription>Fill in the details to submit a new insurance claim</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="member-id">Member ID</Label>
                  <Input
                    id="member-id"
                    placeholder="Enter member ID (e.g., M001)"
                    value={newClaim.memberId}
                    onChange={(e) => setNewClaim({ ...newClaim, memberId: e.target.value })}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="plan-id">Insurance Plan</Label>
                  <Select
                    value={newClaim.planId}
                    onValueChange={(value) => setNewClaim({ ...newClaim, planId: value })}
                  >
                    <SelectTrigger id="plan-id">
                      <SelectValue placeholder="Select insurance plan" />
                    </SelectTrigger>
                    <SelectContent>
                      {insurancePlans.map((plan) => (
                        <SelectItem key={plan.id} value={plan.id}>
                          {plan.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="grid gap-3">
                    <Label htmlFor="claim-amount">Claim Amount</Label>
                    <Input
                      id="claim-amount"
                      placeholder="Enter amount (e.g., 500)"
                      value={newClaim.amount}
                      onChange={(e) => setNewClaim({ ...newClaim, amount: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="claim-date">Claim Date</Label>
                    <Input
                      id="claim-date"
                      type="date"
                      value={newClaim.date}
                      onChange={(e) => setNewClaim({ ...newClaim, date: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="claim-reason">Reason for Claim</Label>
                  <Textarea
                    id="claim-reason"
                    placeholder="Enter reason for claim (e.g., Medical treatment)"
                    className="min-h-[100px]"
                    value={newClaim.reason}
                    onChange={(e) => setNewClaim({ ...newClaim, reason: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSubmitClaim}>
                <Plus className="mr-2 h-4 w-4" />
                Submit Claim
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
