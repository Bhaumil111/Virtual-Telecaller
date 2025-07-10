import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenu,
  SidebarGroupContent,

} from "@/components/ui/sidebar"


import { Phone, LayoutDashboard, Users, History, BarChart3, Bot } from "lucide-react"
import Link from "next/link"




export function AppSidebar() {

  const menuItems = [

    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    { title: "Users", url: "/users", icon: Users },
    { title: "CallHistory", url: "/callLogs", icon: History },
    { title: "Analytics", url: "/analytics", icon: BarChart3 },
    { title: "Call", url: "/makeCall", icon: Phone },
    // {title: "Live Call Chat", url: "/chat", icon: Bot}

  ]
  return (
    <Sidebar className="w-64 h-full max-w-64 min-w-64">
      <SidebarContent>
        <SidebarGroup>


          <SidebarHeader>
            
            <div className="flex items-center justify-center h-16 w-full bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 rounded-md ">
              <div className="flex items-center gap-2">
                <Bot className="h-8 w-8 text-blue-600" />
                <Link href="/">

                <h1 className="text-xl font-bold text-gray-900 dark:text-gray-200">
                  
                  AI Telecaller
                  </h1>
                </Link>
              </div>

            </div>
          </SidebarHeader>

          {/* make a design sep  between header and menu items */}
          <div className="h-px bg-gray-200 dark:bg-gray-700 my-2 mb-4"></div>





          <SidebarGroupContent>
            <SidebarMenu>

              <div className="flex flex-col gap-2 ">

              {menuItems.map((item) => (
                
                
                
                <SidebarMenuItem key={item.title}>
                 
                  <SidebarMenuButton asChild>

                    <div className="flex flex-row justify-center bg-white dark:bg-black  h-12 items-center w-full bg-hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md transition-colors duration-200  ">

                    <a href={item.url}>

                      <div className="flex items-center gap-2">

                      <item.icon />
                      <span>{item.title}</span>
                      </div>
                    </a>
                    </div>
                  </SidebarMenuButton>
           
                </SidebarMenuItem>
              
            ))}
            </div>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}