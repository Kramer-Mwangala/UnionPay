import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Banknote, Briefcase, ShieldCheck, AlertCircle, CheckCircle2, Clock } from "lucide-react"

export default function MemberDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <Card className="bg-blue-50 dark:bg-blue-900">
        <CardHeader>
          <CardTitle>Welcome back, John!</CardTitle>
          <CardDescription>Here's an overview of your union membership status and benefits</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                  Active Member
                </Badge>
                <span className="text-sm text-muted-foreground">Member since Jan 15, 2023</span>
              </div>
              <p className="mt-2 text-sm">Your membership is in good standing. Next payment due: June 1, 2023</p>
            </div>
            <Button>View Membership Card</Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$250</div>
            <p className="text-xs text-muted-foreground">Last payment: May 1, 2023</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Loan Status</CardTitle>
            <Banknote className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$500</div>
            <div className="flex items-center gap-1 mt-1">
              <Badge variant="outline" className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Pending Approval
              </Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Job Applications</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">1 interview scheduled</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Insurance Coverage</CardTitle>
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Basic Plan</div>
            <p className="text-xs text-muted-foreground">Medical + Accident Coverage</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Your latest transactions and updates</CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
          <div className="space-y-4">
            <div className="flex items-center gap-4 rounded-md p-2 hover:bg-accent">
              <div className="rounded-full bg-green-100 p-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">Payment Received</p>
                <p className="text-sm text-muted-foreground">$500 salary payment from ABC Construction</p>
              </div>
              <div className="text-sm text-muted-foreground">2d ago</div>
            </div>
            <div className="flex items-center gap-4 rounded-md p-2 hover:bg-accent">
              <div className="rounded-full bg-yellow-100 p-2">
                <Clock className="h-4 w-4 text-yellow-600" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">Loan Application</p>
                <p className="text-sm text-muted-foreground">$500 loan application submitted</p>
              </div>
              <div className="text-sm text-muted-foreground">3d ago</div>
            </div>
            <div className="flex items-center gap-4 rounded-md p-2 hover:bg-accent">
              <div className="rounded-full bg-blue-100 p-2">
                <Briefcase className="h-4 w-4 text-blue-600" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">Job Application</p>
                <p className="text-sm text-muted-foreground">Applied for Site Manager position at XYZ Builders</p>
              </div>
              <div className="text-sm text-muted-foreground">5d ago</div>
            </div>
            <div className="flex items-center gap-4 rounded-md p-2 hover:bg-accent">
              <div className="rounded-full bg-red-100 p-2">
                <AlertCircle className="h-4 w-4 text-red-600" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">Insurance Reminder</p>
                <p className="text-sm text-muted-foreground">Consider upgrading to Standard Health Plan</p>
              </div>
              <div className="text-sm text-muted-foreground">1w ago</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions and Upcoming Payments */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2">
            <Button className="justify-start">
              <Banknote className="mr-2 h-4 w-4" />
              Apply for Loan
            </Button>
            <Button className="justify-start" variant="outline">
              <Briefcase className="mr-2 h-4 w-4" />
              Browse Job Listings
            </Button>
            <Button className="justify-start" variant="outline">
              <ShieldCheck className="mr-2 h-4 w-4" />
              Submit Insurance Claim
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <Banknote className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Loan Repayment</span>
                  </div>
                  <span className="font-medium">$166.67</span>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Due June 10, 2023</span>
                  <span>1 of 3 payments</span>
                </div>
                <Progress value={33} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <ShieldCheck className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span>Insurance Premium</span>
                  </div>
                  <span className="font-medium">$10.00</span>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Due June 1, 2023</span>
                  <span>Monthly payment</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
