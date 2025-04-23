"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus } from "lucide-react"

// Sample data for unions
const unions = [
  {
    id: "U001",
    name: "Nairobi Construction Workers Union",
    code: "NCWU2023",
    membershipFee: "$20/month",
    members: 120,
    region: "Nairobi",
    status: "active",
  },
  {
    id: "U002",
    name: "Mombasa Builders Association",
    code: "MBA2023",
    membershipFee: "$15/month",
    members: 85,
    region: "Mombasa",
    status: "active",
  },
  {
    id: "U003",
    name: "Kisumu Construction Union",
    code: "KCU2023",
    membershipFee: "$18/month",
    members: 65,
    region: "Kisumu",
    status: "active",
  },
  {
    id: "U004",
    name: "Nakuru Workers Coalition",
    code: "NWC2023",
    membershipFee: "$12/month",
    members: 45,
    region: "Nakuru",
    status: "inactive",
  },
  {
    id: "U005",
    name: "Eldoret Builders Union",
    code: "EBU2023",
    membershipFee: "$15/month",
    members: 50,
    region: "Eldoret",
    status: "active",
  },
]

export default function UnionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [newUnion, setNewUnion] = useState({
    name: "",
    region: "",
    membershipFee: "",
  })
  const [editingUnion, setEditingUnion] = useState<(typeof unions)[0] | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  // Filter unions based on search term
  const filteredUnions = unions.filter((union) => {
    return (
      union.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      union.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      union.region.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  const handleCreateUnion = () => {
    // Validate form
    if (!newUnion.name || !newUnion.region || !newUnion.membershipFee) {
      alert("Please fill in all required fields")
      return
    }

    // Generate a unique code for the union
    const code = newUnion.name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .concat(new Date().getFullYear().toString())

    // In a real app, this would be an API call to create the union
    alert(`Union created successfully with code: ${code}`)

    // Reset form and close dialog
    setNewUnion({
      name: "",
      region: "",
      membershipFee: "",
    })
    setIsDialogOpen(false)
  }

  const handleUpdateUnion = () => {
    if (!editingUnion) return

    // In a real app, this would be an API call to update the union
    alert(`Union ${editingUnion.id} updated successfully`)

    // Reset form and close dialog
    setEditingUnion(null)
    setIsEditDialogOpen(false)
  }

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    alert(`Union code ${code} copied to clipboard`)
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Unions</TabsTrigger>
          <TabsTrigger value="active">Active Unions</TabsTrigger>
          <TabsTrigger value="inactive">Inactive Unions</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>Union Management</CardTitle>
                <CardDescription>Manage construction worker unions and their unique codes</CardDescription>
              </div>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-yellow-600 hover:bg-yellow-700">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Union
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Create New Union</DialogTitle>
                    <DialogDescription>Add a new construction workers union to the system.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Union Name</Label>
                      <Input
                        id="name"
                        value={newUnion.name}
                        onChange={(e) => setNewUnion({ ...newUnion, name: e.target.value })}
                        placeholder="e.g., Nairobi Construction Workers Union"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="region">Region</Label>
                      <Input
                        id="region"
                        value={newUnion.region}
                        onChange={(e) => setNewUnion({ ...newUnion, region: e.target.value })}
                        placeholder="e.g., Nairobi"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="membershipFee">Membership Fee</Label>
                      <Input
                        id="membershipFee"
                        value={newUnion.membershipFee}
                        onChange={(e) => setNewUnion({ ...newUnion, membershipFee: e.target.value })}
                        placeholder="e.g., $20/month"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button className="bg-yellow-600 hover:bg-yellow-700" onClick={handleCreateUnion}>
                      Create Union
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex w-full max-w-sm items-center space-x-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search by name, code, or region..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Union Code</TableHead>
                      <Table\
