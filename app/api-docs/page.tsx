import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function ApiDocsPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="mb-10 space-y-4">
        <h1 className="text-4xl font-bold">UnionPay API Documentation</h1>
        <p className="text-xl text-muted-foreground">
          Comprehensive API reference for backend developers implementing the UnionPay system.
        </p>
      </div>

      <Tabs defaultValue="auth" className="space-y-8">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-7">
          <TabsTrigger value="auth">Authentication</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="loans">Loans</TabsTrigger>
          <TabsTrigger value="jobs">Jobs</TabsTrigger>
          <TabsTrigger value="insurance">Insurance</TabsTrigger>
          <TabsTrigger value="ussd">USSD/SMS</TabsTrigger>
        </TabsList>

        {/* Authentication Endpoints */}
        <TabsContent value="auth" className="space-y-6">
          <h2 className="text-2xl font-bold">Authentication Endpoints</h2>
          <p className="text-muted-foreground">
            These endpoints handle user authentication, including login, 2FA verification, and token management.
          </p>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Login</CardTitle>
                <Badge>POST</Badge>
              </div>
              <CardDescription>Authenticate a user with email and password</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium">Endpoint</h4>
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                  /api/auth/login
                </code>
              </div>
              <div>
                <h4 className="font-medium">Request Body</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`{
  "email": "admin@unionpay.org",
  "password": "password123",
  "role": "admin" // or "employer"
}`}
                </pre>
              </div>
              <div>
                <h4 className="font-medium">Response</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`{
  "success": true,
  "message": "Verification code sent",
  "userId": "user_123",
  "requiresVerification": true
}`}
                </pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Verify 2FA</CardTitle>
                <Badge>POST</Badge>
              </div>
              <CardDescription>Verify the SMS code sent during login</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium">Endpoint</h4>
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                  /api/auth/verify
                </code>
              </div>
              <div>
                <h4 className="font-medium">Request Body</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`{
  "userId": "user_123",
  "verificationCode": "123456"
}`}
                </pre>
              </div>
              <div>
                <h4 className="font-medium">Response</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`{
  "success": true,
  "message": "Authentication successful",
  "token": "jwt_token_here",
  "user": {
    "id": "user_123",
    "name": "Admin User",
    "email": "admin@unionpay.org",
    "role": "admin"
  }
}`}
                </pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Logout</CardTitle>
                <Badge>POST</Badge>
              </div>
              <CardDescription>Invalidate the user's authentication token</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium">Endpoint</h4>
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                  /api/auth/logout
                </code>
              </div>
              <div>
                <h4 className="font-medium">Headers</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`Authorization: Bearer jwt_token_here`}
                </pre>
              </div>
              <div>
                <h4 className="font-medium">Response</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`{
  "success": true,
  "message": "Logged out successfully"
}`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Members Endpoints */}
        <TabsContent value="members" className="space-y-6">
          <h2 className="text-2xl font-bold">Member Management Endpoints</h2>
          <p className="text-muted-foreground">
            These endpoints handle member registration, retrieval, updates, and management.
          </p>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Get All Members</CardTitle>
                <Badge>GET</Badge>
              </div>
              <CardDescription>Retrieve a list of all members with optional filtering</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium">Endpoint</h4>
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                  /api/members
                </code>
              </div>
              <div>
                <h4 className="font-medium">Query Parameters</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`status: "active" | "pending" | "inactive" (optional)
search: string (optional)
page: number (optional, default: 1)
limit: number (optional, default: 20)`}
                </pre>
              </div>
              <div>
                <h4 className="font-medium">Headers</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`Authorization: Bearer jwt_token_here`}
                </pre>
              </div>
              <div>
                <h4 className="font-medium">Response</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`{
  "success": true,
  "data": {
    "members": [
      {
        "id": "M001",
        "name": "John Doe",
        "phone": "+254712345678",
        "status": "active",
        "joinDate": "2023-01-15",
        "lastPayment": "2023-05-01",
        "balance": "$250"
      },
      // More members...
    ],
    "pagination": {
      "total": 120,
      "page": 1,
      "limit": 20,
      "pages": 6
    }
  }
}`}
                </pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Get Member Details</CardTitle>
                <Badge>GET</Badge>
              </div>
              <CardDescription>Retrieve detailed information about a specific member</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium">Endpoint</h4>
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                  /api/members/:memberId
                </code>
              </div>
              <div>
                <h4 className="font-medium">Headers</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`Authorization: Bearer jwt_token_here`}
                </pre>
              </div>
              <div>
                <h4 className="font-medium">Response</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`{
  "success": true,
  "data": {
    "id": "M001",
    "name": "John Doe",
    "phone": "+254712345678",
    "email": "john.doe@example.com",
    "status": "active",
    "joinDate": "2023-01-15",
    "lastPayment": "2023-05-01",
    "balance": "$250",
    "address": "123 Main St, Nairobi",
    "skills": ["Carpentry", "Masonry"],
    "emergencyContact": {
      "name": "Jane Doe",
      "phone": "+254712345679",
      "relationship": "Spouse"
    },
    "paymentHistory": [
      {
        "id": "P001",
        "amount": "$500",
        "date": "2023-05-01",
        "status": "completed"
      }
      // More payment history...
    ],
    "loanHistory": [
      {
        "id": "L001",
        "amount": "$300",
        "requestDate": "2023-04-15",
        "status": "approved"
      }
      // More loan history...
    ]
  }
}`}
                </pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Create Member</CardTitle>
                <Badge>POST</Badge>
              </div>
              <CardDescription>Register a new member in the system</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium">Endpoint</h4>
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                  /api/members
                </code>
              </div>
              <div>
                <h4 className="font-medium">Headers</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`Authorization: Bearer jwt_token_here`}
                </pre>
              </div>
              <div>
                <h4 className="font-medium">Request Body</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`{
  "name": "John Doe",
  "phone": "+254712345678",
  "email": "john.doe@example.com",
  "address": "123 Main St, Nairobi",
  "skills": ["Carpentry", "Masonry"],
  "emergencyContact": {
    "name": "Jane Doe",
    "phone": "+254712345679",
    "relationship": "Spouse"
  }
}`}
                </pre>
              </div>
              <div>
                <h4 className="font-medium">Response</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`{
  "success": true,
  "message": "Member created successfully",
  "data": {
    "id": "M001",
    "name": "John Doe",
    "phone": "+254712345678",
    "status": "pending"
  }
}`}
                </pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Update Member Status</CardTitle>
                <Badge>PATCH</Badge>
              </div>
              <CardDescription>Approve or reject a member registration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium">Endpoint</h4>
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                  /api/members/:memberId/status
                </code>
              </div>
              <div>
                <h4 className="font-medium">Headers</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`Authorization: Bearer jwt_token_here`}
                </pre>
              </div>
              <div>
                <h4 className="font-medium">Request Body</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`{
  "status": "active" // or "inactive", "rejected"
}`}
                </pre>
              </div>
              <div>
                <h4 className="font-medium">Response</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`{
  "success": true,
  "message": "Member status updated successfully",
  "data": {
    "id": "M001",
    "status": "active"
  }
}`}
                </pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Bulk Update Member Status</CardTitle>
                <Badge>PATCH</Badge>
              </div>
              <CardDescription>Update status for multiple members at once</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium">Endpoint</h4>
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                  /api/members/bulk-status
                </code>
              </div>
              <div>
                <h4 className="font-medium">Headers</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`Authorization: Bearer jwt_token_here`}
                </pre>
              </div>
              <div>
                <h4 className="font-medium">Request Body</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`{
  "memberIds": ["M001", "M002", "M003"],
  "status": "active" // or "inactive", "rejected"
}`}
                </pre>
              </div>
              <div>
                <h4 className="font-medium">Response</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`{
  "success": true,
  "message": "Member statuses updated successfully",
  "data": {
    "updatedCount": 3
  }
}`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payments Endpoints */}
        <TabsContent value="payments" className="space-y-6">
          <h2 className="text-2xl font-bold">Payment Endpoints</h2>
          <p className="text-muted-foreground">
            These endpoints handle payment processing, disbursement, and tracking.
          </p>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Get Payment History</CardTitle>
                <Badge>GET</Badge>
              </div>
              <CardDescription>Retrieve payment transaction history with optional filtering</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium">Endpoint</h4>
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                  /api/payments
                </code>
              </div>
              <div>
                <h4 className="font-medium">Query Parameters</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`status: "completed" | "pending" | "failed" (optional)
memberId: string (optional)
startDate: string (ISO date, optional)
endDate: string (ISO date, optional)
page: number (optional, default: 1)
limit: number (optional, default: 20)`}
                </pre>
              </div>
              <div>
                <h4 className="font-medium">Headers</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`Authorization: Bearer jwt_token_here`}
                </pre>
              </div>
              <div>
                <h4 className="font-medium">Response</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`{
  "success": true,
  "data": {
    "payments": [
      {
        "id": "P001",
        "worker": "John Doe",
        "workerId": "M001",
        "amount": "$500",
        "date": "2023-05-15",
        "status": "completed",
        "method": "Bank Transfer"
      },
      // More payments...
    ],
    "pagination": {
      "total": 45,
      "page": 1,
      "limit": 20,
      "pages": 3
    }
  }
}`}
                </pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Process Single Payment</CardTitle>
                <Badge>POST</Badge>
              </div>
              <CardDescription>Process a payment for a single member</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium">Endpoint</h4>
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                  /api/payments/single
                </code>
              </div>
              <div>
                <h4 className="font-medium">Headers</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`Authorization: Bearer jwt_token_here`}
                </pre>
              </div>
              <div>
                <h4 className="font-medium">Request Body</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`{
  "workerId": "M001",
  "amount": "500",
  "method": "mobile", // or "bank", "cash"
  "description": "May salary payment"
}`}
                </pre>
              </div>
              <div>
                <h4 className="font-medium">Response</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`{
  "success": true,
  "message": "Payment initiated successfully",
  "data": {
    "paymentId": "P001",
    "status": "pending",
    "transactionId": "AT12345678" // Africa's Talking transaction ID
  }
}`}
                </pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Process Bulk Payments</CardTitle>
                <Badge>POST</Badge>
              </div>
              <CardDescription>Process payments for multiple members at once</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium">Endpoint</h4>
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                  /api/payments/bulk
                </code>
              </div>
              <div>
                <h4 className="font-medium">Headers</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`Authorization: Bearer jwt_token_here
Content-Type: multipart/form-data`}
                </pre>
              </div>
              <div>
                <h4 className="font-medium">Request Body</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`{
  "file": CSV File, // CSV with columns: workerId, amount, method
  "description": "May payroll"
}`}
                </pre>
              </div>
              <div>
                <h4 className="font-medium">Response</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`{
  "success": true,
  "message": "Bulk payments initiated successfully",
  "data": {
    "totalPayments": 5,
    "successfulPayments": 5,
    "failedPayments": 0,
    "batchId": "B001"
  }
}`}
                </pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Get Payment Status</CardTitle>
                <Badge>GET</Badge>
              </div>
              <CardDescription>Check the status of a specific payment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium">Endpoint</h4>
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                  /api/payments/:paymentId/status
                </code>
              </div>
              <div>
                <h4 className="font-medium">Headers</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`Authorization: Bearer jwt_token_here`}
                </pre>
              </div>
              <div>
                <h4 className="font-medium">Response</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`{
  "success": true,
  "data": {
    "paymentId": "P001",
    "status": "completed",
    "transactionId": "AT12345678",
    "completedAt": "2023-05-15T14:30:00Z"
  }
}`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Loans Endpoints */}
        <TabsContent value="loans" className="space-y-6">
          <h2 className="text-2xl font-bold">Loan Management Endpoints</h2>
          <p className="text-muted-foreground">
            These endpoints handle loan applications, approvals, rejections, and tracking.
          </p>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Get All Loans</CardTitle>
                <Badge>GET</Badge>
              </div>
              <CardDescription>Retrieve a list of all loan applications with optional filtering</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium">Endpoint</h4>
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">/api/loans</code>
              </div>
              <div>
                <h4 className="font-medium">Query Parameters</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`status: "pending" | "approved" | "rejected" (optional)
memberId: string (optional)
startDate: string (ISO date, optional)
endDate: string (ISO date, optional)
page: number (optional, default: 1)
limit: number (optional, default: 20)`}
                </pre>
              </div>
              <div>
                <h4 className="font-medium">Headers</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`Authorization: Bearer jwt_token_here`}
                </pre>
              </div>
              <div>
                <h4 className="font-medium">Response</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`{
  "success": true,
  "data": {
    "loans": [
      {
        "id": "L001",
        "worker": "John Doe",
        "workerId": "M001",
        "amount": "$500",
        "requestDate": "2023-05-10",
        "status": "pending",
        "purpose": "Medical expenses",
        "repaymentPeriod": "3 months"
      },
      // More loans...
    ],
    "pagination": {
      "total": 25,
      "page": 1,
      "limit": 20,
      "pages": 2
    }
  }
}`}
                </pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Get Loan Details</CardTitle>
                <Badge>GET</Badge>
              </div>
              <CardDescription>Retrieve detailed information about a specific loan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium">Endpoint</h4>
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                  /api/loans/:loanId
                </code>
              </div>
              <div>
                <h4 className="font-medium">Headers</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`Authorization: Bearer jwt_token_here`}
                </pre>
              </div>
              <div>
                <h4 className="font-medium">Response</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`{
  "success": true,
  "data": {
    "id": "L001",
    "worker": "John Doe",
    "workerId": "M001",
    "amount": "$500",
    "requestDate": "2023-05-10",
    "status": "pending",
    "purpose": "Medical expenses",
    "repaymentPeriod": "3 months",
    "repaymentSchedule": [
      {
        "dueDate": "2023-06-10",
        "amount": "$166.67",
        "status": "pending"
      },
      {
        "dueDate": "2023-07-10",
        "amount": "$166.67",
        "status": "pending"
      },
      {
        "dueDate": "2023-08-10",
        "amount": "$166.66",
        "status": "pending"
      }
    ],
    "documents": [
      {
        "id": "DOC001",
        "name": "Medical bill.pdf",
        "url": "https://example.com/documents/medical-bill.pdf",
        "uploadedAt": "2023-05-10T10:30:00Z"
      }
    ]
  }
}`}
                </pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Create Loan Application</CardTitle>
                <Badge>POST</Badge>
              </div>
              <CardDescription>Submit a new loan application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium">Endpoint</h4>
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">/api/loans</code>
              </div>
              <div>
                <h4 className="font-medium">Headers</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`Authorization: Bearer jwt_token_here
Content-Type: multipart/form-data`}
                </pre>
              </div>
              <div>
                <h4 className="font-medium">Request Body</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`{
  "workerId": "M001",
  "amount": "500",
  "purpose": "Medical expenses",
  "repaymentPeriod": "3", // in months
  "documents": [File] // Optional supporting documents
}`}
                </pre>
              </div>
              <div>
                <h4 className="font-medium">Response</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`{
  "success": true,
  "message": "Loan application submitted successfully",
  "data": {
    "loanId": "L001",
    "status": "pending"
  }
}`}
                </pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Update Loan Status</CardTitle>
                <Badge>PATCH</Badge>
              </div>
              <CardDescription>Approve or reject a loan application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium">Endpoint</h4>
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                  /api/loans/:loanId/status
                </code>
              </div>
              <div>
                <h4 className="font-medium">Headers</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`Authorization: Bearer jwt_token_here`}
                </pre>
              </div>
              <div>
                <h4 className="font-medium">Request Body</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`{
  "status": "approved", // or "rejected"
  "notes": "Approved based on good payment history" // Optional
}`}
                </pre>
              </div>
              <div>
                <h4 className="font-medium">Response</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`{
  "success": true,
  "message": "Loan status updated successfully",
  "data": {
    "loanId": "L001",
    "status": "approved",
    "repaymentSchedule": [
      {
        "dueDate": "2023-06-10",
        "amount": "$166.67",
        "status": "pending"
      },
      {
        "dueDate": "2023-07-10",
        "amount": "$166.67",
        "status": "pending"
      },
      {
        "dueDate": "2023-08-10",
        "amount": "$166.66",
        "status": "pending"
      }
    ]
  }
}`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Jobs Endpoints */}
        <TabsContent value="jobs" className="space-y-6">
          <h2 className="text-2xl font-bold">Job Posting Endpoints</h2>
          <p className="text-muted-foreground">These endpoints handle job listings, applications, and management.</p>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Get All Jobs</CardTitle>
                <Badge>GET</Badge>
              </div>
              <CardDescription>Retrieve a list of all job postings with optional filtering</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium">Endpoint</h4>
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">/api/jobs</code>
              </div>
              <div>
                <h4 className="font-medium">Query Parameters</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`status: "active" | "expired" (optional)
location: string (optional)
company: string (optional)
search: string (optional)
page: number (optional, default: 1)
limit: number (optional, default: 20)`}
                </pre>
              </div>
              <div>
                <h4 className="font-medium">Headers</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`Authorization: Bearer jwt_token_here`}
                </pre>
              </div>
              <div>
                <h4 className="font-medium">Response</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`{
  "success": true,
  "data": {
    "jobs": [
      {
        "id": "J001",
        "title": "Construction Site Manager",
        "location": "Nairobi, Kenya",
        "company": "ABC Construction",
        "postedDate": "2023-05-01",
        "expiryDate": "2023-06-01",
        "status": "active",
        "applications": 5
      },
      // More jobs...
    ],
    "pagination": {
      "total": 12,
      "page": 1,
      "limit": 20,
      "pages": 1
    }
  }
}`}
                </pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Get Job Details</CardTitle>
                <Badge>GET</Badge>
              </div>
              <CardDescription>Retrieve detailed information about a specific job posting</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium">Endpoint</h4>
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                  /api/jobs/:jobId
                </code>
              </div>
              <div>
                <h4 className="font-medium">Headers</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`Authorization: Bearer jwt_token_here`}
                </pre>
              </div>
              <div>
                <h4 className="font-medium">Response</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`{
  "success": true,
  "data": {
    "id": "J001",
    "title": "Construction Site Manager",
    "location": "Nairobi, Kenya",
    "company": "ABC Construction",
    "postedDate": "2023-05-01",
    "expiryDate": "2023-06-01",
    "status": "active",
    "applications": 5,
    "skills": ["Project Management", "Civil Engineering", "Team Leadership"],
    "description": "We are looking for an experienced Site Manager to oversee construction projects in Nairobi. The ideal candidate will have 5+ years of experience in construction management.",
    "salary": "$1,500 - $2,000 per month",
    "contactPerson": "HR Manager",
    "contactEmail": "hr@abcconstruction.com",
    "contactPhone": "+254712345678"
  }
}`}
                </pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Create Job Posting</CardTitle>
                <Badge>POST</Badge>
              </div>
              <CardDescription>Create a new job listing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium">Endpoint</h4>
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">/api/jobs</code>
              </div>
              <div>
                <h4 className="font-medium">Headers</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`Authorization: Bearer jwt_token_here`}
                </pre>
              </div>
              <div>
                <h4 className="font-medium">Request Body</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`{
  "title": "Construction Site Manager",
  "location": "Nairobi, Kenya",
  "company": "ABC Construction",
  "expiryDate": "2023-06-01",
  "skills": ["Project Management", "Civil Engineering", "Team Leadership"],
  "description": "We are looking for an experienced Site Manager to oversee construction projects in Nairobi. The ideal candidate will have 5+ years of experience in construction management.",
  "salary": "$1,500 - $2,000 per month",
  "contactPerson": "HR Manager",
  "contactEmail": "hr@abcconstruction.com",
  "contactPhone": "+254712345678"
}`}
                </pre>
              </div>
              <div>
                <h4 className="font-medium">Response</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`{
  "success": true,
  "message": "Job posting created successfully",
  "data": {
    "jobId": "J001",
    "status": "active"
  }
}`}
                </pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Update Job Posting</CardTitle>
                <Badge>PUT</Badge>
              </div>
              <CardDescription>Update an existing job listing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium">Endpoint</h4>
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                  /api/jobs/:jobId
                </code>
              </div>
              <div>
                <h4 className="font-medium">Headers</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`Authorization: Bearer jwt_token_here`}
                </pre>
              </div>
              <div>
                <h4 className="font-medium">Request Body</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`{
  "title": "Senior Construction Site Manager",
  "location": "Nairobi, Kenya",
  "expiryDate": "2023-07-01",
  "skills": ["Project Management", "Civil Engineering", "Team Leadership", "Budgeting"],
  "description": "Updated job description...",
  "salary": "$2,000 - $2,500 per month"
}`}
                </pre>
              </div>
              <div>
                <h4 className="font-medium">Response</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`{
  "success": true,
  "message": "Job posting updated successfully",
  "data": {
    "jobId": "J001"
  }
}`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Insurance Endpoints */}
        <TabsContent value="insurance" className="space-y-6">
          <h2 className="text-2xl font-bold">Insurance Management Endpoints</h2>
          <p className="text-muted-foreground">
            These endpoints handle insurance plans, enrollments, and claims processing.
          </p>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Get Insurance Plans</CardTitle>
                <Badge>GET</Badge>
              </div>
              <CardDescription>Retrieve a list of available insurance plans</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium">Endpoint</h4>
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                  /api/insurance/plans
                </code>
              </div>
              <div>
                <h4 className="font-medium">Headers</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`Authorization: Bearer jwt_token_here`}
                </pre>
              </div>
              <div>
                <h4 className="font-medium">Response</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`{
  "success": true,
  "data": {
    "plans": [
      {
        "id": "INS001",
        "name": "Basic Health Plan",
        "coverage": "Medical, Accident",
        "premium": "$10/month",
        "enrolledMembers": 45,
        "description": "Basic health coverage for essential medical needs and accidents"
      },
      // More plans...
    ]
  }
}`}
                </pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Get Member Enrollments</CardTitle>
                <Badge>GET</Badge>
              </div>
              <CardDescription>Retrieve a list of member insurance enrollments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium">Endpoint</h4>
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                  /api/insurance/enrollments
                </code>
              </div>
              <div>
                <h4 className="font-medium">Query Parameters</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`status: "active" | "inactive" (optional)
memberId: string (optional)
planId: string (optional)
page: number (optional, default: 1)
limit: number (optional, default: 20)`}
                </pre>
              </div>
              <div>
                <h4 className="font-medium">Headers</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`Authorization: Bearer jwt_token_here`}
                </pre>
              </div>
              <div>
                <h4 className="font-medium">Response</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`{
  "success": true,
  "data": {
    "enrollments": [
      {
        "id": "E001",
        "member": "John Doe",
        "memberId": "M001",
        "plan": "Basic Health Plan",
        "planId": "INS001",
        "startDate": "2023-01-15",
        "status": "active"
      },
      // More enrollments...
    ],
    "pagination": {
      "total": 135,
      "page": 1,
      "limit": 20,
      "pages": 7
    }
  }
}`}
                </pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Create Enrollment</CardTitle>
                <Badge>POST</Badge>
              </div>
              <CardDescription>Enroll a member in an insurance plan</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium">Endpoint</h4>
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                  /api/insurance/enrollments
                </code>
              </div>
              <div>
                <h4 className="font-medium">Headers</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`Authorization: Bearer jwt_token_here`}
                </pre>
              </div>
              <div>
                <h4 className="font-medium">Request Body</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`{
  "memberId": "M001",
  "planId": "INS001",
  "startDate": "2023-05-15"
}`}
                </pre>
              </div>
              <div>
                <h4 className="font-medium">Response</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`{
  "success": true,
  "message": "Member enrolled successfully",
  "data": {
    "enrollmentId": "E001",
    "status": "active"
  }
}`}
                </pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Get Insurance Claims</CardTitle>
                <Badge>GET</Badge>
              </div>
              <CardDescription>Retrieve a list of insurance claims</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium">Endpoint</h4>
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                  /api/insurance/claims
                </code>
              </div>
              <div>
                <h4 className="font-medium">Query Parameters</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`status: "pending" | "approved" | "rejected" (optional)
memberId: string (optional)
planId: string (optional)
startDate: string (ISO date, optional)
endDate: string (ISO date, optional)
page: number (optional, default: 1)
limit: number (optional, default: 20)`}
                </pre>
              </div>
              <div>
                <h4 className="font-medium">Headers</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`Authorization: Bearer jwt_token_here`}
                </pre>
              </div>
              <div>
                <h4 className="font-medium">Response</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`{
  "success": true,
  "data": {
    "claims": [
      {
        "id": "C001",
        "member": "John Doe",
        "memberId": "M001",
        "plan": "Basic Health Plan",
        "planId": "INS001",
        "amount": "$500",
        "date": "2023-05-05",
        "reason": "Medical treatment",
        "status": "pending"
      },
      // More claims...
    ],
    "pagination": {
      "total": 25,
      "page": 1,
      "limit": 20,
      "pages": 2
    }
  }
}`}
                </pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Submit Insurance Claim</CardTitle>
                <Badge>POST</Badge>
              </div>
              <CardDescription>Submit a new insurance claim</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium">Endpoint</h4>
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                  /api/insurance/claims
                </code>
              </div>
              <div>
                <h4 className="font-medium">Headers</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`Authorization: Bearer jwt_token_here
Content-Type: multipart/form-data`}
                </pre>
              </div>
              <div>
                <h4 className="font-medium">Request Body</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`{
  "memberId": "M001",
  "planId": "INS001",
  "amount": "500",
  "reason": "Medical treatment",
  "date": "2023-05-05",
  "documents": [File] // Supporting documents (receipts, medical reports, etc.)
}`}
                </pre>
              </div>
              <div>
                <h4 className="font-medium">Response</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`{
  "success": true,
  "message": "Claim submitted successfully",
  "data": {
    "claimId": "C001",
    "status": "pending"
  }
}`}
                </pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Update Claim Status</CardTitle>
                <Badge>PATCH</Badge>
              </div>
              <CardDescription>Approve or reject an insurance claim</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium">Endpoint</h4>
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                  /api/insurance/claims/:claimId/status
                </code>
              </div>
              <div>
                <h4 className="font-medium">Headers</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`Authorization: Bearer jwt_token_here`}
                </pre>
              </div>
              <div>
                <h4 className="font-medium">Request Body</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`{
  "status": "approved", // or "rejected"
  "notes": "Claim approved based on valid medical receipts" // Optional
}`}
                </pre>
              </div>
              <div>
                <h4 className="font-medium">Response</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`{
  "success": true,
  "message": "Claim status updated successfully",
  "data": {
    "claimId": "C001",
    "status": "approved"
  }
}`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* USSD/SMS Endpoints */}
        <TabsContent value="ussd" className="space-y-6">
          <h2 className="text-2xl font-bold">USSD and SMS Integration Endpoints</h2>
          <p className="text-muted-foreground">
            These endpoints handle USSD sessions and SMS interactions using Africa's Talking APIs.
          </p>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>USSD Session Handler</CardTitle>
                <Badge>POST</Badge>
              </div>
              <CardDescription>Handle USSD session requests from Africa's Talking</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium">Endpoint</h4>
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                  /api/ussd/session
                </code>
              </div>
              <div>
                <h4 className="font-medium">Request Body (from Africa's Talking)</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`{
  "sessionId": "ATUid_123456789",
  "phoneNumber": "+254712345678",
  "networkCode": "63902",
  "serviceCode": "*123#",
  "text": "1*2" // User input during the session
}`}
                </pre>
              </div>
              <div>
                <h4 className="font-medium">Response</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`CON Welcome to UnionPay
1. Check Balance
2. View Payment History
3. Apply for Loan
4. Find Jobs
5. Insurance Claims`}
                </pre>
                <p className="mt-2 text-sm text-muted-foreground">
                  Note: Response should start with "CON" to continue the session or "END" to end it.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Send SMS Notification</CardTitle>
                <Badge>POST</Badge>
              </div>
              <CardDescription>Send SMS notifications to members</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium">Endpoint</h4>
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                  /api/sms/send
                </code>
              </div>
              <div>
                <h4 className="font-medium">Headers</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`Authorization: Bearer jwt_token_here`}
                </pre>
              </div>
              <div>
                <h4 className="font-medium">Request Body</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`{
  "recipients": ["+254712345678", "+254723456789"],
  "message": "Your payment of $500 has been processed successfully. Thank you for using UnionPay.",
  "senderId": "UnionPay" // Optional
}`}
                </pre>
              </div>
              <div>
                <h4 className="font-medium">Response</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`{
  "success": true,
  "message": "SMS sent successfully",
  "data": {
    "messageId": "AT-SMS-123456789",
    "recipients": 2,
    "cost": "KES 2.00"
  }
}`}
                </pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>SMS Callback Handler</CardTitle>
                <Badge>POST</Badge>
              </div>
              <CardDescription>Handle SMS delivery reports and incoming messages</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium">Endpoint</h4>
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                  /api/sms/callback
                </code>
              </div>
              <div>
                <h4 className="font-medium">Request Body (from Africa's Talking)</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`{
  "id": "AT-SMS-123456789",
  "status": "Success",
  "phoneNumber": "+254712345678",
  "networkCode": "63902",
  "failureReason": "" // Only present if status is not "Success"
}`}
                </pre>
              </div>
              <div>
                <h4 className="font-medium">Response</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`{
  "success": true
}`}
                </pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Send 2FA Verification Code</CardTitle>
                <Badge>POST</Badge>
              </div>
              <CardDescription>Send a verification code for two-factor authentication</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium">Endpoint</h4>
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                  /api/sms/send-verification
                </code>
              </div>
              <div>
                <h4 className="font-medium">Headers</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`Authorization: Bearer jwt_token_here`}
                </pre>
              </div>
              <div>
                <h4 className="font-medium">Request Body</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`{
  "phoneNumber": "+254712345678",
  "userId": "user_123"
}`}
                </pre>
              </div>
              <div>
                <h4 className="font-medium">Response</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`{
  "success": true,
  "message": "Verification code sent successfully",
  "data": {
    "messageId": "AT-SMS-123456789",
    "expiresIn": 300 // seconds
  }
}`}
                </pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>SIM Swap Detection</CardTitle>
                <Badge>GET</Badge>
              </div>
              <CardDescription>Check if a SIM swap has occurred recently for a phone number</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium">Endpoint</h4>
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                  /api/security/sim-swap-check
                </code>
              </div>
              <div>
                <h4 className="font-medium">Query Parameters</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`phoneNumber: string (required) - The phone number to check in international format`}
                </pre>
              </div>
              <div>
                <h4 className="font-medium">Headers</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`Authorization: Bearer jwt_token_here`}
                </pre>
              </div>
              <div>
                <h4 className="font-medium">Response</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`{
  "success": true,
  "data": {
    "phoneNumber": "+254712345678",
    "recentSwap": true,
    "lastSwapDate": "2023-05-15T10:30:00Z",
    "riskLevel": "medium",
    "recommendedAction": "additional_verification"
  }
}`}
                </pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Verify After SIM Swap</CardTitle>
                <Badge>POST</Badge>
              </div>
              <CardDescription>Perform additional verification when a SIM swap is detected</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium">Endpoint</h4>
                <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                  /api/security/verify-after-swap
                </code>
              </div>
              <div>
                <h4 className="font-medium">Headers</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`Authorization: Bearer jwt_token_here`}
                </pre>
              </div>
              <div>
                <h4 className="font-medium">Request Body</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`{
  "phoneNumber": "+254712345678",
  "verificationMethod": "email", // or "alternative_phone", "security_questions", etc.
  "verificationData": {
    // Method-specific verification data
    "email": "user@example.com",
    "code": "123456"
  }
}`}
                </pre>
              </div>
              <div>
                <h4 className="font-medium">Response</h4>
                <pre className="relative rounded bg-muted p-4 font-mono text-sm">
                  {`{
  "success": true,
  "data": {
    "verified": true,
    "verificationMethod": "email",
    "expiresAt": "2023-05-15T11:30:00Z"
  }
}`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
