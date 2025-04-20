// Utility functions for SIM swap detection

/**
 * Checks if a SIM swap has occurred recently for a given phone number
 * In a real implementation, this would call Africa's Talking API or a similar service
 */
export async function checkSimSwapStatus(phoneNumber: string): Promise<{
  recentSwap: boolean
  lastSwapDate: Date | null
  riskLevel: "low" | "medium" | "high"
}> {
  // In a real implementation, this would make an API call to a service like Africa's Talking
  // For the demo, we'll simulate the response

  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // For demo purposes, we'll consider phone numbers ending with specific digits as having recent swaps
  const lastDigit = phoneNumber.slice(-1)

  if (lastDigit === "1") {
    // High risk - very recent swap
    return {
      recentSwap: true,
      lastSwapDate: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      riskLevel: "high",
    }
  } else if (lastDigit === "2") {
    // Medium risk - swap within last week
    return {
      recentSwap: true,
      lastSwapDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      riskLevel: "medium",
    }
  } else if (lastDigit === "3") {
    // Low risk - swap within last month
    return {
      recentSwap: true,
      lastSwapDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000), // 20 days ago
      riskLevel: "low",
    }
  }

  // No recent swap detected
  return {
    recentSwap: false,
    lastSwapDate: null,
    riskLevel: "low",
  }
}

/**
 * Handles additional verification when a SIM swap is detected
 */
export async function handleSimSwapVerification(
  phoneNumber: string,
  riskLevel: "low" | "medium" | "high",
): Promise<{
  verified: boolean
  verificationMethod: string
}> {
  // In a real implementation, this would trigger additional verification steps
  // For high risk, might require in-person verification
  // For medium risk, might require additional ID verification
  // For low risk, might require additional SMS or email verification

  // Simulate verification process
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // For demo purposes, we'll simulate successful verification
  return {
    verified: true,
    verificationMethod:
      riskLevel === "high"
        ? "Alternative phone verification"
        : riskLevel === "medium"
          ? "Email verification"
          : "SMS verification",
  }
}
