import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Banknote, CreditCard, Briefcase, AlertTriangle, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { AnalyticsDashboard } from "@/components/analytics-dashboard"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">120</div>
            <p className="text-xs text-muted-foreground">+5 new registrations this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Loans</CardTitle>
            <Banknote className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">$2,500 total requested amount</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Payments Processed</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$10,000</div>
            <p className="text-xs text-muted-foreground">25 transactions today</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">8 applications received</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 rounded-md p-2 hover:bg-accent">
                    <div className="rounded-full bg-green-100 p-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">Payment Processed</p>
                      <p className="text-sm text-muted-foreground">$2,500 disbursed to 5 workers</p>
                    </div>
                    <div className="text-sm text-muted-foreground">2h ago</div>
                  </div>
                  <div className="flex items-center gap-4 rounded-md p-2 hover:bg-accent">
                    <div className="rounded-full bg-blue-100 p-2">
                      <Users className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">New Member Registration</p>
                      <p className="text-sm text-muted-foreground">John Doe (ID: 1234) registered via USSD</p>
                    </div>
                    <div className="text-sm text-muted-foreground">5h ago</div>
                  </div>
                  <div className="flex items-center gap-4 rounded-md p-2 hover:bg-accent">
                    <div className="rounded-full bg-yellow-100 p-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">Loan Request</p>
                      <p className="text-sm text-muted-foreground">$500 loan requested by Mary Johnson</p>
                    </div>
                    <div className="text-sm text-muted-foreground">1d ago</div>
                  </div>
                  <div className="flex items-center gap-4 rounded-md p-2 hover:bg-accent">
                    <div className="rounded-full bg-purple-100 p-2">
                      <Briefcase className="h-4 w-4 text-purple-600" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">New Job Posted</p>
                      <p className="text-sm text-muted-foreground">ABC Construction posted "Site Manager" position</p>
                    </div>
                    <div className="text-sm text-muted-foreground">2d ago</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Monthly Overview</CardTitle>
                <CardDescription>Payment and loan statistics for May 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <CreditCard className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>Payments Processed</span>
                      </div>
                      <span className="font-medium">$45,000 / $50,000</span>
                    </div>
                    <Progress value={90} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <Banknote className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>Loans Approved</span>
                      </div>
                      <span className="font-medium">$12,500 / $20,000</span>
                    </div>
                    <Progress value={62.5} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>Member Registrations</span>
                      </div>
                      <span className="font-medium">15 / 20</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <Briefcase className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>Job Placements</span>
                      </div>
                      <span className="font-medium">8 / 15</span>
                    </div>
                    <Progress value={53.3} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <Button className="justify-start">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Process Payments
                  </Button>
                  <Button className="justify-start" variant="outline">
                    <Banknote className="mr-2 h-4 w-4" />
                    Review Loan Requests
                  </Button>
                  <Button className="justify-start" variant="outline">
                    <Users className="mr-2 h-4 w-4" />
                    Approve Registrations
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>System Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                      <span className="text-sm">SMS API</span>
                    </div>
                    <span className="text-sm text-green-500">Operational</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                      <span className="text-sm">USSD Service</span>
                    </div>
                    <span className="text-sm text-green-500">Operational</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                      <span className="text-sm">Payment Gateway</span>
                    </div>
                    <span className="text-sm text-green-500">Operational</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-yellow-500" />
                      <span className="text-sm">Database</span>
                    </div>
                    <span className="text-sm text-yellow-500">Degraded</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Payroll Processing</h3>
                      <span className="text-xs text-muted-foreground">May 30</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Monthly wage disbursement for all active members</p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Loan Committee</h3>
                      <span className="text-xs text-muted-foreground">Jun 2</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Review and approval of pending loan applications</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <AnalyticsDashboard />
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reports</CardTitle>
              <CardDescription>Generate and download reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <h3 className="text-lg font-medium">Available Reports</h3>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card className="p-4">
                      <div className="flex flex-col gap-2">
                        <h4 className="font-medium">Member Activity Report</h4>
                        <p className="text-sm text-muted-foreground">
                          Detailed report of member registrations, payments, and loan activities
                        </p>
                        <Button size="sm" className="mt-2">
                          Generate Report
                        </Button>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <div className="flex flex-col gap-2">
                        <h4 className="font-medium">Financial Summary</h4>
                        <p className="text-sm text-muted-foreground">
                          Summary of all financial transactions, loans, and payments
                        </p>
                        <Button size="sm" className="mt-2">
                          Generate Report
                        </Button>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <div className="flex flex-col gap-2">
                        <h4 className="font-medium">Job Placement Report</h4>
                        <p className="text-sm text-muted-foreground">
                          Statistics on job postings, applications, and placements
                        </p>
                        <Button size="sm" className="mt-2">
                          Generate Report
                        </Button>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <div className="flex flex-col gap-2">
                        <h4 className="font-medium">Insurance Claims Report</h4>
                        <p className="text-sm text-muted-foreground">
                          Summary of insurance claims, approvals, and rejections
                        </p>
                        <Button size="sm" className="mt-2">
                          Generate Report
                        </Button>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <div className="flex flex-col gap-2">
                        <h4 className="font-medium">SMS/USSD Usage Report</h4>
                        <p className="text-sm text-muted-foreground">
                          Analysis of SMS and USSD service usage by members
                        </p>
                        <Button size="sm" className="mt-2">
                          Generate Report
                        </Button>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <div className="flex flex-col gap-2">
                        <h4 className="font-medium">Custom Report</h4>
                        <p className="text-sm text-muted-foreground">Create a custom report with specific parameters</p>
                        <Button size="sm" className="mt-2">
                          Create Custom Report
                        </Button>
                      </div>
                    </Card>
                  </div>
                </div>
                <div className="grid gap-3">
                  <h3 className="text-lg font-medium">Recent Reports</h3>
                  <div className="rounded-md border">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b bg-muted/50">
                          <th className="p-2 text-left font-medium">Report Name</th>
                          <th className="p-2 text-left font-medium">Generated On</th>
                          <th className="p-2 text-left font-medium">Generated By</th>
                          <th className="p-2 text-left font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-2">Financial Summary - May 2025</td>
                          <td className="p-2">May 15, 2025</td>
                          <td className="p-2">Admin User</td>
                          <td className="p-2">
                            <Button variant="outline" size="sm">
                              Download
                            </Button>
                          </td>
                        </tr>
                        <tr className="border-b">
                          <td className="p-2">Member Activity Report - Q2 2025</td>
                          <td className="p-2">May 10, 2025</td>
                          <td className="p-2">Admin User</td>
                          <td className="p-2">
                            <Button variant="outline" size="sm">
                              Download
                            </Button>
                          </td>
                        </tr>
                        <tr>
                          <td className="p-2">Job Placement Report - April 2025</td>
                          <td className="p-2">May 5, 2025</td>
                          <td className="p-2">Admin User</td>
                          <td className="p-2">
                            <Button variant="outline" size="sm">
                              Download
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
