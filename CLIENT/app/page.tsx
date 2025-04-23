import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  CreditCard,
  Banknote,
  Briefcase,
  ShieldCheck,
  MessageSquare,
  CheckCircle,
  ArrowRight,
  Phone,
  Building,
} from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
              UP
            </div>
            <span className="text-xl font-bold">UnionPay</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              How It Works
            </Link>
            <Link href="#testimonials" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Testimonials
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline">Sign In</Button>
            </Link>
            <Link href="/login">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-blue-50 to-white dark:from-blue-950 dark:to-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <Badge className="w-fit" variant="outline">
                    Construction Workers Union
                  </Badge>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                    Empowering Construction Workers Through Digital Solutions
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    UnionPay streamlines union management, wage disbursements, loans, and job placements for
                    construction workers across Africa.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/login">
                    <Button size="lg" className="gap-1">
                      Get Started <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="#how-it-works">
                    <Button size="lg" variant="outline">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[350px] w-full md:h-[450px] lg:h-[500px]">
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg border bg-background p-4 shadow-lg md:p-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <CheckCircle className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Payment Processed</p>
                          <p className="text-xs text-muted-foreground">$2,500 to 5 workers</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute left-[10%] top-[20%] rounded-lg border bg-background p-4 shadow-lg md:p-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                          <Users className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">New Member</p>
                          <p className="text-xs text-muted-foreground">John registered via USSD</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-[20%] right-[10%] rounded-lg border bg-background p-4 shadow-lg md:p-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
                          <Briefcase className="h-4 w-4 text-yellow-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">New Job Posted</p>
                          <p className="text-xs text-muted-foreground">Site Manager position</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge className="w-fit mx-auto" variant="outline">
                  Features
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Everything You Need to Manage Your Union
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  UnionPay provides a comprehensive suite of tools for union administrators and construction company
                  employers.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <CardTitle className="mt-4">Member Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Easily register new members, approve applications, and manage member information through a
                    user-friendly interface.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                    <CreditCard className="h-5 w-5 text-blue-600" />
                  </div>
                  <CardTitle className="mt-4">Payment Disbursement</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Process wage payments efficiently with bulk uploads or individual transactions, integrated with
                    mobile money services.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                    <Banknote className="h-5 w-5 text-blue-600" />
                  </div>
                  <CardTitle className="mt-4">Loan Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Review and approve loan applications, set repayment schedules, and track loan statuses all in one
                    place.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                    <Briefcase className="h-5 w-5 text-blue-600" />
                  </div>
                  <CardTitle className="mt-4">Job Postings</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Create and manage job listings, track applications, and connect workers with employment
                    opportunities.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                    <ShieldCheck className="h-5 w-5 text-blue-600" />
                  </div>
                  <CardTitle className="mt-4">Insurance Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Administer insurance plans, process claims, and ensure workers have access to health and safety
                    coverage.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                    <MessageSquare className="h-5 w-5 text-blue-600" />
                  </div>
                  <CardTitle className="mt-4">SMS & USSD Integration</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Enable workers to access services via SMS and USSD, making the system accessible even without
                    smartphones.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-blue-50 dark:bg-blue-950">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge className="w-fit mx-auto" variant="outline">
                  How It Works
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Simple Process, Powerful Results
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  UnionPay streamlines union operations with an intuitive workflow for all stakeholders.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                  <Phone className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold">For Workers</h3>
                <p className="text-muted-foreground">
                  Workers register via USSD or SMS, receive payments, apply for loans, and find job opportunities
                  through simple mobile interactions.
                </p>
                <div className="flex items-center justify-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                    <span className="text-sm font-bold text-blue-600 dark:text-blue-400">1</span>
                  </div>
                  <div className="ml-2 h-0.5 w-12 bg-blue-200 dark:bg-blue-800"></div>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                  <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold">For Union Admins</h3>
                <p className="text-muted-foreground">
                  Administrators manage memberships, approve loans, process payments, and monitor analytics through a
                  comprehensive dashboard.
                </p>
                <div className="flex items-center justify-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                    <span className="text-sm font-bold text-blue-600 dark:text-blue-400">2</span>
                  </div>
                  <div className="ml-2 h-0.5 w-12 bg-blue-200 dark:bg-blue-800"></div>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                  <Building className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold">For Employers</h3>
                <p className="text-muted-foreground">
                  Construction companies upload payroll data, post job listings, and track payment status through a
                  secure employer portal.
                </p>
                <div className="flex items-center justify-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                    <span className="text-sm font-bold text-blue-600 dark:text-blue-400">3</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge className="w-fit mx-auto" variant="outline">
                  Testimonials
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Trusted by Construction Workers Across Africa
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Hear from the people who have experienced the benefits of UnionPay firsthand.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col space-y-4">
                    <p className="text-muted-foreground">
                      "UnionPay has made it so much easier to receive my wages. I no longer have to travel long
                      distances to collect my pay, and I can check my balance anytime via USSD."
                    </p>
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 font-bold">JD</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">John Doe</p>
                        <p className="text-xs text-muted-foreground">Construction Worker, Nairobi</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col space-y-4">
                    <p className="text-muted-foreground">
                      "As a union administrator, UnionPay has revolutionized how we manage our members. The dashboard
                      gives me a clear overview of all activities, and processing payments is now a breeze."
                    </p>
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 font-bold">MS</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Mary Smith</p>
                        <p className="text-xs text-muted-foreground">Union Administrator, Mombasa</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col space-y-4">
                    <p className="text-muted-foreground">
                      "The loan application process through UnionPay is straightforward and quick. I was able to get
                      funds for my child's school fees within days, which was a lifesaver."
                    </p>
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 font-bold">RJ</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Robert Johnson</p>
                        <p className="text-xs text-muted-foreground">Electrician, Kisumu</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-600 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Transform Your Union Management?
                </h2>
                <p className="max-w-[900px] text-blue-100 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join UnionPay today and experience the benefits of digital union management.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/login">
                  <Button size="lg" variant="secondary" className="gap-1">
                    Get Started <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#features">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-blue-700">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-md bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
              UP
            </div>
            <span className="text-sm font-medium">UnionPay</span>
          </div>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} UnionPay. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Terms of Service
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
