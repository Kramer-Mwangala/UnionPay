"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Textarea } from "@/components/ui/textarea"
import { Search, Plus, MapPin, Briefcase, Calendar, Users, Eye, Edit, Trash2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample data for the table
const jobs = [
  {
    id: "J001",
    title: "Construction Site Manager",
    location: "Nairobi, Kenya",
    company: "ABC Construction",
    postedDate: "2023-05-01",
    expiryDate: "2023-06-01",
    status: "active",
    applications: 5,
    skills: ["Project Management", "Civil Engineering", "Team Leadership"],
    description:
      "We are looking for an experienced Site Manager to oversee construction projects in Nairobi. The ideal candidate will have 5+ years of experience in construction management.",
  },
  {
    id: "J002",
    title: "Electrician",
    location: "Mombasa, Kenya",
    company: "XYZ Builders",
    postedDate: "2023-05-05",
    expiryDate: "2023-06-05",
    status: "active",
    applications: 3,
    skills: ["Electrical Systems", "Wiring", "Safety Protocols"],
    description:
      "Experienced electrician needed for commercial building projects. Must have certification and at least 3 years of experience.",
  },
  {
    id: "J003",
    title: "Carpenter",
    location: "Nairobi, Kenya",
    company: "ABC Construction",
    postedDate: "2023-05-10",
    expiryDate: "2023-06-10",
    status: "active",
    applications: 2,
    skills: ["Woodworking", "Blueprint Reading", "Finishing"],
    description:
      "Skilled carpenter needed for residential construction projects. Experience with both rough and finish carpentry required.",
  },
  {
    id: "J004",
    title: "Heavy Equipment Operator",
    location: "Kisumu, Kenya",
    company: "Lake Construction",
    postedDate: "2023-04-20",
    expiryDate: "2023-05-20",
    status: "expired",
    applications: 4,
    skills: ["Excavator", "Bulldozer", "Safety Compliance"],
    description:
      "Operator needed for excavators and bulldozers on large infrastructure project. Must have valid licenses and 2+ years experience.",
  },
  {
    id: "J005",
    title: "Construction Laborer",
    location: "Nakuru, Kenya",
    company: "Rift Builders",
    postedDate: "2023-05-08",
    expiryDate: "2023-06-08",
    status: "active",
    applications: 8,
    skills: ["Physical Strength", "Basic Tools", "Safety Awareness"],
    description:
      "General laborers needed for construction site. No experience necessary, but construction knowledge is a plus.",
  },
]

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedJob, setSelectedJob] = useState<(typeof jobs)[0] | null>(null)
  const [newJob, setNewJob] = useState({
    title: "",
    location: "",
    company: "",
    expiryDate: "",
    skills: "",
    description: "",
  })

  // Filter jobs based on search term
  const filteredJobs = jobs.filter((job) => {
    return (
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })

  const handleCreateJob = () => {
    // Validate form
    if (!newJob.title || !newJob.location || !newJob.description) {
      alert("Please fill in all required fields")
      return
    }

    alert("Job posting created successfully!")

    // Reset form
    setNewJob({
      title: "",
      location: "",
      company: "",
      expiryDate: "",
      skills: "",
      description: "",
    })
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active Jobs</TabsTrigger>
          <TabsTrigger value="expired">Expired Jobs</TabsTrigger>
          <TabsTrigger value="create">Create Job</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Job Postings</CardTitle>
              <CardDescription>View and manage active job listings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search jobs..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Post New Job
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Create New Job Posting</DialogTitle>
                      <DialogDescription>Fill in the details to create a new job listing</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="title">Job Title</Label>
                        <Input
                          id="title"
                          placeholder="e.g., Construction Site Manager"
                          value={newJob.title}
                          onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="location">Location</Label>
                          <Input
                            id="location"
                            placeholder="e.g., Nairobi, Kenya"
                            value={newJob.location}
                            onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="company">Company</Label>
                          <Input
                            id="company"
                            placeholder="e.g., ABC Construction"
                            value={newJob.company}
                            onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="expiry-date">Expiry Date</Label>
                        <Input
                          id="expiry-date"
                          type="date"
                          value={newJob.expiryDate}
                          onChange={(e) => setNewJob({ ...newJob, expiryDate: e.target.value })}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="skills">Required Skills (comma separated)</Label>
                        <Input
                          id="skills"
                          placeholder="e.g., Project Management, Civil Engineering"
                          value={newJob.skills}
                          onChange={(e) => setNewJob({ ...newJob, skills: e.target.value })}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="description">Job Description</Label>
                        <Textarea
                          id="description"
                          placeholder="Enter detailed job description..."
                          className="min-h-[100px]"
                          value={newJob.description}
                          onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={handleCreateJob}>Create Job Posting</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredJobs.filter((job) => job.status === "active").length === 0 ? (
                  <div className="col-span-full py-8 text-center">
                    <p className="text-muted-foreground">No active jobs found.</p>
                  </div>
                ) : (
                  filteredJobs
                    .filter((job) => job.status === "active")
                    .map((job) => (
                      <Card key={job.id} className="overflow-hidden">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <Badge>{job.id}</Badge>
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {job.applications} applicants
                            </Badge>
                          </div>
                          <CardTitle className="mt-2 text-xl">{job.title}</CardTitle>
                          <CardDescription className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {job.location}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="mb-2 flex items-center gap-1 text-sm text-muted-foreground">
                            <Briefcase className="h-3 w-3" />
                            {job.company}
                          </div>
                          <div className="mb-3 flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            Posted: {job.postedDate} | Expires: {job.expiryDate}
                          </div>
                          <div className="mb-3 flex flex-wrap gap-1">
                            {job.skills.map((skill, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                          <p className="line-clamp-3 text-sm text-muted-foreground">{job.description}</p>
                        </CardContent>
                        <CardFooter className="flex justify-between border-t pt-4">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm" onClick={() => setSelectedJob(job)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[600px]">
                              <DialogHeader>
                                <DialogTitle>{selectedJob?.title}</DialogTitle>
                                <DialogDescription>
                                  {selectedJob?.company} - {selectedJob?.location}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="flex items-center justify-between">
                                  <Badge variant="outline" className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    Posted: {selectedJob?.postedDate}
                                  </Badge>
                                  <Badge variant="outline" className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    Expires: {selectedJob?.expiryDate}
                                  </Badge>
                                  <Badge variant="outline" className="flex items-center gap-1">
                                    <Users className="h-3 w-3" />
                                    {selectedJob?.applications} applicants
                                  </Badge>
                                </div>
                                <div>
                                  <h3 className="mb-2 font-medium">Required Skills</h3>
                                  <div className="flex flex-wrap gap-2">
                                    {selectedJob?.skills.map((skill, index) => (
                                      <Badge key={index} variant="secondary">
                                        {skill}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                                <div>
                                  <h3 className="mb-2 font-medium">Job Description</h3>
                                  <p className="text-sm text-muted-foreground">{selectedJob?.description}</p>
                                </div>
                              </div>
                              <DialogFooter>
                                <Button variant="outline">
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </Button>
                                <Button variant="destructive">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </Button>
                            <Button variant="destructive" size="sm">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardFooter>
                      </Card>
                    ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expired" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Expired Job Postings</CardTitle>
              <CardDescription>View and manage expired job listings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search jobs..."
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
                      <TableHead>Title</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Posted Date</TableHead>
                      <TableHead>Expiry Date</TableHead>
                      <TableHead>Applications</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredJobs.filter((job) => job.status === "expired").length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={8} className="h-24 text-center">
                          No expired jobs found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredJobs
                        .filter((job) => job.status === "expired")
                        .map((job) => (
                          <TableRow key={job.id}>
                            <TableCell className="font-medium">{job.id}</TableCell>
                            <TableCell>{job.title}</TableCell>
                            <TableCell>{job.location}</TableCell>
                            <TableCell>{job.company}</TableCell>
                            <TableCell>{job.postedDate}</TableCell>
                            <TableCell>{job.expiryDate}</TableCell>
                            <TableCell>{job.applications}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="outline" size="sm">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button size="sm">Repost</Button>
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

        <TabsContent value="create" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Create New Job Posting</CardTitle>
              <CardDescription>Fill in the details to create a new job listing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="job-title">Job Title</Label>
                  <Input
                    id="job-title"
                    placeholder="e.g., Construction Site Manager"
                    value={newJob.title}
                    onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="grid gap-3">
                    <Label htmlFor="job-location">Location</Label>
                    <Input
                      id="job-location"
                      placeholder="e.g., Nairobi, Kenya"
                      value={newJob.location}
                      onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="job-company">Company</Label>
                    <Input
                      id="job-company"
                      placeholder="e.g., ABC Construction"
                      value={newJob.company}
                      onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="job-expiry">Expiry Date</Label>
                  <Input
                    id="job-expiry"
                    type="date"
                    value={newJob.expiryDate}
                    onChange={(e) => setNewJob({ ...newJob, expiryDate: e.target.value })}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="job-skills">Required Skills (comma separated)</Label>
                  <Input
                    id="job-skills"
                    placeholder="e.g., Project Management, Civil Engineering"
                    value={newJob.skills}
                    onChange={(e) => setNewJob({ ...newJob, skills: e.target.value })}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="job-description">Job Description</Label>
                  <Textarea
                    id="job-description"
                    placeholder="Enter detailed job description..."
                    className="min-h-[200px]"
                    value={newJob.description}
                    onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleCreateJob}>
                <Plus className="mr-2 h-4 w-4" />
                Create Job Posting
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
