import * as React from "react"
import { AudioWaveform, Command, ChevronRight, LifeBuoy, Send } from "lucide-react"

import { NavUser } from "@/components/nav-user"
import { NavSecondary } from "@/components/nav-secondary"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarFooter
} from "@/components/ui/sidebar"

const data = {
  teams: [
    {
      name: "Company 1",
      logo: Command,
      plan: "Enterprise",
    },
    {
      name: "Company 2",
      logo: AudioWaveform,
      plan: "Startup",
    },
  ],
  navMain: [
    {
      title: "Title 1",
      url: "#",
      items: [
        {
          title: "Subtitle 1",
          url: "#",
        },
        {
          title: "Subtitle 2",
          url: "#",
        },
      ],
    },
    {
      title: "Title 2",
      url: "#",
      items: [
        {
          title: "Subtitle 1",
          url: "#",
        },
        {
          title: "Subtitle 2",
          url: "#",
        }
      ],
    },
    {
      title: "Title 3",
      url: "#",
      items: [
        {
          title: "Subtitle 1",
          url: "#",
        }
      ],
    }
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent className="gap-0">
        {data.navMain.map((item) => (
          <Collapsible
            key={item.title}
            title={item.title}
            defaultOpen
            className="group/collapsible"
          >
            <SidebarGroup>
              <SidebarGroupLabel
                asChild
                className="group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <CollapsibleTrigger>
                  {item.title}{" "}
                  <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {item.items.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild isActive={item.isActive}>
                          <a href={item.url}>{item.title}</a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
