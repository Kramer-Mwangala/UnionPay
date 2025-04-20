"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Banknote,
  Briefcase,
  ShieldCheck,
  LogOut,
  BarChart3,
  Settings,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [role, setRole] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("unionpay_token")
    const userRole = localStorage.getItem("unionpay_role")

    if (!token) {
      router.push("/login")
    } else {
      setRole(userRole)
    }

    setMounted(true)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("unionpay_token")
    localStorage.removeItem("unionpay_role")
    router.push("/login")
  }

  if (!mounted) {
    return null
  }

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Members", href: "/dashboard/members", icon: Users },
    { name: "Payments", href: "/dashboard/payments", icon: CreditCard },
    { name: "Loans", href: "/dashboard/loans", icon: Banknote },
    { name: "Jobs", href: "/dashboard/jobs", icon: Briefcase },
    { name: "Insurance", href: "/dashboard/insurance", icon: ShieldCheck },
    { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ]

  // Filter navigation items based on role
  const filteredNavigation =
    role === "employer"
      ? navigation.filter((item) => ["Dashboard", "Payments", "Jobs"].includes(item.name))
      : navigation

  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden">
        <Sidebar variant="sidebar" collapsible="icon">
          <SidebarHeader className="flex h-14 items-center border-b px-4">
            <div className="flex items-center gap-2 font-semibold">
              <div className="h-6 w-6 rounded-md bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                UP
              </div>
              <span className="text-lg">UnionPay</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {filteredNavigation.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.name}>
                    <a href={item.href}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="border-t p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="bg-blue-100 text-blue-600">
                      {role === "admin" ? "AD" : "EM"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start text-sm">
                    <span className="font-medium">{role === "admin" ? "Admin User" : "Employer User"}</span>
                    <span className="text-xs text-muted-foreground">
                      {role === "admin" ? "Union Administrator" : "Construction Company"}
                    </span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <a href="/dashboard/profile">Profile</a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/dashboard/settings">Settings</a>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset className="flex flex-col">
          <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:px-6">
            <SidebarTrigger />
            <div className="flex-1">
              <h1 className="text-lg font-semibold">
                {pathname === "/dashboard" && "Dashboard"}
                {pathname === "/dashboard/members" && "Member Management"}
                {pathname === "/dashboard/payments" && "Payment Disbursement"}
                {pathname === "/dashboard/loans" && "Loan Management"}
                {pathname === "/dashboard/jobs" && "Job Postings"}
                {pathname === "/dashboard/insurance" && "Insurance Management"}
                {pathname === "/dashboard/analytics" && "Analytics"}
                {pathname === "/dashboard/settings" && "Settings"}
              </h1>
            </div>
          </header>
          <main className="flex-1 overflow-auto p-4 lg:p-6">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
