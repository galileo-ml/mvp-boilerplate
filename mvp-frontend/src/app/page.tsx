"use server"

import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { AppSidebar } from "@/components/app-sidebar"
import {
  SidebarInset,
  SidebarProvider
} from "@/components/ui/sidebar"

export default async function Home() {
  const supabase = await createClient()
  
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    redirect('/login')
  }

  return (
    <SidebarProvider>
      <AppSidebar user={user}/>
      <SidebarInset>
        <div className="p-4">
          { /* Main Components can go here */ }
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}