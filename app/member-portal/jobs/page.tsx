"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, MapPin, Briefcase, Calendar, CheckCircle, Clock, XCircle } from "lucide-react"

// Sample data for job listings
const jobs = [
  {
    id: "J001",
    title: "Construction Site Manager",
    location: "Nairobi, Kenya",
    company: "ABC Construction",
    postedDate: "2023-05-01",
    expiryDate: "2023-06-01",
    salary: "$1,500 - $2,000 per month",
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
    salary: "$800 - $1,000 per month",
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
    salary: "$700 - $900 per month",
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
    salary: "$900 - $1,100 per month",
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
    salary: "$500 - $700 per month",
    skills: ["Physical Strength", "Basic Tools", "Safety Awareness"],
    description:
      "General laborers needed for construction site. No experience necessary, but construction knowledge is a plus.",
  },
]

// Sample data for job applications
const applications = [
  {
    id: "A001",
    jobId: "J002",
    jobTitle: "Electrician",
    company: "XYZ Builders",
    appliedDate: "2023-05-06",
    status: "pending",
  },
  {
    id: "A002",
    jobId: "J003",
    jobTitle: "Carpenter",
    company: "ABC Construction",
    appliedDate: "2023-05-11",
    status: "interview",
    interviewDate: "2023-05-20",
  },
]

export default function MemberJobsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedJob, setSelectedJob] = useState<(typeof jobs)[0] | null>(null)
  const [showJobDetails, setShowJobDetails] = useState(false)

  // Filter jobs based on search term
  const filteredJobs = jobs.filter((job) => {
    return (
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  })

  const handleViewJob = (job: (typeof jobs)[0]) => {
    setSelectedJob(job)
    setShowJobDetails(true)
  }

  const handleApplyForJob = (jobId: string) => {
    alert(`Applied for job ${jobId}. Your application has been submitted.`)
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="available" className="space-y-4">
        <TabsList>
          <TabsTrigger value="available">Available Jobs</TabsTrigger>
          <TabsTrigger value="applications">My Applications</TabsTrigger>
        </TabsList>

        <TabsContent value="available" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Available Job Opportunities</CardTitle>
              <CardDescription>Browse and apply for construction jobs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search jobs by title, location, or skills..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {filteredJobs.length === 0 ? (
                  <div className="col-span-2 py-8 text-center">
                    <p className="text-muted-foreground">No jobs found matching your search criteria.</p>
                  </div>
                ) : (
                  filteredJobs.map((job) => (
                    <Card key={job.id} className="overflow-hidden">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between">
                          <Badge>{job.id}</Badge>
                          <Badge variant="outline">{job.expiryDate}</Badge>
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
                          Posted: {job.postedDate}
                        </div>
                        <div className="mb-3 flex flex-wrap gap-1">
                          {job.skills.map((skill, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        <p className="line-clamp-2 text-sm text-muted-foreground">{job.description}</p>
                      </CardContent>
                      <CardFooter className="flex justify-between border-t pt-4">
                        <Button variant="outline" size="sm" onClick={() => handleViewJob(job)}>
                          View Details
                        </Button>
                        <Button size="sm" onClick={() => handleApplyForJob(job.id)}>
                          Apply Now
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {showJobDetails && selectedJob && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{selectedJob.title}</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setShowJobDetails(false)}>
                    Close
                  </Button>
                </div>
                <CardDescription className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {selectedJob.location}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h3 className="text-sm font-medium">Company</h3>
                    <p className="text-sm text-muted-foreground">{selectedJob.company}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Salary Range</h3>
                    <p className="text-sm text-muted-foreground">{selectedJob.salary}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Posted Date</h3>
                    <p className="text-sm text-muted-foreground">{selectedJob.postedDate}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Application Deadline</h3>
                    <p className="text-sm text-muted-foreground">{selectedJob.expiryDate}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium">Required Skills</h3>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {selectedJob.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium">Job Description</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{selectedJob.description}</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => handleApplyForJob(selectedJob.id)}>Apply for this Position</Button>
              </CardFooter>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="applications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Job Applications</CardTitle>
              <CardDescription>Track the status of your job applications</CardDescription>
            </CardHeader>
            <CardContent>
              {applications.length === 0 ? (
                <div className="py-8 text-center">
                  <p className="text-muted-foreground">You haven't applied for any jobs yet.</p>
                  <Button className="mt-4" onClick={() => document.querySelector('[value="available"]')?.click()}>
                    Browse Available Jobs
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {applications.map((application) => (
                    <Card key={application.id}>
                      <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{application.jobTitle}</h3>
                              <Badge
                                variant={
                                  application.status === "pending"
                                    ? "outline"
                                    : application.status === "interview"
                                      ? "default"
                                      : application.status === "rejected"
                                        ? "destructive"
                                        : "secondary"
                                }
                                className="flex items-center gap-1"
                              >
                                {application.status === "pending" && <Clock className="h-3 w-3" />}
                                {application.status === "interview" && <CheckCircle className="h-3 w-3" />}
                                {application.status === "rejected" && <XCircle className="h-3 w-3" />}
                                {application.status === "pending" && "Application Pending"}
                                {application.status === "interview" && "Interview Scheduled"}
                                {application.status === "rejected" && "Application Rejected"}
                                {application.status === "hired" && "Hired"}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Briefcase className="h-3 w-3" />
                              {application.company}
                            </div>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              Applied on {application.appliedDate}
                            </div>
                            {application.status === "interview" && application.interviewDate && (
                              <div className="mt-2 rounded-md bg-blue-50 p-2 text-sm text-blue-700 dark:bg-blue-900 dark:text-blue-200">
                                Interview scheduled for {application.interviewDate}
                              </div>
                            )}
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                            {application.status === "pending" && (
                              <Button variant="outline" size="sm" className="text-red-600">
                                Withdraw
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
