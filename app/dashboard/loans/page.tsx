"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Search, CheckCircle, XCircle, Eye, Clock } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample data for the table
const loans = [
  {
    id: "L001",
    worker: "John Doe",
    workerId: "M001",
    amount: "$500",
    requestDate: "2023-05-10",
    status: "pending",
    purpose: "Medical expenses",
    repaymentPeriod: "3 months",
  },
  {
    id: "L002",
    worker: "Jane Smith",
    workerId: "M002",
    amount: "$300",
    requestDate: "2023-05-08",
    status: "approved",
    purpose: "School fees",
    repaymentPeriod: "2 months",
  },
  {
    id: "L003",
    worker: "Michael Johnson",
    workerId: "M007",
    amount: "$800",
    requestDate: "2023-05-12",
    status: "pending",
    purpose: "Home repair",
    repaymentPeriod: "6 months",
  },
  {
    id: "L004",
    worker: "Sarah Williams",
    workerId: "M004",
    amount: "$200",
    requestDate: "2023-05-05",
    status: "rejected",
    purpose: "Personal",
    repaymentPeriod: "1 month",
  },
  {
    id: "L005",
    worker: "Robert Brown",
    workerId: "M005",
    amount: "$600",
    requestDate: "2023-05-11",
    status: "approved",
    purpose: "Equipment purchase",
    repaymentPeriod: "4 months",
  },
]

export default function LoansPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLoan, setSelectedLoan] = useState<(typeof loans)[0] | null>(null)
  const [isApproving, setIsApproving] = useState(false)
  const [isRejecting, setIsRejecting] = useState(false)

  // Filter loans based on search term
  const filteredLoans = loans.filter((loan) => {
    return (
      loan.worker.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.workerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.id.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  const handleApproveLoan = (loanId: string) => {
    setIsApproving(true)

    // Simulate API call to approve loan
    setTimeout(() => {
      setIsApproving(false)
      alert(`Loan ${loanId} approved successfully!`)
    }, 1500)
  }

  const handleRejectLoan = (loanId: string) => {
    setIsRejecting(true)

    // Simulate API call to reject loan
    setTimeout(() => {
      setIsRejecting(false)
      alert(`Loan ${loanId} rejected.`)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">Pending Loans</TabsTrigger>
          <TabsTrigger value="approved">Approved Loans</TabsTrigger>
          <TabsTrigger value="rejected">Rejected Loans</TabsTrigger>
          <TabsTrigger value="all">All Loans</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Loan Requests</CardTitle>
              <CardDescription>Review and manage pending loan applications</CardDescription>
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
              </div>

              <div className="mt-4 rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">ID</TableHead>
                      <TableHead>Worker</TableHead>
                      <TableHead>Worker ID</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Request Date</TableHead>
                      <TableHead>Purpose</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLoans.filter((loan) => loan.status === "pending").length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="h-24 text-center">
                          No pending loans found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredLoans
                        .filter((loan) => loan.status === "pending")
                        .map((loan) => (
                          <TableRow key={loan.id}>
                            <TableCell className="font-medium">{loan.id}</TableCell>
                            <TableCell>{loan.worker}</TableCell>
                            <TableCell>{loan.workerId}</TableCell>
                            <TableCell>{loan.amount}</TableCell>
                            <TableCell>{loan.requestDate}</TableCell>
                            <TableCell>{loan.purpose}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="flex w-fit items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {loan.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button variant="outline" size="sm" onClick={() => setSelectedLoan(loan)}>
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>Loan Details</DialogTitle>
                                      <DialogDescription>Review the loan application details</DialogDescription>
                                    </DialogHeader>
                                    {selectedLoan && (
                                      <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-2 gap-4">
                                          <div>
                                            <h3 className="font-medium">Loan ID</h3>
                                            <p className="text-sm">{selectedLoan.id}</p>
                                          </div>
                                          <div>
                                            <h3 className="font-medium">Status</h3>
                                            <Badge variant="outline" className="mt-1 flex w-fit items-center gap-1">
                                              <Clock className="h-3 w-3" />
                                              {selectedLoan.status}
                                            </Badge>
                                          </div>
                                        </div>
                                        <div>
                                          <h3 className="font-medium">Worker</h3>
                                          <p className="text-sm">
                                            {selectedLoan.worker} ({selectedLoan.workerId})
                                          </p>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                          <div>
                                            <h3 className="font-medium">Amount</h3>
                                            <p className="text-sm">{selectedLoan.amount}</p>
                                          </div>
                                          <div>
                                            <h3 className="font-medium">Repayment Period</h3>
                                            <p className="text-sm">{selectedLoan.repaymentPeriod}</p>
                                          </div>
                                        </div>
                                        <div>
                                          <h3 className="font-medium">Purpose</h3>
                                          <p className="text-sm">{selectedLoan.purpose}</p>
                                        </div>
                                        <div>
                                          <h3 className="font-medium">Request Date</h3>
                                          <p className="text-sm">{selectedLoan.requestDate}</p>
                                        </div>
                                      </div>
                                    )}
                                    <DialogFooter>
                                      <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                          <Button variant="destructive">
                                            <XCircle className="mr-2 h-4 w-4" />
                                            Reject
                                          </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                          <AlertDialogHeader>
                                            <AlertDialogTitle>Reject Loan Application</AlertDialogTitle>
                                            <AlertDialogDescription>
                                              Are you sure you want to reject this loan application? This action cannot
                                              be undone.
                                            </AlertDialogDescription>
                                          </AlertDialogHeader>
                                          <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction
                                              onClick={() => selectedLoan && handleRejectLoan(selectedLoan.id)}
                                              className="bg-destructive text-destructive-foreground"
                                            >
                                              {isRejecting ? "Rejecting..." : "Reject Loan"}
                                            </AlertDialogAction>
                                          </AlertDialogFooter>
                                        </AlertDialogContent>
                                      </AlertDialog>
                                      <Button
                                        onClick={() => selectedLoan && handleApproveLoan(selectedLoan.id)}
                                        disabled={isApproving}
                                      >
                                        <CheckCircle className="mr-2 h-4 w-4" />
                                        {isApproving ? "Approving..." : "Approve Loan"}
                                      </Button>
                                    </DialogFooter>
                                  </DialogContent>
                                </Dialog>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button variant="destructive" size="sm">
                                      <XCircle className="h-4 w-4" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Reject Loan Application</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        Are you sure you want to reject this loan application? This action cannot be
                                        undone.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction
                                        onClick={() => handleRejectLoan(loan.id)}
                                        className="bg-destructive text-destructive-foreground"
                                      >
                                        {isRejecting ? "Rejecting..." : "Reject Loan"}
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                                <Button size="sm" onClick={() => handleApproveLoan(loan.id)} disabled={isApproving}>
                                  <CheckCircle className="h-4 w-4" />
                                </Button>
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

        <TabsContent value="approved" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Approved Loans</CardTitle>
              <CardDescription>View all approved loan applications</CardDescription>
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
              </div>

              <div className="mt-4 rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">ID</TableHead>
                      <TableHead>Worker</TableHead>
                      <TableHead>Worker ID</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Request Date</TableHead>
                      <TableHead>Purpose</TableHead>
                      <TableHead>Repayment Period</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLoans.filter((loan) => loan.status === "approved").length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="h-24 text-center">
                          No approved loans found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredLoans
                        .filter((loan) => loan.status === "approved")
                        .map((loan) => (
                          <TableRow key={loan.id}>
                            <TableCell className="font-medium">{loan.id}</TableCell>
                            <TableCell>{loan.worker}</TableCell>
                            <TableCell>{loan.workerId}</TableCell>
                            <TableCell>{loan.amount}</TableCell>
                            <TableCell>{loan.requestDate}</TableCell>
                            <TableCell>{loan.purpose}</TableCell>
                            <TableCell>{loan.repaymentPeriod}</TableCell>
                            <TableCell>
                              <Badge className="flex w-fit items-center gap-1">
                                <CheckCircle className="h-3 w-3" />
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
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Rejected Loans</CardTitle>
              <CardDescription>View all rejected loan applications</CardDescription>
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
              </div>

              <div className="mt-4 rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">ID</TableHead>
                      <TableHead>Worker</TableHead>
                      <TableHead>Worker ID</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Request Date</TableHead>
                      <TableHead>Purpose</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLoans.filter((loan) => loan.status === "rejected").length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          No rejected loans found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredLoans
                        .filter((loan) => loan.status === "rejected")
                        .map((loan) => (
                          <TableRow key={loan.id}>
                            <TableCell className="font-medium">{loan.id}</TableCell>
                            <TableCell>{loan.worker}</TableCell>
                            <TableCell>{loan.workerId}</TableCell>
                            <TableCell>{loan.amount}</TableCell>
                            <TableCell>{loan.requestDate}</TableCell>
                            <TableCell>{loan.purpose}</TableCell>
                            <TableCell>
                              <Badge variant="secondary" className="flex w-fit items-center gap-1">
                                <XCircle className="h-3 w-3" />
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
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Loans</CardTitle>
              <CardDescription>View all loan applications</CardDescription>
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
              </div>

              <div className="mt-4 rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">ID</TableHead>
                      <TableHead>Worker</TableHead>
                      <TableHead>Worker ID</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Request Date</TableHead>
                      <TableHead>Purpose</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLoans.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          No loans found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredLoans.map((loan) => (
                        <TableRow key={loan.id}>
                          <TableCell className="font-medium">{loan.id}</TableCell>
                          <TableCell>{loan.worker}</TableCell>
                          <TableCell>{loan.workerId}</TableCell>
                          <TableCell>{loan.amount}</TableCell>
                          <TableCell>{loan.requestDate}</TableCell>
                          <TableCell>{loan.purpose}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                loan.status === "approved"
                                  ? "default"
                                  : loan.status === "pending"
                                    ? "outline"
                                    : "secondary"
                              }
                              className="flex w-fit items-center gap-1"
                            >
                              {loan.status === "approved" && <CheckCircle className="h-3 w-3" />}
                              {loan.status === "pending" && <Clock className="h-3 w-3" />}
                              {loan.status === "rejected" && <XCircle className="h-3 w-3" />}
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
            <CardFooter className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Showing {filteredLoans.length} of {loans.length} loans
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
      </Tabs>
    </div>
  )
}
