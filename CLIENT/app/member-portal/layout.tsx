import type React from "react"
import MemberPortalLayout from "@/components/member-portal-layout"

export default function Layout({ children }: { children: React.ReactNode }) {
  return <MemberPortalLayout>{children}</MemberPortalLayout>
}
