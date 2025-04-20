"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MembershipChart } from "@/components/charts/membership-chart"
import { PaymentChart } from "@/components/charts/payment-chart"
import { LoanChart } from "@/components/charts/loan-chart"
import { JobsChart } from "@/components/charts/jobs-chart"
import { InsuranceChart } from "@/components/charts/insurance-chart"
import { UssdUsageChart } from "@/components/charts/ussd-usage-chart"

export function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState("30d")

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h2>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="loans">Loans</TabsTrigger>
          <TabsTrigger value="jobs">Jobs</TabsTrigger>
          <TabsTrigger value="insurance">Insurance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Member Growth</CardTitle>
                <CardDescription>New member registrations over time</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <MembershipChart timeRange={timeRange} chartType="growth" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Payment Volume</CardTitle>
                <CardDescription>Total payment volume processed</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <PaymentChart timeRange={timeRange} chartType="volume" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Loan Approval Rate</CardTitle>
                <CardDescription>Percentage of loans approved vs. rejected</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <LoanChart timeRange={timeRange} chartType="approvalRate" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Job Placement Rate</CardTitle>
                <CardDescription>Percentage of job applications resulting in placement</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <JobsChart timeRange={timeRange} chartType="placementRate" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Insurance Claims</CardTitle>
                <CardDescription>Number of insurance claims by status</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <InsuranceChart timeRange={timeRange} chartType="claims" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>USSD/SMS Usage</CardTitle>
                <CardDescription>Usage of USSD and SMS services</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <UssdUsageChart timeRange={timeRange} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="members" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Member Registration Trends</CardTitle>
                <CardDescription>New member registrations over time</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <MembershipChart timeRange={timeRange} chartType="registrationTrend" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Member Demographics</CardTitle>
                <CardDescription>Breakdown of members by age and gender</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <MembershipChart timeRange={timeRange} chartType="demographics" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Member Status Distribution</CardTitle>
                <CardDescription>Distribution of members by status</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <MembershipChart timeRange={timeRange} chartType="statusDistribution" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Payment Trends</CardTitle>
                <CardDescription>Payment volume and count over time</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <PaymentChart timeRange={timeRange} chartType="trends" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Distribution of payments by method</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <PaymentChart timeRange={timeRange} chartType="methods" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Payment Status</CardTitle>
                <CardDescription>Distribution of payments by status</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <PaymentChart timeRange={timeRange} chartType="status" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="loans" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Loan Trends</CardTitle>
                <CardDescription>Loan volume and count over time</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <LoanChart timeRange={timeRange} chartType="trends" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Loan Purposes</CardTitle>
                <CardDescription>Distribution of loans by purpose</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <LoanChart timeRange={timeRange} chartType="purposes" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Loan Repayment Performance</CardTitle>
                <CardDescription>Loan repayment performance over time</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <LoanChart timeRange={timeRange} chartType="repayment" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="jobs" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Job Posting Trends</CardTitle>
                <CardDescription>Job postings and applications over time</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <JobsChart timeRange={timeRange} chartType="trends" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Job Categories</CardTitle>
                <CardDescription>Distribution of jobs by category</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <JobsChart timeRange={timeRange} chartType="categories" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Application Success Rate</CardTitle>
                <CardDescription>Success rate of job applications by category</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <JobsChart timeRange={timeRange} chartType="successRate" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="insurance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Insurance Enrollment Trends</CardTitle>
                <CardDescription>Insurance enrollments over time</CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <InsuranceChart timeRange={timeRange} chartType="enrollmentTrends" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Insurance Plan Distribution</CardTitle>
                <CardDescription>Distribution of enrollments by plan</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <InsuranceChart timeRange={timeRange} chartType="planDistribution" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Claim Resolution Time</CardTitle>
                <CardDescription>Average time to resolve insurance claims</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <InsuranceChart timeRange={timeRange} chartType="resolutionTime" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
