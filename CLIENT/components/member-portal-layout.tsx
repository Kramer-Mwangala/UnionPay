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
  CreditCard,
  Banknote,
  Briefcase,
  ShieldCheck,
  LogOut,
  User,
  FileText,
  Bell,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface MemberPortalLayoutProps {
  children: React.ReactNode
}

export default function MemberPortalLayout({ children }: MemberPortalLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("unionpay_token")
    const userRole = localStorage.getItem("unionpay_role")

    if (!token) {
      router.push("/login")
    } else if (userRole !== "member") {
      // If not a member, redirect to appropriate dashboard
      router.push("/dashboard")
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
    { name: "Dashboard", href: "/member-portal", icon: LayoutDashboard },
    { name: "Profile", href: "/member-portal/profile", icon: User },
    { name: "Payments", href: "/member-portal/payments", icon: CreditCard },
    { name: "Loans", href: "/member-portal/loans", icon: Banknote },
    { name: "Jobs", href: "/member-portal/jobs", icon: Briefcase },
    { name: "Insurance", href: "/member-portal/insurance", icon: ShieldCheck },
    { name: "Documents", href: "/member-portal/documents", icon: FileText },
  ]

  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden">
        <Sidebar variant="sidebar" collapsible="icon">
          <SidebarHeader className="flex h-14 items-center border-b px-4">
            <div className="flex items-center gap-2 font-semibold">
              <div className="h-6 w-6 rounded-md bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                UP
              </div>
              <span className="text-lg">Member Portal</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {navigation.map((item) => (
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
                    <AvatarFallback className="bg-blue-100 text-blue-600">JD</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start text-sm">
                    <span className="font-medium">John Doe</span>
                    <span className="text-xs text-muted-foreground">Member</span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <a href="/member-portal/profile">Profile</a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/member-portal/notifications">Notifications</a>
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
                {pathname === "/member-portal" && "Member Dashboard"}
                {pathname === "/member-portal/profile" && "My Profile"}
                {pathname === "/member-portal/payments" && "Payment History"}
                {pathname === "/member-portal/loans" && "Loan Applications"}
                {pathname === "/member-portal/jobs" && "Job Opportunities"}
                {pathname === "/member-portal/insurance" && "Insurance Coverage"}
                {pathname === "/member-portal/documents" && "My Documents"}
                {pathname === "/member-portal/notifications" && "Notifications"}
              </h1>
            </div>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1 top-1 flex h-2 w-2 rounded-full bg-red-600"></span>
            </Button>
          </header>
          <main className="flex-1 overflow-auto p-4 lg:p-6">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
