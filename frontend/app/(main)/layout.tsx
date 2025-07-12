

import "../globals.css";
import {  SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { AppSidebar } from  "@/app/components/app-sidebar";




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen min-w-full">

     <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 p-4">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
    </div>

  );
}
