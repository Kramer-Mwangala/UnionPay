"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, MoreHorizontal, Download, UserPlus, CheckCircle, XCircle, Filter } from "lucide-react"

// Sample data for the table
const members = [
  {
    id: "M001",
    name: "John Doe",
    phone: "+254712345678",
    status: "active",
    joinDate: "2023-01-15",
    lastPayment: "2023-05-01",
    balance: "$250",
  },
  {
    id: "M002",
    name: "Jane Smith",
    phone: "+254723456789",
    status: "active",
    joinDate: "2023-02-20",
    lastPayment: "2023-05-05",
    balance: "$150",
  },
  {
    id: "M003",
    name: "Michael Johnson",
    phone: "+254734567890",
    status: "pending",
    joinDate: "2023-05-10",
    lastPayment: "-",
    balance: "$0",
  },
  {
    id: "M004",
    name: "Sarah Williams",
    phone: "+254745678901",
    status: "inactive",
    joinDate: "2022-11-05",
    lastPayment: "2023-03-15",
    balance: "$50",
  },
  {
    id: "M005",
    name: "Robert Brown",
    phone: "+254756789012",
    status: "active",
    joinDate: "2023-03-22",
    lastPayment: "2023-05-02",
    balance: "$200",
  },
  {
    id: "M006",
    name: "Emily Davis",
    phone: "+254767890123",
    status: "pending",
    joinDate: "2023-05-12",
    lastPayment: "-",
    balance: "$0",
  },
  {
    id: "M007",
    name: "David Wilson",
    phone: "+254778901234",
    status: "active",
    joinDate: "2022-12-10",
    lastPayment: "2023-05-03",
    balance: "$300",
  },
  {
    id: "M008",
    name: "Lisa Taylor",
    phone: "+254789012345",
    status: "inactive",
    joinDate: "2022-10-18",
    lastPayment: "2023-02-20",
    balance: "$0",
  },
]

export default function MembersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedMembers, setSelectedMembers] = useState<string[]>([])

  // Filter members based on search term and status filter
  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.phone.includes(searchTerm)

    const matchesStatus = statusFilter === "all" || member.status === statusFilter

    return matchesSearch && matchesStatus
  })

  // Handle checkbox selection
  const handleSelectMember = (memberId: string) => {
    setSelectedMembers((prev) => (prev.includes(memberId) ? prev.filter((id) => id !== memberId) : [...prev, memberId]))
  }

  // Handle select all
  const handleSelectAll = () => {
    if (selectedMembers.length === filteredMembers.length) {
      setSelectedMembers([])
    } else {
      setSelectedMembers(filteredMembers.map((member) => member.id))
    }
  }

  // Handle bulk actions
  const handleApproveSelected = () => {
    alert(`Approving ${selectedMembers.length} members`)
    // In a real app, this would call an API
    setSelectedMembers([])
  }

  const handleRejectSelected = () => {
    alert(`Rejecting ${selectedMembers.length} members`)
    // In a real app, this would call an API
    setSelectedMembers([])
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Member Management</CardTitle>
          <CardDescription>View, search, and manage union members</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex w-full max-w-sm items-center space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by name, ID, or phone..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setStatusFilter("all")}>All</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("active")}>Active</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("pending")}>Pending</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("inactive")}>Inactive</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button size="sm">
                <UserPlus className="mr-2 h-4 w-4" />
                Add Member
              </Button>
            </div>
          </div>

          {selectedMembers.length > 0 && (
            <div className="mt-4 flex items-center gap-2 rounded-md bg-muted p-2">
              <span className="text-sm">{selectedMembers.length} members selected</span>
              <div className="ml-auto flex gap-2">
                <Button size="sm" variant="outline" onClick={handleApproveSelected}>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Approve
                </Button>
                <Button size="sm" variant="outline" onClick={handleRejectSelected}>
                  <XCircle className="mr-2 h-4 w-4" />
                  Reject
                </Button>
              </div>
            </div>
          )}

          <div className="mt-4 rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox
                      checked={filteredMembers.length > 0 && selectedMembers.length === filteredMembers.length}
                      onCheckedChange={handleSelectAll}
                      aria-label="Select all"
                    />
                  </TableHead>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Last Payment</TableHead>
                  <TableHead>Balance</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMembers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="h-24 text-center">
                      No members found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedMembers.includes(member.id)}
                          onCheckedChange={() => handleSelectMember(member.id)}
                          aria-label={`Select ${member.name}`}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{member.id}</TableCell>
                      <TableCell>{member.name}</TableCell>
                      <TableCell>{member.phone}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            member.status === "active"
                              ? "default"
                              : member.status === "pending"
                                ? "outline"
                                : "secondary"
                          }
                        >
                          {member.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{member.joinDate}</TableCell>
                      <TableCell>{member.lastPayment}</TableCell>
                      <TableCell>{member.balance}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>View details</DropdownMenuItem>
                            <DropdownMenuItem>Edit member</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Send SMS</DropdownMenuItem>
                            <DropdownMenuItem>Payment history</DropdownMenuItem>
                            {member.status === "pending" && (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Approve</DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">Reject</DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
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
            Showing {filteredMembers.length} of {members.length} members
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
    </div>
  )
}
