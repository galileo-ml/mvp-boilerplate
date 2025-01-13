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

import Link from 'next/link'
import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import { User } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase"

interface NavUserProps {
  user: User
}

interface AppUser {
  id: string
  email: string
  name: string | null
  avatar_url?: string | undefined
  created_at?: string
  last_sign_in_at?: string
}

export function NavUser({ user }: NavUserProps) {
  const [appUser, setAppUser] = useState<AppUser | null>(null)
  const { isMobile } = useSidebar()
  const router = useRouter()

  useEffect(() => {
    const fetchAppUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        
        if (!session?.access_token) {
          throw new Error('No active session')
        }
  
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${session.access_token}`
          }
        })
  
        if (!response.ok) throw new Error('Failed to fetch user data')
        const userData = await response.json()
        setAppUser(userData)
      } catch (error) {
        setAppUser({
          id: user.id,
          email: user.email!,
          name: user.user_metadata?.name || user.email?.split('@')[0],
          avatar_url: user.user_metadata?.avatar_url
        })
      }
    }
    
    fetchAppUser()
  }, [user])

  if (!user) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <Button variant="outline" className="w-full" onClick={() => router.push('/login') }>
            <LogIn className="mr-2 h-4 w-4" />
            Login
          </Button>
        </SidebarMenuItem>
      </SidebarMenu>
    );
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
                <AvatarImage src={appUser?.avatar_url || undefined} alt={appUser?.name || 'No User Found'} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{appUser?.name || 'No User Found'}</span>
                <span className="truncate text-xs">{appUser?.email || 'No Email Found'}</span>
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
                  <AvatarImage src={appUser?.avatar_url || undefined} alt={appUser?.name || 'No User Found'} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{appUser?.name || 'No User Found'}</span>
                  <span className="truncate text-xs">{appUser?.email || 'No Email Found'}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Sparkles />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
              <Link href="/account" className="flex items-center">
                <BadgeCheck />
                Account
              </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <form 
                action="/auth/signout"
                method="POST"
              >
                <button className="flex w-full items-center">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
