import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function SimSwapDetectionDocs() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">SIM Swap Detection Endpoints</h2>
      <p className="text-muted-foreground">
        These endpoints handle SIM swap detection and additional verification for secure payment processing.
      </p>

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

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Batch SIM Swap Check</CardTitle>
            <Badge>POST</Badge>
          </div>
          <CardDescription>Check multiple phone numbers for recent SIM swaps</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium">Endpoint</h4>
            <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
              /api/security/batch-sim-swap-check
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
  "phoneNumbers": ["+254712345678", "+254723456789", "+254734567890"]
}`}
            </pre>
          </div>
          <div>
            <h4 className="font-medium">Response</h4>
            <pre className="relative rounded bg-muted p-4 font-mono text-sm">
              {`{
  "success": true,
  "data": {
    "results": [
      {
        "phoneNumber": "+254712345678",
        "recentSwap": true,
        "lastSwapDate": "2023-05-15T10:30:00Z",
        "riskLevel": "medium"
      },
      {
        "phoneNumber": "+254723456789",
        "recentSwap": false,
        "riskLevel": "low"
      },
      {
        "phoneNumber": "+254734567890",
        "recentSwap": true,
        "lastSwapDate": "2023-05-01T08:15:00Z",
        "riskLevel": "low"
      }
    ],
    "summary": {
      "total": 3,
      "withRecentSwaps": 2,
      "highRisk": 0,
      "mediumRisk": 1,
      "lowRisk": 1
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
            <CardTitle>Payment with SIM Swap Check</CardTitle>
            <Badge>POST</Badge>
          </div>
          <CardDescription>Process a payment with integrated SIM swap detection</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium">Endpoint</h4>
            <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
              /api/payments/secure-payment
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
  "description": "May salary payment",
  "phoneNumber": "+254712345678",
  "bypassSimSwapCheck": false // Optional, defaults to false
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
    "transactionId": "AT12345678",
    "simSwapDetected": false,
    "securityChecks": {
      "simSwapCheck": "passed",
      "riskLevel": "low"
    }
  }
}`}
            </pre>
          </div>
          <div>
            <h4 className="font-medium">Response (when SIM swap detected)</h4>
            <pre className="relative rounded bg-muted p-4 font-mono text-sm">
              {`{
  "success": false,
  "message": "Additional verification required due to recent SIM swap",
  "data": {
    "paymentId": "P001",
    "status": "verification_required",
    "simSwapDetected": true,
    "securityChecks": {
      "simSwapCheck": "failed",
      "riskLevel": "medium",
      "lastSwapDate": "2023-05-15T10:30:00Z"
    },
    "verificationOptions": [
      "email",
      "security_questions",
      "alternative_phone"
    ],
    "verificationUrl": "/api/security/verify-after-swap"
  }
}`}
            </pre>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Get SIM Swap History</CardTitle>
            <Badge>GET</Badge>
          </div>
          <CardDescription>Retrieve SIM swap history for a specific phone number</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium">Endpoint</h4>
            <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
              /api/security/sim-swap-history/:phoneNumber
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
    "phoneNumber": "+254712345678",
    "swapHistory": [
      {
        "date": "2023-05-15T10:30:00Z",
        "networkFrom": "Safaricom",
        "networkTo": "Safaricom",
        "deviceChanged": true,
        "locationChanged": false
      },
      {
        "date": "2023-01-10T14:45:00Z",
        "networkFrom": "Airtel",
        "networkTo": "Safaricom",
        "deviceChanged": true,
        "locationChanged": true
      }
    ],
    "totalSwaps": 2,
    "lastSwapDate": "2023-05-15T10:30:00Z"
  }
}`}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
