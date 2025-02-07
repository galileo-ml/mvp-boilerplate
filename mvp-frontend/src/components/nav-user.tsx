"use client"

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogIn,
  LogOut,
  Sparkles,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext"

import Link from 'next/link'
import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import { AppUser } from '@/types/user'

export function NavUser() {
  const [appUser, setAppUser] = useState<AppUser | null>(null)
  const { isMobile } = useSidebar()
  const router = useRouter()
  const { user, logout, getToken } = useAuth()

  useEffect(() => {
    const fetchAppUser = async () => {
      try {
        if (!user) return

        const token = await getToken()
        if (!token) {
          throw new Error('No active session')
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        if (!response.ok) throw new Error('Failed to fetch user data')
        const userData = await response.json()

        setAppUser({
          id: userData.id,
          email: userData.email,
          name:
            typeof userData.user_metadata?.full_name === 'string'
              ? userData.user_metadata.full_name
              : userData.email.split('@')[0],
          avatar_url: userData.user_metadata?.avatar_url,
          subscription: userData.subscription,
          created_at: userData.created_at,
          user_metadata: userData.user_metadata
        })
      } catch (error) {
        // TODO: do we need error handling
        console.error('Error fetching user data:', error)
      }
    }
    
    fetchAppUser()
  }, [user, getToken])

  const handleLogout = async () => {
    try {
      await logout()
      router.push('/login')
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  if (!user) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={() => router.push('/login')}
          >
            <LogIn className="mr-2 h-4 w-4" />
            Login
          </Button>
        </SidebarMenuItem>
      </SidebarMenu>
    )
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage 
                  src={appUser?.avatar_url} 
                  alt={appUser?.name || 'User'} 
                />
                <AvatarFallback className="rounded-lg">
                  {appUser?.name?.[0] || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {appUser?.name || 'User'}
                </span>
                <span className="truncate text-xs">
                  {appUser?.email}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="start"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage 
                    src={appUser?.avatar_url} 
                    alt={appUser?.name || 'User'} 
                  />
                  <AvatarFallback className="rounded-lg">
                    {appUser?.name?.[0] || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {appUser?.name || 'User'}
                  </span>
                  <span className="truncate text-xs">
                    {appUser?.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Sparkles className="mr-2 h-4 w-4" />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href="/account" className="flex items-center">
                  <BadgeCheck className="mr-2 h-4 w-4" />
                  Account
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard className="mr-2 h-4 w-4" />
                Billing
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}