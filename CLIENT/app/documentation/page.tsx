import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, Users, Briefcase, Banknote, Building, User } from "lucide-react"

export default function DocumentationPage() {
  return (
    <div className="container py-10 mx-auto max-w-7xl">
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-2">UnionPay Documentation</h1>
        <p className="text-lg text-muted-foreground">
          Complete guide to using the UnionPay Construction Workers Union Payment System
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="flex flex-wrap">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="admin">Union Admin</TabsTrigger>
          <TabsTrigger value="employer">Employer</TabsTrigger>
          <TabsTrigger value="member">Member</TabsTrigger>
          <TabsTrigger value="payment-flow">Payment Flow</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Overview</CardTitle>
              <CardDescription>Introduction to UnionPay and its components</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                UnionPay is a comprehensive platform designed to manage payment flows between 
                construction employers, unions, and workers. The system streamlines the process of 
                union membership management, wage disbursement, loan management, and job placements.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Key Components</h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="p-4">
                  <div className="flex flex-col items-start gap-2">
                    <Users className="h-6 w-6 text-primary" />
                    <h4 className="font-medium">Member Management</h4>
                    <p className="text-sm text-muted-foreground">
                      Register, verify, and manage union members and their profiles
                    </p>
                  </div>
                </Card>

                <Card className="p-4">
                  <div className="flex flex-col items-start gap-2">
                    <CreditCard className="h-6 w-6 text-primary" />
                    <h4 className="font-medium">Payment Processing</h4>
                    <p className="text-sm text-muted-foreground">
                      Collect employer payments and distribute wages to members
                    </p>
                  </div>
                </Card>

                <Card className="p-4">
                  <div className="flex flex-col items-start gap-2">
                    <Banknote className="h-6 w-6 text-primary" />
                    <h4 className="font-medium">Loan Management</h4>
                    <p className="text-sm text-muted-foreground">
                      Process loan applications and manage repayments
                    </p>
                  </div>
                </Card>

                <Card className="p-4">
                  <div className="flex flex-col items-start gap-2">
                    <Briefcase className="h-6 w-6 text-primary" />
                    <h4 className="font-medium">Job Postings</h4>
                    <p className="text-sm text-muted-foreground">
                      Post and manage job opportunities for union members
                    </p>
                  </div>
                </Card>
              </div>

              <h3 className="text-xl font-semibold mt-6 mb-3">User Roles</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-md">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Union Administrator</h4>
                    <p className="text-sm text-muted-foreground">
                      Union officials who manage the system, verify members, process payments, 
                      approve loans, and oversee all operations
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-md">
                    <Building className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Employer</h4>
                    <p className="text-sm text-muted-foreground">
                      Construction companies that make payments to the union for their workers 
                      and post job opportunities
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-md">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Member</h4>
                    <p className="text-sm text-muted-foreground">
                      Construction workers who are registered with the union, receive payments, 
                      apply for loans and jobs
                    </p>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold mt-6 mb-3">Payment Flow</h3>
              <div className="space-y-2">
                &lt;div&gt;&lt;/div&gt;\
