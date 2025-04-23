"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Download, CheckCircle, AlertCircle, Clock, Upload } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"

// Sample data for distributions
const distributions = [
  {
    id: "D001",
    date: "2023-05-20",
    totalAmount: "$4,500",
    membersCount: 9,
    status: "completed",
    description: "May salary distributions",
  },
  {
    id: "D002",
    date: "2023-04-20",
    totalAmount: "$4,200",
    membersCount: 8,
    status: "completed",
    description: "April salary distributions",
  },
  {
    id: "D003",
    date: "2023-03-20",
    totalAmount: "$4,000",
    membersCount: 8,
    status: "completed",
    description: "March salary distributions",
  },
  {
    id: "D004",
    date: "2023-06-01",
    totalAmount: "$5,000",
    membersCount: 10,
    status: "pending",
    description: "June salary distributions",
  },
]

// Sample member data
const members = [
  { id: "M001", name: "John Doe", phone: "+254712345678", amount: "$500" },
  { id: "M002", name: "Jane Smith", phone: "+254723456789", amount: "$500" },
  { id: "M003", name: "Michael Johnson", phone: "+254734567890", amount: "$500" },
  { id: "M004", name: "Sarah Williams", phone: "+254745678901", amount: "$500" },
  { id: "M005", name: "Robert Brown", phone: "+254756789012", amount: "$500" },
  { id: "M006", name: "Emily Davis", phone: "+254767890123", amount: "$500" },
  { id: "M007", name: "David Wilson", phone: "+254778901234", amount: "$500" },
  { id: "M008", name: "Lisa Taylor", phone: "+254789012345", amount: "$500" },
  { id: "M009", name: "James Anderson", phone: "+254790123456", amount: "$500" },
  { id: "M010", name: "Patricia Thomas", phone: "+254701234567", amount: "$500" },
]

export default function UnionDistributionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDistribution, setSelectedDistribution] = useState<(typeof distributions)[0] | null>(null)
  const [selectedMembers, setSelectedMembers] = useState<string[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  // Filter distributions based on search term
  const filteredDistributions = distributions.filter((distribution) => {
    return (
      distribution.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      distribution.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  const handleSelectAllMembers = () => {
    if (selectedMembers.length === members.length) {
      setSelectedMembers([])
    } else {
      setSelectedMembers(members.map((member) => member.id))
    }
  }

  const handleSelectMember = (memberId: string) => {
    setSelectedMembers((prev) => (prev.includes(memberId) ? prev.filter((id) => id !== memberId) : [...prev, memberId]))
  }

  const handleCreateDistribution = () => {
    if (selectedMembers.length === 0) {
      return
    }

    setIsProcessing(true)

    // In a real app, this would be an API call to process the distribution
    setTimeout(() => {
      setIsProcessing(false)
      setSuccessMessage(`Payment distribution to ${selectedMembers.length} members initiated successfully!`)
      setSelectedMembers([])

      // Clear the success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage(null)
      }, 3000)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-3xl font-bold tracking-tight">Union Distributions</h2>
      </div>

      <Tabs defaultValue="history" className="space-y-4">
        <TabsList>
          <TabsTrigger value="history">Distribution History</TabsTrigger>
          <TabsTrigger value="new">New Distribution</TabsTrigger>
        </TabsList>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Distribution History</CardTitle>
              <CardDescription>All payments distributed to members by the union</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search distributions..."
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
                      <TableHead>Date</TableHead>
                      <TableHead>Total Amount</TableHead>
                      <TableHead>Members</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDistributions.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          No distributions found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredDistributions.map((distribution) => (
                        <TableRow key={distribution.id}>
                          <TableCell className="font-medium">{distribution.id}</TableCell>
                          <TableCell>{distribution.date}</TableCell>
                          <TableCell>{distribution.totalAmount}</TableCell>
                          <TableCell>{distribution.membersCount}</TableCell>
                          <TableCell>{distribution.description}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                distribution.status === "completed"
                                  ? "default"
                                  : distribution.status === "pending"
                                    ? "outline"
                                    : "destructive"
                              }
                              className="flex w-fit items-center gap-1"
                            >
                              {distribution.status === "completed" && <CheckCircle className="h-3 w-3" />}
                              {distribution.status === "pending" && <Clock className="h-3 w-3" />}
                              {distribution.status === "failed" && <AlertCircle className="h-3 w-3" />}
                              {distribution.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
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

        <TabsContent value="new" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Create New Distribution</CardTitle>
              <CardDescription>Distribute payments to multiple members at once</CardDescription>
            </CardHeader>
            <CardContent>
              {successMessage && (
                <Alert className="mb-4 bg-green-50 text-green-800 border-green-200">
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>{successMessage}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="distribution-description">Description</Label>
                    <Input id="distribution-description" placeholder="e.g., June salary distributions" />
                  </div>
                  <div className="space-y-2">
                    <Label>Upload Members List (Optional)</Label>
                    <div className="flex items-center gap-2">
                      <Input id="member-csv" type="file" />
                      <Button variant="outline" size="sm">
                        <Upload className="mr-2 h-4 w-4" />
                        Upload
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">Upload a CSV with member IDs and amounts</p>
                  </div>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]">
                          <input
                            type="checkbox"
                            checked={selectedMembers.length === members.length}
                            onChange={handleSelectAllMembers}
                            className="h-4 w-4 rounded border-gray-300"
                          />
                        </TableHead>
                        <TableHead>Member ID</TableHead>
                        <TableHead>Member Name</TableHead>
                        <TableHead>Phone Number</TableHead>
                        <TableHead>Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {members.map((member) => (
                        <TableRow key={member.id}>
                          <TableCell>
                            <input
                              type="checkbox"
                              checked={selectedMembers.includes(member.id)}
                              onChange={() => handleSelectMember(member.id)}
                              className="h-4 w-4 rounded border-gray-300"
                            />
                          </TableCell>
                          <TableCell className="font-medium">{member.id}</TableCell>
                          <TableCell>{member.name}</TableCell>
                          <TableCell>{member.phone}</TableCell>
                          <TableCell>{member.amount}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium">Selected: {selectedMembers.length} members</span>
                    <p className="text-xs text-muted-foreground">Total Amount: ${selectedMembers.length * 500}</p>
                  </div>
                  <Button onClick={handleCreateDistribution} disabled={selectedMembers.length === 0 || isProcessing}>
                    {isProcessing ? "Processing..." : "Distribute Payments"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
